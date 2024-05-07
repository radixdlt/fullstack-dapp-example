import { type ControllerMethodContext, type ControllerMethodOutput } from '../_types'

import { hasChallengeExpired } from './helpers/has-challenge-expired'
import { Rola } from '@radixdlt/rola'
import { SignedChallenge, parseSignedChallenge } from '@radixdlt/radix-dapp-toolkit'
import { GatewayApi, type ApiError } from 'common'

import { err, errAsync, ok } from 'neverthrow'
import { JWT } from './jwt'
import { AuthModel } from './model'
import type { Cookies } from '@sveltejs/kit'

import { config, type Config } from '$lib/config'
import { UserQuestModel, UserModel } from 'common'
import { dbClient } from '$lib/db'

export type AuthControllerInput = Partial<{
  authModel: AuthModel
  userModel: UserModel
  userQuestModel: UserQuestModel
  jwt: JWT
  dAppConfig: Config['dapp']
  gatewayApiClient: GatewayApi['gatewayApiClient']
}>
export type AuthController = ReturnType<typeof AuthController>
export const AuthController = ({
  jwt = JWT(config.jwt),
  dAppConfig = config.dapp,
  authModel = AuthModel(),
  userModel = UserModel(dbClient),
  userQuestModel = UserQuestModel(dbClient),
  gatewayApiClient
}: AuthControllerInput) => {
  const { dAppDefinitionAddress, networkId, expectedOrigin } = dAppConfig
  const gatewayApi = GatewayApi(networkId)

  const { verifySignedChallenge } = Rola({
    applicationName: 'RadQuest dApp',
    gatewayApiClient: gatewayApiClient ?? gatewayApi.gatewayApiClient,
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
        ctx.logger.debug({ method: 'createChallenge', event: 'error', error })
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
          method: 'login.parseSignedChallenge',
          event: 'error',
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
          method: 'login.getAndDeleteChallenge',
          event: 'error',
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
          ctx.logger.error({ error, method: 'login.hasChallengeExpired', event: 'error' })
          return error
        })
      )
      .andThen(() =>
        verifySignedChallenge(personaProof)
          .mapErr((error) => {
            ctx.logger.error({ error, method: 'login.verifyPersonaProof', event: 'error' })
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
        ctx.logger.debug({ method: 'login.verifiedSignedChallenges', event: 'success' })
      })
      .andThen(() => userModel(ctx.logger).create(personaProof.address))
      .andThen(({ id }) =>
        userQuestModel(ctx.logger)
          .addCompletedRequirement('LoginWithWallet', id, 'ConnectWallet')
          .map(() => ({ id }))
      )
      .andThen(({ id }) => jwt.createTokens(id))
      .map(({ authToken, refreshToken }) => ({
        data: {
          authToken,
          headers: jwt.createRefreshTokenCookie(refreshToken, cookies)
        },
        httpResponseCode: 200
      }))
  }

  const renewAuthToken = (cookies: Cookies) => jwt.renewAuthToken(cookies)

  const verifyAuthHeader = (authorizationHeaderValue: string | null) => {
    const authToken = (authorizationHeaderValue || '').split(' ')[1]
    return authToken ? jwt.verifyToken(authToken) : err({ reason: 'invalidToken' })
  }

  const verifyAuthToken = (authToken?: string) =>
    authToken ? jwt.verifyToken(authToken) : err({ reason: 'invalidToken' })

  return {
    createChallenge,
    login,
    renewAuthToken,
    verifyAuthToken,
    verifyAuthHeader
  }
}

export const authController = AuthController({})
