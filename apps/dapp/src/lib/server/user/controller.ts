import { AuditModel, GatewayApi, TransactionModel, UserModel } from 'common'
import type { User, UserPhoneNumber } from 'database'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import type { ControllerMethodContext, ControllerMethodOutput } from '../_types'
import { dbClient } from '$lib/db'
import { Queue } from 'bullmq'
import { config } from '$lib/config'
import { createApiError, type ApiError } from 'common'
import { type SignedChallengeAccount, parseSignedChallenge } from '@radixdlt/radix-dapp-toolkit'
import { Rola } from '@radixdlt/rola'
import { publicConfig } from '$lib/public-config'
import { type ErrorResponse } from '@radixdlt/babylon-gateway-api-sdk'
import type { TransactionJob } from 'queues'

export const Queues = {
  EventQueue: 'EventQueue',
  TransactionQueue: 'TransactionQueue'
} as const

const isGatewayError = (error: any): error is ErrorResponse => error.details !== undefined

const UserController = ({
  userModel = UserModel(dbClient),
  transactionQueue = new Queue<TransactionJob>('TransactionQueue', { connection: config.redis }),
  transactionModel = TransactionModel(dbClient)
}: Partial<{
  userModel: UserModel
  auditModel: AuditModel
  transactionModel: TransactionModel
  transactionQueue: Queue<TransactionJob>
}>) => {
  const getUser = (
    ctx: ControllerMethodContext,
    userId: string
  ): ControllerMethodOutput<User | null> =>
    userModel(ctx.logger)
      .getById(userId, {})
      .map((data) => ({ data, httpResponseCode: 200 }))

  const phoneNumberExists = (
    data: { phoneNumber: UserPhoneNumber | null } | null
  ): ResultAsync<UserPhoneNumber, ApiError> =>
    data?.phoneNumber
      ? okAsync(data?.phoneNumber)
      : errAsync(createApiError('missing phone number verification', 400)())

  const accountAddressExists = (
    data: { accountAddress: string | null } | null
  ): ResultAsync<string, ApiError> =>
    data?.accountAddress
      ? okAsync(data.accountAddress)
      : errAsync(createApiError('missing account address', 400)())

  const mintUserBadge = (
    ctx: ControllerMethodContext,
    {
      userId
    }: {
      userId: string
    }
  ): ControllerMethodOutput<undefined> =>
    userModel(ctx.logger)
      .getById(userId, { phoneNumber: true })
      .andThen((data) =>
        ResultAsync.combine([phoneNumberExists(data), accountAddressExists(data)])
          .andThen((data) => {
            const badgeId = `<${userId}>`
            const badgeResourceAddress = publicConfig.badges.userBadgeAddress
            return transactionModel(ctx.logger)
              .add({
                badgeId,
                badgeResourceAddress,
                transactionKey: 'mintUserBadge',
                attempt: 0
              })
              .andThen(() => {
                const job = {
                  traceId: ctx.traceId,
                  type: 'MintUserBadge',
                  badgeId,
                  badgeResourceAddress,
                  attempt: 0,
                  transactionKey: `mintUserBadge`,
                  accountAddress: data[1]
                } satisfies TransactionJob

                ctx.logger.debug({ method: 'userController.mintUserBadge.addJobToQueue', job })

                return ResultAsync.fromPromise(
                  transactionQueue.add(ctx.traceId, job, { jobId: ctx.traceId }),
                  (error) => error
                )
              })
          })
          .mapErr((error) => {
            ctx.logger.error({ error, method: 'mintUserBadge', event: 'error' })
            return createApiError('mintUserBadgeError', 500)()
          })
      )
      .map(() => ({
        httpResponseCode: 201,
        data: undefined
      }))

  const setAccountAddress = (
    ctx: ControllerMethodContext,
    userId: string,
    accountAddress: string,
    proof: SignedChallengeAccount
  ) => {
    const hasUserBadge = GatewayApi(publicConfig.networkId)
      .callApi('getEntityDetailsVaultAggregated', [accountAddress])
      .map(
        ([entityDetails]) =>
          entityDetails.non_fungible_resources.items
            .find((item) => item.resource_address === publicConfig.badges.userBadgeAddress)
            ?.vaults.items.some(
              (vault) =>
                vault.total_count > 0 && vault.items?.some((item) => item === `<${userId}>`)
            ) ?? false
      )

    const parsedAccountResult = parseSignedChallenge(proof)

    if (!parsedAccountResult.success || proof.address !== accountAddress) {
      return errAsync(createApiError('invalid proof', 400)())
    }

    const { verifySignedChallenge } = Rola({
      applicationName: 'RadQuest dApp',
      gatewayApiClient: GatewayApi(config.dapp.networkId).gatewayApiClient,
      dAppDefinitionAddress: config.dapp.dAppDefinitionAddress,
      networkId: config.dapp.networkId,
      expectedOrigin: config.dapp.expectedOrigin
    })

    return hasUserBadge
      .andThen((hasBadge) =>
        hasBadge
          ? errAsync({
              httpResponseCode: 400,
              reason: 'account already has user badge'
            } satisfies ApiError)
          : okAsync(undefined)
      )
      .andThen(() => verifySignedChallenge(proof))
      .mapErr((error) => {
        return {
          httpResponseCode: 400,
          reason: isGatewayError(error) ? error.message : error.reason
        } satisfies ApiError
      })
      .andThen(() =>
        userModel(ctx.logger)
          .addAccount(userId, accountAddress)
          .map((data) => ({ data, httpResponseCode: 200 }))
      )
  }
  const setUserName = (ctx: ControllerMethodContext, userId: string, name: string) => {
    if (!name) return createApiError('name not provided', 400)
    if (name.length > 25) return createApiError('name cannot exceed 25 characters', 400)

    return userModel(ctx.logger)
      .setUserName(userId, name)
      .map((data) => ({ data, httpResponseCode: 200 }))
  }

  const populateResources = (ctx: ControllerMethodContext, userId: string) => {
    if (config.dapp.networkId === 1)
      return errAsync(createApiError('not allowed on mainnet', 400)())

    const accountAddressResult = userModel(ctx.logger)
      .getById(userId, {})
      .map((data) => data.accountAddress)

    const badgeId = `<${userId}>`
    const badgeResourceAddress = publicConfig.badges.userBadgeAddress

    return accountAddressResult
      .andThen((address) => {
        if (!address) return errAsync(createApiError('missing account address', 400)())
        return okAsync(address)
      })
      .andThen((address) =>
        transactionModel(ctx.logger)
          .add({
            badgeId,
            badgeResourceAddress,
            transactionKey: 'populateResources',
            attempt: 0
          })
          .andThen(() => {
            const job = {
              traceId: ctx.traceId,
              type: 'PopulateResources',
              badgeId,
              badgeResourceAddress,
              attempt: 0,
              transactionKey: `populateResources`,
              accountAddress: address
            } satisfies TransactionJob

            ctx.logger.debug({ method: 'userController.populateResources.addJobToQueue', job })

            return ResultAsync.fromPromise(
              transactionQueue.add(ctx.traceId, job, { jobId: ctx.traceId }),
              (error) => error
            ).map((data) => ({
              httpResponseCode: 201,
              data
            }))
          })
          .mapErr((error) => {
            ctx.logger.error({ error, method: 'populateResources', event: 'error' })
            return createApiError('populateResourcesError', 500)()
          })
      )
  }

  return { getUser, mintUserBadge, setAccountAddress, populateResources, setUserName }
}

export const userController = UserController({})
