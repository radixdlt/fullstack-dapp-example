import { typedError } from 'common'
import { ResultAsync } from 'neverthrow'
import { RedisConnection } from 'queues'

export type StateVersionModel = ReturnType<typeof StateVersionModel>
export const StateVersionModel = (redisClient: RedisConnection) => {
  const getRedisClient = () => ResultAsync.fromPromise(redisClient.client, typedError)

  const setLatestStateVersion = (stateVersion: number) =>
    getRedisClient().andThen((client) =>
      ResultAsync.fromPromise(client.set('latestStateVersion', stateVersion.toString()), typedError)
    )

  const getLatestProcessedStateVersion = () =>
    getRedisClient()
      .andThen((client) => ResultAsync.fromPromise(client.get('latestStateVersion'), typedError))
      .map((item) => (item ? parseInt(item) : undefined))

  return {
    setLatestStateVersion,
    getLatestProcessedStateVersion
  }
}
