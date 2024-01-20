import { createApiError, type ApiError } from '../_types'
import { UserDbClient } from './db'
import { appLogger } from '$lib/helpers/logger'
import type { ResultAsync } from 'neverthrow'
import type { User } from 'database'

export type UserModel = ReturnType<typeof UserModel>
export const UserModel = (db = UserDbClient()) => {
	const create = (identityAddress: string): ResultAsync<User, ApiError> =>
		db.upsert({ identityAddress }).mapErr((error) => {
			appLogger.error({ error, method: 'createUser' })
			return createApiError('failed to create user', 400)()
		})

	const getById = (identityAddress: string): ResultAsync<User | null, ApiError> =>
		db.getById(identityAddress).mapErr((error) => {
			appLogger.error({ error, method: 'getById' })
			return createApiError('failed to get user', 400)()
		})

	return { create, getById }
}
