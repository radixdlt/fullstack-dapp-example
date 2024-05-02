import { StreamTransactionsResponse } from '@radixdlt/babylon-gateway-api-sdk'
import { FilterTransactions } from '../filter-transactions/filter-transactions'
import { AppLogger, EventModelMethods } from 'common'
import { getQueues } from 'queues'
import { StateVersionModel } from '../state-version/state-version.model'
import crypto from 'node:crypto'

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
    filterTransactions(transactions).andThen((filteredTransactions) =>
      eventModel
        .addMultiple(
          filteredTransactions.map((tx) => ({
            eventId: tx.type,
            transactionId: tx.transactionId
          }))
        )
        .andThen(() =>
          eventQueue.addBulk(
            filteredTransactions.map((tx) => ({
              traceId: crypto.randomUUID(),
              ...tx
            }))
          )
        )
        .andThen(() => {
          if (filteredTransactions.length) {
            logger.debug({
              method: 'HandleTransactions',
              stateVersion,
              transactions: transactions.map((tx) => tx.intent_hash!)
            })
          }

          continueStream(filteredTransactions.length ? 0 : 1000)
          return stateVersionModel.setLatestStateVersion(stateVersion)
        })
    )
