import { Worker, ConnectionOptions, DepositGiftBoxesRewardJob, QueueName, BatchJob } from 'queues'
import { AppLogger } from 'common'
import { DepositGiftBoxRewardController } from './controller'
import { PrismaClient } from 'database'
import { WorkerError, WorkerOutputError } from '../_types'
import { config } from '../config'
import { err } from 'neverthrow'
import { TransactionIntentStatusHelper } from '../helpers/transactionIntentStatusHelper'
import { WorkerHelper } from '../helpers/workerHelper'

export const DepositGiftBoxRewardWorker = async (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    controller: DepositGiftBoxRewardController
    dbClient: PrismaClient
  }
) => {
  const { logger, dbClient, controller } = dependencies
  const workerHelper = WorkerHelper(dbClient)

  const worker = new Worker<BatchJob<DepositGiftBoxesRewardJob>>(
    QueueName.DepositGiftBoxReward,
    async (job) => {
      const { items } = job.data
      const transactionIntentDiscriminators = items.map((item) => item.discriminator)
      const [firstTransactionIntentDiscriminator] = transactionIntentDiscriminators

      logger.info({
        method: 'BatchedDepositGiftBoxRewardWorker.process',
        id: job.data.id,
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
          method: 'BatchedDepositGiftBoxRewardWorker.error',
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
    {
      connection,
      concurrency: config.worker.depositGiftBoxReward.concurrency
    }
  )

  return worker
}
