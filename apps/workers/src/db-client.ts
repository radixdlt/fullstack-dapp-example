import { appLogger } from 'common'
import { config } from './config'
import { PrismaClient } from 'database'

const { user, password, host, port, database } = config.postgres

export const dbClient: PrismaClient = new PrismaClient({
  datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
})
