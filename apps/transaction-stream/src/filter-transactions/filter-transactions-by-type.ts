import { CommittedTransactionInfo, EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { ok, Result } from 'neverthrow'
import { TrackedTransactions } from './tracked-transaction-types'
import { EventId } from 'common'

export type FilteredTransaction = {
  type: EventId
  transactionId: string
  relevantEvents: Record<string, EventsItem>
}

const intersection = <T>(a: T[], b: T[]) => a.filter((value) => b.includes(value))

export type FilterTransactionsByType = ReturnType<typeof FilterTransactionsByType>
export const FilterTransactionsByType =
  (trackedTransactions: TrackedTransactions) =>
  (transactions: CommittedTransactionInfo[]): Result<FilteredTransaction[], Error> => {
    const result = transactions.map((tx) => {
      const events = tx.receipt?.events

      let transactionType: EventId | undefined
      let relevantEvents: Record<string, EventsItem> = {}

      if (tx.transaction_status !== 'CommittedSuccess' || !events) return

      for (const event of events) {
        for (const [transactionTypeName, trackedEventsFn] of Object.entries(trackedTransactions)) {
          for (const [trackedEventName, trackedEventFn] of Object.entries(trackedEventsFn)) {
            if (trackedEventFn(event)) {
              relevantEvents[trackedEventName] = event
            }

            const trackedEventKeys = Object.keys(trackedEventsFn)
            if (
              intersection(Object.keys(relevantEvents), trackedEventKeys).length ===
              trackedEventKeys.length
            ) {
              transactionType = transactionTypeName as EventId
              break
            }
          }

          if (transactionType) break
        }
        if (transactionType) break
      }

      return transactionType
        ? { type: transactionType, relevantEvents, transactionId: tx.intent_hash! }
        : undefined
    })

    return ok(result.filter((item): item is FilteredTransaction => !!item))
  }
