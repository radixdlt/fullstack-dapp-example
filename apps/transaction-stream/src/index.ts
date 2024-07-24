import { config } from './config'
import { GatewayApiClient } from './gateway'
import { logger } from './helpers/logger'
import { TransactionStream } from './transaction-stream/transaction-stream'
import { AccountAddressModel, GatewayApi, TransactionStreamModel } from 'common'
import { PrismaClient } from 'database'
import { getQueues, RedisConnection, SetupQueueMetrics } from 'queues'
import { EventModel } from 'common'
import { HandleStreamError } from './helpers/handleStreamError'
import { HandleTransactions } from './helpers/handleTransactions'
import { getLatestStateVersion } from './helpers/getLatestStateVersion'
import { dbClient } from './db-client'
import { trackedTransactionTypes } from './filter-transactions/tracked-transaction-types'
import { FilterTransactionsByType } from './filter-transactions/filter-transactions-by-type'
import { FilterTransactionsByAccountAddress } from './filter-transactions/filter-transactions-by-account-address'

type Dependencies = {
  gatewayApi: GatewayApi
  eventQueue: ReturnType<typeof getQueues>['eventQueue']
  filterTransactionsByType: FilterTransactionsByType
  filterTransactionsByAccountAddress: FilterTransactionsByAccountAddress
  transactionStreamModel: TransactionStreamModel
  dbClient: PrismaClient
}

const app = async (dependencies: Dependencies) => {
  const dbClient = dependencies.dbClient

  const metricsClient = SetupQueueMetrics({ connection: config.redis, logger })

  await dbClient.event.findFirst()

  const eventModel = EventModel(dbClient)(logger)
  const {
    gatewayApi,
    eventQueue,
    filterTransactionsByAccountAddress,
    transactionStreamModel,
    filterTransactionsByType
  } = dependencies

  const result = await getLatestStateVersion({ eventModel, gatewayApi, transactionStreamModel })

  if (result.isErr()) throw new Error('Failed to get current ledger state')

  const fromStateVersion = result.value

  const gatewayApiClient = GatewayApiClient({ dependencies: { gatewayApi } })

  logger.debug({ method: 'transactionStream.start', fromStateVersion })

  const stream = TransactionStream({
    fromStateVersion,
    dependencies: { gatewayApiClient }
  })

  const handleTransactions = HandleTransactions({
    filterTransactionsByAccountAddress,
    filterTransactionsByType,
    eventModel,
    eventQueue,
    logger,
    transactionStreamModel
  })
  const handleStreamError = HandleStreamError(logger, stream)

  const processedStateVersionMetric = new metricsClient.Gauge({
    name: 'transaction_stream_processed_state_version',
    help: 'Transaction stream processed state version'
  })

  stream.transactions$.subscribe(async (transactions) => {
    const result = await handleTransactions(transactions)

    if (result.isErr()) {
      logger.error({
        method: 'handleTransactions',
        error: result.error
      })
      throw result.error
    }

    processedStateVersionMetric.set(transactions.stateVersion)
  })

  stream.error$.subscribe(handleStreamError)
}

const gatewayApi = GatewayApi(config.networkId, process.env.GATEWAY_URL)
const { eventQueue } = getQueues(config.redis)
const redisConnection = new RedisConnection(config.redis)
const transactionStreamModel = TransactionStreamModel(dbClient)
const accountAddressModel = AccountAddressModel(redisConnection)(logger)
const filterTransactionsByType = FilterTransactionsByType(trackedTransactionTypes)
const filterTransactionsByAccountAddress = FilterTransactionsByAccountAddress(accountAddressModel)

app({
  gatewayApi,
  eventQueue,
  filterTransactionsByType,
  filterTransactionsByAccountAddress,
  transactionStreamModel,
  dbClient
}).catch((error) => {
  logger.error({ reason: 'UnrecoverableError', error })
  // crash the process if an error is thrown within the app
  process.exit(1)
})
