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
  transactionId
}: {
  dbClient: PrismaClient
  transactionIntentHelper: TransactionIntentHelper
  traceId: string
  referredBy?: string
  sendMessage: MessageHelper
  logger?: AppLogger
  transactionId: string
}) => {
  const handleTiersRewards = (
    userId: string,
    questProgress: UserByReferralCode['questProgress'],
    completedQuestRequirements: UserByReferralCode['completedQuestRequirements'],
    count: number,
    hasGoldenTicket: boolean,
    ticketType: $Enums.TicketType | undefined
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
      mailerLiteModel: {} as any
    })
    const requirements = QuestDefinitions(ticketType)['QuestTogether'].requirements

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

    if (hasGoldenTicket && ticketType === 'FULL') {
      if (bronzeLevelCompleted && progress['QuestTogether:SilverLevel'] === 'NOT_STARTED') {
        results.push(setTierInProgress('SilverLevel'))
      }
      if (silverLevelCompleted && progress['QuestTogether:GoldLevel'] === 'NOT_STARTED') {
        results.push(setTierInProgress('GoldLevel'))
      }
      if (silverLevelCompleted && !unlockedRewards['SilverLevel']) {
        results.push(unlockReward('SilverLevel'))
      }
      if (goldLevelCompleted && !unlockedRewards['GoldLevel']) {
        results.push(unlockReward('GoldLevel'))
      }
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
          completedQuestRequirements: true,
          goldenTicketClaimed: true
        }
      }),
      (error) => ({ reason: WorkerError.FailedToGetUserFromDb, jsError: error })
    ).andThen((user) => {
      const hasGoldenTicket =
        (user?.goldenTicketClaimed && user?.goldenTicketClaimed.status === 'CLAIMED') ?? false

      return user
        ? ok({ ...user, hasGoldenTicket, ticketType: user?.goldenTicketClaimed?.type })
        : err({ reason: WorkerError.UserNotFound })
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
              count,
              referringUser.hasGoldenTicket,
              referringUser.ticketType
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
