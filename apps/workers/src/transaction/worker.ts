import { Worker, ConnectionOptions, Queues, TransactionJob, getQueues } from 'queues'
import { AppLogger, type TransactionModel } from 'common'
import { TransactionWorkerController } from './controller'
import { PrismaClient, TransactionIntentStatus } from 'database'
import { getUserById } from '../helpers/getUserById'
import { WorkerError, WorkerOutputError } from '../_types'
import { DbTransactionBuilder } from '../helpers/dbTransactionBuilder'
import { TokenPriceClient } from '../token-price-client'
import { config } from '../config'

export const TransactionWorker = (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    transactionModel: TransactionModel
    transactionWorkerController: TransactionWorkerController
    dbClient: PrismaClient
    tokenPriceClient: TokenPriceClient
  }
) => {
  const { logger, transactionModel, dbClient } = dependencies

  const worker = new Worker<TransactionJob>(
    Queues.TransactionQueue,
    async (job) => {
      await job.updateProgress(1)
      const { discriminator, userId } = job.data

      const childLogger = logger.child({
        traceId: job.data.traceId,
        type: job.data.type,
        jobId: job.id,
        userId,
        queue: Queues.TransactionQueue
      })

      childLogger.debug({ method: 'transactionWorker.process', data: job.data })

      try {
        const shouldProcessEvent = await dbClient.transactionIntent
          .count({
            where: { discriminator: job.data.discriminator, status: 'COMPLETED' }
          })
          .then((count) => count === 0)

        if (!shouldProcessEvent) return

        const result = await getUserById(userId, dbClient)
          .andThen((user) =>
            dependencies.transactionWorkerController.handler({
              job,
              logger: childLogger,
              user,
              dbTransactionBuilder: DbTransactionBuilder({
                dbClient,
                tokenPriceClient: dependencies.tokenPriceClient
              })
            })
          )
          .andThen(() =>
            transactionModel(childLogger)
              .setStatus({ discriminator, userId }, TransactionIntentStatus.COMPLETED)
              .mapErr(
                (error): WorkerOutputError => ({
                  reason: WorkerError.FailedToSetCompletedStatus,
                  jsError: error
                })
              )
          )
          .map(() => {
            childLogger.debug({ method: 'transactionWorker.process.success', data: job.data })
          })
          .orElse((error) => {
            childLogger.error({
              method: 'transactionWorkerWorker.process.error',
              data: job.data,
              error
            })

            return transactionModel(childLogger)
              .setStatus({ discriminator, userId }, TransactionIntentStatus.ERROR, error.reason)
              .map(() => undefined)
          })

        if (result.isErr()) throw { handled: true, error: result.error }
      } catch (error) {
        const isHandled = (error: unknown) =>
          error && typeof error === 'object' && (error as any).handled ? true : false

        if (isHandled(error)) {
          throw (error as { error: WorkerOutputError }).error
        }

        await transactionModel(childLogger).setStatus(
          { discriminator, userId },
          TransactionIntentStatus.ERROR,
          'UnhandledError'
        )
        childLogger.error({
          method: 'transactionWorker.process.error',
          error
        })
        throw error
      }
    },
    { connection, concurrency: config.worker.transaction.concurrency }
  )

  return worker
}
