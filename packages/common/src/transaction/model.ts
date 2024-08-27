import { PrismaClient, TransactionIntentStatus, type TransactionIntent } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'
import type { Queues, TransactionJob } from 'queues'
import { EventId } from '../constants'

export type TransactionIdentifierData = Pick<TransactionIntent, 'discriminator' | 'userId'>

export type TransactionModel = ReturnType<typeof TransactionModel>

export const TransactionModel = (db: PrismaClient, queues: Queues) => (logger?: AppLogger) => {
  const add = (job: TransactionJob) => {
    const { discriminator, userId, ...data } = job
    return ResultAsync.fromPromise(
      db.transactionIntent.upsert({
        where: {
          discriminator,
          userId
        },
        create: {
          discriminator,
          userId,
          data
        },
        update: {}
      }),
      (error) => {
        logger?.error({
          error,
          method: 'add',
          model: 'TransactionModel',
          data: { discriminator, userId, ...data }
        })
        return createApiError('failed to add transaction entry', 400)()
      }
    ).andThen(() => {
      const addToQueue = () => {
        switch (job.type) {
          case 'DepositGiftBoxesReward':
            return queues.DepositGiftBoxReward.buffer.add([job])

          case 'DepositReward':
            return queues.DepositQuestReward.buffer.add([job])

          case 'DepositHeroBadge':
            return queues.DepositHeroBadge.buffer.add([job])

          case 'DepositXrd':
            return queues.DepositXrd.buffer.add([job])

          case 'QuestCompleted':
            return queues.QuestCompleted.buffer.add([job])

          default:
            return queues.Transaction.add([job])
        }
      }

      return addToQueue().mapErr((error) =>
        createApiError('failedToAddJobToTransactionQueue', 400)(error)
      )
    })
  }

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

  const hasWaitingRadgemJob = (userId: string) =>
    ResultAsync.fromPromise(
      db.user
        .findUnique({
          include: {
            transactions: {
              where: {
                status: { in: ['PENDING', 'WAITING'] },
                discriminator: {
                  startsWith: `${EventId.DepositedElements}:RadGem:`
                }
              }
            }
          },
          where: { id: userId }
        })
        .then((user) => {
          console.log(user)
          return user?.transactions.length || 0
        }),
      (error) => {
        logger?.error({ error, method: 'hasWaitingRadgemJob', model: 'TransactionModel' })
        return createApiError('failed to check if transaction exists', 400)()
      }
    ).map((count) => count > 0)

  return {
    add,
    setStatus,
    getItem,
    hasWaitingRadgemJob,
    doesTransactionExist
  }
}
