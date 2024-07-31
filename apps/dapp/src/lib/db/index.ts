import { PrismaClient } from 'database'
import { readReplicas } from '@prisma/extension-read-replicas'
import { config } from '$lib/config'

const { user, password, host, port, database, readUrl } = config.postgres

export type DbClient = typeof dbClient
export const dbClient = new PrismaClient({
  datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
}).$extends({
  ...(readUrl ? readReplicas({ url: readUrl }) : {}),
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
