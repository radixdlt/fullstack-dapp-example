import { CommittedTransactionInfo, EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { Result, ok } from 'neverthrow'
import { EventJobType } from 'queues'
import { TrackedTransactions } from './tracked-transaction-types'

export type FilteredTransaction = {
  type: EventJobType
  transactionId: string
  relevantEvents: Record<string, EventsItem>
}

const intersection = <T>(a: T[], b: T[]) => a.filter((value) => b.includes(value))

export type FilterTransactions = ReturnType<typeof FilterTransactions>
export const FilterTransactions =
  (trackedTransactions: TrackedTransactions) =>
  (transactions: CommittedTransactionInfo[]): Result<FilteredTransaction[], never> =>
    ok(
      transactions
        .map((transaction) => {
          const events = transaction.receipt?.events

          let transactionType: EventJobType | undefined
          let relevantEvents: Record<string, EventsItem> = {}

          if (transaction.transaction_status === 'CommittedSuccess' && events) {
            for (const event of events) {
              for (const [transactionTypeName, trackedEventsFn] of Object.entries(
                trackedTransactions
              )) {
                for (const [trackedEventName, trackedEventFn] of Object.entries(trackedEventsFn)) {
                  if (trackedEventFn(event)) {
                    relevantEvents[trackedEventName] = event
                  }

                  const trackedEventKeys = Object.keys(trackedEventsFn)
                  if (
                    intersection(Object.keys(relevantEvents), trackedEventKeys).length ===
                    trackedEventKeys.length
                  ) {
                    transactionType = transactionTypeName as EventJobType
                    break
                  }
                }

                if (transactionType) break
              }
              if (transactionType) break
            }

            return transactionType
              ? { type: transactionType, relevantEvents, transactionId: transaction.intent_hash! }
              : undefined
          }

          return
        })
        .filter((item): item is FilteredTransaction => !!item)
    )
