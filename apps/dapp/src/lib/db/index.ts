import type { PrismaClient as ImportedPrismaClient } from 'database'
import { createRequire } from 'module'
import { config } from '$lib/config'

const { user, password, host, port, database } = config.postgres

// ugly workaround for making PrismaClient work with SvelteKit
const require = createRequire(import.meta.url)
const { PrismaClient: RequiredPrismaClient } = require('@prisma/client')

const _PrismaClient: typeof ImportedPrismaClient = RequiredPrismaClient

class PrismaClient extends _PrismaClient {}

export type DbClient = typeof dbClient
export const dbClient = new PrismaClient({
	datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
}).$extends({
	query: {
		$allModels: {
			async upsert({ args, query, model }) {
				if (model === 'User')
					args.create = {
						...args.create,
						// String NonFungibleLocalId does not allow hyphens
						id: crypto.randomUUID().replace(/-/g, '')
					}

				return query(args)
			}
		}
	}
})
