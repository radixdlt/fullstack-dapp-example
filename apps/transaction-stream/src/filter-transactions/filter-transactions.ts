import { CommittedTransactionInfo, EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { ResultAsync } from 'neverthrow'
import { EventJobType } from 'queues'
import { xrdStaked, TrackedTransactions } from './tracked-transaction-types'
import { AccountAddressModel, typedError } from 'common'
import { getUserAddressFromStakingTransaction } from '../helpers/getUserAddressFromStakeTransaction'
import { config } from '../config'

export type FilteredTransaction = {
  type: EventJobType
  transactionId: string
  relevantEvents: Record<string, EventsItem>
}

const intersection = <T>(a: T[], b: T[]) => a.filter((value) => b.includes(value))

export type FilterTransactions = ReturnType<typeof FilterTransactions>
export const FilterTransactions =
  (trackedTransactions: TrackedTransactions, accountAddressModel: AccountAddressModel) =>
  (transactions: CommittedTransactionInfo[]): ResultAsync<FilteredTransaction[], Error> => {
    const filterTxPromises = transactions.map(async (transaction) => {
      const events = transaction.receipt?.events

      let transactionType: EventJobType | undefined
      let relevantEvents: Record<string, EventsItem> = {}

      if (transaction.transaction_status !== 'CommittedSuccess' || !events) return
      for (const event of events) {
        for (const [transactionTypeName, trackedEventsFn] of Object.entries(trackedTransactions)) {
          for (const [trackedEventName, trackedEventFn] of Object.entries(trackedEventsFn)) {
            if (xrdStaked(event)) {
              const address = getUserAddressFromStakingTransaction(config.radQuest.xrd)(events)
              if (!address) break

              const count = await accountAddressModel
                .hasActiveQuest(address, 'StakingQuest')
                .mapErr((e) => ({ reason: 'FailedToReadAccountAddresses', jsError: e }))

              if (count.isOk()) {
                if (!count.value) break
                relevantEvents[trackedEventName] = event
              }
            } else if (trackedEventFn(event)) {
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
    })

    return ResultAsync.fromPromise(Promise.all(filterTxPromises), typedError).map((filteredTxs) =>
      filteredTxs.filter((item): item is FilteredTransaction => !!item)
    )
  }
