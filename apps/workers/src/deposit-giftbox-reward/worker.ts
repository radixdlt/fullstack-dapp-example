import { Worker, ConnectionOptions, Queues, BatchedDepositGiftBoxesRewardJob } from 'queues'
import { AppLogger } from 'common'
import { BatchedDepositGiftBoxRewardController } from './controller'
import { PrismaClient, TransactionIntentStatus } from 'database'
import { WorkerError, WorkerOutputError } from '../_types'
import { config } from '../config'
import { okAsync, ResultAsync, err } from 'neverthrow'

export const BatchedDepositGiftBoxRewardWorker = async (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    controller: BatchedDepositGiftBoxRewardController
    dbClient: PrismaClient
  }
) => {
  const { logger, dbClient, controller } = dependencies

  const getUserIds = (userIds: string[]) =>
    ResultAsync.fromPromise(
      dbClient.user.findMany({
        select: { id: true },
        where: { id: { in: userIds }, blocked: false }
      }),
      (error) => ({
        reason: WorkerError.FailedToGetUserFromDb,
        jsError: error
      })
    ).map((users) => users.map((user) => user.id))

  const determineIfJobShouldBeProcessed = (discriminator: string) =>
    ResultAsync.fromPromise(
      dbClient.transactionIntent
        .findUnique({ where: { discriminator } })
        .then((transactionIntent) => transactionIntent?.status !== 'COMPLETED'),
      (error) => ({ reason: WorkerError.FailedToQueryDb, jsError: error })
    )

  const UpdateTransactionIntentStatusFactory =
    (batchId: string, itemDiscriminators: string[]) =>
    ({ status, error }: { status: TransactionIntentStatus; error?: string }) =>
      ResultAsync.fromPromise(
        dbClient.batchedTransactionIntent.update({
          where: { id: batchId },
          data: { status, error }
        }),
        (error) => ({ reason: WorkerError.FailedToUpdateTransactionIntentStatus, jsError: error })
      ).andThen(() =>
        ResultAsync.fromPromise(
          dbClient.transactionIntent.updateMany({
            where: { discriminator: { in: itemDiscriminators } },
            data: { status, error }
          }),
          (error) => ({ reason: WorkerError.FailedToUpdateTransactionIntentStatus, jsError: error })
        )
      )

  const withoutBlockedUsers = (items: BatchedDepositGiftBoxesRewardJob['items']) =>
    getUserIds(items.map((item) => item.userId)).map((userIds) =>
      items.filter((item) => userIds.includes(item.userId))
    )

  const worker = new Worker<BatchedDepositGiftBoxesRewardJob>(
    Queues.DepositGiftBoxRewardQueue,
    async (job) => {
      const transactionIntentDiscriminators = job.data.items.map((item) => item.discriminator)

      logger.info({
        method: 'BatchedDepositGiftBoxRewardWorker.process',
        id: job.data.id,
        items: transactionIntentDiscriminators,
        itemCount: transactionIntentDiscriminators.length
      })

      try {
        const updateStatus = UpdateTransactionIntentStatusFactory(
          job.data.id,
          transactionIntentDiscriminators
        )

        const result = await determineIfJobShouldBeProcessed(transactionIntentDiscriminators[0])
          .andThen((shouldProcess) => {
            if (!shouldProcess) okAsync(undefined)

            return updateStatus({ status: 'PENDING' })
              .andThen(() => withoutBlockedUsers(job.data.items))
              .andThen((items) => controller.handler({ items, logger }))
          })
          .andThen(() => updateStatus({ status: 'COMPLETED' }))
          .orElse((error) =>
            // TODO: determine what failed status that should be set
            updateStatus({ status: 'FAILED_RETRY', error: error.reason }).andThen(() => err(error))
          )

        if (result.isErr()) {
          logger.error({
            method: 'BatchedDepositGiftBoxRewardWorker.process',
            id: job.data.id,
            itemIds: job.data.items.map((item) => item.discriminator),
            error: result.error
          })
          const errorReason = result.error.reason as unknown as WorkerError
          const skipError = new Set<WorkerError>([WorkerError.FailedToConvertStringManifest])
          // TODO: determine if we should throw based of error reason, throwing will trigger a retry
          if (skipError.has(errorReason)) {
            return
          }
          throw result.error
        }
      } catch (error) {
        logger.error({
          method: 'BatchedDepositGiftBoxRewardWorker.error',
          id: job.data.id,
          error
        })

        const maybeHandledError = error as WorkerOutputError

        if (maybeHandledError.reason) {
          throw new Error(maybeHandledError.reason)
        } else {
          throw error
        }
      }
    },
    {
      connection,
      concurrency: config.worker.depositGiftBoxReward.concurrency
    }
  )

  return worker
}
