import { ResultAsync, errAsync, okAsync, err, ok } from 'neverthrow'
import { Job, TransactionJob } from 'queues'
import { User } from 'database'
import { GatewayApi, type AppLogger } from 'common'
import { TransactionHelper, withSigners } from 'typescript-wallet'
import { createRewardsDepositManifest } from './helpers/createRewardsDepositManifest'
import { QuestDefinitions, QuestId, QuestReward } from 'content'
import { config } from '../config'
import { WorkerOutputError, WorkerError } from '../_types'
import { MessageHelper } from '../helpers/messageHelper'
import { dbClient } from '../db-client'
import {
  isTryingToSetImageOnBurntRadGem,
  questAlreadyCompleted,
  reachedMaxOpenedGiftBoxes,
  VerifyTransaction
} from '../helpers/verifyTransaction'
import { GetLastSubmittedTransaction } from '../helpers/getLastSubmittedTransaction'
import { UpsertSubmittedTransaction } from '../helpers/upsertSubmittedTransaction'
import { SubmitTransactionHelper } from '../helpers/submitTransactionHelper'

const { xrd, accounts, badges, components } = config.radQuest
const { system, payer } = accounts

export type TransactionWorkerController = ReturnType<typeof TransactionWorkerController>
export const TransactionWorkerController = ({
  gatewayApi,
  sendMessage
}: {
  gatewayApi: GatewayApi
  sendMessage: MessageHelper
}) => {
  const handler = ({
    job,
    user,
    logger
  }: {
    job: Job<TransactionJob>
    user: User
    logger: AppLogger
  }): ResultAsync<any, WorkerOutputError> => {
    const { type, userId, discriminator } = job.data

    const transactionHelper = TransactionHelper({
      networkId: config.networkId,
      onSignature: withSigners(config.networkId, 'system', 'payer'),
      logger
    })

    const updateStatus = UpsertSubmittedTransaction(discriminator, dbClient)

    const verifyTransaction = VerifyTransaction(gatewayApi, [
      isTryingToSetImageOnBurntRadGem(job.data.discriminator),
      reachedMaxOpenedGiftBoxes,
      questAlreadyCompleted
    ])

    const handleSubmitTransaction = (manifest: string) =>
      SubmitTransactionHelper({
        createManifest: () => okAsync(manifest),
        transactionHelper,
        updateStatus,
        getLastSubmittedTransaction: GetLastSubmittedTransaction(dbClient),
        verifyTransaction
      })(discriminator)

    switch (type) {
      case 'DepositPartialReward': {
        const { questId, requirement } = job.data

        const getPartialRewards = (questId: QuestId, requirement: string) => {
          const questDefinition = QuestDefinitions()[questId as QuestId] as {
            partialRewards: Record<string, QuestReward[]>
          }

          const rewards = questDefinition?.partialRewards?.[requirement]

          return rewards ? ok(rewards) : err({ reason: WorkerError.FailedToGetPartialRewards })
        }

        return getPartialRewards(questId as QuestId, requirement).asyncAndThen((rewards) =>
          handleSubmitTransaction(
            createRewardsDepositManifest({
              questId: `${questId}:${requirement}`,
              userId,
              rewards,
              includeKycOracleUpdate: false,
              depositRewardsTo: 'questRewards'
            })
          )
        )
      }

      case 'QuestCompleted': {
        const { questId } = job.data

        return handleSubmitTransaction(
          `
          CALL_METHOD
            Address("${payer.accessController}")
            "create_proof"
          ;
          CALL_METHOD
            Address("${system.accessController}")
            "create_proof"
          ;
          CALL_METHOD
            Address("${payer.address}")
            "lock_fee"
            Decimal("100")
          ;
          CALL_METHOD
            Address("${system.address}")
            "create_proof_of_amount"
            Address("${badges.adminBadgeAddress}")
            Decimal("1")
          ;
          CALL_METHOD
            Address("${components.heroBadgeForge}")
            "hero_completed_quest"
            "${userId}"
            "${questId}"
          ;`
        )
      }

      case 'DepositReward':
        const { questId } = job.data

        const questDefinition = QuestDefinitions()[questId as QuestId]
        const rewards = questDefinition.rewards as unknown as QuestReward[]

        return handleSubmitTransaction(
          createRewardsDepositManifest({
            questId,
            userId,
            rewards,
            includeKycOracleUpdate: false,
            depositRewardsTo: 'questRewards'
          })
        )

      case 'DepositXrdToAccount':
        return gatewayApi
          .isDepositDisabledForResource(user.accountAddress!, xrd)
          .mapErr((error) => ({ reason: WorkerError.GatewayError, jsError: error }))
          .andThen((isDisabled) =>
            isDisabled ? err({ reason: WorkerError.UserDisabledXrdDeposit }) : ok(undefined)
          )
          .andThen(() =>
            handleSubmitTransaction(
              [
                `CALL_METHOD
                  Address("${payer.accessController}")
                  "create_proof"
                ;`,

                `CALL_METHOD
                  Address("${system.accessController}")
                  "create_proof"
                ;`,

                `CALL_METHOD
                  Address("${payer.address}")
                  "lock_fee"
                  Decimal("10")
                ;`,

                `CALL_METHOD
                  Address("${payer.address}")
                  "withdraw"
                  Address("${xrd}")
                  Decimal("${config.radQuest.directXrdDepositAmount}")
                ;`,

                `CALL_METHOD
                  Address("${user.accountAddress!}")
                  "try_deposit_batch_or_abort"
                  Expression("ENTIRE_WORKTOP")
                  Enum<0u8>()
                ; `
              ].join('\n')
            )
          )
          .andThen(() =>
            sendMessage(user.id, { type: 'XrdDepositedToAccount', traceId: job.data.traceId })
          )

      default:
        return errAsync({
          reason: WorkerError.UnhandledJob,
          jsError: new Error('Unhandled job')
        })
    }
  }

  return { handler }
}
