import { Worker, ConnectionOptions, Queues, TransactionJob, getQueues } from 'queues'
import { AppLogger, GatewayApi, type TransactionModel } from 'common'
import { TransactionWorkerController } from './controller'
import { PrismaClient, TransactionIntentStatus } from 'database'
import { getUserById } from '../helpers/getUserById'
import { WorkerError, WorkerOutputError } from '../_types'
import { config } from '../config'
import { okAsync } from 'neverthrow'

const gatewayApi = GatewayApi(config.networkId)

const determineWhetherToSubmitNewTransaction = async (
  discriminator: string,
  dbClient: PrismaClient
) => {
  const transactionIntent = await dbClient.transactionIntent.findFirst({
    include: { transactions: true },
    where: { discriminator }
  })

  if (!transactionIntent) throw new Error('TransactionIntent not found')

  const submittedTransactions = transactionIntent.transactions || []

  const hasBeenProcessed = transactionIntent?.status === TransactionIntentStatus.COMPLETED

  const hasSuccessTransaction = submittedTransactions.some((item) => item.status === 'SUCCESS')

  if (hasBeenProcessed || hasSuccessTransaction)
    return dbClient.transactionIntent
      .update({
        where: { discriminator },
        data: { status: 'COMPLETED' }
      })
      .then(() => false)

  // We had an incident that caused some transactions to be stuck in a failed state although they were successful
  const failedSubmittedTransactions = transactionIntent.transactions.filter(
    (tx) => tx.status === 'FAILED'
  )

  for (const failedTransaction of failedSubmittedTransactions) {
    const statusResult = await gatewayApi.callApi('getStatus', failedTransaction.transactionId)
    if (statusResult.isErr()) {
      const errorDetails = statusResult.error.details
      if (errorDetails?.type === 'NotSyncedUpError' || errorDetails?.type === 'InternalServerError')
        throw new Error('GatewayError')
    } else if (statusResult.isOk()) {
      switch (statusResult.value.intent_status) {
        case 'CommittedSuccess':
          return dbClient.transactionIntent
            .update({
              where: { discriminator },
              data: { status: 'COMPLETED' }
            })
            .then(() => false)

        case 'CommittedFailure': {
          const isTryingToSetImageOnBurntRadGem =
            statusResult.value?.error_message === 'SystemError(KeyValueEntryLocked)' &&
            discriminator.startsWith('CombinedElementsAddRadgemImage')

          if (isTryingToSetImageOnBurntRadGem)
            return dbClient.transactionIntent
              .update({
                where: { discriminator },
                data: { status: 'COMPLETED', error: 'CompletedWithError' }
              })
              .then(() => false)
        }

        default:
          break
      }
    }
  }

  return true
}

export const TransactionWorker = (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    transactionModel: TransactionModel
    transactionWorkerController: TransactionWorkerController
    dbClient: PrismaClient
  }
) => {
  const { logger, transactionModel, dbClient } = dependencies

  const worker = new Worker<TransactionJob>(
    Queues.TransactionQueue,
    async (job) => {
      await job.updateProgress(1)
      const { discriminator, userId } = job.data

      const childLogger = logger.child({
        traceId: job.data.traceId,
        type: job.data.type,
        jobId: job.id,
        userId,
        queue: Queues.TransactionQueue
      })

      childLogger.debug({ method: 'transactionWorker.process', data: job.data })

      try {
        const shouldProceed = await determineWhetherToSubmitNewTransaction(discriminator, dbClient)

        if (!shouldProceed) return

        const result = await getUserById(userId, dbClient)
          .andThen((user) => {
            if (user.blocked) return okAsync(undefined)
            return dependencies.transactionWorkerController.handler({
              job,
              logger: childLogger,
              user
            })
          })
          .andThen(() =>
            transactionModel(childLogger)
              .setStatus({ discriminator, userId }, TransactionIntentStatus.COMPLETED)
              .mapErr(
                (error): WorkerOutputError => ({
                  reason: WorkerError.FailedToSetCompletedStatus,
                  jsError: error
                })
              )
          )
          .map(() => undefined)
          .orElse((error) => {
            childLogger.error({
              method: 'transactionWorkerWorker.process.error',
              data: job.data,
              error
            })

            return transactionModel(childLogger)
              .setStatus({ discriminator, userId }, TransactionIntentStatus.ERROR, error.reason)
              .map(() => undefined)
          })

        if (result.isErr()) throw { handled: true, error: result.error }
      } catch (error) {
        const isHandled = (error: unknown) =>
          error && typeof error === 'object' && (error as any).handled ? true : false

        if (isHandled(error)) {
          throw (error as { error: WorkerOutputError }).error
        }

        await transactionModel(childLogger).setStatus(
          { discriminator, userId },
          TransactionIntentStatus.ERROR,
          'UnhandledError'
        )
        childLogger.error({
          method: 'transactionWorker.process.error',
          error
        })
        throw error
      }
      return okAsync(undefined)
    },
    { connection, concurrency: config.worker.transaction.concurrency }
  )

  worker.on('completed', (job) => {
    logger.debug({ method: 'transactionWorker.process.success', data: job.data })
  })

  return worker
}
