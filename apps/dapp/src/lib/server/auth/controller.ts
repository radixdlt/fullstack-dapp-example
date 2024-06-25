import {
  type ControllerDependencies,
  type ControllerMethodContext,
  type ControllerMethodOutput
} from '../_types'

import { hasChallengeExpired } from './helpers/has-challenge-expired'
import { Rola } from '@radixdlt/rola'
import { SignedChallenge, parseSignedChallenge } from '@radixdlt/radix-dapp-toolkit'
import { type ApiError } from 'common'

import { err, errAsync, ok } from 'neverthrow'
import type { Cookies } from '@sveltejs/kit'

import type { UserType } from 'database'

export type AuthController = ReturnType<typeof AuthController>
export const AuthController = ({
  jwt,
  config,
  authModel,
  userModel,
  userQuestModel,
  gatewayApi
}: ControllerDependencies) => {
  const { dAppDefinitionAddress, networkId, expectedOrigin } = config.dapp

  const { verifySignedChallenge } = Rola({
    applicationName: 'RadQuest dApp',
    gatewayApiClient: gatewayApi.gatewayApiClient,
    dAppDefinitionAddress,
    networkId,
    expectedOrigin
  })

  const createChallenge = (
    ctx: ControllerMethodContext
  ): ControllerMethodOutput<{ challenge: string }> =>
    authModel(ctx.logger)
      .createChallenge()
      .map((challenge) => {
        ctx.logger.debug({ method: 'createChallenge', event: 'success', challenge })
        return { data: { challenge }, httpResponseCode: 201 }
      })
      .mapErr((error) => {
        ctx.logger.debug({ method: 'createChallenge.error', error })
        return error
      })

  const login = (
    ctx: ControllerMethodContext,
    proofs: {
      personaProof: SignedChallenge
    },
    cookies: Cookies
  ): ControllerMethodOutput<{
    authToken: string
    headers: { ['Set-Cookie']: string }
  }> => {
    const { personaProof } = proofs
    ctx.logger.debug({ personaProof, method: 'login', event: 'start' })
    const parsedPersonaResult = parseSignedChallenge(personaProof)
    if (!parsedPersonaResult.success) {
      if (!parsedPersonaResult.success) {
        ctx.logger.error({
          method: 'login.parseSignedChallenge.error',
          error: parsedPersonaResult.issues
        })
      }

      return errAsync({
        httpResponseCode: 400,
        reason: 'invalidRequestBody'
      })
    }

    return authModel(ctx.logger)
      .getAndDeleteChallenge(personaProof.challenge)
      .andThen((challenge) => {
        if (challenge) return ok(challenge)
        ctx.logger.error({
          method: 'login.getAndDeleteChallenge.error',
          error: 'challengeNotFound'
        })
        return challenge
          ? ok(challenge)
          : err({
              reason: 'challengeNotFound',
              jsError: undefined,
              httpResponseCode: 400
            } satisfies ApiError)
      })
      .andThen((challenge) =>
        hasChallengeExpired(challenge).mapErr((error): ApiError => {
          ctx.logger.error({ error, method: 'login.hasChallengeExpired' })
          return error
        })
      )
      .andThen(() =>
        verifySignedChallenge(personaProof)
          .mapErr((error) => {
            ctx.logger.error({ error, method: 'login.verifyPersonaProof' })
            return error
          })
          .mapErr((error) => {
            return {
              httpResponseCode: 400,
              reason: error.reason,
              jsError: error.jsError
            } satisfies ApiError
          })
      )
      .map(() => {
        ctx.logger.debug({ method: 'login.verifiedSignedChallenges.success' })
      })
      .andThen(() => {
        const referredBy = cookies.get('referredBy')
        return referredBy ? userModel.confirmReferralCode(referredBy) : ok(undefined)
      })
      .andThen((referredBy) => userModel.create(personaProof.address, referredBy))
      .andThen(({ id, type }) =>
        userQuestModel
          .addCompletedRequirement('LoginWithWallet', id, 'ConnectWallet')
          .map(() => ({ id, type }))
      )
      .andThen(({ id, type }) => jwt.createTokens(id, type))
      .map(({ authToken, refreshToken }) => ({
        data: {
          authToken,
          headers: jwt.createRefreshTokenCookie(refreshToken, cookies)
        },
        httpResponseCode: 200
      }))
  }

  const createRefreshTokenCookie = (userId: string, userType: UserType, cookies: Cookies) =>
    jwt
      .createTokens(userId, userType)
      .map(({ refreshToken }) => jwt.createRefreshTokenCookie(refreshToken, cookies))

  const renewAuthToken = (cookies: Cookies) => jwt.renewAuthToken(cookies)

  const verifyAuthHeader = (authorizationHeaderValue: string | null) => {
    const authToken = (authorizationHeaderValue || '').split(' ')[1]
    return authToken ? jwt.verifyToken(authToken) : err({ reason: 'invalidToken' })
  }

  const verifyAuthToken = (authToken?: string) =>
    authToken ? jwt.verifyToken(authToken) : err({ reason: 'invalidToken' })

  return {
    createChallenge,
    createRefreshTokenCookie,
    login,
    renewAuthToken,
    verifyAuthToken,
    verifyAuthHeader
  }
}
