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

export type GetValuesFromEventResultInput = Parameters<typeof getValuesFromEventResult>[0]

export const getValuesFromEventResult = (
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

export type GetValuesFromEventInput = Parameters<typeof getValuesFromEvent>[0]

const DataKind = {
  String: 'String',
  Reference: 'Reference',
  Decimal: 'Decimal',
  ResourceAddress: 'ResourceAddress',
  Array: 'Array',
  NonFungibleLocalId: 'NonFungibleLocalId'
} as const

type DataKindTransform = {
  [K in keyof typeof DataKind]: {
    key?: string
    kind: (typeof DataKind)[K]
    transform?: (value: unknown) => unknown
  }
}
type DataKindTransformValues = DataKindTransform[keyof DataKindTransform]

export const getValuesFromEvent = (
  keys: Record<string, DataKindTransformValues>,
  event: EventsItem
): Record<keyof typeof keys, unknown> => {
  const getEventDataFields = (
    input: ProgrammaticScryptoSborValue
  ): ProgrammaticScryptoSborValue[] => {
    if (input.kind === 'Tuple') return input.fields
    else if (input.kind === 'Enum') return input.fields
    return []
  }

  return getEventDataFields(event.data).reduce<Record<string, unknown>>((acc, field) => {
    if (field.field_name && field.kind === 'Array') {
      const key = keys[field.field_name]
      if (key?.kind === field.kind)
        acc[key.key ?? field.field_name] = key.transform
          ? key.transform(field)
          : JSON.stringify(field)
    } else if (field.field_name && field.kind !== 'Array') {
      const key = keys[field.field_name]
      if (key?.kind === field.kind) acc[key.key ?? field.field_name] = field.value
    } else if (field.type_name && field.kind !== 'Array') {
      const key = keys[field.type_name]
      if (key?.kind === field.kind) acc[key.key ?? field.type_name] = field.value
    }

    return acc
  }, {})
}
