import {
  Worker,
  ConnectionOptions,
  Queues,
  Job,
  DepositGiftBoxRewardQueue,
  DepositGiftBoxesRewardJob
} from 'queues'
import { AppLogger } from 'common'
import { config } from '../config'
import { createHash } from 'node:crypto'
import { ResultAsync } from 'neverthrow'
import { dbClient } from '../db-client'

export const DepositGiftBoxRewardBufferWorker = async (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    DepositGiftBoxRewardQueue: DepositGiftBoxRewardQueue
  }
) => {
  const { logger, DepositGiftBoxRewardQueue } = dependencies

  const worker = new Worker<DepositGiftBoxesRewardJob>(
    Queues.DepositGiftBoxRewardBufferQueue,
    null,
    {
      connection,
      concurrency: config.worker.depositGiftBoxRewardBuffer.concurrency
    }
  )

  const token = crypto.randomUUID()

  const jobIdsToBatchId = (jobIds: string[]) =>
    createHash('sha256').update(jobIds.join(':')).digest('hex')

  const getNextBatchOfJobs = async () =>
    Promise.all(
      new Array(config.worker.depositGiftBoxRewardBuffer.batchSize)
        .fill(null)
        .map(() => worker.getNextJob(token))
    ).then((jobs) => jobs.filter((job) => job))

  const markJobsAsFailed = (input: Job<DepositGiftBoxesRewardJob>[], error: Error) =>
    ResultAsync.fromPromise(
      Promise.all(input.map((job) => job.moveToFailed(error, token, false))),
      (error) => ({ reason: 'FailedToMarkJobsAsFailed', jsError: error })
    )

  const markJobsAsCompleted = (input: Job<DepositGiftBoxesRewardJob>[]) =>
    ResultAsync.fromPromise(
      Promise.all(input.map((job) => job.moveToCompleted(undefined, token, false))),
      (error) => ({ reason: 'FailedToMarkJobsAsCompleted', jsError: error })
    )

  let jobs: Job<DepositGiftBoxesRewardJob>[] = []

  while (1) {
    if (jobs.length) {
      const itemIds = jobs.map((job) => job.data.discriminator)
      try {
        logger.debug({ method: 'DepositGiftBoxRewardBufferWorker.processBatch', itemIds })
        const batchId = jobIdsToBatchId(itemIds)
        const items = jobs.map((job) => job.data)

        await ResultAsync.fromPromise(
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
          (error) => ({ reason: 'FailedToCreateBatchedTransactionIntent', jsError: error })
        )
          .andThen(() =>
            DepositGiftBoxRewardQueue.addBulk([
              {
                id: batchId,
                items
              }
            ]).mapErr((error) => ({
              reason: 'FailedToAddJobToDepositGiftBoxRewardQueue',
              jsError: error
            }))
          )
          .andThen(() => markJobsAsCompleted(jobs))
          .map(() => {
            logger.trace({
              method: 'DepositGiftBoxRewardBufferWorker.processBatch.success',
              itemIds
            })
          })
          .orElse((error) => {
            logger.error({
              method: 'DepositGiftBoxRewardBufferWorker.processBatch.error',
              error
            })
            return markJobsAsFailed(jobs, new Error(error.reason)).map(() => undefined)
          })
      } catch (error) {
        logger.error({
          method: 'DepositGiftBoxRewardBufferWorker.processBatch.unhandledError',
          error
        })

        await markJobsAsFailed(jobs, error as Error)
        throw error
      }

      if (jobs.length < config.worker.depositGiftBoxRewardBuffer.batchSize)
        await new Promise((resolve) =>
          setTimeout(resolve, config.worker.depositGiftBoxRewardBuffer.batchInterval)
        )

      jobs = []
    } else {
      jobs = await getNextBatchOfJobs()
    }
  }
}
