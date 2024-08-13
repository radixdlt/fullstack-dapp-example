import { ResultAsync, ok } from 'neverthrow'
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
import { MessageHelper } from '../helpers/messageHelper'
import { reachedMaxOpenedGiftBoxes, VerifyTransaction } from '../helpers/verifyTransaction'
import { SubmitTransactionHelper } from '../helpers/submitTransactionHelper'
import { GetLastSubmittedTransaction } from '../helpers/getLastSubmittedTransaction'
import { UpsertSubmittedTransactions } from '../helpers/upsertSubmittedTransaction'

export type BatchedDepositGiftBoxRewardController = ReturnType<
  typeof BatchedDepositGiftBoxRewardController
>
export const BatchedDepositGiftBoxRewardController = ({
  gatewayApi,
  sendMessage
}: {
  gatewayApi: GatewayApi
  sendMessage: MessageHelper
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

    const [firstTransactionIntentDiscriminator] = transactionIntentDiscriminators

    const updateStatus = UpsertSubmittedTransactions(transactionIntentDiscriminators, dbClient)

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

    const verifyTransaction = VerifyTransaction(gatewayApi, [reachedMaxOpenedGiftBoxes])

    const sendMessageToUsers = () =>
      ResultAsync.combineWithAllErrors(
        items.map((item) =>
          sendMessage(item.userId, { type: 'GiftBoxesDeposited', traceId: item.traceId }, logger)
        )
      ).mapErr((errors) => ({ reason: WorkerError.FailedToSendMessage, jsError: errors }))

    const submitTransaction = SubmitTransactionHelper({
      createManifest,
      transactionHelper,
      updateStatus,
      getLastSubmittedTransaction: GetLastSubmittedTransaction(dbClient, (id) => id.split(':')[0]),
      verifyTransaction
    })

    return submitTransaction(firstTransactionIntentDiscriminator).andThen(sendMessageToUsers)
  }

  return {
    handler
  }
}
