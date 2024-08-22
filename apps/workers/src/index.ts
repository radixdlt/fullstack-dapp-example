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
import { DepositGiftBoxRewardBufferWorker } from './deposit-giftbox-reward/buffer-worker'
import { BatchedDepositGiftBoxRewardWorker } from './deposit-giftbox-reward/worker'
import { BatchedDepositGiftBoxRewardController } from './deposit-giftbox-reward/controller'
import { ReferralRewardAction } from './helpers/referalReward'

const app = async () => {
  // test db connection
  await dbClient.user.findFirst()

  const connection: ConnectionOptions = config.redis

  const { transactionQueue, DepositGiftBoxRewardBufferQueue, DepositGiftBoxRewardQueue } =
    getQueues(config.redis)

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

  const eventWorkerController = EventWorkerController({
    logger,
    dbClient,
    mailerLiteModel: MailerLiteModel({
      apiKey: config.mailerLite.apiKey
    }),
    transactionIntent: TransactionIntentHelper({
      dbClient,
      transactionQueue,
      DepositGiftBoxRewardBufferQueue
    }),
    AccountAddressModel,
    sendMessage,
    referralRewardAction
  })

  const transactionWorkerController = TransactionWorkerController({
    gatewayApi,
    imageModel,
    sendMessage
  })

  TransactionWorker(connection, {
    logger,
    dbClient,
    transactionWorkerController
  })

  EventWorker(connection, {
    eventWorkerController,
    logger,
    dbClient
  })

  SystemWorker(connection, {
    logger,
    systemWorkerController: SystemWorkerController({
      logger,
      AccountAddressModel,
      dbClient
    })
  })

  DepositGiftBoxRewardBufferWorker(connection, {
    logger,
    DepositGiftBoxRewardQueue
  })

  BatchedDepositGiftBoxRewardWorker(connection, {
    logger,
    controller: BatchedDepositGiftBoxRewardController({ gatewayApi, sendMessage }),
    dbClient
  })

  logger.debug({ message: 'workers running' })
}

app().catch((error) => {
  logger.error({ reason: 'UnrecoverableError', error })
  // crash the process if an error is thrown within the app
  process.exit(1)
})
