import { Worker, ConnectionOptions, BatchJob, TransactionJob, BufferQueues } from 'queues'
import { AppLogger } from 'common'
import { PrismaClient } from 'database'
import { WorkerError, WorkerOutputError } from '../_types'
import { err } from 'neverthrow'
import { TransactionIntentStatusHelper } from './transactionIntentStatusHelper'
import { WorkerHelper } from './workerHelper'
import { BatchTransactionJob, BatchWorkerController } from './batchWorkerController'
import { BufferWorker } from './bufferWorker'
import { config } from '../config'

export const BatchTransactionWorker = async <J extends BatchTransactionJob>(
  queue: BufferQueues,
  dependencies: {
    logger: AppLogger
    controller: BatchWorkerController<J>
    dbClient: PrismaClient
  },
  configuration: {
    connection: ConnectionOptions
    concurrency: number
    buffer: {
      batchSize: number
      batchInterval: number
      concurrency: number
    }
  }
) => {
  const { logger, dbClient, controller } = dependencies
  const workerHelper = WorkerHelper(dbClient)

  const queueName = queue.name

  const worker = new Worker<BatchJob<J>>(
    queue.name,
    async (job) => {
      const { items } = job.data
      const transactionIntentDiscriminators = items.map((item) => item.discriminator)
      const [firstTransactionIntentDiscriminator] = transactionIntentDiscriminators

      logger.info({
        method: `${queueName}.process`,
        batchId: job.data.id,
        items: transactionIntentDiscriminators,
        itemCount: transactionIntentDiscriminators.length
      })

      const updateStatus = TransactionIntentStatusHelper(dbClient).Batch(
        job.data.id,
        transactionIntentDiscriminators
      )

      try {
        const result = await workerHelper
          .determineIfJobShouldBeProcessed(firstTransactionIntentDiscriminator)
          .andThen((shouldProcess) => {
            if (!shouldProcess) return workerHelper.noop()

            return updateStatus({ status: 'PENDING' }).andThen(() =>
              controller.handler({ items, logger })
            )
          })
          .andThen(() => updateStatus({ status: 'COMPLETED' }))
          .orElse((error) =>
            updateStatus({ status: 'FAILED_RETRY', error: error.reason }).andThen(() => err(error))
          )

        if (result.isErr()) {
          throw { handled: true, error: result.error }
        }
      } catch (error) {
        logger.error({
          method: `${queueName}.error`,
          id: job.data.id,
          error
        })

        if (workerHelper.isErrorHandled(error)) {
          const handledError = { error: error as WorkerOutputError }
          throw new Error(handledError.error.reason)
        }

        await updateStatus({ status: 'FAILED_RETRY', error: WorkerError.UnhandledError })

        throw error
      }
    },
    configuration
  )

  BufferWorker(
    queue,
    {
      dbClient,
      logger
    },
    {
      connection: configuration.connection,
      batchSize: config.worker.depositHeroBadge.buffer.batchSize,
      batchInterval: config.worker.depositHeroBadge.buffer.batchInterval,
      concurrency: config.worker.depositHeroBadge.buffer.concurrency
    }
  )()

  return worker
}
