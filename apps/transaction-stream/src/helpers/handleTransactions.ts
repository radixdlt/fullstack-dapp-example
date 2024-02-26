import { State, StreamTransactionsResponse } from '@radixdlt/babylon-gateway-api-sdk'
import { FilterTransactions } from '../filter-transactions/filter-transactions'
import { EventsModel } from '../events/events.model'
import { randomUUID } from 'node:crypto'
import { RedisConnection, getQueues } from 'queues'
import { Logger } from 'pino'
import { ResultAsync } from 'neverthrow'
import { typedError } from 'common'
import { StateVersionModel } from '../state-version/state-version.model'

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
      .andThen((items) => stateVersionModel.setLatestStateVersion(stateVersion).map(() => items))
      .map((items) => {
        if (items.length)
          logger.debug({
            method: 'stream.transactions$',
            stateVersion,
            transactions: items
          })

        continueStream(items.length ? 0 : 1000)
      })
