import { UserModel } from './model'
import type { User } from 'database'
import type { AppLogger } from '@radixdlt/radix-dapp-toolkit'
import type { ResultAsync } from 'neverthrow'
import type { ApiError } from '../_types'

export type UserControllerInput = Partial<{
	userModel: UserModel
	logger: AppLogger
}>
const UserController = ({ userModel = UserModel() }: UserControllerInput) => {
	const getUser = (identityAddress: string): ResultAsync<User | null, ApiError> =>
		userModel.getById(identityAddress)

	return { getUser }
}

export const userController = UserController({})
