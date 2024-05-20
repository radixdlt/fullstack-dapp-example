import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { PrismaClient } from 'database'
import { ResultAsync, ok, err } from 'neverthrow'

export const getUserIdFromWithdrawEvent = (event: EventsItem, dbClient: PrismaClient) => {
  const entityAddress = (event.emitter as any).entity.entity_address

  return ResultAsync.fromPromise(
    dbClient.user.findFirst({
      where: { accountAddress: entityAddress }
    }),
    (error) => error as Error
  ).andThen((user) => (user ? ok(user.id) : err({ reason: 'UserNotFoundError' })))
}
