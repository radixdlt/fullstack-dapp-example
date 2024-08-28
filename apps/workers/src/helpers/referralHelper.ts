import {
  AppLogger,
  MessageType,
  QuestTogetherConfig,
  UserByReferralCode,
  WorkerError,
  TransactionIntentHelper
} from 'common'
import { QuestDefinitions } from 'content'
import { PrismaClient, QuestStatus } from 'database'
import { okAsync, ResultAsync, ok, err } from 'neverthrow'
import { QuestHelper } from './questHelper'
import { WorkerOutputError } from '../_types'
import { MessageHelper } from './messageHelper'
import { ReferralRewardAction } from './referalReward'

export const ReferralHelper = ({
  dbClient,
  transactionIntentHelper,
  traceId,
  referredBy,
  sendMessage,
  logger,
  questHelper,
  referralRewardAction,
  transactionId
}: {
  dbClient: PrismaClient
  transactionIntentHelper: TransactionIntentHelper
  traceId: string
  referredBy?: string
  sendMessage: MessageHelper
  logger?: AppLogger
  questHelper: QuestHelper
  referralRewardAction: ReferralRewardAction
  transactionId: string
}) => {
  const handleTiersRewards = (referrer: UserByReferralCode, count: number) => {
    const currentReferralsAmount = count + 1
    const userId = referrer.id
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
            questId: 'QuestTogether'
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

  const triggerRewardsForReferredUser = () =>
    questHelper
      .addCompletedQuestRequirement({
        questId: 'JoinFriend',
        requirementId: 'CompleteBasicQuests'
      })
      .andThen(() => questHelper.handleAllQuestRequirementCompleted('JoinFriend'))

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

  const handleQuestTogetherRewards = (
    questId: string
  ): ResultAsync<undefined, WorkerOutputError> => {
    const shouldTriggerReferralRewardFlow = questId === QuestTogetherConfig.triggerRewardAfterQuest

    if (referredBy && shouldTriggerReferralRewardFlow) {
      return triggerRewardsForReferredUser()
        .andThen(() => getUserByReferralCode(referredBy))
        .andThen((referringUser) =>
          transactionIntentHelper
            .countQuestTogetherReferrals(referringUser.id)
            .andThen((count) =>
              handleTiersRewards(referringUser, count).andThen(() =>
                sendMessage(
                  referringUser.id,
                  { type: MessageType.ReferralCompletedBasicQuests, traceId },
                  logger
                )
              )
            )
        )
        .map(() => undefined)
    }

    return okAsync(undefined)
  }

  const handleQuestTogetherXrdClaimed = ({
    questId,
    xrdAmount,
    userId
  }: {
    questId: string
    xrdAmount: number
    userId: string
  }) =>
    questId === 'QuestTogether'
      ? referralRewardAction({
          transactionId,
          userId,
          xrdValue: -xrdAmount,
          action: 'DEC'
        })
      : okAsync(undefined)

  return { handleQuestTogetherRewards, handleQuestTogetherXrdClaimed }
}
