import { ResultAsync } from 'neverthrow'
import { PrismaClient } from 'database'
import { AppLogger, WorkerError } from 'common'
import { DepositGiftBoxRewardQueue, Job } from 'queues'
import { createHash } from 'node:crypto'

export const BufferWorker = <Q extends DepositGiftBoxRewardQueue>({
  queue,
  dbClient,
  getNextJob,
  token,
  logger,
  batchSize,
  batchInterval
}: {
  queue: Q
  dbClient: PrismaClient
  getNextJob: (token: string) => Promise<Job>
  token: string
  logger: AppLogger
  batchSize: number
  batchInterval: number
}) => {
  const upsertBatchedTransactionIntent = (batchId: string, items: { discriminator: string }[]) =>
    ResultAsync.fromPromise(
      dbClient.batchedTransactionIntent.upsert({
        where: {
          id: batchId
        },
        create: {
          id: batchId,
          transactionIntents: {
            connect: items.map((item) => ({ discriminator: item.discriminator }))
          }
        },
        update: {}
      }),
      (error) => ({ reason: WorkerError.FailedToCreateBatchedTransactionIntent, jsError: error })
    )

  const createAndAddToQueue = (batchId: string, items: Parameters<Q['addBulk']>[0][0]['items']) =>
    upsertBatchedTransactionIntent(batchId, items).andThen(() =>
      queue
        .addBulk([
          {
            id: batchId,
            items
          }
        ])
        .mapErr((error) => ({
          reason: WorkerError.FailedToAddJobToQueue,
          jsError: error
        }))
    )

  const getNextBatchOfJobs = async () =>
    Promise.all(new Array(batchSize).fill(null).map(() => getNextJob(token))).then((jobs) =>
      jobs.filter((job) => job)
    )

  const markJobsAsFailed = (input: Job[], error: Error) =>
    ResultAsync.fromPromise(
      Promise.all(input.map((job) => job.moveToFailed(error, token, false))),
      (error) => ({ reason: WorkerError.FailedToMarkJobsAsFailed, jsError: error })
    )

  const markJobsAsCompleted = (input: Job[]) =>
    ResultAsync.fromPromise(
      Promise.all(input.map((job) => job.moveToCompleted(undefined, token, false))),
      (error) => ({ reason: WorkerError.FailedToMarkJobsAsCompleted, jsError: error })
    )

  const process = (jobs: Job[]) => {
    const itemIds = jobs.map((job) => job.data.discriminator)

    logger?.debug({ method: 'processBatch', itemIds })

    const batchId = createHash('sha256').update(itemIds.join(':')).digest('hex')

    const items = jobs.map((job) => job.data)

    return createAndAddToQueue(batchId, items)
      .andThen(() => markJobsAsCompleted(jobs))
      .map(() => {
        logger?.trace({
          method: 'processBatch.success',
          discriminators: itemIds
        })
      })
      .orElse((error) => {
        logger?.error({
          method: 'processBatch.error',
          error
        })
        return markJobsAsFailed(jobs, new Error(error.reason)).map(() => undefined)
      })
  }

  return async () => {
    let jobs: Job[] = []

    while (1) {
      if (jobs.length) {
        try {
          await process(jobs)
        } catch (error) {
          logger.error({
            method: 'processBatch.unhandledError',
            error
          })

          await markJobsAsFailed(jobs, error as Error)
          throw error
        }

        if (jobs.length < batchSize)
          await new Promise((resolve) => setTimeout(resolve, batchInterval))

        jobs = []
      } else {
        jobs = await getNextBatchOfJobs()
      }
    }
  }
}
