import { expect, describe, beforeEach, it } from 'vitest'
import { TransactionStream } from './transaction-stream'
import { firstValueFrom } from 'rxjs'
import { GatewayApiClient } from '../gateway'
import { errAsync, okAsync } from 'neverthrow'
import { afterEach } from 'node:test'
import { DeepMockProxy, mockDeep, mockReset } from 'vitest-mock-extended'

let transactionStream: TransactionStream
let gatewayApiMock: DeepMockProxy<GatewayApiClient>

const getNextErrorValueFromStream = async () => firstValueFrom(transactionStream.error$)

const getTransactionsTestHelper = async (iterations = 0) => {
  let transactions: any[] = []

  for (const _ of new Array(iterations).fill(null)) {
    transactions = transactions.concat(await firstValueFrom(transactionStream.transactions$))
  }

  return transactions
}

const asyncDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('transaction stream handler', () => {
  beforeEach(() => {
    gatewayApiMock = mockDeep<GatewayApiClient>()

    transactionStream = TransactionStream({
      fromStateVersion: 0,
      initialStatus: 'stop',
      dependencies: {
        gatewayApiClient: gatewayApiMock
      }
    })
  })

  afterEach(() => {
    mockReset(gatewayApiMock)
    transactionStream.destroy()
  })

  describe('happy paths', () => {
    it('should get batches of transactions from stream', async () => {
      gatewayApiMock.getTransactions.mockImplementation(async (v?: number) => {
        const stateVersion = v || 1
        // simulate a delay in the response
        await asyncDelay(10)
        return okAsync({
          transactions: new Array(100)
            .fill(null)
            .map((_, i) => ({ state_version: stateVersion + i })),
          ledgerStateVersion: stateVersion
        }) as any
      })

      // we need to manually run the stream to use the mock implementation
      transactionStream.setStatus('run', 0)

      const transactions = await getTransactionsTestHelper(2)

      expect(transactions.length).toBe(200)
      expect(transactionStream.currentStateVersion).toBe(201)
    })
  })

  describe('unhappy paths', () => {
    it('should stop stream if gateway error response', async () => {
      gatewayApiMock.getTransactions.mockImplementation((v?: number) => {
        const { message, stack } = new Error('something went sour')
        return errAsync({
          message: 'unknown error',
          details: { type: 'UnknownError', message, stack }
        }) as any
      })
      transactionStream.setStatus('run', 0)
      await getNextErrorValueFromStream()
      expect(transactionStream.status).toBe('stop')
    })
  })
})
