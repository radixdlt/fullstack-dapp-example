import {
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueReference,
  ProgrammaticScryptoSborValueNonFungibleLocalId
} from '@radixdlt/babylon-gateway-api-sdk'
import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'

const findNonFungibleRadgemLocalIdField = (fields: ProgrammaticScryptoSborValue[]) => {
  const result = fields.find(
    (field): field is ProgrammaticScryptoSborValueNonFungibleLocalId =>
      field.kind === 'NonFungibleLocalId' && field.field_name === 'radgem_local_id'
  )
  return result?.value
}

const findUserIdField = (fields?: ProgrammaticScryptoSborValue[]) =>
  fields?.find(
    (field): field is ProgrammaticScryptoSborValueReference =>
      field.kind === 'String' && field.type_name === 'UserId' && field.field_name === 'user_id'
  )

export const getDetailsFromCombineElementsMintedRadgemEvent = (event: EventsItem) => {
  if (event.data?.kind !== 'Tuple') throw new Error('Invalid event data')

  const userId = findUserIdField(event.data?.fields)?.value

  const radgemId = findNonFungibleRadgemLocalIdField(event.data?.fields)

  return { userId, radgemId }
}
