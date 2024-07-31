import { config } from './config'
import { PrismaClient } from 'database'
import { readReplicas } from '@prisma/extension-read-replicas'

const { user, password, host, port, database, readUrl } = config.postgres

export const dbClient: PrismaClient = new PrismaClient({
  datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
})

if (readUrl) dbClient.$extends(readReplicas({ url: readUrl }))
