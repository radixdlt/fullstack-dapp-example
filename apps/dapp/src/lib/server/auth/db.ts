import { dbClient } from '$lib/db'
import { secureRandom } from '$lib/server/auth/helpers/secure-random'
import { ResultAsync } from 'neverthrow'
import { typedError } from '$lib/helpers/typed-error'
import { config } from '$lib/config'

export type AuthDbClient = ReturnType<typeof AuthDbClient>
export const AuthDbClient = (db = dbClient) => {
  const createChallenge = (byteLength = config.challenge.byteLength): ResultAsync<string, Error> =>
    ResultAsync.fromPromise(
      db.challenge.create({ data: { challenge: secureRandom(byteLength) } }),
      typedError
    ).map(({ challenge }) => challenge)

  const getAndDelete = (
    challenge: string
  ): ResultAsync<
    {
      challenge: string
      createdAt: Date
    },
    Error
  > => ResultAsync.fromPromise(db.challenge.delete({ where: { challenge } }), typedError)

  return {
    createChallenge,
    getAndDelete
  }
}
