import { ResultAsync, okAsync } from 'neverthrow'
import { DepositHeroBadgeJob } from 'queues'
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

export type DepositHeroBadgeController = ReturnType<typeof DepositHeroBadgeController>
export const DepositHeroBadgeController = ({
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
    items: DepositHeroBadgeJob[]
    logger: AppLogger
  }): ResultAsync<any, WorkerOutputError> => {
    const transactionHelper = TransactionHelper({
      networkId: config.networkId,
      onSignature: withSigners(config.networkId, 'system', 'payer'),
      logger
    })

    const { components, accounts, badges } = config.radQuest

    const transactionIntentDiscriminators = items.map((item) => item.discriminator)

    const [firstTransactionIntentDiscriminator] = transactionIntentDiscriminators

    const updateStatus = UpsertSubmittedTransactions(transactionIntentDiscriminators, dbClient)

    const createManifest = () => {
      const mintHeroBadgeInput = items.map((item) => `"${item.userId}"`).join(', ')

      const depositHeroBadgeToAccounts = items
        .map(
          (item, index) => `
        TAKE_NON_FUNGIBLES_FROM_WORKTOP
          Address("${badges.heroBadgeAddress}")
          Array<NonFungibleLocalId>(
              NonFungibleLocalId("<${item.userId}>")
          )
          Bucket("hero_badge_${index}")
        ;

        CALL_METHOD
          Address("${item.accountAddress}")
          "try_deposit_or_abort"
          Bucket("hero_badge_${index}")
          None
        ;
      `
        )
        .join('\n')

      const manifest = `
        CALL_METHOD
          Address("${accounts.payer.accessController}")
          "create_proof"
        ;

        CALL_METHOD
          Address("${accounts.system.accessController}")
          "create_proof"
        ;

        CALL_METHOD
          Address("${accounts.payer.address}")
          "lock_fee"
          Decimal("30")
        ;

        CALL_METHOD
          Address("${accounts.system.address}")
          "create_proof_of_amount"
          Address("${badges.adminBadgeAddress}")
          Decimal("1")
        ;

        CALL_METHOD
          Address("${components.heroBadgeForgeV2}")
          "mint_hero_badges"
          Array<String>(${mintHeroBadgeInput})
        ;

        ${depositHeroBadgeToAccounts}`
      return okAsync(manifest)
    }

    const verifyTransaction = VerifyTransaction(gatewayApi, [])

    const sendMessageToUsers = () =>
      ResultAsync.combineWithAllErrors(
        items.map((item) =>
          sendMessage(item.userId, { type: 'HeroBadgeDeposited', traceId: item.traceId }, logger)
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
