import {
  StreamTransactionsResponse,
  type ErrorResponse as GatewayErrorResponse
} from '@radixdlt/babylon-gateway-api-sdk'
import { Result, ResultAsync } from 'neverthrow'
import { logger } from './helpers/logger'
import { GatewayApi } from 'common'
import { ErrorReason, FetchWrapperError, fetchWrapper } from './helpers/fetch-wrapper'

export type Transaction = StreamTransactionsResponse['items'][0]

export type GetTransactionsOutput = {
  transactions: Transaction[]
  ledgerStateVersion: number
}

export type GetTransactionsErrorOutput = FetchWrapperError<GatewayErrorResponse>

export type GetTransactionsAwaitedResult = Result<GetTransactionsOutput, GetTransactionsErrorOutput>

export type GatewayApiClientInput = {
  dependencies: { gatewayApi: GatewayApi }
}
export type GatewayApiClient = ReturnType<typeof GatewayApiClient>
export const GatewayApiClient = ({ dependencies }: GatewayApiClientInput) => {
  const getTransactions = (
    fromStateVersion?: number
  ): ResultAsync<GetTransactionsOutput, GetTransactionsErrorOutput> => {
    const from_ledger_state = fromStateVersion ? { state_version: fromStateVersion } : undefined

    logger.trace({ method: 'getTransactions', event: 'start', fromStateVersion })

    return fetchWrapper<StreamTransactionsResponse, GatewayErrorResponse>(
      fetch(`${dependencies.gatewayApi.networkConfig.gatewayUrl}/stream/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          limit_per_page: 100,
          kind_filter: 'User',
          order: 'Asc',
          from_ledger_state,
          opt_ins: {
            receipt_events: true,
            affected_global_entities: true,
            receipt_state_changes: true
          }
        })
      })
    )
      .map(({ data: response, status }): GetTransactionsOutput => {
        logger.trace({
          method: 'getTransactions',
          event: 'success',
          status,
          items: response.items.length,
          ledgerStateVersion: response.ledger_state.state_version
        })
        return {
          transactions: response.items,
          ledgerStateVersion: response.ledger_state.state_version
        }
      })
      .mapErr((error) => {
        logger.trace({ method: 'getTransactions', event: 'error', error })
        return error
      })
  }

  return {
    getTransactions
  }
}
