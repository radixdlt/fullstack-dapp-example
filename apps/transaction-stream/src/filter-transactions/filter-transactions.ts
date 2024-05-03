import { CommittedTransactionInfo, EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { Result, ResultAsync } from 'neverthrow'
import { EventJobType } from 'queues'
import { xrdStaked, TrackedTransactions } from './tracked-transaction-types'
import { AccountAddressModel, splitArrayIntoChunks, typedError } from 'common'
import { getUserAddressFromStakingTransaction } from '../helpers/getUserAddressFromStakeTransaction'
import { config } from '../config'

export type FilteredTransaction = {
  type: EventJobType
  transactionId: string
  relevantEvents: Record<string, EventsItem>
}

const intersection = <T>(a: T[], b: T[]) => a.filter((value) => b.includes(value))

const FilterTypes =
  (trackedTransactions: TrackedTransactions, accountAddressModel: AccountAddressModel) =>
  async (tx: CommittedTransactionInfo): Promise<FilteredTransaction | undefined> => {
    const events = tx.receipt?.events

    let transactionType: EventJobType | undefined
    let relevantEvents: Record<string, EventsItem> = {}

    if (tx.transaction_status !== 'CommittedSuccess' || !events) return

    for (const event of events) {
      for (const [transactionTypeName, trackedEventsFn] of Object.entries(trackedTransactions)) {
        for (const [trackedEventName, trackedEventFn] of Object.entries(trackedEventsFn)) {
          if (xrdStaked(event)) {
            const address = getUserAddressFromStakingTransaction(config.radQuest.xrd)(events)
            if (!address) break

            const result = await accountAddressModel
              .getTrackedAddressUserId(address, 'StakingQuest')
              .mapErr((e) => ({ reason: 'FailedToReadAccountAddresses', jsError: e }))

            if (result.isOk()) {
              if (!result.value) break
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
      ? { type: transactionType, relevantEvents, transactionId: tx.intent_hash! }
      : undefined
  }

export type FilterTransactions = ReturnType<typeof FilterTransactions>
export const FilterTransactions =
  (trackedTransactions: TrackedTransactions, accountAddressModel: AccountAddressModel) =>
  (transactions: CommittedTransactionInfo[]): ResultAsync<FilteredTransaction[], Error> => {
    const txChunks = splitArrayIntoChunks(transactions, 10)
    const filterByType = FilterTypes(trackedTransactions, accountAddressModel)

    const processChunks = async () => {
      let results: Array<FilteredTransaction | undefined>[] = []

      for (const txChunk of txChunks) {
        const filterPromises = txChunk.map(filterByType)
        const resu = await ResultAsync.fromPromise(Promise.all(filterPromises), typedError)

        if (resu.isOk()) results.push(resu.value)
      }

      return results
    }

    return ResultAsync.fromPromise(processChunks(), typedError).map((r) =>
      r.flatMap((r) => r).filter((item): item is FilteredTransaction => !!item)
    )
  }
