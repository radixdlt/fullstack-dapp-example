import { getQueues, type TransactionJob } from 'queues'
import { ResultAsync, errAsync } from 'neverthrow'
import type { PrismaClient } from 'database'
import type { AppLogger } from '../helpers'
import { WorkerError } from '../worker-error'
import { QuestTogetherConfig } from '../constants'

export type TransactionIntentHelper = ReturnType<typeof TransactionIntentHelper>
export const TransactionIntentHelper = ({
  dbClient,
  queues,
  logger
}: {
  dbClient: PrismaClient
  queues: ReturnType<typeof getQueues>
  logger?: AppLogger
}) => {
  const addToQueue = (job: TransactionJob) => {
    switch (job.type) {
      case 'DepositGiftBoxesReward':
        return queues.DepositGiftBoxReward.buffer.add([job])

      case 'DepositReward':
        return queues.DepositQuestReward.buffer.add([job])

      case 'ElementsDeposited':
        return queues.CreateRadGems.buffer.add([job])

      case 'QuestCompleted':
        return queues.QuestCompleted.buffer.add([job])

      case 'DepositPartialReward':
        return queues.DepositPartialReward.buffer.add([job])

      case 'DepositHeroBadge':
        return queues.DepositHeroBadge.buffer.add([job])

      case 'DepositXrd':
        return queues.DepositXrd.buffer.add([job])

      default:
        return errAsync('unhandled job type')
    }
  }

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
        logger?.trace({ method: 'TransactionIntentHelper.add', job })

        return addToQueue(job).mapErr((error) => ({
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

  return { add, countQuestTogetherReferrals, addToQueue }
}
