import { Worker, ConnectionOptions, QueueName, SystemJob } from 'queues'
import { AppLogger } from 'common'
import { SystemWorkerController } from './controller'
import { config } from '../config'

export const SystemWorker = (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    systemWorkerController: SystemWorkerController
  }
) => {
  const { logger, systemWorkerController } = dependencies

  const worker = new Worker<SystemJob>(
    QueueName.System,
    async (job) => {
      await job.updateProgress(1)
      logger.debug({
        method: 'systemWorker.process',
        id: job.id,
        type: job.data.type,
        data: job.data
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
    { connection, concurrency: config.worker.system.concurrency }
  )

  worker.on('completed', (job) => {
    const childLogger = logger.child({
      id: job.id,
      type: job.data.type
    })
    childLogger.debug({
      method: 'systemWorker.completed'
    })
  })

  return worker
}
