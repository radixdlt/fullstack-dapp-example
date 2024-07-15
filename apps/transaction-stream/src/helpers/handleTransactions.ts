import { StreamTransactionsResponse } from '@radixdlt/babylon-gateway-api-sdk'
import {
  FilteredTransaction,
  FilterTransactionsByType
} from '../filter-transactions/filter-transactions-by-type'
import { AppLogger, EventId, EventModelMethods, TransactionStreamModel } from 'common'
import { delay, getQueues } from 'queues'
import crypto from 'node:crypto'
import { FilterTransactionsByAccountAddress } from '../filter-transactions/filter-transactions-by-account-address'
import { okAsync, ResultAsync } from 'neverthrow'

export const HandleTransactions =
  ({
    filterTransactionsByType,
    filterTransactionsByAccountAddress,
    eventModel,
    eventQueue,
    logger,
    transactionStreamModel
  }: {
    filterTransactionsByType: FilterTransactionsByType
    filterTransactionsByAccountAddress: FilterTransactionsByAccountAddress
    eventModel: EventModelMethods
    eventQueue: ReturnType<typeof getQueues>['eventQueue']
    logger: AppLogger
    transactionStreamModel: TransactionStreamModel
  }) =>
  ({
    transactions,
    continueStream,
    stateVersion,
    retry
  }: {
    transactions: StreamTransactionsResponse['items']
    stateVersion: number
    continueStream: (delay: number) => void
    retry: (value: { stateVersion?: number; delay: number }) => void
  }) =>
    filterTransactionsByType(transactions)
      .asyncAndThen((transactions) =>
        ResultAsync.combine(transactions.map(filterTransactionsByAccountAddress)).map(
          (transactions) =>
            transactions.filter((transaction): transaction is FilteredTransaction => !!transaction)
        )
      )
      .andThen((filteredTransactions) => {
        return transactionStreamModel.getTransactionStreamStatus().andThen((status) => {
          if (status === 'Stop') {
            return transactionStreamModel
              .getLatestProcessedStateVersion()
              .map((stateVersion) => {
                const delayTime = 10_000
                logger.debug({
                  message: `Transaction stream status: '${status}', trying again in ${delayTime} ms`,
                  stateVersion
                })
                retry({ delay: delayTime, stateVersion })
              })
              .map(() => undefined)
          }

          return eventModel
            .addMultiple(
              filteredTransactions.map((transaction) => ({
                eventId: transaction.type,
                transactionId: transaction.transactionId,
                userId: transaction.userId!,
                data: transaction.data,
                questId: transaction.questId
              }))
            )
            .andThen((items) =>
              eventQueue.addBulk(
                items.map((item) => ({
                  traceId: crypto.randomUUID(),
                  eventId: item.id as unknown as EventId,
                  type: item.id as unknown as EventId,
                  transactionId: item.transactionId,
                  userId: item.userId!,
                  data: item.data as Record<string, unknown>
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

              continueStream(filteredTransactions.length ? 0 : 1_000)
              return transactionStreamModel.setLatestStateVersion(stateVersion)
            })
        })
      })
