import {
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueTuple,
  ProgrammaticScryptoSborValueReference,
  ProgrammaticScryptoSborValueNonFungibleLocalId
} from '@radixdlt/babylon-gateway-api-sdk'
import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { stripNonFungibleLocalId } from './stripNonFungibleLocalId'

const findNonFungibleRadgemLocalIdField = (fields: ProgrammaticScryptoSborValue[]) => {
  const result = fields.find(
    (field): field is ProgrammaticScryptoSborValueNonFungibleLocalId =>
      field.kind === 'NonFungibleLocalId' && field.field_name === 'radgem_local_id'
  )
  return result?.value
}

const findNonFungibleGlobalIdField = (
  fields: ProgrammaticScryptoSborValue[]
): ProgrammaticScryptoSborValue[] | undefined => {
  const result = fields.find(
    (field): field is ProgrammaticScryptoSborValueTuple =>
      field.kind === 'Tuple' && field.type_name === 'NonFungibleGlobalId'
  )
  return result?.fields
}

const findResourceAddressField = (fields?: ProgrammaticScryptoSborValue[]) =>
  fields?.find(
    (field): field is ProgrammaticScryptoSborValueReference =>
      field.kind === 'Reference' && field.type_name === 'ResourceAddress'
  )

const findNonFungibleIdField = (fields?: ProgrammaticScryptoSborValue[]) =>
  fields?.find(
    (field): field is ProgrammaticScryptoSborValueNonFungibleLocalId =>
      field.kind === 'NonFungibleLocalId'
  )

export const getDetailsFromCombineElementsMintedRadgemEvent = (event: EventsItem) => {
  if (event.data?.kind !== 'Tuple') throw new Error('Invalid event data')

  const globalId = findNonFungibleGlobalIdField(event.data?.fields)

  const userId = stripNonFungibleLocalId(findNonFungibleIdField(globalId)?.value)

  const radgemId = findNonFungibleRadgemLocalIdField(event.data?.fields)

  return { userId, radgemId }
}
