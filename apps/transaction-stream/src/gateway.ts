import {
  StreamTransactionsResponse,
  type ErrorResponse as GatewayErrorResponse
} from '@radixdlt/babylon-gateway-api-sdk'
import { Result, ResultAsync } from 'neverthrow'
import { logger } from './helpers/logger'
import { GatewayApi } from 'common'

export type Transaction = StreamTransactionsResponse['items'][0]

export type GetTransactionsOutput = {
  transactions: Transaction[]
  ledgerStateVersion: number
}

export type GetTransactionsAwaitedResult = Result<GetTransactionsOutput, GatewayErrorResponse>

export type GatewayApiClientInput = {
  dependencies: { gatewayApi: GatewayApi }
}
export type GatewayApiClient = ReturnType<typeof GatewayApiClient>
export const GatewayApiClient = ({ dependencies }: GatewayApiClientInput) => {
  const getTransactions = (
    fromStateVersion?: number
  ): ResultAsync<GetTransactionsOutput, GatewayErrorResponse> => {
    const from_ledger_state = fromStateVersion ? { state_version: fromStateVersion } : undefined

    logger.trace({ method: 'getTransactions', event: 'start', fromStateVersion })

    return dependencies.gatewayApi
      .callApi('streamTransactions', {
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
      })
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
      .mapErr((error): GatewayErrorResponse => {
        logger.trace({ method: 'getTransactions', event: 'error', ...error })

        return error
      })
  }

  return {
    getTransactions
  }
}
