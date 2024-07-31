import { config } from './config'
import { PrismaClient } from 'database'
import { readReplicas } from '@prisma/extension-read-replicas'

const { user, password, host, port, database, readUrl } = config.postgres

export const dbClient: PrismaClient = new PrismaClient({
  datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
}).$extends(readReplicas({ url: readUrl! })) as unknown as PrismaClient
