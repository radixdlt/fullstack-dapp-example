import {
  type ControllerDependencies,
  type ControllerMethodContext,
  type ControllerMethodOutput
} from '../_types'

import { hasChallengeExpired } from './helpers/has-challenge-expired'
import { Rola } from '@radixdlt/rola'
import { SignedChallenge, parseSignedChallenge } from '@radixdlt/radix-dapp-toolkit'
import {
  createApiError,
  type ApiError,
  CookieKeys,
  decodeBase64,
  parseJSON,
  type MarketingUtmValues
} from 'common'

import { Result, ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import type { Cookies } from '@sveltejs/kit'

import type { UserType } from 'database'
import { dbClient } from '$lib/db'

export type AuthController = ReturnType<typeof AuthController>
export const AuthController = ({
  jwt,
  config,
  authModel,
  userModel,
  gatewayApi,
  logger,
  marketingModel
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

  const getUtmValuesFromCookie = (
    cookies: Cookies
  ): Result<MarketingUtmValues | undefined, never> => {
    const maybeValue = cookies.get(CookieKeys.Utm)
    if (!maybeValue) return ok(undefined)

    return decodeBase64(maybeValue)
      .andThen(parseJSON<MarketingUtmValues>)
      .orElse((error) => {
        logger.error({ method: 'getUtmValues.error', error })
        return ok(undefined)
      })
  }

  const addUtmToDb = (userId: string, cookies: Cookies) =>
    getUtmValuesFromCookie(cookies)
      .asyncAndThen((values) => (values ? marketingModel.add(userId, values) : okAsync(undefined)))
      .map(() => cookies.delete(CookieKeys.Utm, { path: '/' }))

  const updateConnectWalletRequirement = (userId: string) =>
    ResultAsync.fromPromise(
      dbClient.completedQuestRequirement.upsert({
        where: {
          questId_userId_requirementId: {
            userId,
            questId: 'SetupWallet',
            requirementId: 'ConnectWallet'
          }
        },
        update: {},
        create: {
          userId,
          questId: 'SetupWallet',
          requirementId: 'ConnectWallet'
        }
      }),
      (error) => {
        logger?.error({ error, method: 'updateConnectWalletRequirement', model: 'UserQuestModel' })
        return createApiError('failed to update connect wallet requirement', 400)()
      }
    )

  const updateDownloadWalletRequirement = (userId: string) =>
    ResultAsync.fromPromise(
      dbClient.completedQuestRequirement.upsert({
        where: {
          questId_userId_requirementId: {
            userId,
            questId: 'SetupWallet',
            requirementId: 'DownloadWallet'
          }
        },
        update: {},
        create: {
          userId,
          questId: 'SetupWallet',
          requirementId: 'DownloadWallet'
        }
      }),
      (error) => {
        logger?.error({
          error,
          method: 'updateDownloadWalletRequirement',
          model: 'UserQuestModel'
        })
        return createApiError('failed to update download wallet requirement', 400)()
      }
    )

  const preventFraud = (clientIp: string) =>
    userModel.getUserIdsByIp(clientIp).andThen((ids) =>
      ids.length > config.dapp.maxUserPerIp
        ? userModel.blockUsers(ids).andThen(() => {
            logger.info({
              method: 'preventFraud',
              clientIp,
              ids
            })
            return err({
              reason: 'tooManyUsers',
              jsError: undefined,
              httpResponseCode: 400
            } satisfies ApiError)
          })
        : ok(undefined)
    )

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
    ctx.logger.trace({ method: 'login', personaProof })
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
      .andThen(() =>
        userModel.doesUserExist(personaProof.address).andThen((userExists) =>
          userExists
            ? userModel.getByIdentityAddress(personaProof.address, {})
            : getReferredBy(cookies)
                .andThen((referredBy) => userModel.create(personaProof.address, referredBy))
                .andThen((user) =>
                  ResultAsync.combine([
                    updateDownloadWalletRequirement(user.id),
                    updateConnectWalletRequirement(user.id),
                    addUtmToDb(user.id, cookies)
                  ]).map(() => user)
                )
        )
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
    preventFraud,
    renewAuthToken,
    verifyAuthToken,
    verifyAuthHeader
  }
}
