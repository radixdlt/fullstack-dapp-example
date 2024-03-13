import { UserModel } from './model'
import type { User, UserPhoneNumber } from 'database'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import type { ApiError, ControllerMethodContext, ControllerMethodOutput } from '../_types'
import { importTypescriptWallet } from '../helpers/importTypescriptWallet'
import { createApiError } from 'common'
import { createDirectDepositManifest } from './helpers/createDirectDepositManifest'

const UserController = (userModel = UserModel()) => {
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

  const mintUserBadge = (
    ctx: ControllerMethodContext,
    {
      userId
    }: {
      userId: string
    }
  ): ControllerMethodOutput<undefined> =>
    importTypescriptWallet().andThen(({ radixEngineClient }) =>
      userModel(ctx.logger)
        .getById(userId, { phoneNumber: true })
        .andThen((data) =>
          phoneNumberExists(data)
            .andThen(() => radixEngineClient.getManifestBuilder())
            .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) => {
              const transactionManifest = createDirectDepositManifest({
                wellKnownAddresses,
                userId,
                accountAddress: data.accountAddress
              })

              return convertStringManifest(transactionManifest)
                .andThen((transactionManifest) =>
                  submitTransaction(transactionManifest, ['systemAccount'])
                )
                .andThen(({ txId }) =>
                  radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
                )
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
    )

  return { getUser, mintUserBadge }
}

export const userController = UserController()
