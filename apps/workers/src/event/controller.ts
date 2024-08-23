import { okAsync, errAsync, err, ok, ResultAsync } from 'neverthrow'
import { EventJob, Job } from 'queues'
import { QuestId } from 'content'
import { EventId, MailerLiteModel } from 'common'
import { AppLogger, AccountAddressModel } from 'common'
import { PrismaClient, User } from 'database'
import { WorkerError, WorkerOutputError } from '../_types'
import { MessageHelper } from '../helpers/messageHelper'
import { config } from '../config'
import { TransactionIntentHelper } from '../helpers/transactionIntentHelper'
import { ReferralRewardAction } from '../helpers/referalReward'
import { QuestHelper } from '../helpers/questHelper'
import { ReferralHelper } from '../helpers/referralHelper'

type Reward = { resourceAddress: string; amount: string; name: string }

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
  transactionIntent,
  referralRewardAction
}: {
  dbClient: PrismaClient
  AccountAddressModel: AccountAddressModel
  mailerLiteModel: MailerLiteModel
  logger: AppLogger
  sendMessage: MessageHelper
  transactionIntent: TransactionIntentHelper
  referralRewardAction: ReferralRewardAction
}) => {
  const handler = (
    job: Job<EventJob>,
    accountAddress: string,
    referredBy?: string
  ): ResultAsync<any, WorkerOutputError> => {
    const { traceId, type, transactionId, userId } = job.data

    const childLogger = logger.child({
      traceId,
      type,
      transactionId,
      userId,
      method: 'eventWorker.handler'
    })

    const accountAddressModel = AccountAddressModel(childLogger)

    const questHelper = QuestHelper({
      transactionIntent,
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
      transactionIntent,
      traceId,
      referredBy,
      questHelper,
      sendMessage,
      logger: childLogger,
      transactionId,
      referralRewardAction
    })

    switch (type) {
      case EventId.QuestRewardDepositedV2:
      case EventId.QuestRewardDeposited: {
        const questId = job.data.data.questId as string
        return questHelper
          .updateQuestProgressStatus({ questId, status: 'REWARDS_DEPOSITED' })
          .andThen(() =>
            sendMessage(userId, {
              type: 'QuestRewardsDeposited',
              questId,
              traceId
            })
          )
          .map(() => undefined)
      }

      case EventId.QuestRewardClaimedV2:
      case EventId.QuestRewardClaimed: {
        const questId = job.data.data.questId as QuestId
        const rewards = job.data.data.rewards as Reward[]
        const xrdReward = rewards.find((reward) => reward.name === 'xrd')
        const xrdAmount = xrdReward ? parseFloat(xrdReward.amount) : 0

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

        return questHelper
          .updateQuestProgressStatus({ questId, status: 'REWARDS_CLAIMED' })
          .andThen(sendQuestRewardsClaimedMessage)
          .andThen(() => questHelper.handleMailerLiteBasicQuestFinished(questId))
          .andThen(() =>
            referralHelper.handleQuestTogetherXrdClaimed({ questId, xrdAmount, userId })
          )
          .andThen(() => referralHelper.handleQuestTogetherRewards(questId))
      }

      case EventId.DepositHeroBadge: {
        const updateHeroBadge = (questId: string) =>
          transactionIntent.add({
            userId,
            discriminator: `${questId}:QuestCompleted:${userId}`,
            type: 'QuestCompleted',
            questId,
            traceId
          })
        return questHelper
          .completeQuestRequirement({
            questId: 'GetStuff',
            type
          })
          .andThen(() => questHelper.handleAllQuestRequirementCompleted('GetStuff'))
          .andThen(() =>
            ResultAsync.combineWithAllErrors([
              updateHeroBadge('Welcome'),
              updateHeroBadge('WhatIsRadix'),
              updateHeroBadge('SetupWallet')
            ]).mapErr((error) => ({ reason: WorkerError.FailedToUpdateHeroBadge, jsError: error }))
          )
      }

      case EventId.AccountAllowedToForgeHeroBadge:
        return sendMessage(
          userId,
          {
            type: 'HeroBadgeReadyToBeClaimed',
            traceId: job.data.traceId
          },
          childLogger
        )

      case EventId.JettyReceivedClams: {
        return questHelper.handleQuestWithTrackedAccount('TransferTokens', type)
      }

      case EventId.MayaRouterWithdrawEvent: {
        return questHelper.handleQuestWithTrackedAccount('Thorswap', type)
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
        return getGiftBoxKindByResourceAddress(giftBoxResourceAddress).asyncAndThen((giftBoxKind) =>
          transactionIntent.add({
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

        return transactionIntent.add({
          userId,
          discriminator: `${EventId.DepositedElements}:RadGem:${transactionId}`,
          type: 'ElementsDeposited',
          traceId,
          elementsCount
        })
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
