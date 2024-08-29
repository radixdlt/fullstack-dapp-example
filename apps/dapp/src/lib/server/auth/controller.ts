import {
  type ControllerDependencies,
  type ControllerMethodContext,
  type ControllerMethodOutput
} from '../_types'

import { hasChallengeExpired } from './helpers/has-challenge-expired'
import { Rola } from '@radixdlt/rola'
import { SignedChallenge, parseSignedChallenge } from '@radixdlt/radix-dapp-toolkit'
import {
  type ApiError,
  CookieKeys,
  decodeBase64,
  parseJSON,
  type MarketingUtmValues,
  createApiError
} from 'common'

import { Result, ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import { type Cookies } from '@sveltejs/kit'
import { dbClient } from '$lib/db'
import { type User, type UserType } from 'database'
import { FraudRule, type FraudEvaluation } from './fraud-detection/types'
import { fraudRuleChecker } from './fraud-detection/fraud-detection'

type FraudActionHandler = (
  user: User
) => (evaluation: FraudEvaluation) => ResultAsync<FraudEvaluation, ApiError>

export type AuthController = ReturnType<typeof AuthController>
export const AuthController = ({
  jwt,
  config,
  authModel,
  userModel,
  loginAttemptModel,
  fraudDetectionModule,
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
            return err(createApiError('tooManyUsers', 400)())
          })
        : ok(undefined)
    )

  const setUserBlockedStatus: FraudActionHandler =
    (user: User) => (evaluation: FraudEvaluation) => {
      const check = fraudRuleChecker(evaluation)
      logger.trace({ method: 'login.doFraudScoring', evaluation })

      const businessLogic = () => {
        if (check.ruleRejected(FraudRule.IPQSGenerous)) {
          return userModel.setUserBlockedStatus(user.id, 'PERMANENTLY_BLOCKED')
        }

        if (check.ruleRejected(FraudRule.CountrySanctioned)) {
          return userModel.setUserBlockedStatus(user.id, 'TEMPORARILY_BLOCKED')
        }

        if (check.ruleOk(FraudRule.GoldenTicket)) {
          return okAsync(evaluation)
        }

        if (
          check.ruleRejected(FraudRule.CountryBlocked) ||
          check.ruleRejected(FraudRule.IPQSAggresive) ||
          check.ruleRejected(FraudRule.Farmer)
        ) {
          return userModel.setUserBlockedStatus(user.id, 'TEMPORARILY_BLOCKED')
        }

        return okAsync(evaluation)
      }

      return user.status === 'PERMANENTLY_BLOCKED'
        ? okAsync(evaluation)
        : businessLogic().map(() => evaluation)
    }

  const login = (
    ctx: ControllerMethodContext,
    data: {
      ip: string
      cookies: Cookies
      userAgent: string
      acceptLanguage: string
      personaProof: SignedChallenge
    }
  ): ControllerMethodOutput<{
    authToken: string
    headers: { ['Set-Cookie']: string }
  }> => {
    const { personaProof, cookies } = data

    ctx.logger.trace({ method: 'login', personaProof })
    const parsedPersonaResult = parseSignedChallenge(personaProof)
    if (!parsedPersonaResult.success) {
      if (!parsedPersonaResult.success) {
        ctx.logger.error({
          method: 'login.parseSignedChallenge.error',
          error: parsedPersonaResult.issues
        })
      }

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
                    updateDownloadWalletRequirement(user.id),
                    updateConnectWalletRequirement(user.id),
                    addUtmToDb(user.id, cookies)
                  ]).map(() => user)
                )
          ).map((user) => ({ user, isNewUser: !userExists }))
        )
      )
      .andThen(({ user, isNewUser }) =>
        fraudDetectionModule
          .evaluate({ ...data, userId: user.id })
          .andThen(({ IPQSGenerous, ...rest }) =>
            loginAttemptModel
              .add({
                type: isNewUser ? 'USER_CREATED' : 'USER_LOGIN',
                userId: user.id,
                assessmentId: IPQSGenerous.assessmentId
              })
              .map(() => ({ ...rest, IPQSGenerous }) as FraudEvaluation)
          )
          .andThen(setUserBlockedStatus(user))
          .map(() => user)
          .orElse((error) => {
            logger.error({ method: 'login.doFraudScoring', error })
            return okAsync(user)
          })
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
