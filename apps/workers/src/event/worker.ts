import { Worker, ConnectionOptions, QueueName, EventJob } from 'queues'
import { AppLogger, getPriorityByGoldenTicketType, WorkerError } from 'common'
import { EventWorkerController } from './controller'
import { EventStatus, PrismaClient, User, UserStatus } from 'database'
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
          OR: [
            {
              transactionId,
              status: { in: ['ERROR', 'FAILED_RETRY', 'PENDING', 'WAITING'] }
            },
            {
              transactionId,
              status: 'CANCELLED',
              error: WorkerError.TemporarilyBlockedUser
            }
          ]
        }
      })
      .then((count) => count === 1),
    (error) => ({
      reason: WorkerError.FailedToDetermineIfEventJobShouldBeProcessed,
      jsError: error
    })
  )

const UpdateEventStatus =
  (dbClient: PrismaClient, transactionId: string) => (status: EventStatus, error?: string | null) =>
    ResultAsync.fromPromise(
      dbClient.event.update({ data: { status, error }, where: { transactionId } }),
      (error) => ({
        reason: WorkerError.FailedToUpdateEventStatus,
        jsError: error,
        data: { transactionId, status, error }
      })
    ).map(() => undefined)

const getUser = (userId: string) =>
  ResultAsync.fromPromise(
    dbClient.user.findUnique({
      include: { goldenTicketClaimed: true },
      where: { id: userId }
    }),
    (error) => ({
      reason: WorkerError.FailedToGetUserFromDb,
      jsError: error
    })
  ).andThen((user) => {
    if (!user) return err({ reason: WorkerError.UserNotFound })
    if (!user.accountAddress) err({ reason: WorkerError.UserMissingAccountAddress })

    return ok(user)
  })

const dataForBlockedUser: Record<
  Exclude<UserStatus, 'OK'>,
  { eventStatus: EventStatus; workerError: WorkerError }
> = {
  PERMANENTLY_BLOCKED: {
    eventStatus: EventStatus.FAILED_PERMANENT,
    workerError: WorkerError.PermanentlyBlockedUser
  },
  TEMPORARILY_BLOCKED: {
    eventStatus: EventStatus.CANCELLED,
    workerError: WorkerError.TemporarilyBlockedUser
  }
}

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

      const updateEventStatus = UpdateEventStatus(dependencies.dbClient, job.data.transactionId)

      try {
        const result = await determineIfEventShouldBeProcessed(job.data.transactionId)
          .andThen((shouldProcessEvent) => {
            if (!shouldProcessEvent) return workerHelper.noop()

            logger.debug({
              method: 'eventWorker.process',
              traceId: job.data.traceId,
              type: job.data.type,
              userId: job.data.userId,
              transactionId: job.data.transactionId,
              questId: job.data.questId
            })

            return getUser(job.data.userId).andThen(
              ({ status, accountAddress, referredBy, goldenTicketClaimed }) => {
                if (status !== 'OK') {
                  const { eventStatus, workerError } = dataForBlockedUser[status]
                  return updateEventStatus(eventStatus, workerError)
                }

                return eventWorkerController
                  .handler(
                    job,
                    accountAddress!,
                    getPriorityByGoldenTicketType(
                      goldenTicketClaimed ? goldenTicketClaimed : undefined
                    ),
                    referredBy!
                  )
                  .andThen(() => updateEventStatus(EventStatus.COMPLETED, null))
              }
            )
          })
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
