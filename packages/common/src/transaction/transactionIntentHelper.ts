import { getQueues, type TransactionJob } from 'queues'
import { ResultAsync, errAsync } from 'neverthrow'
import type { PrismaClient } from 'database'
import type { AppLogger } from '../helpers'
import { WorkerError } from '../worker-error'
import { Priority } from '../constants'

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
  const addToQueue = (job: TransactionJob, priority: number) => {
    switch (job.type) {
      case 'DepositGiftBoxesReward':
        return queues.DepositGiftBoxReward.buffer.add([{ ...job, priority }])

      case 'DepositReward':
        return queues.DepositQuestReward.buffer.add([{ ...job, priority }])

      case 'ElementsDeposited':
        return queues.CreateRadGems.buffer.add([{ ...job, priority }])

      case 'QuestCompleted':
        return queues.QuestCompleted.buffer.add([{ ...job, priority }])

      case 'DepositPartialReward':
        return queues.DepositPartialReward.buffer.add([{ ...job, priority }])

      case 'DepositHeroBadge':
        return queues.DepositHeroBadge.buffer.add([{ ...job, priority }])

      case 'DepositXrd':
        return queues.DepositXrd.buffer.add([{ ...job, priority }])

      default:
        return errAsync('unhandled job type')
    }
  }

  const add = (
    job: TransactionJob,
    priority: number = Priority.Low
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

        return addToQueue(job, priority).mapErr((error) => ({
          reason: WorkerError.FailedToAddJobToQueue,
          jsError: error
        }))
      })
      .map(() => undefined)
  }

  return { add, addToQueue }
}
