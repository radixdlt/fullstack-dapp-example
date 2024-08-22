import { Worker, ConnectionOptions, QueueName, EventJob } from 'queues'
import { AppLogger, WorkerError } from 'common'
import { EventWorkerController } from './controller'
import { EventStatus, PrismaClient } from 'database'
import { WorkerOutputError } from '../_types'
import { config } from '../config'
import { dbClient } from '../db-client'
import { ResultAsync, okAsync, err, ok } from 'neverthrow'
import { WorkerHelper } from '../helpers/workerHelper'

const determineIfEventShouldBeProcessed = (transactionId: string) =>
  ResultAsync.fromPromise(
    dbClient.event
      .count({
        where: {
          transactionId,
          status: { in: ['ERROR', 'FAILED_RETRY', 'PENDING', 'WAITING'] }
        }
      })
      .then((count) => count === 1),
    (error) => ({
      reason: WorkerError.FailedToDetermineIfEventJobShouldBeProcessed,
      jsError: error
    })
  )

const UpdateEventStatus =
  (dbClient: PrismaClient, transactionId: string) => (status: EventStatus, error?: string) =>
    ResultAsync.fromPromise(
      dbClient.event.update({ data: { status, error }, where: { transactionId } }),
      (error) => ({ reason: WorkerError.FailedToUpdateEventStatus, jsError: error })
    ).map(() => undefined)

const getUser = (
  userId: string
): ResultAsync<
  {
    accountAddress: string
    blocked: boolean
    referredBy?: string
  },
  WorkerOutputError
> =>
  ResultAsync.fromPromise(
    dbClient.user.findUnique({
      select: { accountAddress: true, blocked: true, referredBy: true },
      where: { id: userId }
    }),
    (error) => ({
      reason: WorkerError.FailedToGetUserFromDb,
      jsError: error
    })
  ).andThen((user) => {
    if (!user) return err({ reason: WorkerError.UserNotFound })
    if (!user.accountAddress) err({ reason: WorkerError.UserMissingAccountAddress })

    return ok(
      user as {
        accountAddress: string
        blocked: boolean
        referredBy?: string
      }
    )
  })

export const EventWorker = (
  connection: ConnectionOptions,
  dependencies: {
    eventWorkerController: EventWorkerController
    logger: AppLogger
    dbClient: PrismaClient
  }
) => {
  const { logger, eventWorkerController, dbClient } = dependencies
  const workerHelper = WorkerHelper(dbClient)

  const worker = new Worker<EventJob>(
    QueueName.Event,
    async (job) => {
      await job.updateProgress(1)
      logger.debug({
        method: 'eventWorker.process',
        job: job.data
      })

      const updateEventStatus = UpdateEventStatus(dependencies.dbClient, job.data.transactionId)

      try {
        const result = await determineIfEventShouldBeProcessed(job.data.transactionId)
          .andThen((shouldProcessEvent) => {
            if (!shouldProcessEvent) return workerHelper.noop()

            return getUser(job.data.userId).andThen(({ blocked, accountAddress }) => {
              if (blocked) return updateEventStatus(EventStatus.CANCELLED, WorkerError.BlockedUser)

              return eventWorkerController.handler(job, accountAddress)
            })
          })
          .andThen(() => updateEventStatus(EventStatus.COMPLETED))
          .orElse((error) =>
            updateEventStatus(EventStatus.ERROR, error.reason).andThen(() => err(error))
          )

        if (result.isErr()) {
          throw { handled: true, error: result.error }
        }
      } catch (error) {
        logger.error({
          id: job.id,
          method: 'eventWorker.process.error',
          error
        })

        if (workerHelper.isErrorHandled(error)) {
          const handledError = error as { error: WorkerOutputError }
          throw new Error(handledError.error.reason)
        }

        await updateEventStatus(EventStatus.FAILED_RETRY, WorkerError.UnhandledError)

        throw error
      }
      return okAsync(undefined)
    },
    { connection, concurrency: config.worker.event.concurrency }
  )

  return worker
}
