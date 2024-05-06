import { AccountAddressModel } from 'common'
import { FilteredTransaction } from './filter-transactions-by-type'

export type FilterTransactionsByAccountAddress = ReturnType<
  typeof FilterTransactionsByAccountAddress
>
export const FilterTransactionsByAccountAddress =
  (accountAddressModel: AccountAddressModel) => async (tx: FilteredTransaction) => {
    if (tx.type !== 'XrdStaked') return tx

    const userId = await accountAddressModel.getTrackedAddressUserId(
      (tx.relevantEvents['WithdrawEvent'].emitter as any).entity.entity_address,
      'StakingQuest'
    )

    if (userId.isOk() && userId.value) return tx

    return
  }
