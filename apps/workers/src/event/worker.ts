import { logger } from '../helpers/logger'
import { Worker, ConnectionOptions, Queues, EventJob } from 'queues'
import { AppLogger, EventModel } from 'common'
import { EventWorkerController } from './controller'

export const EventWorker = (
  connection: ConnectionOptions,
  dependencies: {
    eventModel: EventModel
    eventWorkerController: EventWorkerController
    logger: AppLogger
  }
) => {
  const { logger, eventWorkerController, eventModel } = dependencies

  const worker = new Worker<EventJob>(
    Queues.EventQueue,
    async (job) => {
      logger.debug({
        method: 'eventWorker.process',
        id: job.id,
        data: job.data
      })

      eventWorkerController.handler(job)
    },
    { connection }
  )

  worker.on('completed', (job) => {
    const childLogger = logger.child({ id: job.id, data: job.data, traceId: job.data.traceId })
    eventModel(childLogger)
      .markAsProcessed(job.data.transactionId!)
      .map(() =>
        childLogger.debug({
          method: 'eventWorker.completed'
        })
      )
  })

  return worker
}
