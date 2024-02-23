import { config } from './config'
import { ConnectionOptions } from 'bullmq'
import { PrismaClient } from 'database'
import { EventWorker } from './workers/event-worker'

const app = async () => {
  const { user, password, host, port, database } = config.postgres

  const dbClient = new PrismaClient({
    datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
  })

  // test db connection
  await dbClient.user.findFirst()

  const connection: ConnectionOptions = config.redis

  const eventWorker = EventWorker(connection)
}

app()
