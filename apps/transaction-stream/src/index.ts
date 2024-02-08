import { config } from './config'
import { GatewayApiClient } from './gateway'
import { logger } from './helpers/logger'
import { TransactionStream } from './transaction-stream/transaction-stream'
import { GatewayApi } from 'common'

const app = async () => {
  const gatewayApi = GatewayApi(config.networkId)
  const gatewayApiClient = GatewayApiClient({ dependencies: { gatewayApi } })

  const result = await gatewayApi.callApi('getCurrent')

  if (result.isErr()) throw new Error('Failed to get current ledger state')

  const latestStateVersion = result.value.ledger_state.state_version

  logger.debug({ method: 'StartTransactionStream', stateVersion: latestStateVersion })

  const stream = TransactionStream({
    // TODO: should start from the latest processed state version
    fromStateVersion: latestStateVersion,
    dependencies: { gatewayApiClient }
  })

  stream.transactions$.subscribe((value) => {
    // TODO: filter out transactions that are not from the RadQuest app and add them to a queue
  })

  stream.error$.subscribe(async (error) => {
    const isRateLimitError = error.status === 429
    const isBeyondTheEndOfKnownLedgerError =
      error.status === 400 &&
      error.reason === 'RequestStatusNotOk' &&
      error.data.details?.type === 'InvalidRequestError' &&
      error.data.details.validation_errors.some((item) =>
        item.errors.some((error) =>
          error.includes('State version is beyond the end of the known ledger')
        )
      )
    const TEN_SECONDS = 1000 * 10
    const THIRTY_SECONDS = 1000 * 30
    const SIXTY_SECONDS = 1000 * 60

    if (isRateLimitError) {
      logger.error({ method: 'stream.error$', errorType: 'RateLimitError', ...error })
      // rate limit hit, wait 60 seconds before restarting the stream
      stream.setStatus('run', SIXTY_SECONDS)
    } else if (isBeyondTheEndOfKnownLedgerError) {
      logger.error({
        method: 'stream.error$',
        errorType: 'StateVersionBeyondEndOfKnownLedgerError',
        ...error
      })
      // current state version is beyond the end of the known ledger, wait 30 seconds before restarting the stream
      stream.setStatus('run', THIRTY_SECONDS)
    } else {
      logger.error({ method: 'stream.error$', errorType: 'UnhandledError', ...error })
      // TODO: implement handler of different errors types
      // NotSynced - error might need to wait for a while before restarting the stream
      // InternalError, InvalidRequest, UnknownError  - might need to alert the team
      // implement exponential backoff for repeating errors
      stream.setStatus('run', TEN_SECONDS)
    }
  })
}

app()
