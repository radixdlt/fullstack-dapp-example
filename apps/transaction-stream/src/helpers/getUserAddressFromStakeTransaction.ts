import { CommittedTransactionInfo, EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { resourceWithdrawn } from '../filter-transactions/tracked-transaction-types'
import { config } from '../config'

export const getUserAddressFromStakingTransaction =
  (resource: string) =>
  (events: EventsItem[]): string | undefined => {
    const withdrawEvent = events.find(resourceWithdrawn(resource))
    return (withdrawEvent?.emitter as any).entity.entity_address
  }
