import { config } from './config'
import { ConnectionOptions } from 'bullmq'
import { PrismaClient } from 'database'
import { EventModel, NotificationApi, NotificationModel, UserQuestModel } from 'common'
import { logger } from './helpers/logger'
import { getQueues } from 'queues'
import { EventWorkerController } from './event/controller'
import { TransactionWorker } from './transaction/worker'
import { EventWorker } from './event/worker'

const app = async () => {
  const { user, password, host, port, database } = config.postgres

  const dbClient = new PrismaClient({
    datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
  })

  // test db connection
  await dbClient.user.findFirst()

  const connection: ConnectionOptions = config.redis

  const { transactionQueue } = getQueues(config.redis)

  const notificationApi = NotificationApi({
    baseUrl: config.notification.baseUrl,
    logger
  })

  const eventWorkerController = EventWorkerController({
    userQuestModel: UserQuestModel(dbClient)(logger),
    notificationModel: NotificationModel(dbClient)(logger),
    notificationApi,
    transactionQueue,
    logger
  })

  TransactionWorker(connection, {
    notificationApi,
    logger
  })

  EventWorker(connection, {
    eventWorkerController,
    eventModel: EventModel(dbClient)(logger),
    logger
  })
}

app()
