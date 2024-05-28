import type { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'

export const getAccountFromMayaRouterWithdrawEvent = ({ data }: EventsItem) => {
  if (data.kind === 'Tuple') {
    const intendedRecipient = data.fields.find((field) => field.field_name === 'intended_recipient')
    if (intendedRecipient && intendedRecipient.kind === 'Reference') {
      return intendedRecipient.value
    }
  }
  return undefined
}
