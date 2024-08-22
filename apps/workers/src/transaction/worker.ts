import { Worker, ConnectionOptions, Queues, TransactionJob } from 'queues'
import { AppLogger, WorkerError } from 'common'
import { TransactionWorkerController } from './controller'
import { PrismaClient } from 'database'
import { getUserById } from '../helpers/getUserById'
import { WorkerOutputError } from '../_types'
import { config } from '../config'
import { okAsync, ResultAsync, err } from 'neverthrow'
import { TransactionIntentStatusHelper } from '../helpers/transactionIntentStatusHelper'
import { WorkerHelper } from '../helpers/workerHelper'

export const TransactionWorker = (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    transactionWorkerController: TransactionWorkerController
    dbClient: PrismaClient
  }
) => {
  const { logger, dbClient, transactionWorkerController: controller } = dependencies
  const workerHelper = WorkerHelper(dbClient)

  const worker = new Worker<TransactionJob>(
    Queues.TransactionQueue,
    async (job) => {
      await job.updateProgress(1)
      const { discriminator, userId } = job.data

      const updateStatus = TransactionIntentStatusHelper(dbClient).Single(discriminator)

      const childLogger = logger.child({
        traceId: job.data.traceId,
        type: job.data.type,
        jobId: job.id,
        userId,
        queue: Queues.TransactionQueue
      })

      childLogger.debug({ method: 'transactionWorker.process', data: job.data })

      try {
        const result = await ResultAsync.combine([
          workerHelper.determineIfJobShouldBeProcessed(discriminator),
          getUserById(userId, dbClient)
        ])
          .andThen(([shouldProcess, user]) => {
            if (!shouldProcess) return workerHelper.noop()
            if (user.blocked) return updateStatus('CANCELLED', WorkerError.BlockedUser)

            return updateStatus('PENDING').andThen(() =>
              controller.handler({
                job,
                logger: childLogger,
                user
              })
            )
          })
          .andThen(() => updateStatus('COMPLETED'))
          .orElse((error) => updateStatus('FAILED_RETRY', error.reason).andThen(() => err(error)))

        if (result.isErr()) throw { handled: true, error: result.error }
      } catch (error) {
        childLogger.error({
          method: 'transactionWorker.process.error',
          error
        })

        if (workerHelper.isErrorHandled(error)) {
          const { error: handledError } = error as { error: WorkerOutputError }
          throw new Error(handledError.reason)
        }

        await updateStatus('ERROR', WorkerError.UnhandledError)

        throw error
      }
    },
    { connection, concurrency: config.worker.transaction.concurrency }
  )

  worker.on('completed', (job) => {
    logger.debug({ method: 'transactionWorker.process.success', data: job.data })
  })

  return worker
}
