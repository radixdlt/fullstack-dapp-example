import { PrismaClient, TransactionStatus } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import { AppLogger } from '../helpers'

export type TransactionIdentifierData = {
  transactionKey: string
  userId: string
  attempt: number
}

export type TransactionModel = ReturnType<typeof TransactionModel>

export const TransactionModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const add = ({ transactionKey, userId, attempt }: TransactionIdentifierData) => {
    return ResultAsync.fromPromise(
      db.transaction.create({
        data: {
          userId,
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
    { transactionKey, userId, attempt }: TransactionIdentifierData,
    transactionId: string
  ) => {
    return ResultAsync.fromPromise(
      db.transaction.update({
        where: {
          transactionKey_userId_attempt: {
            userId,
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
          data: { transactionKey, userId, attempt, transactionId }
        })
        return createApiError('failed to update transaction id', 400)()
      }
    )
  }

  const setStatus = (
    { transactionKey, userId, attempt }: TransactionIdentifierData,
    status: TransactionStatus,
    error?: string
  ) => {
    return ResultAsync.fromPromise(
      db.transaction.update({
        where: {
          transactionKey_userId_attempt: {
            userId,
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
