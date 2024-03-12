import { config } from './config'
import { ConnectionOptions } from 'bullmq'
import { PrismaClient } from 'database'
import { EventModel, NotificationApi, NotificationModel, UserQuestModel } from 'common'
import { logger } from './helpers/logger'
import { getQueues } from 'queues'
import { EventWorkerController } from './event/controller'
import { TransactionWorker } from './transaction/worker'
import { EventWorker } from './event/worker'
import { DbClient } from './db-client'

const app = async () => {
  const dbClient = await DbClient()

  // test db connection
  await dbClient.user.findFirst()

  const connection: ConnectionOptions = config.redis

  const { transactionQueue } = getQueues(config.redis)

  const notificationApi = NotificationApi({
    baseUrl: config.notification.baseUrl,
    logger
  })

  const eventWorkerController = EventWorkerController({
    userQuestModel: UserQuestModel(dbClient),
    notificationModel: NotificationModel(dbClient),
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
    eventModel: EventModel(dbClient),
    logger
  })
}

app()
