import { ResultAsync } from 'neverthrow'
import { AppLogger, NotificationType } from 'common'
import { PrismaClient, QuestStatus } from 'database'

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

  const createNotification = (type: NotificationType, userId: string, questId: string) =>
    dbClient.notification.create({
      data: {
        userId,
        data: {
          type,
          questId
        }
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

  const rewardsDeposited = ({ userId, questId }: { userId: string; questId: string }) =>
    ResultAsync.fromPromise(
      dbClient.$transaction([
        setQuestProgressStatus(QuestStatus.REWARDS_DEPOSITED, userId, questId),
        createNotification('QuestRewardsDeposited', userId, questId),
        updateEvent(transactionId, userId, questId)
      ]),
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

  const rewardsClaimed = ({ userId, questId }: { userId: string; questId: string }) =>
    ResultAsync.fromPromise(
      dbClient.$transaction([
        setQuestProgressStatus(QuestStatus.REWARDS_CLAIMED, userId, questId),
        updateEvent(transactionId, userId, questId),
        createNotification('QuestRewardsClaimed', userId, questId)
      ]),
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
