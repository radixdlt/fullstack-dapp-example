import { config } from './config'
import { ConnectionOptions } from 'bullmq'
import {
  EventModel,
  MessageApi,
  UserQuestModel,
  AuditModel,
  UserModel,
  TransactionModel,
  AccountAddressModel,
  GatewayApi,
  ConfigModel,
  MessageModel
} from 'common'
import { logger } from './helpers/logger'
import { RedisConnection, getQueues } from 'queues'
import { EventWorkerController } from './event/controller'
import { TransactionWorker } from './transaction/worker'
import { EventWorker } from './event/worker'
import { dbClient } from './db-client'
import { TransactionWorkerController } from './transaction/controller'
import { TokenPriceClient } from './token-price-client'
import { SystemWorker } from './system/worker'
import { SystemWorkerController } from './system/controller'
import { DbTransactionBuilder } from './helpers/dbTransactionBuilder'

const app = async () => {
  // test db connection
  await dbClient.user.findFirst()

  const connection: ConnectionOptions = config.redis

  const { transactionQueue } = getQueues(config.redis)

  const messageApi = MessageApi({
    baseUrl: config.notification.baseUrl,
    logger
  })

  const messageModel = MessageModel(dbClient)

  const gatewayApi = GatewayApi(config.networkId)
  const eventModel = EventModel(dbClient)
  const configModel = ConfigModel(dbClient)
  const transactionModel = TransactionModel(dbClient)
  const redisClient = new RedisConnection(config.redis)
  const tokenPriceClient = TokenPriceClient({ logger, redisClient })

  const eventWorkerController = EventWorkerController({
    dbClient,
    userQuestModel: UserQuestModel(dbClient),
    eventModel,
    userModel: UserModel(dbClient),
    transactionModel,
    accountAddressModel: AccountAddressModel(redisClient, logger),
    configModel,
    tokenPriceClient,
    messageApi,
    transactionQueue,
    logger
  })

  const transactionWorkerController = TransactionWorkerController({
    gatewayApi,
    tokenPriceClient,
    transactionModel,
    auditModel: AuditModel(dbClient),
    configModel,
    messageApi,
    messageModel,
    dbClient
  })

  TransactionWorker(connection, {
    logger,
    transactionWorkerController,
    transactionModel,
    transactionQueue
  })

  EventWorker(connection, {
    eventWorkerController,
    eventModel,
    logger
  })

  SystemWorker(connection, {
    logger,
    systemWorkerController: SystemWorkerController({
      logger
    })
  })
}

app().catch((error) => {
  logger.error({ reason: 'UnrecoverableError', error })
  // crash the process if an error is thrown within the app
  process.exit(1)
})
