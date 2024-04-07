import { AuditModel, GatewayApi, TransactionModel, UserModel } from 'common'
import type { User, UserPhoneNumber } from 'database'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import type { ControllerMethodContext, ControllerMethodOutput } from '../_types'
import { dbClient } from '$lib/db'
import { Queue } from 'bullmq'
import { config } from '$lib/config'
import { createApiError, type ApiError } from 'common'
import { SignedChallenge, type SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
import { Rola } from '@radixdlt/rola'
import { publicConfig } from '$lib/public-config'
import { type ErrorResponse } from '@radixdlt/babylon-gateway-api-sdk'

export const Queues = {
  EventQueue: 'EventQueue',
  TransactionQueue: 'TransactionQueue'
} as const

export type DepositRewardTransactionJob = {
  type: 'DepositReward'
  questId: string
}

export type MintUserBadgeTransactionJob = {
  type: 'MintUserBadge'
  accountAddress: string
}

export type TransactionJob = {
  attempt: number
  transactionKey: string
  userId: string
  traceId: string
} & (DepositRewardTransactionJob | MintUserBadgeTransactionJob)

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
          .andThen((data) =>
            transactionModel(ctx.logger)
              .add({ userId, transactionKey: 'mintUserBadge', attempt: 0 })
              .andThen(() =>
                ResultAsync.fromPromise(
                  transactionQueue.add(ctx.traceId, {
                    traceId: ctx.traceId,
                    type: 'MintUserBadge',
                    userId,
                    attempt: 0,
                    transactionKey: `mintUserBadge`,
                    accountAddress: data[1]
                  }),
                  (error) => error
                )
              )
          )
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

    const parsedAccountResult = SignedChallenge.safeParse(proof)

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

  return { getUser, mintUserBadge, setAccountAddress }
}

export const userController = UserController({})
