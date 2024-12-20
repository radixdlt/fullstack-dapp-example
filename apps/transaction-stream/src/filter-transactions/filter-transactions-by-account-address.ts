import { AccountAddressModel, EventId, NumericRange } from 'common'
import { FilteredTransaction } from './filter-transactions-by-type'
import { ResultAsync, okAsync } from 'neverthrow'

export type FilterTransactionsByAccountAddress = ReturnType<
  typeof FilterTransactionsByAccountAddress
>
export const FilterTransactionsByAccountAddress =
  (accountAddressModel: ReturnType<AccountAddressModel>) =>
  (
    transaction: FilteredTransaction
  ): ResultAsync<
    FilteredTransaction | undefined,
    {
      jsError?: Error | undefined
      httpResponseCode: NumericRange<400, 599>
      reason: string
    }
  > => {
    if (transaction.userId != null || transaction.data.isBatch) return okAsync(transaction)

    let result: ResultAsync<
      string | null,
      {
        jsError?: Error | undefined
        httpResponseCode: NumericRange<400, 599>
        reason: string
      }
    >

    if (!transaction.accountAddress) {
      throw new Error(`Expected account address not found for ${transaction.type}`)
    }

    switch (transaction.type) {


      case EventId.JettyReceivedClams: {
        result = accountAddressModel.getTrackedAddressUserId(
          transaction.accountAddress,
          'TransferTokens'
        )
        break
      }

      case EventId.JettySwap: {
        result = accountAddressModel.getTrackedAddressUserId(transaction.accountAddress, 'DEXSwaps')
        break
      }

      case EventId.RadMorphCreated: {
        result = accountAddressModel.getTrackedAddressUserId(
          transaction.accountAddress,
          'CreatingRadMorphs'
        )
        break
      }

      default: {
        throw new Error(`Unhandled transaction type: ${transaction.type}`)
      }
    }

    return result.map((userId) => (userId ? { ...transaction, userId } : undefined))
  }
