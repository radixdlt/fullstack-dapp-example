import { createApiError, type ApiError } from '../_types'
import { UserDbClient } from './db'
import type { ResultAsync } from 'neverthrow'
import type { User } from 'database'
import type { AppLogger } from '$lib/helpers/logger'

export type UserModel = ReturnType<typeof UserModel>
export const UserModel =
  (client = UserDbClient()) =>
  (logger: AppLogger) => {
    const create = (identityAddress: string): ResultAsync<User, ApiError> =>
      client.upsert({ identityAddress }).mapErr((error) => {
        logger?.error({ error, method: 'createUser', model: 'UserModel' })
        return createApiError('failed to create user', 400)()
      })

    const getById = (userId: string): ResultAsync<User | null, ApiError> =>
      client.getById(userId).mapErr((error) => {
        logger?.error({ error, method: 'getById', model: 'UserModel' })
        return createApiError('failed to get user', 400)()
      })

    return { create, getById }
  }
