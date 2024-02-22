import {
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueArray,
  ProgrammaticScryptoSborValueNonFungibleLocalId
} from '@radixdlt/babylon-gateway-api-sdk'
import { Result, err, ok } from 'neverthrow'

const findNonFungibleIdField = (
  fields: ProgrammaticScryptoSborValue[]
): Result<ProgrammaticScryptoSborValue[], string> => {
  const result = fields.find(
    (field): field is ProgrammaticScryptoSborValueArray =>
      field.kind === 'Array' && field.element_kind === 'NonFungibleLocalId'
  )

  return result ? ok(result.elements) : err('NonFungibleLocalId field not found')
}

const findNonFungibleLocalIdElement = (
  elements: ProgrammaticScryptoSborValue[]
): Result<string, string> => {
  const result = elements.find(
    (element): element is ProgrammaticScryptoSborValueNonFungibleLocalId =>
      element.kind === 'NonFungibleLocalId'
  )?.value

  return result ? ok(result) : err('NonFungibleLocalId value not found')
}

const stripNonFungibleLocalId = (value: string) => value.slice(1, -1)

export const getUserIdFromDepositUserBadgeEvent = (fields: ProgrammaticScryptoSborValue[]) =>
  findNonFungibleIdField(fields).andThen(findNonFungibleLocalIdElement).map(stripNonFungibleLocalId)
