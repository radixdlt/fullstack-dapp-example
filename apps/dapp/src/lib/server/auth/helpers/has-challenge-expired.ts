import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import type { Challenge } from '../types'
import { config } from '$lib/config'
import { createApiError, type ApiError } from 'common'

export const hasChallengeExpired = (challenge: Challenge): ResultAsync<Challenge, ApiError> => {
  const createdAt = challenge.createdAt.getTime()
  const expiresAt = createdAt + config.challenge.expiresInMs
  const hasExpired = Date.now() > expiresAt

  return hasExpired ? errAsync(createApiError('challengeExpired', 400)()) : okAsync(challenge)
}
