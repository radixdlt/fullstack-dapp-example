import {
  EventsItem,
  ProgrammaticScryptoSborValueTuple,
  ProgrammaticScryptoSborValueNonFungibleLocalId
} from '@radixdlt/babylon-gateway-api-sdk'

export const getUserIdFromRadgemImageEvent = (event: EventsItem) =>
  (
    (
      (event.data as ProgrammaticScryptoSborValueTuple)
        .fields[0] as ProgrammaticScryptoSborValueTuple
    ).fields.find(
      ({ kind }) => kind === 'NonFungibleLocalId'
    ) as ProgrammaticScryptoSborValueNonFungibleLocalId
  ).value
