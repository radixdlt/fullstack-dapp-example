import { config } from './config'
import { GatewayApiClient } from './gateway'
import { logger } from './helpers/logger'
import { TransactionStream } from './transaction-stream/transaction-stream'
import { GatewayApi } from 'common'

const app = async () => {
  const gatewayApi = GatewayApi(config.networkId)

  const result = await gatewayApi.callApi('getCurrent')

  if (result.isErr()) throw new Error('Failed to get current ledger state')

  const latestStateVersion = result.value.ledger_state.state_version

  logger.debug({ method: 'StartTransactionStream', stateVersion: latestStateVersion })

  const stream = TransactionStream({
    // TODO: should start from the latest processed state version
    fromStateVersion: latestStateVersion,
    dependencies: {
      gatewayApiClient: GatewayApiClient({
        dependencies: { gatewayApi: GatewayApi(config.networkId) }
      })
    }
  })

  stream.transactions$.subscribe((value) => {
    // TODO: filter out transactions that are not from the RadQuest app and add them to a queue
  })

  stream.error$.subscribe((error) => {
    // TODO: implement handler of different errors types
    // NotSynced - error might need to wait for a while before restarting the stream
    // InternalError, InvalidRequest, UnknownError  - might need to alert the team

    // errors cause the stream to stop, so we need to restart it depending on the error type
    stream.setStatus('run')
  })
}

app()
