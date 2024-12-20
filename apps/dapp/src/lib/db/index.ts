import { PrismaClient } from 'database'
import { readReplicas } from '@prisma/extension-read-replicas'
import { config } from '$lib/config'

const { url, readUrl } = config.postgres

const extendReadReplicas = (dbClient: PrismaClient) => {
  if (readUrl) {
    return dbClient.$extends(readReplicas({ url: readUrl })) as unknown as PrismaClient
  }

  return dbClient as unknown as PrismaClient
}

export type DbClient = typeof dbClient
export const dbClient = extendReadReplicas(
  new PrismaClient({
    datasourceUrl: url
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
  }) as unknown as PrismaClient
)
