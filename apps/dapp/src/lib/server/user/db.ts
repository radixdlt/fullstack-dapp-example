import type { Prisma, User } from '@prisma/client';
import { ResultAsync } from 'neverthrow';
import { dbClient } from '$lib/db';
import { typedError } from '$lib/helpers/typed-error';

export type UserDbClient = ReturnType<typeof UserDbClient>;
export const UserDbClient = (db = dbClient) => {
	const upsert = ({ identityAddress }: Prisma.UserCreateInput) => {
		return ResultAsync.fromPromise<User, Error>(
			db.user.upsert({
				create: { identityAddress },
				update: {},
				where: { identityAddress }
			}),
			typedError
		);
	};

	const getById = (identityAddress: string) =>
		ResultAsync.fromPromise<User | null, Error>(
			dbClient.user.findUnique({ where: { identityAddress } }),
			typedError
		);

	return { upsert, getById };
};
