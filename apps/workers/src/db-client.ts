import { config } from './config'
import { PrismaClient } from 'database'

const { user, password, host, port, database } = config.postgres

export const dbClient = new PrismaClient({
  datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
})
