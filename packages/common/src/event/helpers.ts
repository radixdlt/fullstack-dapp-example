import type {
  EventsItem,
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueDecimal,
  ProgrammaticScryptoSborValueMap
} from '@radixdlt/babylon-gateway-api-sdk'
import { Result, ok, err } from 'neverthrow'

export type EventEmitter = {
  entity: {
    entity_address: string
    entity_type: string
    is_global: boolean
  }
  type: string
  object_module_id: string
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
  Tuple: 'Tuple',
  NonFungibleLocalId: 'NonFungibleLocalId',
  Map: 'Map'
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
    if (
      field.field_name &&
      (field.kind === 'Array' || field.kind === 'Tuple' || field.kind === 'Map')
    ) {
      const key = keys[field.field_name]
      if (key?.kind === field.kind)
        acc[key.key ?? field.field_name] = key.transform
          ? key.transform(field)
          : JSON.stringify(field)
    } else if (
      field.field_name &&
      field.kind !== 'Array' &&
      field.kind !== 'Tuple' &&
      field.kind !== 'Map'
    ) {
      const key = keys[field.field_name]
      if (key?.kind === field.kind) acc[key.key ?? field.field_name] = field.value
    } else if (
      field.type_name &&
      field.kind !== 'Array' &&
      field.kind !== 'Tuple' &&
      field.kind !== 'Map'
    ) {
      const key = keys[field.type_name]
      if (key?.kind === field.kind) acc[key.key ?? field.type_name] = field.value
    }

    return acc
  }, {})
}

export const getGiftBoxRewardsFromMapSbor = (value: ProgrammaticScryptoSborValue) => {
  const mapData = value as ProgrammaticScryptoSborValueMap

  return mapData.entries.reduce<{
    fungibles: { amount: number; resourceAddress: string }[]
    nonFungibles: { localIds: string[]; resourceAddress: string }[]
  }>(
    (acc, entry) => {
      let resourceAddress: string | undefined = undefined
      let amount: number | undefined = undefined
      let type: 'fungible' | 'nonFungible' | undefined = undefined
      let localIds: string[] = []

      if (entry.key.kind === 'Reference') {
        resourceAddress = entry.key.value
      }

      if (
        entry.value.kind === 'Enum' &&
        (entry.value.variant_name === 'FungibleAmount' || String(entry.value.variant_id) === '0')
      ) {
        const maybeValue = entry.value.fields.find(
          (field): field is ProgrammaticScryptoSborValueDecimal => field.kind === 'Decimal'
        )?.value
        if (maybeValue) amount = parseInt(maybeValue)
        type = 'fungible'
      }

      if (
        entry.value.kind === 'Enum' &&
        (entry.value.variant_name === 'NonFungibleAmount' || String(entry.value.variant_id) === '1')
      ) {
        type = 'nonFungible'
        const [field] = entry.value.fields
        if (field.kind === 'Array') {
          const [element] = field.elements
          if (element.kind === 'NonFungibleLocalId') {
            localIds = [element.value]
          }
        }
      }

      if (type === 'fungible' && resourceAddress && amount)
        acc.fungibles.push({ resourceAddress, amount })
      else if (type === 'nonFungible' && resourceAddress)
        acc.nonFungibles.push({ resourceAddress, localIds })

      return acc
    },
    {
      fungibles: [],
      nonFungibles: []
    }
  )
}
