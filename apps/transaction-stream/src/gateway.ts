import {
  GatewayApiClient,
  StreamTransactionsResponse,
  type ErrorResponse as GatewayErrorResponse
} from '@radixdlt/babylon-gateway-api-sdk'
import { config } from './config'
import { Result, ResultAsync } from 'neverthrow'
import { typedError } from './helpers/typed-error'
import { logger } from './helpers/logger'

export type Transaction = StreamTransactionsResponse['items'][0]

export type GetTransactionsOutput = {
  transactions: Transaction[]
  ledgerStateVersion: number
}

export type GetTransactionsErrorOutput =
  | GatewayErrorResponse
  | {
      message: 'unknown error'
      details: { type: 'UnknownError'; stack: Error['stack']; message: string }
    }

export type GetTransactionsAwaitedResult = Result<GetTransactionsOutput, GetTransactionsErrorOutput>

export type GatewayApiInput = {
  dependencies?: { GatewayApiClient?: GatewayApiClient }
}
export type GatewayApi = ReturnType<typeof GatewayApi>
export const GatewayApi = ({ dependencies }: GatewayApiInput) => {
  const { stream } =
    dependencies?.GatewayApiClient ??
    GatewayApiClient.initialize({
      applicationName: 'RadQuest',
      basePath: config.gateway.baseUrl
    })

  const getTransactions = (
    fromStateVersion?: number
  ): ResultAsync<GetTransactionsOutput, GetTransactionsErrorOutput> => {
    const from_ledger_state = fromStateVersion ? { state_version: fromStateVersion } : undefined

    logger.trace({ method: 'getTransactions', event: 'start', fromStateVersion })

    return ResultAsync.fromPromise(
      stream.innerClient.streamTransactions({
        streamTransactionsRequest: {
          kind_filter: 'User',
          order: 'Asc',
          from_ledger_state,
          opt_ins: {
            receipt_events: true,
            affected_global_entities: true,
            receipt_state_changes: true
          }
        }
      }),
      typedError<any>
    )
      .map((response): GetTransactionsOutput => {
        logger.trace({
          method: 'getTransactions',
          event: 'success',
          items: response.items.length,
          ledgerStateVersion: response.ledger_state.state_version
        })
        return {
          transactions: response.items,
          ledgerStateVersion: response.ledger_state.state_version
        }
      })
      .mapErr((error): GetTransactionsErrorOutput => {
        logger.trace({ method: 'getTransactions', event: 'error', error })

        if (typeof error === 'object' && error.details) return error as GatewayErrorResponse

        return {
          message: 'unknown error',
          details: { type: 'UnknownError', stack: error.stack, message: error.name }
        }
      })
  }

  return {
    getTransactions
  }
}
