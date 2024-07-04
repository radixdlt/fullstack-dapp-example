import { ResultAsync } from 'neverthrow'
import { AppLogger } from 'common'
import { PrismaClient, PrismaPromise, QuestStatus } from 'database'
import { QuestId } from 'content'

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

  const rewardsDeposited = ({ userId, questId }: { userId: string; questId: string }) =>
    ResultAsync.fromPromise(
      dbClient.$transaction([
        setQuestProgressStatus(QuestStatus.REWARDS_DEPOSITED, userId, questId),
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

  const rewardsClaimed = ({ userId, questId }: { userId: string; questId: QuestId }) =>
    ResultAsync.fromPromise(
      dbClient.$transaction(async (db) => {
        await db.questProgress.update({
          where: {
            questId_userId: {
              userId,
              questId
            }
          },
          data: {
            status: QuestStatus.REWARDS_CLAIMED
          }
        })

        await dbClient.event.update({
          where: {
            transactionId
          },
          data: {
            questId,
            userId
          }
        })
      }),
      (jsError) => {
        logger.error({
          error: jsError,
          method: 'databaseTransactions.rewardsClaimed',
          data: {
            userId,
            questId
          }
        })
        return {
          reason: 'FailedToUpdateDatabase',
          jsError
        }
      }
    )

  return { rewardsDeposited, rewardsClaimed }
}
