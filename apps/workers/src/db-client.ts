import { config } from './config'
import { PrismaClient } from 'database'

const { url } = config.postgres

export const dbClient: PrismaClient = new PrismaClient({
  datasourceUrl: url
})
