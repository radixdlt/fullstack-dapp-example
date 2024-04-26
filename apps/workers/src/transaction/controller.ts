import { ResultAsync, okAsync, errAsync } from 'neverthrow'
import { Job, TransactionJob } from 'queues'
import { TransactionStatus } from 'database'
import type { AppLogger, AuditModel, TransactionModel, WellKnownAddresses } from 'common'
import { radixEngineClient } from 'typescript-wallet'
import { createRewardsDepositManifest } from '../helpers/createRewardsDepositManifest'
import { QuestDefinitions, QuestId } from 'content'
import { config } from '../config'
import { createDirectDepositManifest } from './helpers/createDirectDepositManifest'

export type TransactionWorkerController = ReturnType<typeof TransactionWorkerController>
export const TransactionWorkerController = ({
  logger,
  auditModel,
  transactionModel
}: {
  logger: AppLogger
  auditModel: AuditModel
  transactionModel: TransactionModel
}) => {
  const handler = (job: Job<TransactionJob>) => {
    const { type, traceId, transactionKey, attempt, userId } = job.data
    const childLogger = logger.child({ traceId, type })

    const handleSubmitTransaction = (
      manifestFactory: (wellKnownAddresses: WellKnownAddresses) => string
    ) => {
      return radixEngineClient
        .getManifestBuilder()
        .andThen(({ convertStringManifest, submitTransaction, wellKnownAddresses }) =>
          convertStringManifest(manifestFactory(wellKnownAddresses))
            .andThen((value) => {
              childLogger.debug({
                method: 'transactionWorker.submitTransaction',
                id: job.id,
                data: job.data
              })
              return submitTransaction(value, ['systemAccount']).mapErr((error) =>
                transactionModel(childLogger).setStatus(
                  { userId, transactionKey, attempt },
                  TransactionStatus.ERROR_FAILED_TO_SUBMIT,
                  JSON.stringify(error)
                )
              )
            })
            .andThen(({ txId }) =>
              ResultAsync.combine([
                transactionModel(childLogger).setTransactionId(
                  { userId, transactionKey, attempt },
                  txId
                ),
                radixEngineClient.gatewayClient
                  .pollTransactionStatus(txId)
                  .map(() => txId)
                  .mapErr((error) =>
                    transactionModel(childLogger).setStatus(
                      { userId, transactionKey, attempt },
                      TransactionStatus.ERROR_TIMEOUT,
                      JSON.stringify(error)
                    )
                  )
              ]).andThen(() =>
                transactionModel(childLogger).setStatus(
                  { userId, transactionKey, attempt },
                  TransactionStatus.COMPLETED
                )
              )
            )
        )
    }

    switch (type) {
      case 'MintUserBadge':
        const { accountAddress } = job.data

        return handleSubmitTransaction((wellKnownAddresses) =>
          createDirectDepositManifest({
            wellKnownAddresses,
            userId: job.data.userId,
            accountAddress: accountAddress
          })
        )

      case 'DepositReward':
        const { questId, userId } = job.data
        const questDefinition = QuestDefinitions(config.networkId)[questId as QuestId]
        const rewards = questDefinition.rewards
        // @ts-ignore
        const xrdReward = rewards.find((reward) => reward.name === 'xrd')
        const KYC_THRESHOLD = 5

        return okAsync(xrdReward).andThen(() =>
          auditModel(childLogger)
            .getUsdAmount(userId)
            .map((usdAmount) => {
              if (usdAmount + Number(xrdReward) > KYC_THRESHOLD) {
                childLogger.debug({
                  method: 'transactionWorker.DepositReward',
                  message: 'User has exceeded KYC threshold'
                })
                return transactionModel(childLogger).setStatus(
                  { transactionKey, userId, attempt },
                  TransactionStatus.ERROR_KYC_REQUIRED
                )
              }

              return handleSubmitTransaction((wellKnownAddresses) =>
                createRewardsDepositManifest({
                  wellKnownAddresses,
                  questId,
                  userId,
                  rewards
                })
              )
            })
        )

      default:
        childLogger.debug({
          method: 'transactionWorker.handler.error',
          job
        })
        return errAsync('Unhandled job')
    }
  }

  return { handler }
}
