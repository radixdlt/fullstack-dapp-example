import { config } from './config'
import { ConnectionOptions } from 'bullmq'
import {
  EventModel,
  NotificationApi,
  UserQuestModel,
  AuditModel,
  UserModel,
  TransactionModel,
  AccountAddressModel
} from 'common'
import { logger } from './helpers/logger'
import { RedisConnection, getQueues } from 'queues'
import { EventWorkerController } from './event/controller'
import { TransactionWorker } from './transaction/worker'
import { EventWorker } from './event/worker'
import { DbClient } from './db-client'
import { TransactionWorkerController } from './transaction/controller'
import { TokenPriceClient } from './token-price-client'

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

  const eventModel = EventModel(dbClient)
  const transactionModel = TransactionModel(dbClient)
  const redisClient = new RedisConnection(config.redis)
  const eventWorkerController = EventWorkerController({
    dbClient,
    userQuestModel: UserQuestModel(dbClient),
    eventModel,
    userModel: UserModel(dbClient),
    transactionModel,
    accountAddressModel: AccountAddressModel(redisClient, logger),
    tokenPriceClient: TokenPriceClient({ logger, redisClient }),
    notificationApi,
    transactionQueue,
    logger
  })

  const transactionWorkerController = TransactionWorkerController({
    logger,
    transactionModel,
    auditModel: AuditModel(dbClient)
  })

  TransactionWorker(connection, {
    logger,
    transactionWorkerController
  })

  EventWorker(connection, {
    eventWorkerController,
    eventModel,
    logger
  })
}

app()
