import { ResultAsync, okAsync, errAsync, err, ok, Result } from 'neverthrow'
import { Job, TransactionJob } from 'queues'
import { TransactionStatus } from 'database'
import {
  Addresses,
  type AppLogger,
  type AuditModel,
  type TransactionModel,
  type WellKnownAddresses
} from 'common'
import { radixEngineClient } from 'typescript-wallet'
import { createRewardsDepositManifest } from '../helpers/createRewardsDepositManifest'
import { QuestDefinitions, QuestId } from 'content'
import { config } from '../config'
import { createDirectDepositManifest } from './helpers/createDirectDepositManifest'
import { stripNonFungibleLocalId } from '../event/helpers/stripNonFungibleLocalId'

const getUserIdFromBadgeId = (badgeId: string): Result<string, string> => {
  const userId = stripNonFungibleLocalId(badgeId)

  if (!userId) return err('InvalidBadgeId')
  return ok(userId)
}

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
    const { type, traceId, transactionKey, attempt, badgeResourceAddress, badgeId } = job.data
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
                  { badgeId, badgeResourceAddress, transactionKey, attempt },
                  TransactionStatus.ERROR_FAILED_TO_SUBMIT,
                  JSON.stringify(error)
                )
              )
            })
            .andThen(({ txId }) =>
              ResultAsync.combine([
                transactionModel(childLogger).setTransactionId(
                  { badgeId, badgeResourceAddress, transactionKey, attempt },
                  txId
                ),
                radixEngineClient.gatewayClient
                  .pollTransactionStatus(txId)
                  .map(() => txId)
                  .mapErr((error) =>
                    transactionModel(childLogger).setStatus(
                      { badgeId, badgeResourceAddress, transactionKey, attempt },
                      TransactionStatus.ERROR_TIMEOUT,
                      JSON.stringify(error)
                    )
                  )
              ]).andThen(() =>
                transactionModel(childLogger).setStatus(
                  { badgeId, badgeResourceAddress, transactionKey, attempt },
                  TransactionStatus.COMPLETED
                )
              )
            )
        )
    }

    switch (type) {
      case 'MintUserBadge': {
        const { accountAddress, badgeId } = job.data

        return getUserIdFromBadgeId(badgeId).asyncAndThen((userId) =>
          handleSubmitTransaction((wellKnownAddresses) =>
            createDirectDepositManifest({
              wellKnownAddresses,
              userId,
              accountAddress: accountAddress
            })
          )
        )
      }

      case 'DepositReward':
        const { questId, badgeId } = job.data

        const questDefinition = QuestDefinitions(config.networkId)[questId as QuestId]
        const rewards = questDefinition.rewards
        // @ts-ignore
        const xrdReward = rewards.find((reward) => reward.name === 'xrd')
        const KYC_THRESHOLD = 5

        return getUserIdFromBadgeId(badgeId).asyncAndThen((userId) =>
          auditModel(childLogger)
            .getUsdAmount(userId)
            .map((usdAmount) => {
              if (usdAmount + Number(xrdReward) > KYC_THRESHOLD) {
                childLogger.debug({
                  method: 'transactionWorker.DepositReward',
                  message: 'User has exceeded KYC threshold'
                })
                return transactionModel(childLogger).setStatus(
                  { transactionKey, badgeId, badgeResourceAddress, attempt },
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

      case 'PopulateResources':
        const { accountAddress } = job.data
        const addresses = Addresses(config.networkId)

        return handleSubmitTransaction(
          (wellKnownAddresses) =>
            `
            CALL_METHOD
              Address("${wellKnownAddresses.accountAddress.payerAccount}")
              "lock_fee"
              Decimal("100");

            CALL_METHOD
              Address("${wellKnownAddresses.accountAddress.systemAccount}")
              "create_proof_of_amount"
              Address("${addresses.badges.adminBadgeAddress}") 
              Decimal("1");  
              
            MINT_FUNGIBLE
              Address("${addresses.resources.clamAddress}")
              Decimal("100");
                
            TAKE_FROM_WORKTOP
              Address("${addresses.resources.clamAddress}")
              Decimal("100")
              Bucket("clam_bucket");

            CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("clam_bucket")
              Enum<0u8>();
          `
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
