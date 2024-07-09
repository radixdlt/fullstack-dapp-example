import type { EventsItem, ProgrammaticScryptoSborValue } from '@radixdlt/babylon-gateway-api-sdk'
import { Result, ok, err } from 'neverthrow'

export const getAccountFromMayaRouterWithdrawEvent = ({ data }: EventsItem) => {
  if (data.kind === 'Tuple') {
    const intendedRecipient = data.fields.find((field) => field.field_name === 'intended_recipient')
    if (intendedRecipient && intendedRecipient.kind === 'Reference') {
      return intendedRecipient.value
    }
  }
  return undefined
}

export const getValuesFromEvent = (
  keys: Record<string, 'String' | 'Reference' | 'Decimal'>,
  event: EventsItem
): Result<Record<keyof typeof keys, string>, { reason: string }> => {
  const getEventDataFields = (input: ProgrammaticScryptoSborValue) => {
    if (input.kind === 'Tuple') return ok(input.fields)
    return err({ reason: 'FailedToGetEventDataFields' })
  }

  return getEventDataFields(event.data).map((fields) =>
    fields.reduce<Record<string, string>>((acc, field) => {
      if (field.field_name) {
        const valueKind = keys[field.field_name]
        if (valueKind === field.kind) acc[field.field_name] = field.value
      }

      return acc
    }, {})
  )
}
