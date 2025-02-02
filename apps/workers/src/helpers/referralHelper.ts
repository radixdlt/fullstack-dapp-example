import {
  AppLogger,
  MessageType,
  BusinessLogic,
  UserByReferralCode,
  WorkerError,
  TransactionIntentHelper
} from 'common'
import { QuestDefinitions } from 'content'
import { $Enums, PrismaClient, QuestStatus } from 'database'
import { okAsync, ResultAsync, ok, err } from 'neverthrow'
import { QuestHelper } from './questHelper'
import { WorkerOutputError } from '../_types'
import { MessageHelper } from './messageHelper'

export const ReferralHelper = ({
  dbClient,
  transactionIntentHelper,
  traceId,
  referredBy,
  sendMessage,
  logger,
  transactionId,
  priority
}: {
  dbClient: PrismaClient
  transactionIntentHelper: TransactionIntentHelper
  traceId: string
  referredBy?: string
  sendMessage: MessageHelper
  logger?: AppLogger
  transactionId: string
  priority: number
}) => {
  const handleTiersRewards = (
    userId: string,
    questProgress: UserByReferralCode['questProgress'],
    completedQuestRequirements: UserByReferralCode['completedQuestRequirements'],
    count: number
  ) => {
    const currentReferralsAmount = count + 1
    const referrerQuestHelper = QuestHelper({
      dbClient,
      transactionIntentHelper,
      userId,
      traceId,
      sendMessage,
      logger,
      transactionId,
      // following fields are not used in this context
      accountAddress: '',
      accountAddressModel: {} as any,
      priority
    })
    const requirements = QuestDefinitions()['QuestTogether'].requirements

    const unlockedRewards = completedQuestRequirements
      .filter((req) => req.questId === 'QuestTogether')
      .reduce<Record<string, boolean>>((acc, requirement) => {
        acc[requirement.requirementId] = true
        return acc
      }, {})

    const progress = questProgress
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
      referrerQuestHelper
        .addCompletedQuestRequirement({
          questId: 'QuestTogether',
          requirementId: tier
        })
        .andThen(() =>
          transactionIntentHelper.add({
            userId,
            discriminator: `QuestTogether:${tier}:${userId}`,
            type: 'DepositPartialReward',
            requirement: tier,
            traceId,
            questId: `QuestTogether:${tier}`
          })
        )

    const setTierInProgress = (tier: 'BronzeLevel' | 'SilverLevel' | 'GoldLevel') =>
      referrerQuestHelper.updateQuestProgressStatus({
        questId: `QuestTogether:${tier}`,
        status: 'IN_PROGRESS'
      })

    const bronzeLevelCompleted = currentReferralsAmount >= requirements.BronzeLevel.threshold
    const silverLevelCompleted = currentReferralsAmount >= requirements.SilverLevel.threshold
    const goldLevelCompleted = currentReferralsAmount >= requirements.GoldLevel.threshold

    const results: ResultAsync<any, WorkerOutputError>[] = []

    logger?.trace({ method: 'handleQuestTogetherRewards.handleTiersRewards', progress })

    if (progress['QuestTogether:BronzeLevel'] === 'NOT_STARTED') {
      results.push(setTierInProgress('BronzeLevel'))
    }

    if (bronzeLevelCompleted && !unlockedRewards['BronzeLevel']) {
      results.push(unlockReward('BronzeLevel'))
    }

    return ResultAsync.combine(results).map(() => undefined)
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
    ).andThen((user) => {
      return user ? ok({ ...user }) : err({ reason: WorkerError.UserNotFound })
    })

  const countQuestTogetherReferrals = (userId: string) =>
    ResultAsync.fromPromise(
      dbClient.user.findFirst({
        where: {
          id: userId
        },
        include: {
          referredUsers: {
            where: {
              questProgress: {
                some: {
                  AND: [
                    { questId: BusinessLogic.QuestTogether.triggerRewardAfterQuest },
                    {
                      OR: [{ status: 'REWARDS_CLAIMED' }, { status: 'COMPLETED' }]
                    }
                  ]
                }
              }
            }
          }
        }
      }),
      (error) => ({ reason: WorkerError.FailedToCountQuestTogetherReferrals, jsError: error })
    ).map((user) => user?.referredUsers?.length ?? 0)

  const handleQuestTogetherRewards = (
    questId: string
  ): ResultAsync<undefined, WorkerOutputError> => {
    const shouldTriggerReferralRewardFlow =
      referredBy && questId === BusinessLogic.QuestTogether.triggerRewardAfterQuest

    logger?.trace({ method: 'handleQuestTogetherRewards', shouldTriggerReferralRewardFlow })
    if (shouldTriggerReferralRewardFlow) {
      return getUserByReferralCode(referredBy)
        .andThen((referringUser) =>
          countQuestTogetherReferrals(referringUser.id).andThen((count) => {
            logger?.trace({ method: 'handleQuestTogetherRewards', count })
            return handleTiersRewards(
              referringUser.id,
              referringUser.questProgress,
              referringUser.completedQuestRequirements,
              count
            ).andThen(() =>
              sendMessage(
                referringUser.id,
                { type: MessageType.ReferralCompletedBasicQuests, traceId },
                logger
              )
            )
          })
        )
        .map(() => undefined)
    }

    return okAsync(undefined)
  }

  const getTransactionIntents = (userId: string) =>
    ResultAsync.fromPromise(
      dbClient.transactionIntent.findMany({
        where: {
          userId,
          AND: {
            discriminator: {
              in: [
                `QuestTogether:BronzeLevel:${userId}`,
                `QuestTogether:SilverLevel:${userId}`,
                `QuestTogether:GoldLevel:${userId}`
              ]
            },
            status: 'COMPLETED'
          }
        }
      }),
      (error) => ({ reason: WorkerError.FailedToGetTransactionIntent, jsError: error })
    )

  return { handleQuestTogetherRewards, getTransactionIntents }
}
