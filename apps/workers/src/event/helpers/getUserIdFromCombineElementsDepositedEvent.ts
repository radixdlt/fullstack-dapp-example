import {
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueReference
} from '@radixdlt/babylon-gateway-api-sdk'
import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'

const findUserIdField = (fields?: ProgrammaticScryptoSborValue[]) =>
  fields?.find(
    (field): field is ProgrammaticScryptoSborValueReference =>
      field.kind === 'String' && field.type_name === 'UserId' && field.field_name === 'user_id'
  )

export const getBadgeAddressAndIdFromCombineElementsDepositedEvent = (event: EventsItem) => {
  if (event.data?.kind !== 'Tuple') throw new Error('Invalid event data')

  return findUserIdField(event.data?.fields)?.value
}
