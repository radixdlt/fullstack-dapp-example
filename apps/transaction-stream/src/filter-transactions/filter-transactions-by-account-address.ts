import { AccountAddressModel, EventId, NumericRange } from 'common'
import { FilteredTransaction } from './filter-transactions-by-type'
import { ResultAsync, okAsync } from 'neverthrow'

export type FilterTransactionsByAccountAddress = ReturnType<
  typeof FilterTransactionsByAccountAddress
>
export const FilterTransactionsByAccountAddress =
  (accountAddressModel: ReturnType<AccountAddressModel>) =>
  (transaction: FilteredTransaction): ResultAsync<FilteredTransaction | undefined, any> => {
    if (transaction.userId) return okAsync(transaction)

    let result: ResultAsync<
      string | null,
      {
        jsError?: Error | undefined
        httpResponseCode: NumericRange<400, 599>
        reason: string
      }
    >

    if (!transaction.accountAddress) {
      console.log(transaction)
      throw new Error(`Expected account address not found for ${transaction.type}`)
    }

    switch (transaction.type) {
      case EventId.AccountAllowedToForgeHeroBadge: {
        return okAsync(undefined)
      }

      case EventId.XrdStaked: {
        result = accountAddressModel.getTrackedAddressUserId(
          transaction.accountAddress,
          'NetworkStaking'
        )
        break
      }

      case EventId.InstapassBadgeDeposited: {
        result = accountAddressModel.getTrackedAddressUserId(
          transaction.accountAddress,
          'Instapass'
        )
        break
      }

      case EventId.MayaRouterWithdrawEvent: {
        result = accountAddressModel.getTrackedAddressUserId(transaction.accountAddress, 'Thorswap')
        break
      }

      case EventId.JettyReceivedClams: {
        result = accountAddressModel.getTrackedAddressUserId(
          transaction.accountAddress,
          'TransferTokens'
        )
        break
      }

      case EventId.JettySwap:
      case EventId.LettySwap: {
        result = accountAddressModel.getTrackedAddressUserId(transaction.accountAddress, 'DEXSwaps')
        break
      }

      default:
        throw new Error(`Unhandled transaction type: ${transaction.type}`)
    }

    return result.map((userId) => (userId ? { ...transaction, userId } : undefined))
  }
