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
import {
  DepositGiftBoxesRewardJob,
  DepositHeroBadgeJob,
  DepositQuestRewardJob,
  RedisConnection,
  getQueues
} from 'queues'
import { EventWorkerController } from './event/controller'
import { TransactionWorker } from './transaction/worker'
import { EventWorker } from './event/worker'
import { dbClient } from './db-client'
import { TransactionWorkerController } from './transaction/controller'
import { SystemWorker } from './system/worker'
import { SystemWorkerController } from './system/controller'
import { MessageHelper } from './helpers/messageHelper'
import { TransactionIntentHelper } from './helpers/transactionIntentHelper'
import {
  createDepositGiftBoxesRewardManifest,
  createDepositHeroBadgeManifest,
  createQuestRewardTransactionManifest
} from './manifests'
import { ReferralRewardAction } from './helpers/referalReward'
import { BatchWorkerController } from './helpers/batchWorkerController'
import { BatchTransactionWorker } from './helpers/batchTransactionWorker'

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
      transactionIntentHelper: TransactionIntentHelper({
        dbClient,
        queues,
        logger
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

  BatchTransactionWorker(
    queues.DepositGiftBoxReward,
    {
      logger,
      dbClient,
      controller: BatchWorkerController<DepositGiftBoxesRewardJob>({
        gatewayApi,
        sendMessage,
        createManifest: createDepositGiftBoxesRewardManifest(dbClient)
      })
    },
    {
      connection,
      concurrency: config.worker.depositQuestReward.concurrency,
      buffer: config.worker.depositQuestReward.buffer
    }
  )

  BatchTransactionWorker(
    queues.DepositQuestReward,
    {
      logger,
      dbClient,
      controller: BatchWorkerController<DepositQuestRewardJob>({
        gatewayApi,
        sendMessage,
        createManifest: createQuestRewardTransactionManifest
      })
    },
    {
      connection,
      concurrency: config.worker.depositQuestReward.concurrency,
      buffer: config.worker.depositQuestReward.buffer
    }
  )

  BatchTransactionWorker(
    queues.DepositHeroBadge,
    {
      logger,
      dbClient,
      controller: BatchWorkerController<DepositHeroBadgeJob>({
        gatewayApi,
        sendMessage,
        createManifest: (items) => createDepositHeroBadgeManifest(items)
      })
    },
    {
      connection,
      concurrency: config.worker.depositHeroBadge.concurrency,
      buffer: config.worker.depositHeroBadge.buffer
    }
  )

  logger.debug({ message: 'workers running' })
}

app().catch((error) => {
  console.log(error)
  logger.error({ reason: 'UnrecoverableError', error })
  // crash the process if an error is thrown within the app
  process.exit(1)
})
