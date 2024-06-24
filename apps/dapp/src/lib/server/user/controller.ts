import type { User } from 'database'
import { ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import type {
  ControllerDependencies,
  ControllerMethodContext,
  ControllerMethodOutput
} from '../_types'
import { config } from '$lib/config'
import { createApiError, type ApiError } from 'common'
import { type SignedChallengeAccount, parseSignedChallenge } from '@radixdlt/radix-dapp-toolkit'
import { Rola } from '@radixdlt/rola'
import { publicConfig } from '$lib/public-config'
import { type ErrorResponse } from '@radixdlt/babylon-gateway-api-sdk'
import type { TransactionJob } from 'queues'

const isGatewayError = (error: any): error is ErrorResponse => error.details !== undefined

export const UserController = ({
  userModel,
  transactionModel,
  gatewayApi
}: ControllerDependencies) => {
  const getUser = (userId: string): ControllerMethodOutput<User | null> =>
    userModel.getById(userId, {}).map((data) => ({ data, httpResponseCode: 200 }))

  const accountAddressExists = (
    data: { accountAddress: string | null } | null
  ): ResultAsync<string, ApiError> =>
    data?.accountAddress
      ? okAsync(data.accountAddress)
      : errAsync(createApiError('missing account address', 400)())

  const valueExists = (input: unknown, errorMessage: string): ResultAsync<boolean, ApiError> =>
    input ? okAsync(true) : errAsync(createApiError(errorMessage, 400)())

  const getReferrals = (ctx: ControllerMethodContext, userId: string) => {
    return userModel.getById(userId, { referredUsers: true }).map((data) => {
      return {
        data: data.referredUsers.map((user) => user.name),
        httpResponseCode: 200
      }
    })
  }

  const allowAccountAddressToMintHeroBadge = (
    ctx: ControllerMethodContext,
    {
      userId
    }: {
      userId: string
    }
  ): ControllerMethodOutput<undefined> =>
    userModel
      .getById(userId, { phoneNumber: true })
      .andThen((user) => (user ? ok(user) : err(createApiError('UserNotFound', 404)())))
      .andThen((data) =>
        ResultAsync.combine([
          valueExists((data as any).phoneNumber, 'missing phone number'),
          accountAddressExists(data)
        ])
          .andThen(([, accountAddress]) => {
            const item = {
              traceId: ctx.traceId,
              type: 'AddAccountAddressToHeroBadgeForge',
              discriminator: `AddAccountAddressToHeroBadgeForge:${userId}`,
              accountAddress,
              userId
            } satisfies TransactionJob

            return transactionModel.doesTransactionExist(item).andThen((exists) =>
              exists
                ? okAsync({ httpResponseCode: 200, data: undefined })
                : transactionModel.add(item).map(() => ({
                    httpResponseCode: 201,
                    data: undefined
                  }))
            )
          })
          .mapErr((error) => {
            ctx.logger.error({
              error,
              method: 'allowAccountAddressToMintHeroBadge',
              event: 'error'
            })
            return createApiError('allowAccountAddressToMintHeroBadgeError', 500)()
          })
      )

  const setAccountAddress = (
    ctx: ControllerMethodContext,
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
  const setUserName = (ctx: ControllerMethodContext, userId: string, name: string) => {
    if (!name) return errAsync(createApiError('name not provided', 400)())
    if (name.length > 25) return errAsync(createApiError('name cannot exceed 25 characters', 400)())

    return userModel.setUserName(userId, name).map((data) => ({ data, httpResponseCode: 200 }))
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
        transactionModel
          .add({
            userId,
            discriminator: `PopulateResources:${userId}`,
            type: 'PopulateResources',
            traceId: ctx.traceId,
            accountAddress: address
          })
          .map((data) => ({
            httpResponseCode: 201,
            data
          }))
          .mapErr((error) => {
            ctx.logger.error({ error, method: 'populateResources', event: 'error' })
            return createApiError('populateResourcesError', 500)()
          })
      )
  }

  return {
    getUser,
    allowAccountAddressToMintHeroBadge,
    setAccountAddress,
    populateResources,
    setUserName,
    getReferrals
  }
}
