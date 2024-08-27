import { ResultAsync } from 'neverthrow'
import {
  DepositQuestRewardJob,
  DepositHeroBadgeJob,
  DepositGiftBoxesRewardJob,
  CreateRadGemsJob,
  DepositXrdJob
} from 'queues'
import { GatewayApi, Message, type AppLogger } from 'common'
import { TransactionHelper, withSigners } from 'typescript-wallet'
import { config } from '../config'
import { WorkerError, WorkerOutputError } from '../_types'
import { dbClient } from '../db-client'
import { MessageHelper } from './messageHelper'
import { VerifyTransaction } from './verifyTransaction'
import { SubmitTransactionHelper } from './submitTransactionHelper'
import { GetLastSubmittedTransaction } from './getLastSubmittedTransaction'
import { UpsertSubmittedTransactions } from './upsertSubmittedTransaction'

export type BatchTransactionJob =
  | DepositHeroBadgeJob
  | DepositQuestRewardJob
  | DepositGiftBoxesRewardJob
  | CreateRadGemsJob
  | DepositXrdJob

export type BatchWorkerController<J extends BatchTransactionJob> = ReturnType<
  typeof BatchWorkerController<J>
>

export const BatchWorkerController = <J extends BatchTransactionJob>({
  gatewayApi,
  sendMessage,
  createManifest,
  createMessage
}: {
  gatewayApi: GatewayApi
  sendMessage: MessageHelper
  createManifest: (items: J[]) => ResultAsync<string, WorkerOutputError>
  createMessage: (item: J) => Message
}) => {
  const handler = ({
    items,
    logger
  }: {
    items: J[]
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

    const verifyTransaction = VerifyTransaction(gatewayApi, [])

    const sendMessageToUsers = () =>
      ResultAsync.combineWithAllErrors(
        items.map((item) => sendMessage(item.userId, createMessage(item), logger))
      ).mapErr((errors) => ({ reason: WorkerError.FailedToSendMessage, jsError: errors }))

    const submitTransaction = SubmitTransactionHelper({
      createManifest: () => createManifest(items),
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
