import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { PrismaClient } from 'database'

export const getUserIdFromWithdrawEvent = async (event: EventsItem, dbClient: PrismaClient) => {
  const entityAddress = (event.emitter as any).entity.entity_address

  const user = await dbClient.user.findFirst({
    where: { accountAddress: entityAddress }
  })

  return user?.id
}
