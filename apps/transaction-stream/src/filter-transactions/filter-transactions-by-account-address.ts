import { AccountAddressModel, EventId, getAccountFromMayaRouterWithdrawEvent } from 'common'
import { FilteredTransaction } from './filter-transactions-by-type'

type EventEmitter = {
  entity: {
    entity_address: string
    entity_type: string
    is_global: boolean
  }
  type: string
  object_module_id: string
}

export type FilterTransactionsByAccountAddress = ReturnType<
  typeof FilterTransactionsByAccountAddress
>
export const FilterTransactionsByAccountAddress =
  (accountAddressModel: AccountAddressModel) => async (tx: FilteredTransaction) => {
    let userId

    switch (tx.type) {
      case EventId.XrdStaked:
        userId = await accountAddressModel.getTrackedAddressUserId(
          (tx.relevantEvents['WithdrawEvent'].emitter as any).entity.entity_address,
          'StakingQuest'
        )

        return userId.isOk() && userId.value ? tx : undefined

      case EventId.InstapassBadgeDeposited:
        userId = await accountAddressModel.getTrackedAddressUserId(
          (tx.relevantEvents.DepositedEvent.emitter as EventEmitter).entity.entity_address,
          'InstapassQuest'
        )

        return userId.isOk() && userId.value ? tx : undefined

      case EventId.MayaRouterWithdrawEvent:
        const maybeAccountAddress = getAccountFromMayaRouterWithdrawEvent(
          tx.relevantEvents.MayaRouterWithdrawEvent
        )

        if (!maybeAccountAddress) return undefined

        userId = await accountAddressModel.getTrackedAddressUserId(maybeAccountAddress, 'MayaQuest')
        return userId.isOk() && userId.value ? tx : undefined

      default:
        return tx
    }
  }
