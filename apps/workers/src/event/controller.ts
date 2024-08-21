import { okAsync, errAsync, err, ok, ResultAsync } from 'neverthrow'
import { EventJob, Job } from 'queues'
import { QuestDefinitions, QuestId, Quests } from 'content'
import {
  ColorCodeDescription,
  EventId,
  ImageModel,
  MailerLiteModel,
  MessageType,
  MorphCardMintedEventOutput,
  QuestTogetherConfig,
  ShaderCodeDescription,
  UserByReferralCode
} from 'common'
import { AppLogger, AccountAddressModel } from 'common'
import { PrismaClient, QuestStatus, User } from 'database'
import { WorkerError, WorkerOutputError } from '../_types'
import { MessageHelper } from '../helpers/messageHelper'
import { config } from '../config'
import { TransactionIntentHelper } from '../helpers/transactionIntentHelper'
import { ReferralRewardAction } from '../helpers/referalReward'
import {
  addCompletedQuestRequirement,
  completeQuestRequirement,
  hasCompletedAllQuestRequirements,
  updateQuestProgressStatus
} from '../helpers/quest'
import { getUserEmail } from '../helpers/getUserEmail'

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
  referralRewardAction,
  imageModel
}: {
  dbClient: PrismaClient
  AccountAddressModel: AccountAddressModel
  mailerLiteModel: MailerLiteModel
  logger: AppLogger
  sendMessage: MessageHelper
  transactionIntent: TransactionIntentHelper
  referralRewardAction: ReferralRewardAction
  imageModel: ImageModel
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

    const handleTiersRewards = (
      referrer: UserByReferralCode,
      count: number
    ): ResultAsync<undefined, WorkerOutputError> => {
      const currentReferralsAmount = count + 1
      const userId = referrer.id
      const requirements = QuestDefinitions()['QuestTogether'].requirements
      const unlockedRewards = referrer.completedQuestRequirements
        .filter((req) => req.questId === 'QuestTogether')
        .reduce<Record<string, boolean>>((acc, requirement) => {
          acc[requirement.requirementId] = true
          return acc
        }, {})
      const progress = referrer.questProgress
        .filter((progress) => progress.questId.includes('QuestTogether'))
        .reduce<Record<string, QuestStatus | 'NOT_STARTED'>>(
          (acc, progress) => {
            acc[progress.questId] = progress.status
            return acc
          },
          {
            'QuestTogether:BronzeLevel': 'NOT_STARTED',
            'QuestTogether:SilverLevel': 'NOT_STARTED',
            'QuestTogether:GoldLevel': 'NOT_STARTED'
          }
        )

      const unlockReward = (tier: 'BronzeLevel' | 'SilverLevel' | 'GoldLevel') =>
        addCompletedQuestRequirement(dbClient)({
          questId: 'QuestTogether',
          userId,
          requirementId: tier
        }).andThen(() =>
          transactionIntent.add({
            userId,
            discriminator: `QuestTogether:${tier}:${userId}`,
            type: 'DepositPartialReward',
            requirement: tier,
            traceId,
            questId: 'QuestTogether'
          })
        )

      const setTierInProgress = (tier: 'BronzeLevel' | 'SilverLevel' | 'GoldLevel') =>
        updateQuestProgressStatus({
          userId,
          questId: `QuestTogether:${tier}`,
          status: 'IN_PROGRESS'
        })

      const bronzeLevelCompleted = currentReferralsAmount >= requirements.BronzeLevel.threshold
      const silverLevelCompleted = currentReferralsAmount >= requirements.SilverLevel.threshold
      const goldLevelCompleted = currentReferralsAmount >= requirements.GoldLevel.threshold

      return ResultAsync.combine([
        progress['QuestTogether:BronzeLevel'] === 'NOT_STARTED'
          ? setTierInProgress('BronzeLevel')
          : okAsync(undefined),
        bronzeLevelCompleted && progress['QuestTogether:SilverLevel'] === 'NOT_STARTED'
          ? setTierInProgress('SilverLevel')
          : okAsync(undefined),
        silverLevelCompleted && progress['QuestTogether:GoldLevel'] === 'NOT_STARTED'
          ? setTierInProgress('GoldLevel')
          : okAsync(undefined),
        bronzeLevelCompleted && !unlockedRewards['BronzeLevel']
          ? unlockReward('BronzeLevel')
          : okAsync(undefined),
        silverLevelCompleted && !unlockedRewards['SilverLevel']
          ? unlockReward('SilverLevel')
          : okAsync(undefined),
        goldLevelCompleted && !unlockedRewards['GoldLevel']
          ? unlockReward('GoldLevel')
          : okAsync(undefined)
      ]).map(() => undefined)
    }

    const getUserByReferralCode = (referralCode: string) =>
      ResultAsync.fromPromise(
        dbClient.user.findUnique({
          where: { referralCode },
          include: {
            referredUsers: true,
            questProgress: true,
            completedQuestRequirements: true
          }
        }),
        (error) => ({ reason: WorkerError.FailedToGetUserFromDb, jsError: error })
      ).andThen((user) => (user ? ok(user) : err({ reason: WorkerError.UserNotFound })))

    const depositQuestReward = (questId: QuestId) =>
      transactionIntent.add({
        userId,
        discriminator: `${questId}:DepositReward:${userId}`,
        type: 'DepositReward',
        traceId,
        questId
      })

    const handleAllQuestRequirementCompleted = (questId: QuestId) =>
      hasCompletedAllQuestRequirements(questId, userId, dbClient).andThen((value) => {
        if (value.isAllCompleted)
          return depositQuestReward(questId).andThen(() =>
            sendMessage(userId, { type: 'QuestRequirementsCompleted', questId, traceId }).map(
              () => value
            )
          )

        return okAsync(value)
      })

    const handleMailerLiteBasicQuestFinished = (questId: string) => {
      if (questId !== 'TransferTokens') return okAsync(undefined)

      return getUserEmail(userId, dbClient).andThen((user) => {
        if (!user) return okAsync(undefined)

        return mailerLiteModel(logger).addOrUpdate(user.email, { hasFinishedBasicQuests: true })
      })
    }

    const handleQuestWithTrackedAccount = (
      questId: QuestId,
      shouldRemoveTrackedAccountAddressFn: (value: {
        isAllCompleted: boolean
        completedRequirements: {
          questId: string
          userId: string
          requirementId: string
          createdAt: Date
        }[]
      }) => boolean = () => true
    ): ResultAsync<undefined, any> => {
      const values = {
        questId,
        requirementId: type,
        userId,
        transactionId,
        traceId
      }

      return completeQuestRequirement(dbClient)({ questId, userId, type })
        .andThen(() =>
          sendMessage(
            userId,
            {
              type: 'QuestRequirementCompleted',
              requirementId: values.requirementId,
              questId,
              traceId
            },
            childLogger
          )
        )
        .andThen(() => handleAllQuestRequirementCompleted(questId))
        .andThen((value) =>
          shouldRemoveTrackedAccountAddressFn(value)
            ? accountAddressModel.deleteTrackedAddress(accountAddress, questId).mapErr((error) => ({
                reason: WorkerError.FailedToDeleteTrackedAccountAddress,
                jsError: error
              }))
            : okAsync(undefined)
        )
        .map(() => undefined)
    }

    const triggerRewardsForReferredUser = () =>
      addCompletedQuestRequirement(dbClient)({
        questId: 'JoinFriend',
        userId,
        requirementId: 'CompleteBasicQuests'
      }).andThen(() => handleAllQuestRequirementCompleted('JoinFriend'))

    const handleQuestTogetherXrdClaimed = (questId: string, xrdAmount: number) =>
      questId === 'QuestTogether'
        ? referralRewardAction({
            transactionId,
            userId,
            xrdValue: -xrdAmount,
            action: 'DEC'
          })
        : okAsync(undefined)

    const handleQuestTogetherRewards = (questId: string): ResultAsync<any, WorkerOutputError> => {
      const shouldTriggerReferralRewardFlow =
        questId === QuestTogetherConfig.triggerRewardAfterQuest

      if (referredBy && shouldTriggerReferralRewardFlow) {
        return triggerRewardsForReferredUser()
          .andThen(() => getUserByReferralCode(referredBy))
          .andThen((referringUser) =>
            transactionIntent
              .countQuestTogetherReferrals(referringUser.id)
              .andThen((count) =>
                handleTiersRewards(referringUser, count).andThen(() =>
                  sendMessage(
                    referringUser.id,
                    { type: MessageType.ReferralCompletedBasicQuests, traceId },
                    childLogger
                  )
                )
              )
          )
          .map(() => undefined)
      }

      return okAsync(undefined)
    }

    switch (type) {
      case EventId.QuestRewardDeposited: {
        const questId = job.data.data.questId as string
        return updateQuestProgressStatus(dbClient)({ questId, userId, status: 'REWARDS_DEPOSITED' })
          .andThen(() =>
            sendMessage(userId, {
              type: 'QuestRewardsDeposited',
              questId,
              traceId
            })
          )
          .map(() => undefined)
      }

      case EventId.QuestRewardClaimed: {
        const questId = job.data.data.questId as QuestId
        const rewards = job.data.data.rewards as Reward[]
        const xrdReward = rewards.find((reward) => reward.name === 'xrd')
        const xrdAmount = xrdReward ? parseFloat(xrdReward.amount) : 0

        return updateQuestProgressStatus(dbClient)({ questId, userId, status: 'REWARDS_CLAIMED' })
          .andThen(() =>
            sendMessage(
              userId,
              {
                type: 'QuestRewardsClaimed',
                questId,
                traceId
              },
              childLogger
            )
          )
          .andThen(() => handleMailerLiteBasicQuestFinished(questId))
          .andThen(() => handleQuestTogetherXrdClaimed(questId, xrdAmount))
          .andThen(() => handleQuestTogetherRewards(questId))
      }

      case EventId.CombineElementsDeposited:
        return transactionIntent.add({
          discriminator: `CombinedElementsMintRadgem:${traceId}`,
          userId,
          type: 'CombinedElementsMintRadgem',
          traceId
        })

      case EventId.CombineElementsMintedRadgem: {
        const radGemId = job.data.data.radgemLocalId as string
        const radGemData = job.data.data.radgemData as {
          color: ColorCodeDescription
          material: ShaderCodeDescription
        }
        return imageModel(logger)
          .getRadGemKeyImageUrl(radGemData.color, radGemData.material)
          .mapErr((error) => ({ reason: WorkerError.FailedToGetImageUrl, jsError: error }))
          .andThen((keyImageUrl) =>
            transactionIntent
              .add({
                discriminator: `CombinedElementsAddRadgemImage:${radGemId}`,
                userId,
                type: 'CombinedElementsAddRadgemImage',
                radgemId: radGemId,
                traceId,
                keyImageUrl
              })
              .andThen(() =>
                sendMessage(userId!, { type: 'CombineElementsMintRadgem', traceId }, childLogger)
              )
          )
      }
      case EventId.CombineElementsAddedRadgemImage:
        return sendMessage(userId, { type: 'CombineElementsAddRadgemImage', traceId }, childLogger)

      case EventId.DepositHeroBadge: {
        const updateHeroBadge = (questId: string) =>
          transactionIntent.add({
            userId,
            discriminator: `${questId}:QuestCompleted:${userId}`,
            type: 'QuestCompleted',
            questId,
            traceId
          })
        return completeQuestRequirement(dbClient)({
          questId: 'GetStuff',
          userId,
          type
        })
          .andThen(() => handleAllQuestRequirementCompleted('GetStuff'))
          .andThen(() =>
            ResultAsync.combineWithAllErrors([
              updateHeroBadge('Welcome'),
              updateHeroBadge('WhatIsRadix'),
              updateHeroBadge('SetupWallet')
            ]).mapErr((error) => ({ reason: WorkerError.FailedToUpdateHeroBadge, jsError: error }))
          )
      }

      case EventId.CombineElementsClaimed: {
        return sendMessage(
          userId,
          {
            type: 'CombineElementsClaimed',
            traceId
          },
          childLogger
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
        return handleQuestWithTrackedAccount('TransferTokens')
      }
      case EventId.MayaRouterWithdrawEvent: {
        return handleQuestWithTrackedAccount('Thorswap')
      }

      case EventId.XrdStaked: {
        return handleQuestWithTrackedAccount('NetworkStaking')
      }

      case EventId.JettySwap:
      case EventId.LettySwap: {
        return handleQuestWithTrackedAccount(
          'DEXSwaps',
          ({ completedRequirements }) =>
            completedRequirements.filter(({ requirementId }) =>
              ([EventId.JettySwap, EventId.LettySwap] as string[]).includes(
                requirementId as EventId
              )
            ).length === 2
        )
      }

      case EventId.GiftBoxOpened: {
        const giftBoxResourceAddress = job.data.data.giftBoxResourceAddress as string
        return getGiftBoxKindByResourceAddress(giftBoxResourceAddress).asyncAndThen((giftBoxKind) =>
          transactionIntent.add({
            type: 'DepositGiftBoxReward',
            discriminator: `${EventId.GiftBoxOpened}:${job.data.transactionId}`,
            userId,
            traceId: job.data.traceId,
            giftBoxKind
          })
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

      case EventId.GiftBoxDeposited: {
        const rewards = job.data.data.rewards as {
          fungibles: {
            amount: number
            resourceAddress: string
          }[]
          nonFungibles: {
            localIds: string[]
            resourceAddress: string
          }[]
        }
        const energyCard = job.data.data.energyCard as MorphCardMintedEventOutput
        return sendMessage(userId, {
          type: 'GiftBoxDeposited',
          traceId,
          rewards,
          energyCard
        })
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
