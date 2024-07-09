import { TokenPriceClient } from './../token-price-client'
import { okAsync, errAsync, err, ok, ResultAsync, Result } from 'neverthrow'
import { EventJob, Job } from 'queues'
import { QuestDefinitions, QuestId, Quests } from 'content'
import {
  EventId,
  MailerLiteModel,
  MessageType,
  QuestTogetherConfig,
  UserByReferralCode,
  getAccountFromMayaRouterWithdrawEvent,
  getValuesFromEvent
} from 'common'
import { AppLogger, AccountAddressModel } from 'common'
import { PrismaClient, QuestStatus, User } from 'database'
import {
  getAccountAddressFromAccountAddedEvent,
  getUserIdFromDepositHeroBadgeEvent
} from './helpers/getUserIdFromDepositHeroBadgeEvent'
import { getDataFromQuestRewardsEvent } from './helpers/getDataFromQuestRewardsEvent'
import { databaseTransactions } from './helpers/databaseTransactions'
import { getAccountAddressFromWithdrawEvent } from './helpers/getAccountAddressFromWidthdrawEvent'
import { getUserIdFromCombineElementsDepositedEvent } from './helpers/getUserIdFromCombineElementsDepositedEvent'
import { DbTransactionBuilder } from '../helpers/dbTransactionBuilder'
import { getDetailsFromCombineElementsMintedRadgemEvent } from './helpers/getDetailsFromCombineElementsMintedRadgemEvent'
import { WorkerError } from '../_types'
import { getUserById } from '../helpers/getUserById'
import { MessageHelper } from '../helpers/messageHelper'
import { getUserIdFromRadgemImageEvent } from './helpers/getUserIdFromRadgemImageEvent'
import { config } from '../config'
import { TransactionIntentHelper } from '../helpers/transactionIntentHelper'
import { ReferralRewardAction } from '../helpers/referalReward'

type EventEmitter = {
  entity: {
    entity_address: string
    entity_type: string
    is_global: boolean
  }
  type: string
  object_module_id: string
}

type GiftBoxKind = keyof typeof config.radQuest.resources.giftBox

const giftBoxMap = Object.entries(config.radQuest.resources.giftBox).reduce<
  Record<string, GiftBoxKind>
>((acc, [key, value]) => ({ ...acc, [value]: key as GiftBoxKind }), {})

const getGiftBoxKindByResourceAddress = (resourceAddress: string) => {
  const giftBoxKind = giftBoxMap[resourceAddress]
  if (!giftBoxKind) err({ reason: 'GiftBoxKindNotFound' })
  return ok(giftBoxKind)
}

export type EventWorkerController = ReturnType<typeof EventWorkerController>
export const EventWorkerController = ({
  dbClient,
  tokenPriceClient,
  logger,
  AccountAddressModel,
  mailerLiteModel,
  sendMessage,
  transactionIntent,
  referralRewardAction
}: {
  dbClient: PrismaClient
  AccountAddressModel: AccountAddressModel
  tokenPriceClient: TokenPriceClient
  mailerLiteModel: MailerLiteModel
  logger: AppLogger
  sendMessage: MessageHelper
  transactionIntent: TransactionIntentHelper
  referralRewardAction: ReferralRewardAction
}) => {
  const handler = (job: Job<EventJob>) => {
    const { traceId, type, transactionId } = job.data

    const childLogger = logger.child({
      traceId,
      type,
      transactionId,
      method: 'eventWorker.handler'
    })

    const accountAddressModel = AccountAddressModel(childLogger)

    const dbTransactions = databaseTransactions({ dbClient, logger: childLogger, transactionId })
    const dbTransactionBuilder = DbTransactionBuilder({ dbClient, tokenPriceClient })

    const getCompletedRequirements = (userId: string, questId: string) =>
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

    const getUserByAccountAddress = (accountAddress: string) =>
      ResultAsync.fromPromise(
        dbClient.user.findFirst({
          where: { accountAddress }
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

    const handelCombineElementsDepositedEvent = () => {
      const userId = getUserIdFromCombineElementsDepositedEvent(
        job.data.relevantEvents.DepositedEvent
      )

      return getUserById(userId!, dbClient).andThen(() =>
        transactionIntent.add({
          discriminator: `CombinedElementsMintRadgem:${traceId}`,
          userId,
          type: 'CombinedElementsMintRadgem',
          traceId
        })
      )
    }

    const handelCombineElementsMintedRadgemEvent = () => {
      const { userId, radgemId } = getDetailsFromCombineElementsMintedRadgemEvent(
        job.data.relevantEvents.MintedRadgemEvent
      )

      return getUserById(userId, dbClient).andThen(() =>
        transactionIntent
          .add({
            discriminator: `CombinedElementsAddRadgemImage:${radgemId}`,
            userId: userId!,
            type: 'CombinedElementsAddRadgemImage',
            radgemId: radgemId!,
            traceId
          })
          .andThen(() => sendMessage(userId!, { type: 'CombineElementsMintRadgem', traceId }))
      )
    }

    const handleAddedRadgemImage = () => {
      const userId = getUserIdFromRadgemImageEvent(job.data.relevantEvents.AddedRadgemImageEvent)
        .split('<')[1]
        .split('>')[0]

      return getUserById(userId, dbClient).andThen(() =>
        sendMessage(userId, { type: 'CombineElementsAddRadgemImage', traceId })
      )
    }

    const updateMailerLiteFields = (
      user: User & { email: { email: string; newsletter: boolean } }
    ) => {
      if (!user.email.newsletter) {
        return okAsync(undefined)
      }

      return mailerLiteModel(logger).addOrUpdate(user.email.email, { hasFinishedBasicQuests: true })
    }

    const handleQuestWithTrackedAccount = (
      maybeAccountAddress: string | undefined,
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
      const accountAddressResult = maybeAccountAddress
        ? ok(maybeAccountAddress)
        : err({ reason: 'AccountAddressNotFound' })

      return accountAddressResult.asyncAndThen((accountAddress) =>
        accountAddressModel
          .getTrackedAddressUserId(accountAddress, questId)
          .andThen((userId) => (userId ? ok(userId) : err({ reason: 'UserIdNotFound' })))
          .map((userId) => ({
            questId,
            requirementId: type,
            userId,
            transactionId,
            traceId
          }))
          .andThen((questValues) =>
            dbTransactionBuilder.helpers
              .questRequirementCompleted(questValues)
              .exec()
              .andThen(() =>
                sendMessage(questValues.userId, {
                  type: 'QuestRequirementCompleted',
                  requirementId: questValues.requirementId,
                  questId,
                  traceId
                })
              )
              .andThen(() => handleAllQuestRequirementCompleted(questValues))
          )
          .andThen((value) =>
            shouldRemoveTrackedAccountAddressFn(value)
              ? accountAddressModel.deleteTrackedAddress(accountAddress, questId)
              : okAsync(undefined)
          )
      )
    }

    switch (type) {
      case EventId.QuestRewardDeposited:
        return getDataFromQuestRewardsEvent(job.data.relevantEvents.RewardDepositedEvent)
          .asyncAndThen(({ userId, questId }) =>
            getUserById(userId, dbClient)
              .andThen(() =>
                dbTransactions.rewardsDeposited({
                  userId,
                  questId
                })
              )
              .andThen(() =>
                sendMessage(userId, {
                  type: 'QuestRewardsDeposited',
                  questId,
                  traceId
                })
              )
          )
          .map(() => undefined)

      case EventId.QuestRewardClaimed:
        return getDataFromQuestRewardsEvent(job.data.relevantEvents.RewardClaimedEvent)
          .asyncAndThen(({ userId, questId, xrdAmount }) =>
            getUserById(userId, dbClient, { email: true }).andThen((user) =>
              dbTransactions
                .rewardsClaimed({ userId: user.id, questId })
                .andThen(() =>
                  sendMessage(userId, {
                    type: 'QuestRewardsClaimed',
                    questId,
                    traceId
                  })
                )
                .andThen(() => {
                  const shouldTriggerReferralRewardFlow =
                    questId === QuestTogetherConfig.triggerRewardAfterQuest

                  if (user.referredBy && shouldTriggerReferralRewardFlow)
                    return getUserByReferralCode(user.referredBy)
                      .andThen(handleReferrerRewards)
                      .andThen(() =>
                        updateMailerLiteFields(
                          user as User & { email: { email: string; newsletter: boolean } }
                        )
                      )
                  else if (questId === 'QuestTogether')
                    return referralRewardAction({
                      transactionId,
                      userId,
                      xrdValue: -xrdAmount,
                      action: 'DEC'
                    })

                  return okAsync(undefined)
                })
            )
          )
          .map(() => undefined)

      case EventId.CombineElementsDeposited:
        return handelCombineElementsDepositedEvent()
      case EventId.CombineElementsMintedRadgem:
        return handelCombineElementsMintedRadgemEvent()
      case EventId.CombineElementsAddedRadgemImage:
        return handleAddedRadgemImage()
      case EventId.DepositHeroBadge:
        return getUserIdFromDepositHeroBadgeEvent(
          job.data.relevantEvents.HeroBadgeDeposited
        ).asyncAndThen((userId) =>
          getUserById(userId, dbClient)
            .map(() => ({
              questId: 'GetStuff' as QuestId,
              requirementId: type,
              userId,
              transactionId,
              traceId
            }))
            .andThen((questValues) =>
              dbTransactionBuilder.helpers
                .questRequirementCompleted(questValues)
                .exec()
                .andThen(() => handleAllQuestRequirementCompleted(questValues))
            )
        )
      case EventId.AccountAllowedToForgeHeroBadge:
        return getAccountAddressFromAccountAddedEvent(
          job.data.relevantEvents.AccountAddedEvent
        ).asyncAndThen((accountAddress) =>
          getUserByAccountAddress(accountAddress).andThen((user) =>
            sendMessage(user.id, {
              type: 'HeroBadgeReadyToBeClaimed',
              traceId: job.data.traceId
            })
          )
        )

      case EventId.JettyReceivedClams: {
        return getAccountAddressFromWithdrawEvent(job.data.relevantEvents.WithdrawEvent)
          .asyncAndThen(getUserByAccountAddress)
          .andThen((user) => {
            const values = {
              questId: 'TransferTokens' as QuestId,
              requirementId: type,
              userId: user.id,
              transactionId
            }
            return dbTransactionBuilder.helpers
              .questRequirementCompleted(values)
              .exec()
              .andThen(() =>
                sendMessage(user.id, {
                  type: 'QuestRequirementCompleted',
                  questId: 'TransferTokens',
                  requirementId: type,
                  traceId
                })
              )
              .andThen(() => handleAllQuestRequirementCompleted(values))
          })
      }
      case EventId.MayaRouterWithdrawEvent: {
        const maybeAccountAddress = getAccountFromMayaRouterWithdrawEvent(
          job.data.relevantEvents.MayaRouterWithdrawEvent
        )

        return handleQuestWithTrackedAccount(maybeAccountAddress, 'Thorswap')
      }
      case EventId.InstapassBadgeDeposited: {
        const maybeAccountAddress = (
          job.data.relevantEvents['DepositedEvent'].emitter as EventEmitter
        ).entity.entity_address

        return handleQuestWithTrackedAccount(maybeAccountAddress, 'Instapass')
      }

      case EventId.XrdStaked: {
        const maybeAccountAddress: string | undefined = (
          job.data.relevantEvents['WithdrawEvent'].emitter as any
        ).entity.entity_address

        return handleQuestWithTrackedAccount(maybeAccountAddress, 'NetworkStaking')
      }

      case EventId.JettySwap:
      case EventId.LettySwap: {
        const maybeAccountAddress: string | undefined = (
          job.data.relevantEvents['WithdrawEvent'].emitter as any
        ).entity.entity_address

        return handleQuestWithTrackedAccount(
          maybeAccountAddress,
          'DEXSwaps',
          ({ completedRequirements }) =>
            completedRequirements.filter(({ requirementId }) =>
              ([EventId.JettySwap, EventId.LettySwap] as string[]).includes(requirementId)
            ).length === 2
        )
      }

      case EventId.GiftBoxOpened: {
        return getValuesFromEvent(
          { user_id: 'String', resource_address: 'Reference' },
          job.data.relevantEvents.GiftBoxOpenedEvent
        ).asyncAndThen(({ user_id: userId, resource_address: giftBoxResourceAddress }) =>
          getUserById(userId, dbClient)
            .andThen((user) =>
              getGiftBoxKindByResourceAddress(giftBoxResourceAddress).map((giftBoxKind) => ({
                user,
                giftBoxKind
              }))
            )
            .andThen(({ user, giftBoxKind }) =>
              transactionIntent.add({
                type: 'DepositGiftBoxReward',
                discriminator: `${EventId.GiftBoxOpened}:${job.data.transactionId}`,
                userId: user.id,
                traceId: job.data.traceId,
                giftBoxKind
              })
            )
        )
      }

      case EventId.GiftBoxDeposited: {
        return getValuesFromEvent(
          { user_id: 'String' },
          job.data.relevantEvents.GiftBoxDepositedEvent
        ).asyncAndThen(({ user_id: userId }) =>
          getUserById(userId, dbClient).andThen((user) =>
            sendMessage(user.id, {
              type: 'GiftBoxDeposited',
              traceId
            }).map(() => undefined)
          )
        )
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
