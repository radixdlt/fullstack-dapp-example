import {
  type ControllerDependencies,
  type ControllerMethodContext,
  type ControllerMethodOutput
} from '../_types'

import { hasChallengeExpired } from './helpers/has-challenge-expired'
import { Rola } from '@radixdlt/rola'
import { SignedChallenge, parseSignedChallenge } from '@radixdlt/radix-dapp-toolkit'

import { Result, ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import type { Cookies } from '@sveltejs/kit'

import {
  type ApiError,
  CookieKeys,
  decodeBase64,
  parseJSON,
  type MarketingUtmValues,
  createApiError,
  EventId
} from 'common'

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
  eventModel,
  eventQueue,
  goldenTicketModel,
  userQuestModel,
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

  const retryCancelledEvents = (userId: string) =>
    eventModel.getTemporarilyCancelledEvents(userId).andThen((events) => {
      return ResultAsync.combineWithAllErrors(
        events.map((event) => {
          const jobData = {
            data: event.data as Record<string, unknown>,
            eventId: event.id,
            type: event.id as EventId,
            transactionId: event.transactionId,
            userId: event.userId,
            traceId: crypto.randomUUID()
          }
          return eventQueue.remove(jobData.transactionId).andThen(() => eventQueue.add([jobData]))
        })
      ).mapErr((error) => {
        logger.error({ method: 'retryCancelledEvents', error })
        return createApiError('failed to retry cancelled events', 400)(error)
      })
    })

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
          return userModel
            .setUserBlockedStatus(user.id, 'OK')
            .andThen(() => retryCancelledEvents(user.id))
        }

        if (
          check.ruleRejected(FraudRule.CountryBlocked) ||
          check.ruleRejected(FraudRule.IPQSAggresive) ||
          check.ruleRejected(FraudRule.Farmer)
        ) {
          return userModel.setUserBlockedStatus(user.id, 'TEMPORARILY_BLOCKED')
        }

        return userModel
          .setUserBlockedStatus(user.id, 'OK')
          .andThen(() => retryCancelledEvents(user.id))
      }

      return user.status === 'PERMANENTLY_BLOCKED'
        ? okAsync(evaluation)
        : businessLogic().map(() => evaluation)
    }

  const claimGoldenTicket = (
    goldenTicket: string | undefined,
    data: { user: User; isNewUser: boolean }
  ) =>
    goldenTicket
      ? goldenTicketModel
          .claimTicket(goldenTicket, data.user.id)
          .map(() => data)
          .mapErr((error) => createApiError('failed to claim golden ticket', 400)(error))
      : okAsync(data)

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
    id: string
  }> => {
    const { personaProof, cookies } = data
    const goldenTicket = cookies.get(CookieKeys.GoldenTicket)
    cookies.delete(CookieKeys.GoldenTicket, { path: '/' })

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
                    userQuestModel.setConnectWalletRequirement(user.id),
                    addUtmToDb(user.id, cookies)
                  ]).map(() => user)
                )
          ).map((user) => ({ user, isNewUser: !userExists }))
        )
      )
      .andThen((data) => claimGoldenTicket(goldenTicket, data))
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
