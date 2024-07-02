import { ResultAsync } from 'neverthrow'
import { AppLogger } from 'common'
import { PrismaClient, PrismaPromise, QuestStatus } from 'database'

export const databaseTransactions = ({
  dbClient,
  logger,
  transactionId
}: {
  dbClient: PrismaClient
  logger: AppLogger
  transactionId: string
}) => {
  const setQuestProgressStatus = (status: QuestStatus, userId: string, questId: string) =>
    dbClient.questProgress.update({
      where: {
        questId_userId: {
          userId,
          questId
        }
      },
      data: {
        status
      }
    })

  const updateEvent = (transactionId: string, userId: string, questId: string) =>
    dbClient.event.update({
      where: {
        transactionId
      },
      data: {
        questId,
        userId
      }
    })

  const updateReadyToClaimReferralXrd = (userId: string, xrdAmount: number) =>
    dbClient.referralXrd.upsert({
      where: {
        userId
      },
      create: {
        userId,
        readyToClaim: xrdAmount,
        claimed: 0
      },
      update: {
        readyToClaim: {
          increment: xrdAmount
        }
      }
    })

  const updateClaimedReferralXrd = (userId: string, xrdAmount: number) =>
    dbClient.referralXrd.update({
      where: {
        userId
      },
      data: {
        claimed: {
          increment: xrdAmount
        },
        readyToClaim: {
          decrement: xrdAmount
        }
      }
    })

  const rewardsDeposited = ({
    userId,
    questId,
    xrdAmount
  }: {
    userId: string
    questId: string
    xrdAmount: number
  }) =>
    ResultAsync.fromPromise(
      dbClient.$transaction(
        [
          setQuestProgressStatus(QuestStatus.REWARDS_DEPOSITED, userId, questId),
          updateEvent(transactionId, userId, questId),
          ...[
            questId === 'ReferralQuest'
              ? updateReadyToClaimReferralXrd(userId, xrdAmount)
              : undefined
          ]
        ].filter((query) => query !== undefined) as PrismaPromise<any>[]
      ),
      (error) => {
        logger.error({
          error,
          method: 'databaseTransactions.rewardsDeposited',
          data: { userId, questId }
        })
        return {
          error,
          message: 'failed to set deposit rewards database entries'
        }
      }
    )

  const rewardsClaimed = ({
    userId,
    questId,
    xrdAmount
  }: {
    userId: string
    questId: string
    xrdAmount: number
  }) =>
    ResultAsync.fromPromise(
      dbClient.$transaction(
        [
          setQuestProgressStatus(QuestStatus.REWARDS_CLAIMED, userId, questId),
          updateEvent(transactionId, userId, questId),
          ...[questId === 'ReferralQuest' ? updateClaimedReferralXrd(userId, xrdAmount) : undefined]
        ].filter((query) => query !== undefined) as PrismaPromise<any>[]
      ),
      (error) => {
        logger.error({ error, method: 'databaseTransactions.rewardsClaimed' })
        return {
          error,
          message: 'failed to set deposit rewards database entries'
        }
      }
    )

  return { rewardsDeposited, rewardsClaimed }
}
