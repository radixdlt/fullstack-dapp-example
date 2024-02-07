import { ErrorResponse } from '@radixdlt/babylon-gateway-api-sdk'
import {
  GetTransactionsAwaitedResult,
  GetTransactionsErrorOutput,
  Transaction
} from '../../gateway'
import { logger } from '../../helpers/logger'
import { Result, err, ok } from 'neverthrow'

export type HandleTransactionResult = ReturnType<typeof handleTransactionResult>

export const handleTransactionResult = (
  result: GetTransactionsAwaitedResult,
  stateVersion: number
): Result<{ stateVersion: number; transactions: Transaction[] }, GetTransactionsErrorOutput> => {
  if (result.isErr()) {
    const error = result.error
    logger.error({ method: 'handleTransactionResult', event: 'error', error })
    return err(error)
  }

  const { transactions, ledgerStateVersion } = result.value

  // no transactions found at current state version, try again with the same stateVersion we passed in
  if (transactions.length === 0) return ok({ stateVersion, transactions })

  const firstTransaction = transactions[0]
  const lastTransaction = transactions.slice(-1)[0]

  const lastStateVersion = lastTransaction.state_version
  const nextStateVersion = lastStateVersion + 1
  logger.debug({
    method: 'handleTransactionResult',
    event: 'success',
    items: transactions.length,
    stateVersionRange: {
      start: firstTransaction.state_version,
      end: lastStateVersion
    },
    nextStateVersion,
    ledgerStateVersion
  })

  return ok({ stateVersion: nextStateVersion, transactions })
}
