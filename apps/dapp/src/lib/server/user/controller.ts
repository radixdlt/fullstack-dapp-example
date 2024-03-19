import { AuditModel, TransactionModel, UserModel } from 'common'
import { getQueues } from 'queues'
import type { User, UserPhoneNumber } from 'database'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import type { ApiError, ControllerMethodContext, ControllerMethodOutput } from '../_types'
import { createApiError } from 'common'
import { dbClient } from '$lib/db'
import { config } from '$lib/config'

const UserController = ({
  userModel = UserModel(dbClient),
  queues = getQueues(config.redis),
  transactionModel = TransactionModel(dbClient)
}: Partial<{
  userModel: UserModel
  auditModel: AuditModel
  transactionModel: TransactionModel
  queues: ReturnType<typeof getQueues>
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
        phoneNumberExists(data)
          .andThen(() =>
            transactionModel(ctx.logger)
              .add({ userId, transactionKey: 'mintUserBadge', attempt: 0 })
              .andThen(() =>
                queues.transactionQueue.add({
                  traceId: ctx.traceId,
                  type: 'MintUserBadge',
                  userId,
                  attempt: 0,
                  transactionKey: `mintUserBadge`,
                  accountAddress: data.accountAddress
                })
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

  return { getUser, mintUserBadge }
}

export const userController = UserController({})
