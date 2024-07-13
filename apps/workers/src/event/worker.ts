import { Worker, ConnectionOptions, Queues, EventJob } from 'queues'
import { AppLogger, EventModel } from 'common'
import { EventWorkerController, UserExtended } from './controller'
import { getUserById } from '../helpers/getUserById'
import { PrismaClient } from 'database'

export const EventWorker = (
  connection: ConnectionOptions,
  dependencies: {
    eventModel: EventModel
    eventWorkerController: EventWorkerController
    logger: AppLogger
    dbClient: PrismaClient
  }
) => {
  const { logger, eventWorkerController, eventModel } = dependencies

  const getReason = (error: unknown): string | undefined => {
    if (
      typeof error === 'object' &&
      error !== null &&
      'reason' in error &&
      typeof error['reason'] === 'string'
    ) {
      return error['reason']
    }
    return undefined
  }

  const worker = new Worker<EventJob>(
    Queues.EventQueue,
    async (job) => {
      await job.updateProgress(1)
      logger.debug({
        method: 'eventWorker.process',
        job: job.data
      })

      try {
        const result = await getUserById(job.data.userId, dependencies.dbClient, {
          email: true
        }).andThen((user) => eventWorkerController.handler(job, user as UserExtended))

        if (result.isErr()) {
          logger.debug({
            method: 'eventWorker.process.error',
            id: job.id,
            type: job.data.type,
            transactionId: job.data.transactionId,
            error: result.error
          })

          await eventModel(logger).update(job.data.transactionId, {
            error: getReason(result.error) ?? 'UnknownError'
          })

          throw result.error
        }
      } catch (error) {
        logger.error({ reason: 'unknown error', error })
        throw error
      }
    },
    { connection }
  )

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
