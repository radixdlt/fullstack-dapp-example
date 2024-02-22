import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { TrackedEvents } from './tracked-events'
import { isTrackedEvent } from './helpers/isTrackedEvent'
import { getEventDataFields } from './helpers/getEventDataFields'
import { findFieldMatch } from './helpers/findFieldMatch'
import { getUserIdFromEventDataFields } from './helpers/getUserIdFromEventDataFields'
import { EventId } from 'content'

export type FilteredTransaction = {
  questId: string
  transactionId: string
  userId: string
  eventId: EventId
}

export const filterTransactionsFactory =
  (trackedEvents: TrackedEvents) =>
  (transactions: CommittedTransactionInfo[]): FilteredTransaction[] =>
    transactions
      .map((transaction) => {
        const events = transaction.receipt?.events

        if (transaction.transaction_status === 'CommittedSuccess' && events)
          return events.map((event) => {
            const trackedEvent = isTrackedEvent(event.name, trackedEvents)
            const eventDataFields = getEventDataFields(event.data)

            if (trackedEvent && eventDataFields) {
              const eventDataFieldMatch = trackedEvent.find(
                (item) => findFieldMatch(eventDataFields, item.matchField).length > 0
              )

              if (eventDataFieldMatch) {
                const transactionId = transaction.intent_hash!
                const { eventId, questId } = eventDataFieldMatch
                const userId = getUserIdFromEventDataFields(transactionId, eventId, eventDataFields)

                return {
                  questId,
                  eventId,
                  userId,
                  transactionId
                }
              }
            }

            return
          })

        return
      })
      .flat()
      .filter((item): item is FilteredTransaction => !!item)
