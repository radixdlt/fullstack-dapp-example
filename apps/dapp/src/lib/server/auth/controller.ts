import {
  type ControllerDependencies,
  type ControllerMethodContext,
  type ControllerMethodOutput
} from '../_types'

import { hasChallengeExpired } from './helpers/has-challenge-expired'
import { Rola } from '@radixdlt/rola'
import { SignedChallenge, parseSignedChallenge } from '@radixdlt/radix-dapp-toolkit'

import { ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import type { Cookies } from '@sveltejs/kit'

import { type ApiError, createApiError } from 'common'

import { type UserType } from 'database'

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
        ctx.logger.trace({ method: 'createChallenge', event: 'success', challenge })
        return { data: { challenge }, httpResponseCode: 201 }
      })
      .mapErr((error) => {
        ctx.logger.error({ method: 'createChallenge.error', error })
        return error
      })

  const getReferredBy = (cookies: Cookies): ResultAsync<string | undefined, ApiError> => {
    const referredBy = cookies.get('referredBy')
    return referredBy ? userModel.confirmReferralCode(referredBy) : okAsync(undefined)
  }

  const login = (
    ctx: ControllerMethodContext,
    data: {
      ip: string
      cookies: Cookies
      personaProof: SignedChallenge
    }
  ): ControllerMethodOutput<{
    authToken: string
    headers: { ['Set-Cookie']: string }
    id: string
  }> => {
    const { personaProof, cookies } = data

    ctx.logger.trace({ method: 'login', personaProof })
    const parsedPersonaResult = parseSignedChallenge(personaProof)
    if (!parsedPersonaResult.success) {
      ctx.logger.error({
        method: 'login.parseSignedChallenge.error',
        error: parsedPersonaResult.issues
      })

      return errAsync(createApiError('invalidRequestBody', 400)())
    }

    return authModel(ctx.logger)
      .getAndDeleteChallenge(personaProof.challenge)
      .andThen((challenge) => {
        if (challenge) return ok(challenge)
        ctx.logger.error({
          method: 'login.getAndDeleteChallenge.error',
          error: 'challengeNotFound'
        })
        return challenge ? ok(challenge) : err(createApiError('challengeNotFound', 400)())
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
          .mapErr((error) => createApiError(error.reason, 400)(error.jsError))
      )
      .andThen(() =>
        userModel.doesUserExist(personaProof.address).andThen((userExists) =>
          (userExists
            ? userModel.getByIdentityAddress(personaProof.address, {})
            : getReferredBy(cookies)
                .andThen((referredBy) => userModel.create(personaProof.address, referredBy))
                .andThen((user) =>
                  ResultAsync.combine([
                    userQuestModel.setDownloadWalletRequirement(user.id),
                    userQuestModel.setConnectWalletRequirement(user.id)
                  ]).map(() => user)
                )
          ).map((user) => ({ user, isNewUser: !userExists }))
        )
      )
      .map(({ user }) => ({
        id: user.id,
        type: user.type
      }))
      .andThen(({ id, type }) =>
        jwt.createTokens(id, type).map(({ authToken, refreshToken }) => ({
          data: {
            authToken,
            headers: jwt.createRefreshTokenCookie(refreshToken, cookies),
            id
          },
          httpResponseCode: 200
        }))
      )
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
