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
      await job.updateProgress(1)
      logger.debug({
        method: 'eventWorker.process',
        job: job.data
      })

      const result = await eventWorkerController.handler(job)
      if (result.isErr()) {
        logger.debug({
          method: 'eventWorker.process.error',
          id: job.id,
          type: job.data.type,
          transactionId: job.data.transactionId,
          error: result.error
        })
        throw result.error
      }
    },
    { connection }
  )

  // worker.on('failed', (job, error) => {
  //   logger.error({ method: 'eventWorker.failed', error, job })
  // })

  worker.on('completed', (job) => {
    const childLogger = logger.child({
      id: job.id,
      type: job.data.type,
      traceId: job.data.traceId,
      transactionId: job.data.transactionId
    })
    eventModel(childLogger)
      .markAsProcessed(job.data.transactionId)
      .map(() =>
        childLogger.debug({
          method: 'eventWorker.completed'
        })
      )
  })

  return worker
}
