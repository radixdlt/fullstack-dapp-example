import { Worker, ConnectionOptions, Queues, TransactionJob, getQueues } from 'queues'
import { AppLogger, type TransactionModel } from 'common'
import { TransactionWorkerController } from './controller'
import { TransactionStatus } from 'database'

export const TransactionWorker = (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    transactionWorkerController: TransactionWorkerController
    transactionModel: TransactionModel
  }
) => {
  const { logger, transactionWorkerController, transactionModel } = dependencies
  const worker = new Worker<TransactionJob>(
    Queues.TransactionQueue,
    async (job) => {
      logger.debug({ method: 'transactionWorker.process', id: job.id, data: job.data })

      const { badgeId, badgeResourceAddress, transactionKey, attempt } = job.data

      const childLogger = logger.child({ traceId: job.data.traceId, type: job.data.type })

      const result = await transactionWorkerController.handler({ job, logger: childLogger })

      const { transactionQueue } = getQueues(connection)

      if (result.isErr()) {
        logger.debug({
          method: 'eventWorker.process.error',
          id: job.id,
          data: job.data,
          error: result.error
        })

        await transactionModel(logger).setStatus(
          { badgeId, badgeResourceAddress, transactionKey, attempt },
          TransactionStatus.ERROR,
          result.error.reason
        )

        switch (result.error.reason) {
          case 'FailedToSubmitToRadixNetwork':
          case 'FailedToGetTotalRewardedUsdAmount':
          case 'FailedToPollTransactionStatus':
            await transactionQueue.add({ ...job.data, attempt: attempt + 1 })
            break
          case 'FailedToConvertStringManifest':
          case 'FailedToSetCompletedStatus':
          case 'FailedToSetTransactionId':
          case 'FailedToGetManifestBuilder':
          case 'FailedToGetUserIdFromBadgeId':
          case 'FailedToGetTransactionFromDb':
          case 'MissingTransactionInDb':
          case 'UnhandledJob':
            break
        }

        throw result.error
      }
    },
    { connection }
  )

  worker.on('completed', (job) => {
    logger.debug({ method: 'transactionWorker.completed', id: job.id, data: job.data })
  })

  return worker
}
