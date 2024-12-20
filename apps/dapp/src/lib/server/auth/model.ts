import { ResultAsync } from 'neverthrow'
import type { Challenge } from './types'
import { createApiError, type ApiError, type AppLogger } from 'common'
import { dbClient } from '$lib/db'
import { secureRandom } from '$lib/server/auth/helpers/secure-random'
import { config } from '$lib/config'

export type AuthModel = ReturnType<typeof AuthModel>

export const AuthModel =
  (db = dbClient) =>
  (logger: AppLogger) => {
    const createChallenge = (
      byteLength = config.challenge.byteLength
    ): ResultAsync<string, ApiError> =>
      ResultAsync.fromPromise(
        db.challenge.create({ data: { challenge: secureRandom(byteLength) } }),
        (error) => {
          logger?.error({ error, method: 'createChallenge', model: 'auth', event: 'error' })
          return createApiError('createChallengeFailed', 500)()
        }
      ).map(({ challenge }) => challenge)

    const getAndDeleteChallenge = (challenge: string): ResultAsync<Challenge, ApiError> =>
      ResultAsync.fromPromise(db.challenge.delete({ where: { challenge } }), (error) => {
        logger?.error({ error, method: 'getAndDelete', model: 'auth', event: 'error' })
        return createApiError('challengeNotFound', 404)()
      })

    return { createChallenge, getAndDeleteChallenge }
  }
