import { StreamTransactionsResponse } from '@radixdlt/babylon-gateway-api-sdk'
import {
  FilteredTransaction,
  FilterTransactionsByType
} from '../filter-transactions/filter-transactions-by-type'
import { AppLogger, EventId, EventModelMethods, TransactionStreamModel } from 'common'
import crypto from 'node:crypto'
import { FilterTransactionsByAccountAddress } from '../filter-transactions/filter-transactions-by-account-address'
import { ResultAsync } from 'neverthrow'

export const HandleTransactions =
  ({
    filterTransactionsByType,
    filterTransactionsByAccountAddress,
    eventModel,
    logger,
    transactionStreamModel
  }: {
    filterTransactionsByType: FilterTransactionsByType
    filterTransactionsByAccountAddress: FilterTransactionsByAccountAddress
    eventModel: EventModelMethods
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

          const itemsToProcess = filteredTransactions
            .map((transaction) => {
              if (transaction.data.isBatch) {
                const batchItems = transaction.data.items as { userId: string; questId: string }[]

                return batchItems.map((item, index) => ({
                  eventId: transaction.type,
                  transactionId: `${transaction.transactionId}:${index}`,
                  userId: item.userId,
                  questId: item.questId,
                  data: { questId: item.questId },
                  traceId: crypto.randomUUID(),
                  type: transaction.type as unknown as EventId
                }))
              }

              return {
                eventId: transaction.type,
                transactionId: transaction.transactionId,
                userId: transaction.userId!,
                data: transaction.data,
                questId: transaction.questId,
                traceId: crypto.randomUUID(),
                type: transaction.type as unknown as EventId
              }
            })
            .flat()

          return eventModel.add(itemsToProcess).andThen((items) => {
            if (filteredTransactions.length) {
              logger.debug({
                method: 'HandleTransactions',
                stateVersion,
                transactions: items.map((item) => ({
                  type: item.data.type,
                  transactionId: item.data.transactionId,
                  userId: item.data.userId
                }))
              })
            }

            continueStream(filteredTransactions.length ? 0 : 1_000)
            return transactionStreamModel.setLatestStateVersion(stateVersion)
          })
        })
      })
