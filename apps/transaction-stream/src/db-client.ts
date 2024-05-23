import { PrismaClient } from 'database'
import { config } from './config'

const { user, password, host, port, database } = config.postgres

export const dbClient: PrismaClient = new PrismaClient({
  datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
})
