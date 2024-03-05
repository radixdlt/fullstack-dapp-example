import { TransactionWorker } from './workers/transaction-worker'
import { config } from './config'
import { ConnectionOptions } from 'bullmq'
import { PrismaClient } from 'database'
import { EventWorker } from './workers/event-worker'
import { NotificationApi } from 'common'
import { logger } from './helpers/logger'
import { getQueues } from 'queues'

const app = async () => {
  const { user, password, host, port, database } = config.postgres

  const dbClient = new PrismaClient({
    datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
  })

  // test db connection
  await dbClient.user.findFirst()

  const connection: ConnectionOptions = config.redis

  const { transactionQueue } = getQueues(config.redis)

  const notificationApi = NotificationApi(config.notification.baseUrl)

  TransactionWorker(connection, {
    notificationApi,
    logger
  })

  EventWorker(connection, {
    notificationApi,
    transactionQueue,
    logger
  })
}

app()
