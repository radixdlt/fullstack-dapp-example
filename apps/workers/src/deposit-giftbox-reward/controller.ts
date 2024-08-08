import { ResultAsync, okAsync, ok, errAsync, err } from 'neverthrow'
import { DepositGiftBoxesRewardJob } from 'queues'
import {
  GatewayApi,
  getRandomFloat,
  getRandomIntInclusive,
  GiftBoxReward,
  GiftBoxRewardConfig,
  type AppLogger
} from 'common'
import { TransactionHelper, withSigners } from 'typescript-wallet'
import { config } from '../config'
import { WorkerError, WorkerOutputError } from '../_types'
import { dbClient } from '../db-client'
import { createBatchDepositGiftBoxRewardManifest } from '../helpers/createBatchDepositGiftBoxRewardManifest'

export type BatchedDepositGiftBoxRewardController = ReturnType<
  typeof BatchedDepositGiftBoxRewardController
>
export const BatchedDepositGiftBoxRewardController = ({
  gatewayApi
}: {
  gatewayApi: GatewayApi
}) => {
  const handler = ({
    items,
    logger
  }: {
    items: DepositGiftBoxesRewardJob[]
    logger: AppLogger
  }): ResultAsync<any, WorkerOutputError> => {
    const transactionHelper = TransactionHelper({
      networkId: config.networkId,
      onSignature: withSigners(config.networkId, 'system', 'payer'),
      logger
    })

    const transactionIntentDiscriminators = items.map((item) => item.discriminator)

    const upsertSubmittedTransactionFactory =
      (discriminators: string[]) =>
      ({
        transactionId,
        status
      }: {
        transactionId: string
        status: 'PENDING' | 'COMPLETED' | 'FAILED'
      }) =>
        ResultAsync.fromPromise(
          dbClient.submittedTransaction
            .count({ where: { transactionId: `${transactionId}:0` } })
            .then((count) => {
              if (count === 0) {
                return dbClient.submittedTransaction.createMany({
                  data: discriminators.map((discriminator, index) => ({
                    transactionId: `${transactionId}:${index}`,
                    transactionIntent: discriminator,
                    status
                  }))
                })
              } else {
                return dbClient.submittedTransaction.updateMany({
                  where: { transactionIntent: { in: discriminators } },
                  data: { status }
                })
              }
            }),
          (error) => ({ reason: WorkerError.FailedToUpdateTransactionIntentStatus, jsError: error })
        )

    const upsertSubmittedTransaction = upsertSubmittedTransactionFactory(
      transactionIntentDiscriminators
    )

    const getGiftBoxRewards = GiftBoxReward(
      GiftBoxRewardConfig({ getRandomFloat, getRandomIntInclusive })
    )

    const addRewardsToItem = (job: DepositGiftBoxesRewardJob) => {
      const rewards = new Array(job.amount).fill(null).map(() => getGiftBoxRewards(job.giftBoxKind))
      const elementAmount = rewards.reduce((acc, { elements }) => acc + elements, 0)
      const energyCards = rewards.map(({ energyCard }) => energyCard)
      return { ...job, elementAmount, energyCards }
    }

    const getCardImages = (keys: string[]) => {
      const cardShapes = new Map<string, string>()
      keys.forEach((key) => cardShapes.set(key, ''))
      const uniqueKeys = [...cardShapes.keys()]

      return ResultAsync.fromPromise(
        dbClient.image
          .findMany({ where: { id: { in: uniqueKeys } }, select: { id: true, url: true } })
          .then((images) =>
            images.reduce<Record<string, string>>((acc, { id, url }) => ({ ...acc, [id]: url }), {})
          ),
        (error) => ({ reason: WorkerError.FailedToGetImageUrl, jsError: error })
      )
    }

    const createManifest = () =>
      ok(items.map(addRewardsToItem))
        .asyncAndThen((items) => {
          const cardImageKeys = items.map((item) => item.energyCards.map(({ key }) => key)).flat()
          return getCardImages(cardImageKeys).map((cardImages) =>
            items.map((item) => ({
              userId: item.userId,
              elementsAmount: item.elementAmount,
              energyCards: item.energyCards.map((item) => ({
                ...item,
                key_image_url: cardImages[item.key]
              })),
              numberOfGiftBoxes: item.amount
            }))
          )
        })
        .map(createBatchDepositGiftBoxRewardManifest)

    const getLastSubmittedTransaction = (discriminator: string) =>
      ResultAsync.fromPromise(
        dbClient.submittedTransaction.findFirst({
          select: { transactionId: true, status: true },
          where: {
            transactionIntent: discriminator
          },
          orderBy: { createdAt: 'desc' }
        }),
        (error) => ({ reason: WorkerError.FailedToGetSubmittedTransactions, jsError: error })
      ).map((transaction) =>
        transaction
          ? { ...transaction, transactionId: transaction.transactionId.split(':')[0] }
          : null
      )

    const verifyTransaction = (
      transactionId: string
    ): ResultAsync<
      {
        shouldSubmitTransaction: boolean
        shouldPollTransaction: boolean
        transactionId: string
      },
      WorkerOutputError
    > =>
      gatewayApi
        .callApi('getStatus', transactionId)
        .map((response) => {
          switch (response.intent_status) {
            case 'CommittedSuccess':
              return {
                shouldSubmitTransaction: false,
                shouldPollTransaction: false,
                transactionId
              }
            case 'Pending':
            case 'CommitPendingOutcomeUnknown':
            case 'LikelyButNotCertainRejection':
            case 'Unknown':
              return {
                shouldSubmitTransaction: false,
                shouldPollTransaction: true,
                transactionId
              }

            case 'CommittedFailure':
            case 'PermanentlyRejected':
              // TODO: Add additional logic to determine if transaction should be resubmitted
              return {
                shouldSubmitTransaction: true,
                shouldPollTransaction: false,
                transactionId
              }

            default:
              return {
                shouldSubmitTransaction: false,
                shouldPollTransaction: false,
                transactionId
              }
          }
        })
        .orElse((error) => {
          switch (error.details?.type) {
            case 'NotSyncedUpError':
            case 'InternalServerError':
              return errAsync({ reason: WorkerError.GatewayError, jsError: error })

            default:
              return okAsync({
                shouldSubmitTransaction: false,
                shouldPollTransaction: false,
                transactionId
              })
          }
        })

    const determineIfTransactionShouldBeSubmitted = (
      discriminator: string
    ): ResultAsync<
      {
        shouldSubmitTransaction: boolean
        shouldPollTransaction: boolean
        transactionId?: string
      },
      WorkerOutputError
    > =>
      getLastSubmittedTransaction(discriminator).andThen((submittedTransaction) => {
        if (!submittedTransaction)
          return okAsync({
            shouldSubmitTransaction: true,
            shouldPollTransaction: false
          })

        if (submittedTransaction.status === 'COMPLETED')
          return okAsync({
            shouldSubmitTransaction: false,
            shouldPollTransaction: false,
            transactionId: submittedTransaction.transactionId
          })

        return verifyTransaction(submittedTransaction.transactionId)
      })

    const submitTransaction = () =>
      createManifest().andThen((manifest) =>
        transactionHelper
          .submitTransaction(manifest, {
            onTransactionId: (transactionId) =>
              upsertSubmittedTransaction({
                transactionId,
                status: 'PENDING'
              })
          })
          .orElse((error) =>
            error.transactionId
              ? upsertSubmittedTransaction({
                  transactionId: error.transactionId,
                  status: 'FAILED'
                }).andThen(() => err(error))
              : err(error)
          )
          .andThen((response) =>
            upsertSubmittedTransaction({
              transactionId: response.transactionId,
              status: 'COMPLETED'
            })
          )
      )

    const pollTransactionId = (transactionId: string) =>
      transactionHelper
        .pollTransactionStatus(transactionId)
        .orElse((error) =>
          upsertSubmittedTransaction({
            transactionId,
            status: 'FAILED'
          }).andThen(() => err(error))
        )
        .andThen(() =>
          upsertSubmittedTransaction({
            transactionId,
            status: 'COMPLETED'
          })
        )

    return determineIfTransactionShouldBeSubmitted(transactionIntentDiscriminators[0]).andThen(
      ({ shouldSubmitTransaction, shouldPollTransaction, transactionId }) => {
        if (shouldSubmitTransaction) return submitTransaction()
        else if (transactionId)
          return shouldPollTransaction
            ? pollTransactionId(transactionId)
            : upsertSubmittedTransaction({
                transactionId,
                status: 'COMPLETED'
              })
        else return errAsync({ reason: WorkerError.UnhandledTransactionState })
      }
    )
  }

  return {
    handler
  }
}
