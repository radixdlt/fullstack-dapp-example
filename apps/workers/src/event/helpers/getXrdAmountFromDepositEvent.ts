import { EventsItem, ProgrammaticScryptoSborValueDecimal } from '@radixdlt/babylon-gateway-api-sdk'
export const getXrdAmountFromDepositEvent = (event: EventsItem) => {
  if (event.data.kind === 'Enum') {
    const amountField = event.data.fields.find(
      (field): field is ProgrammaticScryptoSborValueDecimal => field.kind === 'Decimal'
    )
    if (amountField) {
      return amountField.value
    }
  }
  return
}
