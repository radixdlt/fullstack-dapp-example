import { createApiError, type ApiError } from '../_types'
import { ResultAsync } from 'neverthrow'
import type { User, UserPhoneNumber } from 'database'
import type { AppLogger } from '$lib/helpers/logger'
import { dbClient } from '$lib/db'

export type UserModel = ReturnType<typeof UserModel>
export const UserModel =
  (db = dbClient) =>
  (logger: AppLogger) => {
    const create = (identityAddress: string, accountAddress: string): ResultAsync<User, ApiError> =>
      ResultAsync.fromPromise<User, ApiError>(
        db.user.upsert({
          create: { identityAddress, accountAddress },
          update: {},
          where: { identityAddress, accountAddress }
        }),
        (error) => {
          logger?.error({ error, method: 'createUser', model: 'UserModel' })
          return createApiError('failed to create user', 400)()
        }
      )

    const getById = (id: string): ResultAsync<User | null, ApiError> =>
      ResultAsync.fromPromise<User | null, ApiError>(
        db.user.findUnique({ where: { id } }),
        (error) => {
          logger?.error({ error, method: 'getById', model: 'UserModel' })
          return createApiError('failed to get user', 400)()
        }
      )

    const getPhoneNumber = (phoneNumber: string): ResultAsync<UserPhoneNumber | null, ApiError> =>
      ResultAsync.fromPromise<UserPhoneNumber | null, ApiError>(
        db.userPhoneNumber.findFirst({
          where: { phoneNumber }
        }),
        (error) => {
          logger?.error({ error, method: 'getPhoneNumber', model: 'UserModel' })
          return createApiError('failed to get phone number', 400)()
        }
      )

    return { create, getById, getPhoneNumber }
  }
