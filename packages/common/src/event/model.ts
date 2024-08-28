import { EventStatus, PrismaClient } from 'database'
import { ResultAsync, okAsync } from 'neverthrow'
import { type ApiError, createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'
import type { EventJob, Queues } from 'queues'

export type Event = Awaited<ReturnType<PrismaClient['event']['create']>>

export type EventModel = ReturnType<typeof EventModel>

export type EventModelMethods = ReturnType<EventModel>

export const EventModel =
  ({ db, queues }: { db: PrismaClient; queues: Queues }) =>
  (logger?: AppLogger) => {
    const getLastAddedTransactionId = () =>
      ResultAsync.fromPromise(
        db.event.findFirst({ orderBy: { createdAt: 'desc' }, select: { transactionId: true } }),
        (error) => {
          logger?.error({ error, method: 'getLastAddedTransactionId', model: 'EventModel' })
          return createApiError('failed to get last added transactionId', 400)()
        }
      ).map((event) => event?.transactionId)

    const addBulk = (
      events: {
        eventId: string
        questId?: string
        transactionId: string
        userId: string
        data: Record<string, unknown>
      }[]
    ) => {
      if (events.length === 0) return okAsync([])

      const values = events
        .map(
          (item) =>
            `('${item.eventId}', '${item.transactionId}', '${item.userId}', '${JSON.stringify(item.data)}'::jsonb, ${item.questId ? `'${item.questId}'` : 'NULL'})`
        )
        .join(', ')

      const query = [
        `with data("id", "transactionId", "userId", "data", "questId") AS (VALUES ${values})`,
        'insert into "Event" ("id", "transactionId", "userId", "data", "questId")',
        'select d."id", d."transactionId", d."userId", d."data", d."questId"',
        'from data d',
        'where exists (select 1 from "User" u where u."id" = d."userId")',
        'AND not exists (select 1 from "Event" u where u."transactionId" = d."transactionId")',
        'Returning *;'
      ].join(' ')

      return ResultAsync.fromPromise<Event[], ApiError>(
        events.length ? db.$queryRawUnsafe(query) : Promise.resolve([]),
        (error) => {
          logger?.error({ error, method: 'addMultiple.error', model: 'EventModel' })
          return createApiError('failed to add multiple events', 400)()
        }
      )
    }

    const add = (items: EventJob[]) =>
      addBulk(
        items.map(({ transactionId, userId, eventId, data }) => ({
          transactionId,
          userId,
          eventId,
          data
        }))
      ).andThen(() => queues.Event.add(items))

    const update = (
      transactionId: string,
      {
        questId,
        userId,
        error,
        status
      }: Partial<{ questId: string; userId: string; error: string; status: EventStatus }>
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
            status
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
          data: { status: 'COMPLETED' }
        }),
        (error) => {
          logger?.error({ error, method: 'markAsProcessed', model: 'EventModel' })
          return createApiError('failed to mark event as processed', 400)()
        }
      )

    return {
      add,
      update,
      markAsProcessed,
      getLastAddedTransactionId
    }
  }
