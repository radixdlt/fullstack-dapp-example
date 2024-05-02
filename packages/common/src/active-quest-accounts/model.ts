import { ResultAsync } from 'neverthrow'
import { RedisConnection } from 'queues'
import { typedError } from '../helpers'
import { RedisKeys } from '../constants'

/* 
  Used to track account addresses that are waiting for transaction success
  to complete active quest
*/

export type ActiveQuestsModel = ReturnType<typeof ActiveQuestsModel>
export const ActiveQuestsModel = (redisClient: RedisConnection) => {
  const getRedisClient = () => ResultAsync.fromPromise(redisClient.client, typedError)

  const addActiveQuestAccount = (accountAddress: string, questId: string) =>
    getRedisClient().andThen((client) => {
      return ResultAsync.fromPromise(
        client.sadd(RedisKeys.ActiveQuests, `${accountAddress}-${questId}`),
        typedError
      )
    })

  const hasActiveQuest = (accountAddress: string, questId: string) =>
    getRedisClient().andThen((client) =>
      ResultAsync.fromPromise(
        client.sismember(RedisKeys.ActiveQuests, `${accountAddress}-${questId}`),
        typedError
      )
    )

  return {
    addActiveQuestAccount,
    hasActiveQuest
  }
}
