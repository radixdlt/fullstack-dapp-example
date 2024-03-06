import { StreamTransactionsResponse } from '@radixdlt/babylon-gateway-api-sdk'
import { FilterTransactions } from '../filter-transactions/filter-transactions'
import { AppLogger, EventModelMethods } from 'common'
import { randomUUID } from 'node:crypto'
import { EventJob, getQueues } from 'queues'
import { StateVersionModel } from '../state-version/state-version.model'

export const HandleTransactions =
  ({
    filterTransactions,
    eventModel,
    eventQueue,
    logger,
    stateVersionModel
  }: {
    filterTransactions: FilterTransactions
    eventModel: EventModelMethods
    eventQueue: ReturnType<typeof getQueues>['eventQueue']
    logger: AppLogger
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
        eventModel.addMultiple(filteredTransactions).map((items) =>
          items.map(
            ({ transactionId, questId, id: eventId, userId }): EventJob => ({
              userId,
              transactionId,
              questId: questId || undefined,
              eventId,
              traceId: randomUUID()
            })
          )
        )
      )
      .andThen((items) => eventQueue.addBulk(items).map(() => items))
      .andThen((items) => {
        if (items.length) {
          logger.debug({
            method: 'HandleTransactions',
            stateVersion,
            transactions: items
          })
        }

        continueStream(items.length ? 0 : 1000)
        return stateVersionModel.setLatestStateVersion(stateVersion)
      })
