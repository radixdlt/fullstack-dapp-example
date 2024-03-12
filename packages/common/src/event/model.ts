import { Prisma } from '@prisma/client'
import type { PrismaClient } from 'database'
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
      questId: string
      transactionId: string
      userId: string
    }[]
  ) =>
    ResultAsync.fromPromise<Event[], ApiError>(
      events.length
        ? db.$queryRaw(
            Prisma.raw(`
                with data(id, "questId", "transactionId", "userId") AS (
                  VALUES  
                  ${events
                    .map(
                      (item) =>
                        `('${item.eventId}', '${item.questId}', '${item.transactionId}', '${item.userId}')`
                    )
                    .join(', ')}
                )
                insert into "Event" (id, "questId", "transactionId", "userId")
                select d.id, d."questId", d."transactionId", d."userId"
                from data d
                where exists (select 1 from "User" u where u."id" = d."userId") 
                AND not exists (select 1 from "Event" u where u."transactionId" = d."transactionId")
                Returning *;
          `)
          )
        : Promise.resolve([]),
      (error) => {
        logger?.error({ error, method: 'addMultiple', model: 'EventModel' })
        return createApiError('failed to add multiple events', 400)()
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
    markAsProcessed,
    getLastAddedTransactionId
  }
}
