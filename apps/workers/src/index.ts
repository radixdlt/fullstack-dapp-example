import { config } from './config'
import { ConnectionOptions } from 'bullmq'
import {
  EventModel,
  MessageApi,
  AuditModel,
  TransactionModel,
  AccountAddressModel as AccountAddressModelFn,
  GatewayApi,
  MailerLiteModel,
  ImageModel,
  TransactionStreamModel
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
import { MessageHelper } from './helpers/messageHelper'
import { TransactionIntentHelper } from './helpers/transactionIntentHelper'
import { ReferralRewardAction } from './helpers/referalReward'

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
  const auditModel = AuditModel(dbClient)
  const transactionModel = TransactionModel(dbClient, transactionQueue)
  const redisClient = new RedisConnection(config.redis)
  const tokenPriceClient = TokenPriceClient({ logger, redisClient })
  const sendMessage = MessageHelper({ dbClient, messageApi })
  const referralRewardAction = ReferralRewardAction(dbClient)
  const AccountAddressModel = AccountAddressModelFn(redisClient)
  const transactionStreamModel = TransactionStreamModel(dbClient)
  const imageModel = ImageModel(dbClient)

  const eventWorkerController = EventWorkerController({
    logger,
    dbClient,
    gatewayApi,
    mailerLiteModel: MailerLiteModel({
      apiKey: config.mailerLite.apiKey
    }),
    transactionIntent: TransactionIntentHelper({ dbClient, transactionQueue }),
    AccountAddressModel,
    sendMessage,
    referralRewardAction,
    imageModel
  })

  const transactionWorkerController = TransactionWorkerController({
    auditModel,
    gatewayApi,
    imageModel,
    tokenPriceClient,
    sendMessage,
    referralRewardAction
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
    logger,
    dbClient
  })

  SystemWorker(connection, {
    logger,
    systemWorkerController: SystemWorkerController({
      logger,
      AccountAddressModel,
      redisClient: await redisClient.client,
      dbClient,
      transactionStreamModel
    })
  })

  logger.debug({ message: 'workers running' })
}

app().catch((error) => {
  logger.error({ reason: 'UnrecoverableError', error })
  // crash the process if an error is thrown within the app
  process.exit(1)
})
