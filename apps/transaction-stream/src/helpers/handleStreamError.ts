import { GetTransactionsErrorOutput } from '../gateway'
import { TransactionStream } from '../transaction-stream/transaction-stream'
import { AppLogger } from 'common'
import { gatewayStatusGauge } from '../metrics'

export const HandleStreamError =
  (logger: AppLogger, stream: TransactionStream) => (error: GetTransactionsErrorOutput) => {
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
    const THREE_SECONDS = 1000 * 3
    const TEN_SECONDS = 1000 * 10
    const THIRTY_SECONDS = 1000 * 30
    const SIXTY_SECONDS = 1000 * 60

    if (isRateLimitError) {
      logger.error({ method: 'stream.error$', errorType: 'RateLimitError', ...error })
      // rate limit hit, wait 60 seconds before restarting the stream
      stream.setStatus('run', SIXTY_SECONDS)
    } else if (isBeyondTheEndOfKnownLedgerError) {
      logger.trace({
        method: 'stream.error$',
        errorType: 'StateVersionBeyondEndOfKnownLedgerError',
        ...error
      })
      // current state version is beyond the end of the known ledger, wait before restarting the stream
      stream.setStatus('run', THREE_SECONDS)
    } else {
      logger.error({ method: 'stream.error$', errorType: 'UnhandledError', ...error })
      gatewayStatusGauge.set(0)
      // TODO: implement handler of different errors types
      // NotSynced - error might need to wait for a while before restarting the stream
      // InternalError, InvalidRequest, UnknownError  - might need to alert the team
      // implement exponential backoff for repeating errors
      stream.setStatus('run', TEN_SECONDS)
    }
  }
