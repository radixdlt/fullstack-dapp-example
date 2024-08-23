import { getQueues, TransactionJob } from 'queues'
import { ResultAsync } from 'neverthrow'
import { PrismaClient, QuestStatus } from 'database'
import { AppLogger, EventId, QuestTogetherConfig, WorkerError } from 'common'

export type TransactionIntentHelper = ReturnType<typeof TransactionIntentHelper>
export const TransactionIntentHelper = ({
  dbClient,
  queues,
  logger
}: {
  dbClient: PrismaClient
  queues: ReturnType<typeof getQueues>
  logger: AppLogger
}) => {
  const add = (
    job: TransactionJob
  ): ResultAsync<
    void,
    {
      reason: WorkerError
      jsError: unknown
    }
  > => {
    const { discriminator, userId, ...data } = job
    return ResultAsync.fromPromise(
      dbClient.transactionIntent.upsert({
        where: {
          discriminator,
          userId
        },
        create: {
          discriminator,
          userId,
          data
        },
        update: {}
      }),
      (error) => ({ reason: WorkerError.FailedToUpsertTransactionIntent, jsError: error })
    )
      .andThen(() => {
        const addToQueue = () => {
          switch (job.type) {
            case 'DepositGiftBoxesReward':
              return queues.DepositGiftBoxReward.buffer.add([job])

            case 'DepositReward':
              return queues.DepositQuestReward.buffer.add([job])

            default:
              return queues.Transaction.add([job])
          }
        }

        logger.trace({ method: 'TransactionIntentHelper.add', job })

        return addToQueue().mapErr((error) => ({
          reason: WorkerError.FailedToAddJobToQueue,
          jsError: error
        }))
      })
      .map(() => undefined)
  }

  const countQuestTogetherReferrals = (userId: string) =>
    ResultAsync.fromPromise(
      dbClient.user.findFirst({
        where: {
          id: userId ?? ''
        },
        include: {
          referredUsers: {
            where: {
              questProgress: {
                some: {
                  AND: [
                    { questId: QuestTogetherConfig.triggerRewardAfterQuest },
                    {
                      OR: [
                        { status: QuestStatus.REWARDS_CLAIMED },
                        { status: QuestStatus.COMPLETED }
                      ]
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

  return { add, countQuestTogetherReferrals }
}
