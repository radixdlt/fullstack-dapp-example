import { ResultAsync, errAsync, okAsync, err, ok } from 'neverthrow'
import { Job, TransactionJob } from 'queues'
import { GatewayApi, type AppLogger } from 'common'
import { TransactionHelper, withSigners } from 'typescript-wallet'
import { createRewardsDepositManifest } from './helpers/createRewardsDepositManifest'
import { QuestDefinitions, QuestId, QuestReward } from 'content'
import { config } from '../config'
import { WorkerOutputError, WorkerError } from '../_types'
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

const { accounts } = config.radQuest
const { system, payer } = accounts

export type TransactionWorkerController = ReturnType<typeof TransactionWorkerController>
export const TransactionWorkerController = ({ gatewayApi }: { gatewayApi: GatewayApi }) => {
  const handler = ({
    job,
    logger
  }: {
    job: Job<TransactionJob>
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

      default:
        return errAsync({
          reason: WorkerError.UnhandledJob,
          jsError: new Error('Unhandled job')
        })
    }
  }

  return { handler }
}
