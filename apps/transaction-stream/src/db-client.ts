import { PrismaClient } from 'database'
import { config } from './config'
import { readReplicas } from '@prisma/extension-read-replicas'

const { url, readUrl } = config.postgres

export const dbClient = new PrismaClient({
  datasourceUrl: url
}).$extends(readReplicas({ url: readUrl! })) as unknown as PrismaClient
