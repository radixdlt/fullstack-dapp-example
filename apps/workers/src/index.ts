import { config } from './config'
import { ConnectionOptions } from 'bullmq'
import {
  EventModel,
  MessageApi,
  RadMorphModel,
  UserQuestModel,
  AuditModel,
  UserModel,
  TransactionModel,
  AccountAddressModel,
  GatewayApi
} from 'common'
import { logger } from './helpers/logger'
import { EventJob, Queue, RedisConnection, getQueues } from 'queues'
import { EventWorkerController } from './event/controller'
import { TransactionWorker } from './transaction/worker'
import { EventWorker } from './event/worker'
import { dbClient } from './db-client'
import { TransactionWorkerController } from './transaction/controller'
import { TokenPriceClient } from './token-price-client'
import { SystemWorker } from './system/worker'
import { SystemWorkerController } from './system/controller'
import { Metrics } from './metrics'

const app = async () => {
  // test db connection
  await dbClient.user.findFirst()

  const connection: ConnectionOptions = config.redis

  const { transactionQueue, eventQueue } = getQueues(config.redis)

  const messageApi = MessageApi({
    baseUrl: config.notification.baseUrl,
    logger
  })

  const gatewayApi = GatewayApi(config.networkId)
  const eventModel = EventModel(dbClient)
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
    tokenPriceClient,
    messageApi,
    transactionQueue,
    logger
  })

  const transactionWorkerController = TransactionWorkerController({
    gatewayApi,
    tokenPriceClient,
    transactionModel,
    auditModel: AuditModel(dbClient)
  })

  const transactionWorker = TransactionWorker(connection, {
    logger,
    transactionWorkerController,
    transactionModel,
    transactionQueue
  })

  const eventWorker = EventWorker(connection, {
    eventWorkerController,
    eventModel,
    logger,
    eventQueue
  })

  SystemWorker(connection, {
    logger,
    systemWorkerController: SystemWorkerController({
      logger,
      radMorphModel: RadMorphModel(dbClient)
    })
  })
  transactionQueue.queue.on('waiting', async () => {
    Metrics.transactionQueue.waitingJobs.observe(
      await transactionQueue.queue.getJobCountByTypes('wait')
    )
  })

  transactionQueue.queue.on('progress', () => {})

  eventQueue.queue.on('waiting', async () => {
    Metrics.eventQueue.waitingJobs.observe(await eventQueue.queue.getJobCountByTypes('wait'))
  })

  transactionWorker.on('failed', async () => {
    Metrics.transactionQueue.failedJobs.observe(
      await transactionQueue.queue.getJobCountByTypes('failed')
    )
  })

  eventWorker.on('failed', async () => {
    Metrics.eventQueue.failedJobs.observe(await eventQueue.queue.getJobCountByTypes('failed'))
  })

  transactionWorker.on('completed', async () => {
    Metrics.transactionQueue.completedJobs.observe(
      await transactionQueue.queue.getJobCountByTypes('completed')
    )
  })

  eventWorker.on('completed', async () => {
    Metrics.eventQueue.completedJobs.observe(await eventQueue.queue.getJobCountByTypes('completed'))
  })
}

app().catch((error) => {
  logger.error({ reason: 'UnrecoverableError', error })
  // crash the process if an error is thrown within the app
  process.exit(1)
})
