import { logger } from '../helpers/logger'
import { Worker, ConnectionOptions, Queues, EventJob } from 'queues'
import { AppLogger, EventModelMethods } from 'common'
import { EventWorkerController } from './controller'

export const EventWorker = (
  connection: ConnectionOptions,
  dependencies: {
    eventModel: EventModelMethods
    eventWorkerController: EventWorkerController
    logger: AppLogger
  }
) => {
  const { logger, eventWorkerController, eventModel } = dependencies
  const worker = new Worker<EventJob>(
    Queues.EventQueue,
    async (job) => {
      logger.debug({ method: 'eventWorker.process', id: job.id, data: job.data })

      eventWorkerController.handler(job)
    },
    { connection }
  )

  worker.on('completed', (job) => {
    eventModel.markAsProcessed(job.data.transactionId!).map(() =>
      logger.debug({
        method: 'eventWorker.completed',
        id: job.id,
        data: job.data,
        traceId: job.data.traceId
      })
    )
  })

  return worker
}
