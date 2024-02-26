import { typedError } from 'common'
import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { FilteredTransaction } from '../filter-transactions/filter-transactions'

export type EventsModel = ReturnType<typeof EventsModel>
export const EventsModel = (db: PrismaClient) => {
  const transformFilteredTransactions = (filteredTransactions: FilteredTransaction[]) =>
    filteredTransactions.map((item) => ({
      id: item.eventId,
      questId: item.questId,
      transactionId: item.transactionId,
      userId: item.userId
    }))

  const getLastAddedTransactionId = () =>
    ResultAsync.fromPromise(
      db.event.findFirst({ orderBy: { createdAt: 'desc' }, select: { transactionId: true } }),
      typedError
    ).map((event) => event?.transactionId)

  return {
    addFilteredTransactionsToDb: (filteredTransactions: FilteredTransaction[]) =>
      ResultAsync.fromPromise(
        db.event.createMany({
          data: transformFilteredTransactions(filteredTransactions)
        }),
        typedError
      ),
    getLastAddedTransactionId
  }
}
