import { EventsItem, ProgrammaticScryptoSborValueDecimal } from '@radixdlt/babylon-gateway-api-sdk'

export const getAmountFromWithdrawEvent = (event: EventsItem, resource: string) => {
  if (event.data.kind === 'Enum' && event.name === 'WithdrawEvent') {
    const amountField = event.data.fields.find(
      (field): field is ProgrammaticScryptoSborValueDecimal => field.kind === 'Decimal'
    )

    const referenceField = event.data.fields.find(
      (field): field is ProgrammaticScryptoSborValueDecimal => field.kind === 'Reference'
    )

    if (
      referenceField &&
      referenceField.type_name === 'ResourceAddress' &&
      referenceField.value === resource &&
      amountField
    ) {
      return amountField.value
    }
  }
  throw Error('Invalid withdraw event')
}
