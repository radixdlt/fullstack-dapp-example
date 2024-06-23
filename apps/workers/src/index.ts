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
  ConfigModel
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
import { SendMessage } from './helpers/sendMessage'
import { SetTransactionIntentStatus } from './helpers/setTransactionIntentStatus'

const app = async () => {
  // test db connection
  await dbClient.user.findFirst()

  const connection: ConnectionOptions = config.redis

  const { transactionQueue } = getQueues(config.redis)

  const messageApi = MessageApi({
    baseUrl: config.notification.baseUrl,
    logger
  })

  const gatewayApi = GatewayApi(config.networkId)
  const eventModel = EventModel(dbClient)
  const configModel = ConfigModel(dbClient)
  const auditModel = AuditModel(dbClient)
  const transactionModel = TransactionModel(dbClient, transactionQueue)
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
    transactionQueue,
    logger,
    sendMessage: SendMessage({ dbClient, messageApi })
  })

  const transactionWorkerController = TransactionWorkerController({
    auditModel,
    gatewayApi,
    tokenPriceClient,
    sendMessage: SendMessage({ dbClient, messageApi }),
    setTransactionIntentStatus: SetTransactionIntentStatus(dbClient)
  })

  TransactionWorker(connection, {
    logger,
    transactionModel,
    dbClient,
    transactionWorkerController,
    tokenPriceClient
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

  logger.debug({ message: 'workers running' })
}

app().catch((error) => {
  logger.error({ reason: 'UnrecoverableError', error })
  // crash the process if an error is thrown within the app
  process.exit(1)
})
