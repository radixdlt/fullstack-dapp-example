import { config } from './config'
import { ConnectionOptions } from 'bullmq'
import {
  MessageApi,
  AccountAddressModel as AccountAddressModelFn,
  GatewayApi,
  MailerLiteModel,
  ImageModel
} from 'common'
import { logger } from './helpers/logger'
import { RedisConnection, getQueues } from 'queues'
import { EventWorkerController } from './event/controller'
import { TransactionWorker } from './transaction/worker'
import { EventWorker } from './event/worker'
import { dbClient } from './db-client'
import { TransactionWorkerController } from './transaction/controller'
import { SystemWorker } from './system/worker'
import { SystemWorkerController } from './system/controller'
import { MessageHelper } from './helpers/messageHelper'
import { TransactionIntentHelper } from './helpers/transactionIntentHelper'
import { DepositGiftBoxRewardWorker } from './deposit-giftbox-reward/worker'
import { DepositGiftBoxRewardController } from './deposit-giftbox-reward/controller'
import { ReferralRewardAction } from './helpers/referalReward'
import { BufferWorker } from './helpers/bufferWorker'

const app = async () => {
  // test db connection
  await dbClient.user.findFirst()

  const connection: ConnectionOptions = config.redis

  const queues = getQueues(config.redis)

  const messageApi = MessageApi({
    baseUrl: config.notification.baseUrl,
    logger
  })

  const gatewayApi = GatewayApi(config.networkId, process.env.GATEWAY_URL)
  const redisClient = new RedisConnection(config.redis)
  const sendMessage = MessageHelper({ dbClient, messageApi })
  const referralRewardAction = ReferralRewardAction(dbClient)
  const AccountAddressModel = AccountAddressModelFn(redisClient)
  const imageModel = ImageModel(dbClient)

  TransactionWorker(connection, {
    logger,
    dbClient,
    transactionWorkerController: TransactionWorkerController({
      gatewayApi,
      imageModel,
      sendMessage
    })
  })

  EventWorker(connection, {
    logger,
    dbClient,
    eventWorkerController: EventWorkerController({
      logger,
      dbClient,
      mailerLiteModel: MailerLiteModel({
        apiKey: config.mailerLite.apiKey
      }),
      transactionIntent: TransactionIntentHelper({
        dbClient,
        queues
      }),
      AccountAddressModel,
      sendMessage,
      referralRewardAction
    })
  })

  SystemWorker(connection, {
    logger,
    systemWorkerController: SystemWorkerController({
      logger,
      AccountAddressModel,
      dbClient
    })
  })

  DepositGiftBoxRewardWorker(connection, {
    logger,
    dbClient,
    controller: DepositGiftBoxRewardController({ gatewayApi, sendMessage })
  })

  BufferWorker({
    dbClient,
    logger,
    connection,
    queue: queues.DepositGiftBoxReward,
    batchSize: config.worker.depositGiftBoxRewardBuffer.batchSize,
    batchInterval: config.worker.depositGiftBoxRewardBuffer.batchInterval,
    concurrency: config.worker.depositGiftBoxRewardBuffer.concurrency
  })()

  logger.debug({ message: 'workers running' })
}

app().catch((error) => {
  console.log(error)
  logger.error({ reason: 'UnrecoverableError', error })
  // crash the process if an error is thrown within the app
  process.exit(1)
})
