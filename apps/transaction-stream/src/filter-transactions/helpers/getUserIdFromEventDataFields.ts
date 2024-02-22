import { ProgrammaticScryptoSborValue } from '@radixdlt/babylon-gateway-api-sdk'
import { getUserIdFromDepositUserBadgeEvent } from './getUserIdFromDepositUserBadgeEvent'
import { EventId } from 'content'

export const getUserIdFromEventDataFields = (
  transactionId: string,
  eventId: EventId,
  dataFields: ProgrammaticScryptoSborValue[]
) => {
  switch (eventId) {
    case 'DepositUserBadge': {
      const result = getUserIdFromDepositUserBadgeEvent(dataFields)

      if (result.isErr())
        throw new Error(
          `Expected User ID value not found for eventId: '${eventId}' and transactionId: '${transactionId}'`
        )

      return result.value
    }

    default:
      throw new Error(
        `User ID extraction from event data not implemented for eventId: '${eventId}' and transactionId: '${transactionId}'`
      )
  }
}
