import { StreamTransactionsResponse } from '@radixdlt/babylon-gateway-api-sdk'
import {
  FilteredTransaction,
  FilterTransactionsByType
} from '../filter-transactions/filter-transactions-by-type'
import { AppLogger, EventModelMethods, splitArrayIntoChunks, typedError } from 'common'
import { getQueues } from 'queues'
import { StateVersionModel } from '../state-version/state-version.model'
import crypto from 'node:crypto'
import { FilterTransactions } from '../filter-transactions/filter-transactions'
import { ResultAsync } from 'neverthrow'

export const HandleTransactions =
  ({
    filterTransactionsByType,
    filterTransactions,
    eventModel,
    eventQueue,
    logger,
    stateVersionModel
  }: {
    filterTransactionsByType: FilterTransactionsByType
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
    filterTransactionsByType(transactions)
      .asyncAndThen((txs) => {
        const txChunks = splitArrayIntoChunks(txs, 10)
        const handleChunks = async () => {
          let results: FilteredTransaction[] = []
          for (const txChunk of txChunks) {
            const filterPromises = txChunk.map(filterTransactions)
            const resu = await ResultAsync.fromPromise(Promise.all(filterPromises), typedError)

            if (resu.isOk())
              results.concat(resu.value.filter((tx): tx is FilteredTransaction => !!tx))
          }
          return results
        }

        return ResultAsync.fromPromise(handleChunks(), typedError)
      })
      .andThen((filteredTransactions) =>
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
