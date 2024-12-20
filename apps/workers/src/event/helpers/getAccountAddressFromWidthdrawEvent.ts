import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { ok, err, Result } from 'neverthrow'

export const getAccountAddressFromWithdrawEvent = (
  event: EventsItem
): Result<string, { reason: string }> => {
  const maybeAccountAddress: string | undefined = (event.emitter as any).entity.entity_address

  return maybeAccountAddress
    ? ok(maybeAccountAddress)
    : err({ reason: 'FailedToGetAccountAddressFromWithdrawEvent' })
}
