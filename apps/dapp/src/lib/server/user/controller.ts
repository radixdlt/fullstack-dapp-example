import { UserModel } from './model'
import type { User } from 'database'
import { ResultAsync } from 'neverthrow'
import type { ApiError, ControllerMethodContext, ControllerMethodOutput } from '../_types'
import z from 'zod'
import { typedError } from '$lib/helpers/typed-error'

const UserController = (userModel = UserModel()) => {
  const getUser = (
    ctx: ControllerMethodContext,
    userId: string
  ): ResultAsync<User | null, ApiError> => userModel(ctx.logger).getById(userId)

  const validateAccountAddress = (accountAddress: string): ResultAsync<string, ApiError> =>
    ResultAsync.fromPromise(z.string().safeParseAsync(accountAddress), typedError)
      .map(() => accountAddress)
      .mapErr(() => ({
        httpResponseCode: 400,
        reason: 'invalidRequestBody'
      }))

  const mintUserBadge = (
    ctx: ControllerMethodContext,
    {
      accountAddress,
      userId
    }: {
      accountAddress: string
      userId: string
    }
  ): ControllerMethodOutput<undefined> =>
    ResultAsync.fromPromise(import('typescript-wallet'), typedError)
      .mapErr((error) => {
        ctx.logger.error({ error, method: 'mintUserBadge.importWallet', event: 'error' })
        return { httpResponseCode: 500, reason: 'mintUserBadgeError' } satisfies ApiError
      })
      .andThen(({ mintUserBadge: mintUserBadgeFn }) =>
        validateAccountAddress(accountAddress)
          .andThen(() =>
            mintUserBadgeFn(userId, accountAddress).mapErr((error) => {
              ctx.logger.error({ error, method: 'mintUserBadge', event: 'error' })
              return { httpResponseCode: 500, reason: 'mintUserBadgeError' } satisfies ApiError
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
