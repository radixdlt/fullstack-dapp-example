import { Worker, ConnectionOptions, Queues, SystemJob } from 'queues'
import { AppLogger } from 'common'
import { SystemWorkerController } from './controller'

export const SystemWorker = (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    systemWorkerController: SystemWorkerController
  }
) => {
  const { logger, systemWorkerController } = dependencies

  const worker = new Worker<SystemJob>(
    Queues.SystemQueue,
    async (job) => {
      logger.debug({
        method: 'systemWorker.process',
        id: job.id,
        type: job.data.type
      })

      const result = await systemWorkerController.handler(job)

      if (result.isErr()) {
        logger.debug({
          method: 'systemWorker.process.error',
          id: job.id,
          type: job.data.type,
          error: result.error
        })
        throw result.error
      }
    },
    { connection }
  )

  worker.on('completed', (job) => {
    const childLogger = logger.child({
      id: job.id,
      type: job.data.type,
      traceId: job.data.traceId
    })
    childLogger.debug({
      method: 'systemWorker.completed'
    })
  })

  return worker
}
