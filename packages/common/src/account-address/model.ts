import { ResultAsync } from 'neverthrow'
import { AppLogger, createApiError, typedError } from '../helpers'
import { RedisKeys } from '../constants'
import { RedisConnection } from 'bullmq'

/* 
  Used to track account addresses that are waiting for transaction success
  to complete active quest
*/

export type AccountAddressModel = ReturnType<typeof AccountAddressModel>
export const AccountAddressModel = (redisClient: RedisConnection, logger?: AppLogger) => {
  const getRedisClient = () => ResultAsync.fromPromise(redisClient.client, typedError)

  const addTrackedAddress = (accountAddress: string, questId: string, userId: string) =>
    getRedisClient()
      .andThen((client) => {
        return ResultAsync.fromPromise(
          client.setnx(`${RedisKeys.TrackedAccountAddresses}:${accountAddress}:${questId}`, userId),
          (error) => {
            logger?.error({ error, method: 'addTrackedAddress', model: 'AccountAddressModel' })
            return createApiError('Failed to add tracked address', 500)()
          }
        )
      })
      .mapErr((error) => {
        logger?.error({ error, method: 'addTrackedAddress', model: 'AccountAddressModel' })
        return createApiError('Failed to connect to redis when adding tracked account', 500)()
      })

  const getTrackedAddressUserId = (accountAddress: string, questId: string) =>
    getRedisClient()
      .andThen((client) =>
        ResultAsync.fromPromise(
          client.get(`${RedisKeys.TrackedAccountAddresses}:${accountAddress}:${questId}`),
          (error) => {
            logger?.error({
              error,
              method: 'getTrackedAddressUserId',
              model: 'AccountAddressModel'
            })
            return createApiError('Failed to get tracked address user id', 500)()
          }
        )
      )
      .mapErr((error) => {
        logger?.error({
          error,
          method: 'getTrackedAddressUserId',
          model: 'AccountAddressModel'
        })
        return createApiError(
          'Failed to connect to redis when getting tracked account user id',
          500
        )()
      })

  const deleteTrackedAddress = (accountAddress: string, questId: string) =>
    getRedisClient()
      .andThen((client) =>
        ResultAsync.fromPromise(
          client.del(`${RedisKeys.TrackedAccountAddresses}:${accountAddress}:${questId}`),
          typedError
        )
      )
      .mapErr((error) => {
        logger?.error({
          error,
          method: 'deleteTrackedAddress',
          model: 'AccountAddressModel'
        })
        return createApiError('Failed to connect to redis when deleting tracked account', 500)()
      })

  return {
    addTrackedAddress,
    getTrackedAddressUserId,
    deleteTrackedAddress
  }
}
