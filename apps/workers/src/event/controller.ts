import { okAsync, errAsync, err, ok, ResultAsync } from 'neverthrow'
import { EventJob, Job } from 'queues'
import { QuestDefinitions, QuestId, Quests } from 'content'
import {
  ColorCodeDescription,
  EventId,
  GatewayApi,
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
import { databaseTransactions } from './helpers/databaseTransactions'
import { WorkerError } from '../_types'
import { MessageHelper } from '../helpers/messageHelper'
import { config } from '../config'
import { TransactionIntentHelper } from '../helpers/transactionIntentHelper'
import { ReferralRewardAction } from '../helpers/referalReward'

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
  referralRewardAction,
  imageModel
}: {
  dbClient: PrismaClient
  AccountAddressModel: AccountAddressModel
  gatewayApi: GatewayApi
  mailerLiteModel: MailerLiteModel
  logger: AppLogger
  sendMessage: MessageHelper
  transactionIntent: TransactionIntentHelper
  referralRewardAction: ReferralRewardAction
  imageModel: ImageModel
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
      referrer: UserByReferralCode,
      count: number
    ): ResultAsync<undefined, { reason: string; jsError?: unknown }> => {
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

      const unlockReward = (tier: 'BronzeLevel' | 'SilverLevel') =>
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

      const setTierInProgress = (tier: 'BronzeLevel' | 'SilverLevel') =>
        updateQuestProgressStatus({
          userId,
          questId: `QuestTogether:${tier}`,
          status: 'IN_PROGRESS'
        })

      const bronzeLevelCompleted = currentReferralsAmount >= requirements.BronzeLevel.threshold
      const silverLevelCompleted = currentReferralsAmount >= requirements.SilverLevel.threshold

      return ResultAsync.combine([
        progress['QuestTogether:BronzeLevel'] === 'NOT_STARTED'
          ? setTierInProgress('BronzeLevel')
          : okAsync(undefined),
        bronzeLevelCompleted && progress['QuestTogether:SilverLevel'] === 'NOT_STARTED'
          ? setTierInProgress('SilverLevel')
          : okAsync(undefined),
        bronzeLevelCompleted && !unlockedRewards['BronzeLevel']
          ? unlockReward('BronzeLevel')
          : okAsync(undefined),
        silverLevelCompleted && !unlockedRewards['SilverLevel']
          ? unlockReward('SilverLevel')
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
        dbClient.completedQuestRequirement.upsert({
          where: {
            questId_userId_requirementId: {
              userId,
              questId,
              requirementId: type
            }
          },
          update: {},
          create: {
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
        .andThen(() => handleAllQuestRequirementCompleted(values))
        .andThen((value) =>
          shouldRemoveTrackedAccountAddressFn(value)
            ? accountAddressModel.deleteTrackedAddress(user.accountAddress!, questId)
            : okAsync(undefined)
        )
    }

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

    const handleQuestTogetherXrdReward = <T extends { id: string }>(
      referringUser: T,
      count: number
    ) =>
      count < QuestTogetherConfig.maxReferrals
        ? transactionIntent.add({
            questId: 'QuestTogether',
            userId: referringUser.id,
            traceId,
            type: 'DepositXrdReward',
            amount: config.referralRewardXrdAmount,
            discriminator: `QuestTogether:${user.id}:${transactionId}`,
            transactionId
          })
        : okAsync(undefined)

    const handleQuestTogetherXrdClaimed = (questId: string, xrdAmount: number) =>
      questId === 'QuestTogether'
        ? referralRewardAction({
            transactionId,
            userId,
            xrdValue: -xrdAmount,
            action: 'DEC'
          })
        : okAsync(undefined)

    const handleQuestTogetherRewards = (questId: string) => {
      const shouldTriggerReferralRewardFlow =
        questId === QuestTogetherConfig.triggerRewardAfterQuest
      const referredBy = user.referredBy

      if (referredBy && shouldTriggerReferralRewardFlow) {
        return triggerRewardsForReferredUser()
          .andThen(() => getUserByReferralCode(referredBy))
          .andThen((referringUser) =>
            transactionIntent
              .countQuestTogetherXrdDeposits(referringUser.id)
              .andThen((count) =>
                ResultAsync.combine([
                  handleQuestTogetherXrdReward(referringUser, count),
                  handleTiersRewards(referringUser, count)
                ])
              )
              .andThen(() =>
                sendMessage(
                  referringUser.id,
                  { type: MessageType.ReferralCompletedBasicQuests, traceId },
                  childLogger
                )
              )
          )
      }

      return okAsync(undefined)
    }

    switch (type) {
      case EventId.QuestRewardDeposited: {
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
          .andThen(() => handleMailerLiteBasicQuestFinished(questId, user))
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
        if (!radGemId) return errAsync({ reason: 'RadgemIdNotFound' })
        return imageModel(logger)
          .getRadGemKeyImageUrl(radGemData.color, radGemData.material)
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
        return completeQuestRequirement('GetStuff').andThen(() =>
          handleAllQuestRequirementCompleted({
            questId: 'GetStuff',
            userId
          }).andThen(() => {
            return ResultAsync.combineWithAllErrors([
              updateHeroBadge('Welcome'),
              updateHeroBadge('WhatIsRadix'),
              updateHeroBadge('SetupWallet')
            ])
          })
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
          user.id,
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
            transactionIntent.add({
              type: 'DepositGiftBoxReward',
              discriminator: `${EventId.GiftBoxOpened}:${job.data.transactionId}`,
              userId: user.id,
              traceId: job.data.traceId,
              giftBoxKind
            })
          )
          .map(() => undefined)
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
        return sendMessage(user.id, {
          type: 'GiftBoxDeposited',
          traceId,
          rewards,
          energyCard
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
