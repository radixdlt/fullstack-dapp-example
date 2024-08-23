import { ResultAsync, okAsync } from 'neverthrow'
import { DepositQuestRewardJob } from 'queues'
import { GatewayApi, type AppLogger } from 'common'
import { TransactionHelper, withSigners } from 'typescript-wallet'
import { config } from '../config'
import { WorkerError, WorkerOutputError } from '../_types'
import { dbClient } from '../db-client'
import { MessageHelper } from '../helpers/messageHelper'
import { VerifyTransaction } from '../helpers/verifyTransaction'
import { SubmitTransactionHelper } from '../helpers/submitTransactionHelper'
import { GetLastSubmittedTransaction } from '../helpers/getLastSubmittedTransaction'
import { UpsertSubmittedTransactions } from '../helpers/upsertSubmittedTransaction'
import { createBatchQuestRewardsDepositManifest } from '../helpers/createBatchQuestRewardsDepositManifest'
import { QuestDefinitions, QuestId, QuestReward } from 'content'

export type DepositQuestRewardController = ReturnType<typeof DepositQuestRewardController>
export const DepositQuestRewardController = ({
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
    items: DepositQuestRewardJob[]
    logger: AppLogger
  }): ResultAsync<any, WorkerOutputError> => {
    const transactionHelper = TransactionHelper({
      networkId: config.networkId,
      onSignature: withSigners(config.networkId, 'system', 'payer'),
      logger
    })

    const questDefinitions = QuestDefinitions()

    const transactionIntentDiscriminators = items.map((item) => item.discriminator)

    const [firstTransactionIntentDiscriminator] = transactionIntentDiscriminators

    const updateStatus = UpsertSubmittedTransactions(transactionIntentDiscriminators, dbClient)

    const createManifest = () => {
      const transformToUserReward = (input: DepositQuestRewardJob) => {
        const { questId, userId } = input

        const questDefinition = questDefinitions[questId as QuestId]
        const rewards = questDefinition.rewards as unknown as QuestReward[]

        return {
          userId,
          questId,
          rewards
        }
      }

      return okAsync(createBatchQuestRewardsDepositManifest(items.map(transformToUserReward)))
    }

    const verifyTransaction = VerifyTransaction(gatewayApi, [])

    const sendMessageToUsers = () =>
      ResultAsync.combineWithAllErrors(
        items.map((item) =>
          sendMessage(
            item.userId,
            { type: 'QuestRewardsDeposited', questId: item.questId, traceId: item.traceId },
            logger
          )
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
