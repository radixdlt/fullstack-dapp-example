import { PrismaClient, TransactionIntentStatus, type TransactionIntent } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'
import type { TransactionJob, TransactionQueue } from 'queues'

export type TransactionIdentifierData = Pick<TransactionIntent, 'discriminator' | 'userId'>

export type TransactionModel = ReturnType<typeof TransactionModel>

export const TransactionModel =
  (db: PrismaClient, transactionQueue: TransactionQueue) => (logger?: AppLogger) => {
    const add = ({ discriminator, userId, ...data }: TransactionJob) =>
      ResultAsync.fromPromise(
        db.transactionIntent.create({
          data: {
            discriminator,
            userId,
            data
          }
        }),
        (error) => {
          logger?.error({
            error,
            method: 'add',
            model: 'TransactionModel',
            payload: { discriminator, userId, ...data }
          })
          return createApiError('failed to add transaction entry', 400)()
        }
      ).andThen(() =>
        transactionQueue
          .add({ ...data, discriminator, userId })
          .mapErr((error) => createApiError('failedToAddJobToTransactionQueue', 400)(error))
      )

    const getItem = (input: TransactionIdentifierData) => {
      return ResultAsync.fromPromise(db.transactionIntent.findFirst({ where: input }), (error) => {
        logger?.error({ error, method: 'add', model: 'TransactionModel' })
        return createApiError('failed to get transaction', 400)()
      })
    }

    const setStatus = (
      { userId, discriminator }: TransactionIdentifierData,
      status: TransactionIntentStatus,
      error?: string
    ) => {
      return ResultAsync.fromPromise(
        db.transactionIntent.update({
          where: {
            userId,
            discriminator
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

    const doesTransactionExist = ({ userId, discriminator }: TransactionIdentifierData) =>
      ResultAsync.fromPromise(
        db.transactionIntent.count({
          where: { userId, discriminator }
        }),
        (error) => {
          logger?.error({ error, method: 'doesTransactionExist', model: 'TransactionModel' })
          return createApiError('failed to check if transaction exists', 400)()
        }
      ).map((count) => count > 0)

    return {
      add,
      setStatus,
      getItem,
      doesTransactionExist
    }
  }
