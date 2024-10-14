import { ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import type {
  ControllerDependencies,
  ControllerMethodContext,
  ControllerMethodOutput
} from '../_types'
import { config } from '$lib/config'
import { createApiError, getPriorityByGoldenTicketType, type ApiError } from 'common'
import { type SignedChallengeAccount, parseSignedChallenge } from '@radixdlt/radix-dapp-toolkit'
import { Rola } from '@radixdlt/rola'
import { publicConfig } from '$lib/public-config'
import { type ErrorResponse } from '@radixdlt/babylon-gateway-api-sdk'
import type { TransactionJob } from 'queues'
import * as valibot from 'valibot'
import type { GoldenTicketStatus, Prisma, TicketType, User, UserEmail } from 'database'
export type UserSubset = {
  id: string
  accountAddress: string | null
  referralCode: string
  referredBy: string | null
  type: string
  email: {
    email: string
    newsletter: boolean
  } | null
  referredByUser: {
    name: string | null
  } | null
  goldenTicketClaimed: {
    type: TicketType
    status: GoldenTicketStatus
  } | null
}

const isGatewayError = (error: any): error is ErrorResponse => error.details !== undefined
const EmailSchema = valibot.object({
  email: valibot.pipe(
    valibot.string(),
    valibot.nonEmpty('Please enter your email.'),
    valibot.email('The email is badly formatted.')
  )
})
export type UserController = ReturnType<typeof UserController>
export const UserController = ({
  userModel,
  goldenTicketModel,
  transactionModel,
  gatewayApi,
  mailerLiteModel,
  addresses,
  systemQueue
}: ControllerDependencies) => {
  const getUser = (userId: string): ControllerMethodOutput<UserSubset | null> =>
    userModel
      .getById(userId, {
        email: true,
        referredByUser: true,
        goldenTicketClaimed: { include: { batch: true } }
      })
      .map((data) => {
        const email = (data as unknown as { email: UserEmail | null }).email
        const referredByUser = (data as unknown as { referredByUser: User | null }).referredByUser
        const goldenTicketClaimed = (
          data as unknown as {
            goldenTicketClaimed: Prisma.GoldenTicketGetPayload<{ include: { batch: true } }> | null
          }
        ).goldenTicketClaimed

        return {
          data: {
            id: data.id,
            referredBy: data.referredBy,
            accountAddress: data.accountAddress,
            referralCode: data.referralCode,
            type: data.type,
            status: data.status,
            email: email
              ? {
                  email: email.email,
                  newsletter: email.newsletter
                }
              : null,
            referredByUser: referredByUser
              ? {
                  name: referredByUser.name
                }
              : null,
            goldenTicketClaimed: goldenTicketClaimed
              ? {
                  type: goldenTicketClaimed.batch.type,
                  status: goldenTicketClaimed.status
                }
              : null
          },
          httpResponseCode: 200
        }
      })

  const accountAddressExists = (
    data: { accountAddress: string | null } | null
  ): ResultAsync<string, ApiError> =>
    data?.accountAddress
      ? okAsync(data.accountAddress)
      : errAsync(createApiError('missing account address', 400)())

  const getReferrals = (userId: string) => {
    return userModel.getReferrals(userId).map((data) => {
      return {
        data: data,
        httpResponseCode: 200
      }
    })
  }

  const depositHeroBadge = (
    ctx: ControllerMethodContext,
    {
      userId
    }: {
      userId: string
    }
  ): ControllerMethodOutput<undefined> =>
    userModel
      .getById(userId, { goldenTicketClaimed: { include: { batch: true } } })
      .andThen((user) => (user ? ok(user) : err(createApiError('UserNotFound', 404)())))
      .andThen((user) =>
        user.status !== 'OK' ? errAsync(createApiError('UserBlocked', 400)()) : okAsync(user)
      )
      .andThen((user) =>
        accountAddressExists(user)
          .andThen((accountAddress) =>
            gatewayApi
              .isDepositAllowedForResource(accountAddress, publicConfig.badges.heroBadgeAddress)
              .andThen((isDepositAllowed) =>
                isDepositAllowed
                  ? okAsync(user)
                  : errAsync(createApiError('DepositRuleDisabled', 400)())
              )
          )
          .andThen((user) => {
            const item = {
              traceId: ctx.traceId,
              type: 'DepositHeroBadge',
              discriminator: `DepositHeroBadge:${userId}`,
              accountAddress: user.accountAddress!,
              userId
            } satisfies TransactionJob

            return transactionModel.doesTransactionExist(item).andThen((exists) =>
              exists
                ? okAsync({ httpResponseCode: 200, data: undefined })
                : transactionModel
                    // @ts-ignore
                    .add(item, getPriorityByGoldenTicketType(user?.goldenTicketClaimed))
                    .map(() => ({
                      httpResponseCode: 201,
                      data: undefined
                    }))
            )
          })
          .mapErr((error) => {
            ctx.logger.error({
              error,
              method: 'depositHeroBadge',
              event: 'error'
            })
            return createApiError('depositHeroBadgeError', 500)()
          })
      )

  const setAccountAddress = (
    userId: string,
    accountAddress: string,
    proof: SignedChallengeAccount
  ) => {
    const hasHeroBadge = gatewayApi
      .callApi('getEntityDetailsVaultAggregated', [accountAddress])
      .map(
        ([entityDetails]) =>
          entityDetails.non_fungible_resources.items
            .find((item) => item.resource_address === publicConfig.badges.heroBadgeAddress)
            ?.vaults.items.some(
              (vault) => vault.total_count > 0 && vault.items?.some((item) => item === userId)
            ) ?? false
      )

    const isAccountInDb = userModel
      .isAccountAddressUsed(accountAddress)
      .andThen((isUsed) =>
        isUsed ? errAsync(createApiError('AccountAddressAlreadyInUse', 400)()) : okAsync(undefined)
      )

    const parsedAccountResult = parseSignedChallenge(proof)

    if (!parsedAccountResult.success || proof.address !== accountAddress) {
      return errAsync(createApiError('invalid proof', 400)())
    }

    const { verifySignedChallenge } = Rola({
      applicationName: 'RadQuest dApp',
      gatewayApiClient: gatewayApi.gatewayApiClient,
      dAppDefinitionAddress: config.dapp.dAppDefinitionAddress,
      networkId: config.dapp.networkId,
      expectedOrigin: config.dapp.expectedOrigin
    })

    return hasHeroBadge
      .andThen((hasBadge) =>
        hasBadge
          ? errAsync({
              httpResponseCode: 400,
              reason: 'account already has hero badge'
            } satisfies ApiError)
          : okAsync(undefined)
      )
      .andThen(() => isAccountInDb)
      .andThen(() => verifySignedChallenge(proof))
      .mapErr((error) => {
        return {
          httpResponseCode: 400,
          reason: isGatewayError(error) ? error.message : error.reason
        } satisfies ApiError
      })
      .andThen(() =>
        userModel
          .addAccount(userId, accountAddress)
          .map((data) => ({ data, httpResponseCode: 200 }))
      )
  }

  const setUserName = (userId: string, name: string) => {
    if (!name) return errAsync(createApiError('name not provided', 400)())
    if (name.length > 25) return errAsync(createApiError('name cannot exceed 25 characters', 400)())

    return userModel.setUserName(userId, name).map((data) => ({ data, httpResponseCode: 200 }))
  }

  const doesTransactionExist = (userId: string, discriminator: string) =>
    transactionModel
      .doesTransactionExist({ userId, discriminator })
      .map((exists) => ({ data: { exists }, httpResponseCode: 200 }))

  const hasWaitingRadgemJob = (userId: string) =>
    transactionModel
      .hasWaitingRadgemJob(userId)
      .map((exists) => ({ data: { exists }, httpResponseCode: 200 }))

  const setEmail = (userId: string, email: string, newsletter: boolean) => {
    const parseResult = valibot.safeParse(EmailSchema, { email })
    if (!parseResult.success) {
      return errAsync(createApiError('Invalid email format', 400)(parseResult.issues))
    }

    return userModel
      .setEmail(userId, email, newsletter)
      .andThen(() => mailerLiteModel.addOrUpdate(email, { newsletter }))
      .map(() => ({ httpResponseCode: 200, data: {} }))
  }

  const populateResources = (ctx: ControllerMethodContext, userId: string) => {
    if (config.dapp.networkId === 1)
      return errAsync(createApiError('not allowed on mainnet', 400)())

    const accountAddressResult = userModel
      .getById(userId, {})
      .andThen((user) => (user ? ok(user) : err(createApiError('UserNotFound', 404)())))
      .map((data) => data.accountAddress)

    return accountAddressResult
      .andThen((address) => {
        if (!address) return errAsync(createApiError('missing account address', 400)())
        return okAsync(address)
      })
      .andThen((address) =>
        systemQueue.add([
          {
            userId,
            type: 'PopulateResources',
            id: ctx.traceId,
            accountAddress: address
          }
        ])
      )
      .map((data) => ({
        httpResponseCode: 201,
        data
      }))
      .mapErr((error) => {
        ctx.logger.error({ error, method: 'populateResources', event: 'error' })
        return createApiError('populateResourcesError', 500)()
      })
  }

  const directDepositXrd = (ctx: ControllerMethodContext, userId: string) => {
    const discriminator = `DepositXrd:${userId}`

    return goldenTicketModel
      .userHasClaimedTicket(userId)
      .mapErr((error) => createApiError('InternalError', 500)(error))
      .andThen((ticket) => {
        if (!ticket) return errAsync(createApiError('UserHasNoTicket', 400)())
        return okAsync(undefined)
      })
      .andThen(() =>
        userModel.getById(userId, { goldenTicketClaimed: { include: { batch: true } } })
      )
      .andThen((user) =>
        user.status !== 'OK' ? errAsync(createApiError('UserBlocked', 400)()) : okAsync(user)
      )
      .andThen((user) =>
        user?.accountAddress ? ok(user) : err(createApiError('UserAccountAddressNotSet', 400)())
      )
      .andThen((user) =>
        gatewayApi
          .isDepositAllowedForResource(user.accountAddress!, addresses.xrd)
          .mapErr((error) => {
            ctx.logger.error({ method: 'directDepositXrd.error', error })
            return createApiError('InternalError', 500)(error)
          })
          .map((isAllowed) => ({ isDisabled: !isAllowed, user }))
      )
      .andThen(({ isDisabled, user }) =>
        isDisabled ? err(createApiError('DepositDisabledForXrd', 400)()) : ok(user)
      )
      .andThen((user) =>
        transactionModel.doesTransactionExist({ userId, discriminator }).andThen((exists) =>
          exists
            ? okAsync({
                httpResponseCode: 200,
                data: {}
              })
            : transactionModel
                .add(
                  {
                    userId,
                    discriminator: `DepositXrd:${userId}`,
                    type: 'DepositXrd',
                    traceId: ctx.traceId,
                    accountAddress: user.accountAddress!
                  },
                  // @ts-ignore
                  getPriorityByGoldenTicketType(user?.goldenTicketClaimed)
                )
                .map(() => ({
                  httpResponseCode: 201,
                  data: {}
                }))
                .mapErr((error) => {
                  ctx.logger.error({ method: 'directDepositXrd.error', error })
                  return createApiError('InternalError', 500)(error)
                })
        )
      )
  }

  const getNameByReferralCode = (referralCode: string) =>
    userModel
      .getByReferralCode(referralCode)
      .map((data) => ({ data: { name: data.name }, httpResponseCode: 200 }))

  return {
    getUser,
    doesTransactionExist,
    hasWaitingRadgemJob,
    depositHeroBadge,
    setAccountAddress,
    populateResources,
    getNameByReferralCode,
    setUserName,
    getReferrals,
    directDepositXrd,
    setEmail
  }
}
