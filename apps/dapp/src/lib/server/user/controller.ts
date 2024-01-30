import { UserModel } from './model'
import type { User } from 'database'
import type { AppLogger } from '@radixdlt/radix-dapp-toolkit'
import { ResultAsync } from 'neverthrow'
import type { ApiError, ControllerMethodOutput } from '../_types'
import z from 'zod'
import { mintUserBadge as mintUserBadgeFn } from 'typescript-wallet'
import { appLogger } from '$lib/helpers/logger'
import { typedError } from '$lib/helpers/typed-error'

export type UserControllerInput = Partial<{
  userModel: UserModel
  logger: AppLogger
}>
const UserController = ({ userModel = UserModel() }: UserControllerInput) => {
	const getUser = (userId: string): ResultAsync<User | null, ApiError> => userModel.getById(userId)

	const validateAccountAddress = (accountAddress: string): ResultAsync<string, ApiError> =>
		ResultAsync.fromPromise(z.string().safeParseAsync(accountAddress), typedError)
			.map(() => accountAddress)
			.mapErr(() => ({
				httpResponseCode: 400,
				reason: 'invalidRequestBody'
			}))

	const mintUserBadge = ({
		accountAddress,
		userId
	}: {
		accountAddress: string
		userId: string
	}): ControllerMethodOutput<undefined> =>
		validateAccountAddress(accountAddress).andThen(() =>
			mintUserBadgeFn(userId, accountAddress)
				.mapErr((error) => {
					appLogger.error({ error, method: 'mintUserBadge', event: 'error' })
					return { httpResponseCode: 500, reason: 'mintUserBadgeError' }
				})
				.map(() => ({
					httpResponseCode: 201,
					data: undefined
				}))
		)

	return { getUser, mintUserBadge }
}

export const userController = UserController({})
