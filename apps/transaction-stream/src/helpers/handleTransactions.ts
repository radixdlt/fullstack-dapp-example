import { StreamTransactionsResponse } from '@radixdlt/babylon-gateway-api-sdk'
import { FilterTransactions } from '../filter-transactions/filter-transactions'
import { EventsModel } from '../events/events.model'
import { randomUUID } from 'node:crypto'
import { getQueues } from 'queues'
import { Logger } from 'pino'
import { StateVersionModel } from '../state-version/state-version.model'
import { ok } from 'neverthrow'

export const HandleTransactions =
  ({
    filterTransactions,
    eventsModel,
    eventQueue,
    logger,
    stateVersionModel
  }: {
    filterTransactions: FilterTransactions
    eventsModel: EventsModel
    eventQueue: ReturnType<typeof getQueues>['eventQueue']
    logger: Logger<never>
    stateVersionModel: StateVersionModel
  }) =>
  ({
    transactions,
    continueStream,
    stateVersion
  }: {
    transactions: StreamTransactionsResponse['items']
    stateVersion: number
    continueStream: (delay: number) => void
  }) =>
    filterTransactions(transactions)
      .asyncAndThen((filteredTransactions) =>
        eventsModel
          .addFilteredTransactionsToDb(filteredTransactions)
          .map(() => filteredTransactions.map((item) => ({ ...item, traceId: randomUUID() })))
      )
      .andThen((items) => eventQueue.addBulk(items).map(() => items))
      .andThen((items) => {
        if (items.length) {
          logger.debug({
            method: 'HandleTransactions',
            stateVersion,
            transactions: items
          })
          return stateVersionModel.setLatestStateVersion(stateVersion).map(() => items)
        }
        continueStream(items.length ? 0 : 1000)
        return ok(items)
      })
