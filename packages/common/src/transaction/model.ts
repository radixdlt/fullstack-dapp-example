import { PrismaClient, TransactionStatus } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'

export type TransactionIdentifierData = {
  transactionKey: string
  badgeId: string
  badgeResourceAddress: string
  attempt: number
}

export type TransactionModel = ReturnType<typeof TransactionModel>

export const TransactionModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const add = ({
    transactionKey,
    badgeId,
    badgeResourceAddress,
    attempt
  }: TransactionIdentifierData) => {
    return ResultAsync.fromPromise(
      db.transaction.create({
        data: {
          badgeId,
          badgeResourceAddress,
          transactionKey,
          attempt
        }
      }),
      (error) => {
        logger?.error({ error, method: 'add', model: 'TransactionModel' })
        return createApiError('failed to add transaction entry', 400)()
      }
    )
  }

  const setTransactionId = (
    { transactionKey, badgeId, badgeResourceAddress, attempt }: TransactionIdentifierData,
    transactionId: string
  ) => {
    return ResultAsync.fromPromise(
      db.transaction.update({
        where: {
          transactionKey_badgeId_badgeResourceAddress_attempt: {
            badgeId,
            badgeResourceAddress,
            attempt,
            transactionKey
          }
        },
        data: {
          transactionId
        }
      }),
      (error) => {
        logger?.error({
          error,
          method: 'setTransactionId',
          model: 'TransactionModel',
          data: { transactionKey, badgeId, badgeResourceAddress, attempt, transactionId }
        })
        return createApiError('failed to update transaction id', 400)()
      }
    )
  }

  const setStatus = (
    { transactionKey, badgeId, badgeResourceAddress, attempt }: TransactionIdentifierData,
    status: TransactionStatus,
    error?: string
  ) => {
    return ResultAsync.fromPromise(
      db.transaction.update({
        where: {
          transactionKey_badgeId_badgeResourceAddress_attempt: {
            badgeId,
            badgeResourceAddress,
            attempt: attempt,
            transactionKey
          }
        },
        data: {
          status,
          error
        }
      }),
      (error) => {
        logger?.error({ error, method: 'setStatus', model: 'TransactionModel' })
        return createApiError('failed to update transaction status', 400)()
      }
    )
  }

  return {
    add,
    setStatus,
    setTransactionId
  }
}
