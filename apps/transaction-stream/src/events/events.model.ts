import { typedError } from 'common'
import { Prisma, PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { FilteredTransaction } from '../filter-transactions/filter-transactions'

export type EventsModel = ReturnType<typeof EventsModel>
export const EventsModel = (db: PrismaClient) => {
  const getLastAddedTransactionId = () =>
    ResultAsync.fromPromise(
      db.event.findFirst({ orderBy: { createdAt: 'desc' }, select: { transactionId: true } }),
      typedError
    ).map((event) => event?.transactionId)

  type Event = Awaited<ReturnType<PrismaClient['event']['create']>>

  return {
    addFilteredTransactionsToDb: (
      filteredTransactions: FilteredTransaction[]
    ): ResultAsync<Event[], Error> =>
      ResultAsync.fromPromise(
        filteredTransactions.length
          ? db.$queryRaw(
              Prisma.raw(`
                with data(id, "questId", "transactionId", "userId") AS (
                  VALUES  
                  ${filteredTransactions
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
        typedError
      ),
    getLastAddedTransactionId
  }
}
