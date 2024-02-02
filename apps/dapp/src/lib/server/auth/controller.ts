import { appLogger, type AppLogger } from '$lib/helpers/logger'
import type { ControllerMethodOutput } from '../_types'

import { hasChallengeExpired } from './helpers/has-challenge-expired'
import { Rola } from '@radixdlt/rola'
import { SignedChallenge, type GatewayApiClient } from '@radixdlt/radix-dapp-toolkit'

import { err, errAsync, ok } from 'neverthrow'
import { JWT } from './jwt'
import { AuthModel } from './model'
import type { Cookies } from '@sveltejs/kit'

import { config, type Config } from '$lib/config'
import { UserModel } from '../user/model'

export type AuthControllerInput = Partial<{
  authModel: AuthModel
  userModel: UserModel
  jwt: JWT
  dAppConfig: Config['dapp']
  logger: AppLogger
  gatewayApiClient: GatewayApiClient
}>
export type AuthController = ReturnType<typeof AuthController>
export const AuthController = ({
  authModel = AuthModel(),
  userModel = UserModel(),
  jwt = JWT(config.jwt),
  logger = appLogger,
  dAppConfig = config.dapp,
  gatewayApiClient
}: AuthControllerInput) => {
  const { verifySignedChallenge } = Rola({
    applicationName: 'RadQuest dApp',
    gatewayApiClient,
    ...dAppConfig
  })

  const createChallenge = (): ControllerMethodOutput<{ challenge: string }> =>
    authModel.createChallenge().map((challenge) => ({ data: { challenge }, httpResponseCode: 201 }))

  const login = (
    signedChallenge: SignedChallenge,
    cookies: Cookies
  ): ControllerMethodOutput<{
    authToken: string
    headers: { ['Set-Cookie']: string }
  }> => {
    logger?.trace({ signedChallenge, method: 'login' })

    if (!SignedChallenge.safeParse(signedChallenge))
      return errAsync({
        httpResponseCode: 400,
        reason: 'invalidRequestBody'
      })

    return authModel
      .getAndDeleteChallenge(signedChallenge.challenge)
      .andThen((challenge) =>
        challenge ? ok(challenge) : err({ reason: 'challengeNotFound', jsError: undefined })
      )
      .andThen(hasChallengeExpired)
      .andThen(() => verifySignedChallenge(signedChallenge))
      .mapErr(({ reason, jsError }) => ({
        httpResponseCode: 400,
        reason,
        jsError
      }))
      .andThen(() => userModel.create(signedChallenge.address))
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
