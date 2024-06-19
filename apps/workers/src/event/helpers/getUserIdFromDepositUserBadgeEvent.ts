import {
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueArray,
  ProgrammaticScryptoSborValueNonFungibleLocalId
} from '@radixdlt/babylon-gateway-api-sdk'
import { stripNonFungibleLocalId } from './stripNonFungibleLocalId'
import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { err, ok } from 'neverthrow'

const findNonFungibleIdField = (
  fields: ProgrammaticScryptoSborValue[]
): ProgrammaticScryptoSborValue[] | undefined => {
  const result = fields.find(
    (field): field is ProgrammaticScryptoSborValueArray =>
      field.kind === 'Array' && field.element_kind === 'NonFungibleLocalId'
  )

  return result?.elements
}

const findNonFungibleLocalIdElement = (elements?: ProgrammaticScryptoSborValue[]) => {
  const result = (elements || []).find(
    (element): element is ProgrammaticScryptoSborValueNonFungibleLocalId =>
      element.kind === 'NonFungibleLocalId'
  )?.value

  return result
}

export const getUserIdFromDepositUserBadgeEvent = (event: EventsItem) => {
  let maybeUserId: string | undefined

  if (event.data.kind === 'Enum') {
    maybeUserId = stripNonFungibleLocalId(
      findNonFungibleLocalIdElement(findNonFungibleIdField(event.data.fields))
    )
  }

  return maybeUserId ? ok(maybeUserId) : err({ reason: 'UserIdNotFound' })
}

export const getAccountAddressFromAccountAddedEvent = (event: EventsItem) => {
  const getValue = (event: any) => {
    if (
      event.data.type_name === 'AccountAddedEvent' &&
      'value' in event.data.fields[0] &&
      typeof event.data.fields[0].value === 'string'
    ) {
      return event.data.fields[0].value
    }
    return undefined
  }

  const maybeValue = getValue(event)

  return maybeValue ? ok(maybeValue) : err({ reason: 'AccountAddressNotFound' })
}
