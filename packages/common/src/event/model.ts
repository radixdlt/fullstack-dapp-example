import { EventError, type PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { ApiError, createApiError } from '../helpers/create-api-error'
import { AppLogger } from '../helpers'

export type Event = Awaited<ReturnType<PrismaClient['event']['create']>>

export type EventModel = ReturnType<typeof EventModel>

export type EventModelMethods = ReturnType<EventModel>

export const EventModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const getLastAddedTransactionId = () =>
    ResultAsync.fromPromise(
      db.event.findFirst({ orderBy: { createdAt: 'desc' }, select: { transactionId: true } }),
      (error) => {
        logger?.error({ error, method: 'getLastAddedTransactionId', model: 'EventModel' })
        return createApiError('failed to get last added transactionId', 400)()
      }
    ).map((event) => event?.transactionId)

  const addMultiple = (
    events: {
      eventId: string
      questId?: string
      transactionId: string
      userId?: string
    }[]
  ) =>
    ResultAsync.fromPromise<{ count: number }, ApiError>(
      db.event.createMany({
        data: events.map((event) => ({
          id: event.eventId,
          questId: event.questId,
          transactionId: event.transactionId,
          userId: event.userId
        }))
      }),
      (error) => {
        logger?.error({ error, method: 'addMultiple', model: 'EventModel' })
        return createApiError('failed to add multiple events', 400)()
      }
    )

  const update = (
    transactionId: string,
    {
      questId,
      userId,
      error,
      processedAt
    }: Partial<{ questId: string; userId: string; error: EventError; processedAt: Date }>
  ) =>
    ResultAsync.fromPromise(
      db.event.update({
        where: {
          transactionId
        },
        data: {
          questId,
          userId,
          error,
          processedAt
        }
      }),
      (error) => {
        logger?.error({ error, method: 'update', model: 'EventModel' })
        return createApiError('failed to update event', 400)()
      }
    )

  const markAsProcessed = (transactionId: string) =>
    ResultAsync.fromPromise(
      db.event.update({
        where: { transactionId },
        data: { processedAt: new Date() }
      }),
      (error) => {
        logger?.error({ error, method: 'markAsProcessed', model: 'EventModel' })
        return createApiError('failed to mark event as processed', 400)()
      }
    )

  return {
    addMultiple,
    update,
    markAsProcessed,
    getLastAddedTransactionId
  }
}
