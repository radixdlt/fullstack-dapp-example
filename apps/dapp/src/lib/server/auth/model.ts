import type { ResultAsync } from 'neverthrow'
import { AuthDbClient } from './db'
import { createApiError, type ApiError } from '../_types'
import type { Challenge } from './types'
import type { AppLogger } from '$lib/helpers/logger'

export type AuthModel = ReturnType<typeof AuthModel>

export const AuthModel =
  (client = AuthDbClient()) =>
  (logger: AppLogger) => {
    const createChallenge = (): ResultAsync<string, ApiError> =>
      client.createChallenge().mapErr((error) => {
        logger?.error({ error, method: 'createChallenge', model: 'auth', event: 'error' })
        return createApiError('createChallengeFailed', 500)()
      })

    const getAndDeleteChallenge = (challenge: string): ResultAsync<Challenge, ApiError> =>
      client.getAndDelete(challenge).mapErr((error) => {
        logger?.error({ error, method: 'getAndDelete', model: 'auth', event: 'error' })
        return createApiError('challengeNotFound', 404)()
      })

    return { createChallenge, getAndDeleteChallenge }
  }
