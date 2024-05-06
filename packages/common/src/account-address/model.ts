import { ResultAsync } from 'neverthrow'
import { typedError } from '../helpers'
import { RedisKeys } from '../constants'
import { RedisConnection } from 'bullmq'

/* 
  Used to track account addresses that are waiting for transaction success
  to complete active quest
*/

export type AccountAddressModel = ReturnType<typeof AccountAddressModel>
export const AccountAddressModel = (redisClient: RedisConnection) => {
  const getRedisClient = () => ResultAsync.fromPromise(redisClient.client, typedError)

  const addTrackedAddress = (accountAddress: string, questId: string, userId: string) =>
    getRedisClient().andThen((client) => {
      return ResultAsync.fromPromise(
        client.setnx(`${RedisKeys.TrackedAccountAddresses}:${accountAddress}:${questId}`, userId),
        typedError
      )
    })

  const getTrackedAddressUserId = (accountAddress: string, questId: string) =>
    getRedisClient().andThen((client) =>
      ResultAsync.fromPromise(
        client.get(`${RedisKeys.TrackedAccountAddresses}:${accountAddress}:${questId}`),
        typedError
      )
    )

  const deleteTrackedAddress = (accountAddress: string, questId: string) =>
    getRedisClient().andThen((client) =>
      ResultAsync.fromPromise(
        client.del(`${RedisKeys.TrackedAccountAddresses}:${accountAddress}:${questId}`),
        typedError
      )
    )

  return {
    addTrackedAddress,
    getTrackedAddressUserId,
    deleteTrackedAddress
  }
}
