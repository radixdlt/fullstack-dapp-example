import { PrismaClient } from 'database'
import { config } from './config'
import { appLogger } from 'common'

const { user, password, host, port, database } = config.postgres

export const DbClient = async () => {
  const db = new PrismaClient({
    datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
  })

  await db.event.findFirst()
  appLogger.debug({ method: 'DbClient', event: 'ConnectionSuccess' })

  return db
}
