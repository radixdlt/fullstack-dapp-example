import type { ResultAsync } from 'neverthrow'
import { AuthDbClient } from './db'
import { createApiError, type ApiError } from '../_types'
import { appLogger } from '$lib/helpers/logger'
import type { Challenge } from './types'

export type AuthModel = ReturnType<typeof AuthModel>

export const AuthModel = (client = AuthDbClient()) => {
	const createChallenge = (): ResultAsync<string, ApiError> =>
		client.createChallenge().mapErr((error) => {
			appLogger.error({ error, method: 'createChallenge', model: 'auth' })
			return createApiError('createChallengeFailed', 500)()
		})

	const getAndDeleteChallenge = (challenge: string): ResultAsync<Challenge, ApiError> =>
		client.getAndDelete(challenge).mapErr((error) => {
			appLogger.error({ error, method: 'getAndDelete', model: 'auth' })
			return createApiError('challengeNotFound', 404)()
		})

	return { createChallenge, getAndDeleteChallenge }
}
