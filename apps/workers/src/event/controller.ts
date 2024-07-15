import { TokenPriceClient } from './../token-price-client'
import { okAsync, errAsync, err, ok, ResultAsync } from 'neverthrow'
import { EventJob, Job } from 'queues'
import { QuestDefinitions, QuestId, Quests } from 'content'
import {
  EventId,
  GatewayApi,
  MailerLiteModel,
  MessageType,
  QuestTogetherConfig,
  UserByReferralCode
} from 'common'
import { AppLogger, AccountAddressModel } from 'common'
import { PrismaClient, QuestStatus, User } from 'database'
import { databaseTransactions } from './helpers/databaseTransactions'
import { WorkerError } from '../_types'
import { MessageHelper } from '../helpers/messageHelper'
import { config } from '../config'
import { TransactionIntentHelper } from '../helpers/transactionIntentHelper'
import { ReferralRewardAction } from '../helpers/referalReward'
import { getUserById } from '../helpers/getUserById'

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
  gatewayApi,
  AccountAddressModel,
  mailerLiteModel,
  sendMessage,
  transactionIntent,
  referralRewardAction
}: {
  dbClient: PrismaClient
  AccountAddressModel: AccountAddressModel
  gatewayApi: GatewayApi
  mailerLiteModel: MailerLiteModel
  logger: AppLogger
  sendMessage: MessageHelper
  transactionIntent: TransactionIntentHelper
  referralRewardAction: ReferralRewardAction
}) => {
  const handler = (job: Job<EventJob>, user: UserExtended) => {
    const { traceId, type, transactionId, userId } = job.data

    const childLogger = logger.child({
      traceId,
      type,
      transactionId,
      userId,
      method: 'eventWorker.handler'
    })

    const accountAddressModel = AccountAddressModel(childLogger)

    const dbTransactions = databaseTransactions({ dbClient, logger: childLogger, transactionId })

    const getCompletedRequirements = (userId: string, questId: QuestId) =>
      ResultAsync.fromPromise(
        dbClient.completedQuestRequirement.findMany({
          where: {
            userId,
            questId
          }
        }),
        (error) => ({ reason: 'FailedToFindCompletedRequirements', jsError: error })
      )

    const hasCompletedAllQuestRequirements = (questId: keyof Quests, userId: string) => {
      const questDefinition = QuestDefinitions()[questId]
      const requirements = Object.keys(questDefinition.requirements)

      return getCompletedRequirements(userId, questId).map((completedRequirements) => ({
        isAllCompleted: completedRequirements.length === requirements.length,
        completedRequirements
      }))
    }

    const updateQuestProgressStatus = ({
      userId,
      questId,
      status
    }: {
      userId: string
      questId: string
      status: QuestStatus
    }) =>
      ResultAsync.fromPromise(
        dbClient.questProgress.upsert({
          where: {
            questId_userId: {
              userId,
              questId
            }
          },
          create: {
            userId,
            questId,
            status
          },
          update: {
            status
          }
        }),
        (error) => ({ reason: 'FailedToUpdateQuestProgress', jsError: error })
      )

    const addCompletedQuestRequirement = ({
      questId,
      userId,
      requirementId
    }: {
      questId: string
      userId: string
      requirementId: string
    }) =>
      ResultAsync.fromPromise(
        dbClient.completedQuestRequirement.upsert({
          where: {
            questId_userId_requirementId: {
              userId,
              questId,
              requirementId
            }
          },
          create: {
            userId,
            questId,
            requirementId
          },
          update: {}
        }),
        (error) => ({ reason: 'FailedToAddCompletedRequirement', jsError: error })
      )

    const handleTiersRewards = (
      referrer: UserByReferralCode
    ): ResultAsync<undefined, { reason: string; jsError?: unknown }> => {
      const currentReferralsAmount = referrer.referredUsers.length
      const userId = referrer.id
      const requirements = QuestDefinitions()['QuestTogether'].requirements
      const unlockedRewards = referrer.completedQuestRequirements
        .filter((req) => req.questId === 'QuestTogether')
        .reduce<Record<string, boolean>>((acc, requirement) => {
          acc[requirement.requirementId] = true
          return acc
        }, {})

      const unlockReward = (tier: 'BronzeLevel' | 'SilverLevel' | 'GoldLevel') =>
        addCompletedQuestRequirement({
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

      const shouldUnlockBronzeLevel =
        currentReferralsAmount === requirements.BronzeLevel.threshold &&
        !unlockedRewards.BronzeLevel

      const shouldUnlockSilverLevel =
        currentReferralsAmount === requirements.SilverLevel.threshold &&
        !unlockedRewards.SilverLevel

      const shouldUnlockGoldLevel =
        currentReferralsAmount === requirements.GoldLevel.threshold && !unlockedRewards.GoldLevel

      if (shouldUnlockBronzeLevel) {
        return unlockReward('BronzeLevel')
          .andThen(() =>
            updateQuestProgressStatus({
              userId,
              questId: `QuestTogether:SilverLevel`,
              status: 'IN_PROGRESS'
            })
          )
          .map(() => undefined)
      } else if (shouldUnlockSilverLevel) {
        return unlockReward('SilverLevel')
          .andThen(() =>
            updateQuestProgressStatus({
              userId,
              questId: `QuestTogether:GoldLevel`,
              status: 'IN_PROGRESS'
            })
          )
          .map(() => undefined)
      } else if (shouldUnlockGoldLevel) {
        return unlockReward('GoldLevel').map(() => undefined)
      }

      return okAsync(undefined)
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

    const handleReferrerRewards = (user: UserByReferralCode) => {
      const questProgressResult = user.questProgress.some(
        (quest) => quest.questId === 'QuestTogether:BronzeLevel'
      )
        ? okAsync(undefined)
        : updateQuestProgressStatus({
            userId: user.id,
            questId: 'QuestTogether:BronzeLevel',
            status: 'IN_PROGRESS'
          }).map(() => undefined)

      return questProgressResult
        .andThen(() =>
          transactionIntent.add({
            questId: 'QuestTogether',
            userId: user.id,
            traceId,
            type: 'DepositXrdReward',
            amount: config.referralRewardXrdAmount,
            discriminator: `QuestTogether:${user.id}:${transactionId}`,
            transactionId
          })
        )
        .andThen(() => handleTiersRewards(user))
        .andThen(() =>
          sendMessage(user.id, { type: MessageType.ReferralCompletedBasicQuests, traceId })
        )
    }

    const handleAllQuestRequirementCompleted = ({
      questId,
      userId
    }: {
      questId: QuestId
      userId: string
    }) =>
      hasCompletedAllQuestRequirements(questId, userId).andThen((value) =>
        value.isAllCompleted
          ? transactionIntent
              .add({
                userId,
                discriminator: `${questId}:DepositReward:${userId}`,
                type: 'DepositReward',
                traceId,
                questId
              })
              .andThen(() =>
                sendMessage(userId, { type: 'QuestRequirementsCompleted', questId, traceId })
              )
              .map(() => value)
          : okAsync(value)
      )

    const handleMailerLiteBasicQuestFinished = (
      questId: string,
      user: User & { email: { email: string; newsletter: boolean } }
    ) => {
      return questId === 'TransferTokens' && user?.email?.email
        ? mailerLiteModel(logger).addOrUpdate(user.email.email, { hasFinishedBasicQuests: true })
        : okAsync(undefined)
    }

    const completeQuestRequirement = (questId: QuestId) =>
      ResultAsync.fromPromise(
        dbClient.completedQuestRequirement.create({
          data: {
            userId,
            questId,
            requirementId: type
          }
        }),
        (error) => ({ reason: 'FailedToCompleteQuestRequirement', jsError: error })
      )

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
    ) => {
      const values = {
        questId,
        requirementId: type,
        userId,
        transactionId,
        traceId
      }

      return completeQuestRequirement(questId)
        .andThen(() =>
          sendMessage(userId, {
            type: 'QuestRequirementCompleted',
            requirementId: values.requirementId,
            questId,
            traceId
          })
        )
        .andThen(() => handleAllQuestRequirementCompleted(values))
        .andThen((value) =>
          shouldRemoveTrackedAccountAddressFn(value)
            ? accountAddressModel.deleteTrackedAddress(user.accountAddress!, questId)
            : okAsync(undefined)
        )
    }

    switch (type) {
      case EventId.QuestRewardDeposited: {
        const rewards = job.data.data.rewards as Reward[]
        const xrdReward = rewards.find((reward) => reward.name === 'xrd')
        const xrdAmount = xrdReward ? parseFloat(xrdReward.amount) : 0
        const questId = job.data.data.questId as string
        return dbTransactions
          .rewardsDeposited({
            userId,
            questId
          })
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

        return updateQuestProgressStatus({ questId, userId, status: 'REWARDS_CLAIMED' })
          .andThen(() =>
            sendMessage(userId, {
              type: 'QuestRewardsClaimed',
              questId,
              traceId
            })
          )
          .andThen(() => handleMailerLiteBasicQuestFinished(questId, user))
          .andThen(() => {
            const shouldTriggerReferralRewardFlow =
              questId === QuestTogetherConfig.triggerRewardAfterQuest

            if (user.referredBy && shouldTriggerReferralRewardFlow)
              return getUserByReferralCode(user.referredBy).andThen((referringUser) => {
                const triggerRewardsForReferredUser = () =>
                  addCompletedQuestRequirement({
                    questId: 'JoinFriend',
                    userId: user.id,
                    requirementId: 'CompleteBasicQuests'
                  }).andThen(() =>
                    handleAllQuestRequirementCompleted({
                      questId: 'JoinFriend',
                      userId: user.id
                    })
                  )

                return referringUser.referredUsers.length < QuestTogetherConfig.maxReferrals
                  ? handleReferrerRewards(referringUser).andThen(() =>
                      triggerRewardsForReferredUser()
                    )
                  : triggerRewardsForReferredUser()
              })
            else if (questId === 'QuestTogether')
              return referralRewardAction({
                transactionId,
                userId,
                xrdValue: -xrdAmount,
                action: 'DEC'
              })

            return okAsync(undefined)
          })
          .map(() => undefined)
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
        if (!radGemId) return errAsync({ reason: 'RadgemIdNotFound' })
        return transactionIntent
          .add({
            discriminator: `CombinedElementsAddRadgemImage:${radGemId}`,
            userId,
            type: 'CombinedElementsAddRadgemImage',
            radgemId: radGemId,
            traceId
          })
          .andThen(() => sendMessage(userId!, { type: 'CombineElementsMintRadgem', traceId }))
      }
      case EventId.CombineElementsAddedRadgemImage:
        return sendMessage(userId, { type: 'CombineElementsAddRadgemImage', traceId })
      case EventId.DepositHeroBadge: {
        return completeQuestRequirement('GetStuff').andThen(() =>
          handleAllQuestRequirementCompleted({
            questId: 'GetStuff',
            userId
          })
        )
      }

      case EventId.CombineElementsClaimed: {
        return gatewayApi
          .hasAtLeastTwoRadgems(user.accountAddress!)
          .andThen((hasAtLeastTwoRadgems) =>
            hasAtLeastTwoRadgems
              ? addCompletedQuestRequirement({
                  questId: 'CreatingRadMorphs',
                  userId,
                  requirementId: 'MintRadgems'
                })
                  .andThen(() =>
                    sendMessage(userId, {
                      type: 'QuestRequirementCompleted',
                      questId: 'CreatingRadMorphs',
                      requirementId: 'MintRadgems',
                      traceId
                    })
                  )
                  .andThen(() =>
                    handleAllQuestRequirementCompleted({ questId: 'CreatingRadMorphs', userId })
                  )
              : okAsync(undefined)
          )
      }

      case EventId.AccountAllowedToForgeHeroBadge:
        return sendMessage(user.id, {
          type: 'HeroBadgeReadyToBeClaimed',
          traceId: job.data.traceId
        })

      case EventId.JettyReceivedClams: {
        return handleQuestWithTrackedAccount('TransferTokens')
      }
      case EventId.MayaRouterWithdrawEvent: {
        return handleQuestWithTrackedAccount('Thorswap')
      }
      case EventId.InstapassBadgeDeposited: {
        return handleQuestWithTrackedAccount('Instapass')
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
              ([EventId.JettySwap, EventId.LettySwap] as string[]).includes(requirementId)
            ).length === 2
        )
      }

      case EventId.GiftBoxOpened: {
        const giftBoxResourceAddress = job.data.data.giftBoxResourceAddress as string
        return getGiftBoxKindByResourceAddress(giftBoxResourceAddress)
          .asyncAndThen((giftBoxKind) =>
            transactionIntent
              .add({
                type: 'DepositGiftBoxReward',
                discriminator: `${EventId.GiftBoxOpened}:${job.data.transactionId}`,
                userId: user.id,
                traceId: job.data.traceId,
                giftBoxKind
              })
              .andThen(() =>
                giftBoxKind === 'Starter'
                  ? addCompletedQuestRequirement({
                      userId: user.id,
                      requirementId: EventId.GiftBoxOpened,
                      questId: 'CreatingRadMorphs'
                    }).andThen(() =>
                      sendMessage(userId, {
                        type: 'QuestRequirementCompleted',
                        questId: 'CreatingRadMorphs',
                        requirementId: 'GiftBoxOpened',
                        traceId
                      })
                    )
                  : okAsync(undefined)
              )
          )
          .map(() => undefined)
      }

      case EventId.GiftBoxDeposited: {
        return sendMessage(user.id, {
          type: 'GiftBoxDeposited',
          traceId
        }).map(() => undefined)
      }

      default:
        childLogger.error({
          message: 'Unhandled Event'
        })
        return errAsync({ reason: 'UnhandledEvent' })
    }
  }

  return { handler }
}
