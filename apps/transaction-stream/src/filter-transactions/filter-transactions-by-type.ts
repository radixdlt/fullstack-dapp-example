import { CommittedTransactionInfo, EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { ok, Result } from 'neverthrow'
import { TrackedTransactions } from './tracked-transaction-types'
import { EventId } from 'common'

export type FilteredTransaction = {
  type: EventId
  transactionId: string
  data: Record<string, Record<string, unknown>>
  userId?: string
  accountAddress?: string
  questId?: string
}

const intersection = <T>(a: T[], b: T[]) => a.filter((value) => b.includes(value))

export type FilterTransactionsByType = ReturnType<typeof FilterTransactionsByType>
export const FilterTransactionsByType =
  (trackedTransactions: TrackedTransactions) =>
  (transactions: CommittedTransactionInfo[]): Result<FilteredTransaction[], Error> => {
    const result = transactions.map((tx): FilteredTransaction | undefined => {
      const events = tx.receipt?.events

      let transactionType: EventId | undefined
      let data: Record<string, Record<string, unknown>> = {}
      let userId: string | undefined
      let accountAddress: string | undefined
      let questId: string | undefined

      if (tx.transaction_status !== 'CommittedSuccess' || !events) return
      for (const event of events) {
        for (const [transactionTypeName, trackedEventsFns] of Object.entries(trackedTransactions)) {
          for (const [trackedEventName, trackedEventFn] of Object.entries(trackedEventsFns)) {
            const extractedDataFromEvent = trackedEventFn(event)
            const trackedEventKeys = Object.keys(trackedEventsFns)
            if (extractedDataFromEvent && !data[trackedEventName]) {
              data[trackedEventName] = extractedDataFromEvent
            }

            const eventKeysIntersection = intersection(Object.keys(data), trackedEventKeys)
            const hasAllTrackedEvents = eventKeysIntersection.length === trackedEventKeys.length

            if (hasAllTrackedEvents) {
              transactionType = transactionTypeName as EventId
              const dataEntries = Object.entries(data)

              data = Object.fromEntries(
                dataEntries.filter(([key]) => eventKeysIntersection.includes(key))
              )

              const extractedData = Object.values(data).reduce(
                (acc, item) => ({ ...acc, ...item }),
                {}
              )

              userId = extractedData.userId as string
              accountAddress = extractedData.accountAddress as string
              questId = extractedData.questId as string

              break
            }
          }

          if (transactionType) break
        }
        if (transactionType) break
      }

      return transactionType
        ? ({
            type: transactionType,
            data,
            transactionId: tx.intent_hash!,
            accountAddress,
            userId
          } satisfies FilteredTransaction)
        : undefined
    })

    return ok(result.filter((item): item is FilteredTransaction => !!item))
  }
