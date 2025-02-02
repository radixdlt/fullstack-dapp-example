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
): Result<
  { previousStateVersion: number; stateVersion: number; transactions: Transaction[] },
  GetTransactionsErrorOutput
> => {
  if (result.isErr()) return err(result.error)

  const { transactions, ledgerStateVersion } = result.value

  // no transactions found at current state version, try again with the same stateVersion we passed in
  if (transactions.length === 0)
    return ok({ previousStateVersion: stateVersion, stateVersion, transactions })

  const firstTransaction = transactions[0]
  const lastTransaction = transactions.slice(-1)[0]

  const lastStateVersion = lastTransaction.state_version
  const nextStateVersion = lastStateVersion + 1
  logger.trace({
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

  return ok({ previousStateVersion: stateVersion, stateVersion: nextStateVersion, transactions })
}
