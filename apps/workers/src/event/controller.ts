import { okAsync, errAsync, err, ok, ResultAsync } from 'neverthrow'
import { EventJob, Job } from 'queues'
import { QuestId } from 'content'
import { EventId, MailerLiteModel, BusinessLogic, TransactionIntentHelper } from 'common'
import { AppLogger, AccountAddressModel } from 'common'
import { PrismaClient, User } from 'database'
import { WorkerError, WorkerOutputError } from '../_types'
import { MessageHelper } from '../helpers/messageHelper'
import { config } from '../config'
import { QuestHelper } from '../helpers/questHelper'
import { ReferralHelper } from '../helpers/referralHelper'
import { TokenPriceClient } from '../token-price-client'

const supportedTokenAddressList = new Set<string>(Object.values(BusinessLogic.Maya.supportedTokens))

type GiftBoxKind = keyof typeof config.radQuest.resources.giftBox

const giftBoxMap = Object.entries(config.radQuest.resources.giftBox).reduce<
  Record<string, GiftBoxKind>
>((acc, [key, value]) => ({ ...acc, [value]: key as GiftBoxKind }), {})

const getGiftBoxKindByResourceAddress = (resourceAddress: string) => {
  const giftBoxKind = giftBoxMap[resourceAddress]
  if (!giftBoxKind) err({ reason: 'GiftBoxKindNotFound' })
  return ok(giftBoxKind)
}

export type UserExtended = User & { email: { email: string; newsletter: boolean } }

export type EventWorkerController = ReturnType<typeof EventWorkerController>
export const EventWorkerController = ({
  dbClient,
  logger,
  AccountAddressModel,
  mailerLiteModel,
  sendMessage,
  transactionIntentHelper,
  tokenPriceClient
}: {
  dbClient: PrismaClient
  AccountAddressModel: AccountAddressModel
  mailerLiteModel: MailerLiteModel
  logger: AppLogger
  sendMessage: MessageHelper
  transactionIntentHelper: TransactionIntentHelper
  tokenPriceClient: TokenPriceClient
}) => {
  const handler = (
    job: Job<EventJob>,
    accountAddress: string,
    priority: number,
    referredBy?: string
  ): ResultAsync<any, WorkerOutputError> => {
    const { traceId, type, transactionId, userId } = job.data

    const shouldTriggerReferralRewardFlow = (questId: QuestId) =>
      (!!referredBy && questId === BusinessLogic.QuestTogether.triggerRewardAfterQuest) ?? false

    const childLogger = logger.child({
      traceId,
      type,
      transactionId,
      userId,
      priority,
      method: 'eventWorker.handler'
    })

    const accountAddressModel = AccountAddressModel(childLogger)

    const questHelper = QuestHelper({
      transactionIntentHelper,
      priority,
      userId,
      traceId,
      sendMessage,
      dbClient,
      accountAddressModel,
      accountAddress,
      logger: childLogger,
      transactionId,
      mailerLiteModel: mailerLiteModel(childLogger)
    })

    const referralHelper = ReferralHelper({
      dbClient,
      priority,
      transactionIntentHelper,
      traceId,
      referredBy,
      sendMessage,
      logger: childLogger,
      transactionId
    })

    switch (type) {
      case EventId.QuestRewardDepositedV2:
      case EventId.QuestRewardDeposited: {
        const questId = job.data.data.questId as QuestId

        return questHelper
          .updateQuestProgressStatus({ questId, status: 'REWARDS_DEPOSITED' })
          .andThen(() =>
            sendMessage(userId, {
              type: 'QuestRewardsDeposited',
              questId,
              traceId
            })
          )
      }

      case EventId.QuestRewardClaimedV2:
      case EventId.QuestRewardClaimed: {
        const questId = job.data.data.questId as QuestId

        const sendQuestRewardsClaimedMessage = () =>
          sendMessage(
            userId,
            {
              type: 'QuestRewardsClaimed',
              questId,
              traceId
            },
            childLogger
          )

        logger.trace({ shouldTriggerReferralRewardFlow, referredBy, userId, questId })

        return questHelper
          .updateQuestProgressStatus({ questId, status: 'REWARDS_CLAIMED' })
          .andThen(sendQuestRewardsClaimedMessage)
          .andThen(() =>
            shouldTriggerReferralRewardFlow(questId)
              ? referralHelper.handleQuestTogetherRewards(questId)
              : okAsync(undefined)
          )
          .andThen(() => questHelper.handleMailerLiteBasicQuestFinished(questId))
      }

      case EventId.DepositHeroBadge: {
        return questHelper
          .completeQuestRequirement({
            questId: 'SetupWallet',
            type
          })
          .andThen(() => questHelper.handleAllQuestRequirementCompleted('SetupWallet'))
      }

      case EventId.JettyReceivedClams: {
        return questHelper.handleQuestWithTrackedAccount('TransferTokens', type)
      }

      case EventId.MayaRouterWithdrawEvent: {
        const { amount, resourceAddress } = job.data.data as {
          amount: string
          resourceAddress: string
        }

        if (!supportedTokenAddressList.has(resourceAddress)) return okAsync(undefined)

        const valueRequirement =
          BusinessLogic.Maya.transferValueInUSD - BusinessLogic.Maya.paddingValueInUSD

        return tokenPriceClient
          .getPrice(resourceAddress)
          .map((tokenPrice) => tokenPrice.multipliedBy(amount).gte(valueRequirement))
          .andThen((isRequirementFulfilled) =>
            isRequirementFulfilled
              ? questHelper.handleQuestWithTrackedAccount('Thorswap', type)
              : okAsync(undefined)
          )
      }

      case EventId.XrdStaked: {
        return questHelper.handleQuestWithTrackedAccount('NetworkStaking', type)
      }

      case EventId.JettySwap:
      case EventId.LettySwap: {
        return questHelper.handleQuestWithTrackedAccount(
          'DEXSwaps',
          type,
          ({ completedRequirements }) =>
            completedRequirements.filter(({ requirementId }) =>
              ([EventId.JettySwap, EventId.LettySwap] as string[]).includes(
                requirementId as EventId
              )
            ).length === 2
        )
      }

      case EventId.GiftBoxesOpenedEvent: {
        const giftBoxResourceAddress = job.data.data.giftBoxResourceAddress as string
        const amount = parseInt(job.data.data.quantity as string)

        return getGiftBoxKindByResourceAddress(giftBoxResourceAddress)
          .asyncAndThen((giftBoxKind) => {
            if (giftBoxKind === 'Starter')
              return questHelper
                .addCompletedQuestRequirement({
                  questId: 'CreatingRadMorphs',
                  requirementId: 'OpenGiftBox'
                })
                .map(() => giftBoxKind)

            return okAsync(giftBoxKind)
          })
          .andThen((giftBoxKind) =>
            transactionIntentHelper.add({
              type: 'DepositGiftBoxesReward',
              discriminator: `${EventId.GiftBoxesOpenedEvent}:${job.data.transactionId}`,
              userId,
              traceId: job.data.traceId,
              giftBoxKind,
              amount
            })
          )
      }

      case EventId.DepositedElements: {
        const elementsCount = parseInt((job.data.data.elementsCount as string) ?? '0')
        if (elementsCount === 0) return okAsync(undefined)

        return transactionIntentHelper.add({
          userId,
          discriminator: `${EventId.DepositedElements}:RadGem:${transactionId}`,
          type: 'ElementsDeposited',
          traceId,
          elementsCount
        })
      }

      case EventId.RadGemsClaimed: {
        return questHelper.addCompletedQuestRequirement({
          questId: 'CreatingRadMorphs',
          requirementId: EventId.RadGemsClaimed
        })
      }

      case EventId.RadMorphCreated: {
        return questHelper.handleQuestWithTrackedAccount('CreatingRadMorphs', type)
      }

      default:
        childLogger.error({
          message: 'Unhandled Event'
        })
        return errAsync({ reason: WorkerError.UnhandledError })
    }
  }

  return { handler }
}
