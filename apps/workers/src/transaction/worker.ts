import { Worker, ConnectionOptions, Queues, TransactionJob } from 'queues'
import { AppLogger } from 'common'
import { TransactionWorkerController } from './controller'

export const TransactionWorker = (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    transactionWorkerController: TransactionWorkerController
  }
) => {
  const { logger, transactionWorkerController } = dependencies
  const worker = new Worker<TransactionJob>(
    Queues.TransactionQueue,
    async (job) => {
      logger.debug({ method: 'transactionWorker.process', id: job.id, data: job.data })

      const result = await transactionWorkerController.handler(job)
      if (result.isErr()) {
        logger.debug({
          method: 'eventWorker.process.error',
          id: job.id,
          data: job.data,
          error: result.error
        })
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
