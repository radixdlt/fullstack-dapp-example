import { QuestDefinitions } from 'content'
import { config } from './config'
import { getTrackedEvents } from './filter-transactions/tracked-events'
import { GatewayApiClient } from './gateway'
import { logger } from './helpers/logger'
import { TransactionStream } from './transaction-stream/transaction-stream'
import { EventModelMethods, GatewayApi } from 'common'
import { FilterTransactions } from './filter-transactions/filter-transactions'
import { PrismaClient } from 'database'
import { getQueues, RedisConnection } from 'queues'
import { EventModel } from 'common'
import { HandleStreamError } from './helpers/handleStreamError'
import { HandleTransactions } from './helpers/handleTransactions'
import { StateVersionModel } from './state-version/state-version.model'
import { getLatestStateVersion } from './helpers/getLatestStateVersion'

type Dependencies = {
  gatewayApi: GatewayApi
  eventQueue: ReturnType<typeof getQueues>['eventQueue']
  eventModel: EventModelMethods
  filterTransactions: FilterTransactions
  stateVersionModel: StateVersionModel
  db: PrismaClient
}

const app = async (dependencies: Dependencies) => {
  const { eventModel, gatewayApi, eventQueue, filterTransactions, stateVersionModel } = dependencies

  const result = await getLatestStateVersion({ eventModel, gatewayApi, stateVersionModel })

  if (result.isErr()) throw new Error('Failed to get current ledger state')

  const fromStateVersion = result.value

  const gatewayApiClient = GatewayApiClient({ dependencies: { gatewayApi } })

  logger.debug({ method: 'transactionStream.start', fromStateVersion })

  const stream = TransactionStream({
    fromStateVersion,
    dependencies: { gatewayApiClient }
  })

  const handleTransactions = HandleTransactions({
    filterTransactions,
    eventModel,
    eventQueue,
    logger,
    stateVersionModel
  })
  const handleStreamError = HandleStreamError(logger, stream)

  stream.transactions$.subscribe(async (transactions) => {
    const result = await handleTransactions(transactions)

    if (result.isErr()) {
      logger.error({
        method: 'handleTransactions',
        error: result.error
      })
      throw result.error
    }
  })

  stream.error$.subscribe(handleStreamError)
}

const { user, password, host, port, database } = config.postgres

const gatewayApi = GatewayApi(config.networkId)
const { eventQueue } = getQueues(config.redis)
const db = new PrismaClient({
  datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
})
const eventModel = EventModel(db)(logger)
const questDefinitions = QuestDefinitions(config.networkId)
const trackedEvents = getTrackedEvents(questDefinitions)
const filterTransactions = FilterTransactions(trackedEvents)
const stateVersionModel = StateVersionModel(new RedisConnection(config.redis))

app({
  gatewayApi,
  eventQueue,
  eventModel,
  filterTransactions,
  stateVersionModel,
  db
})
