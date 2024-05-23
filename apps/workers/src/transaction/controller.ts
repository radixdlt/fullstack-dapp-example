import { ResultAsync, errAsync, err, ok, Result } from 'neverthrow'
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
import { createRewardsDepositManifest } from './helpers/createRewardsDepositManifest'
import { QuestDefinitions, QuestId } from 'content'
import { config } from '../config'
import { createDirectDepositManifest } from './helpers/createDirectDepositManifest'
import { createCombinedElementsMintRadgemManifest } from './helpers/createCombinedElementsMintRadgemManifest'
import { stripNonFungibleLocalId } from '../event/helpers/stripNonFungibleLocalId'

export type TransactionWorkerError =
  (typeof TransactionWorkerError)[keyof typeof TransactionWorkerError]
export const TransactionWorkerError = {
  FailedToSubmitToRadixNetwork: 'FailedToSubmitToRadixNetwork',
  FailedToPollTransactionStatus: 'FailedToPollTransactionStatus',
  FailedToGetManifestBuilder: 'FailedToGetManifestBuilder',
  FailedToConvertStringManifest: 'FailedToConvertStringManifest',
  FailedToSetTransactionId: 'FailedToSetTransactionId',
  FailedToGetTotalRewardedUsdAmount: 'FailedToGetTotalRewardedUsdAmount',
  FailedToSetCompletedStatus: 'FailedToSetCompletedStatus',
  FailedToGetUserIdFromBadgeId: 'FailedToGetUserIdFromBadgeId',
  FailedToGetTransactionFromDb: 'FailedToGetTransactionFromDb',
  MissingTransactionInDb: 'MissingTransactionInDb',
  UnhandledJob: 'UnhandledJob'
} as const

const getUserIdFromBadgeId = (
  badgeId: string
): Result<string, { reason: TransactionWorkerError; jsError: Error }> => {
  const userId = stripNonFungibleLocalId(badgeId)

  if (!userId)
    return err({
      reason: TransactionWorkerError.FailedToGetUserIdFromBadgeId,
      jsError: new Error('Invalid badgeId')
    })
  return ok(userId)
}
export type TransactionWorkerControllerError = { reason: TransactionWorkerError; jsError: unknown }
export type TransactionWorkerController = ReturnType<typeof TransactionWorkerController>
export const TransactionWorkerController = ({
  auditModel,
  transactionModel
}: {
  auditModel: AuditModel
  transactionModel: TransactionModel
}) => {
  const handler = ({
    job,
    logger
  }: {
    job: Job<TransactionJob>
    logger: AppLogger
  }): ResultAsync<void, TransactionWorkerControllerError> => {
    const { type, transactionKey, attempt, badgeResourceAddress, badgeId } = job.data

    const getItemFromDb = () => {
      const latestAttempt = attempt - 1 === -1 ? 0 : attempt - 1

      return transactionModel(logger)
        .getItem({
          badgeId,
          badgeResourceAddress,
          transactionKey,
          attempt: latestAttempt
        })
        .mapErr(({ jsError }) => ({
          reason: TransactionWorkerError.FailedToGetTransactionFromDb,
          jsError
        }))
        .andThen((item) =>
          item
            ? ok(item)
            : err({
                reason: TransactionWorkerError.MissingTransactionInDb,
                jsError: new Error('Missing transaction in db')
              })
        )
    }

    const handleSubmitTransaction = (
      manifestFactory: (wellKnownAddresses: WellKnownAddresses) => string
    ): ResultAsync<string, { reason: TransactionWorkerError; jsError: unknown }> =>
      radixEngineClient
        .getManifestBuilder()
        .mapErr((jsError) => ({
          reason: TransactionWorkerError.FailedToGetManifestBuilder,
          jsError
        }))
        .andThen(({ convertStringManifest, submitTransaction, wellKnownAddresses }) =>
          convertStringManifest(manifestFactory(wellKnownAddresses))
            .mapErr((jsError) => ({
              reason: TransactionWorkerError.FailedToConvertStringManifest,
              jsError
            }))
            .andThen((transactionManifest) =>
              submitTransaction({
                transactionManifest,
                signers: ['systemAccount'],
                logger
              })
                .mapErr((jsError) => ({
                  reason: TransactionWorkerError.FailedToSubmitToRadixNetwork,
                  jsError
                }))
                .andThen(({ txId }) =>
                  transactionModel(logger)
                    .setTransactionId(
                      { transactionKey, badgeId, badgeResourceAddress, attempt },
                      txId
                    )
                    .mapErr(({ jsError }) => ({
                      reason: TransactionWorkerError.FailedToSetTransactionId,
                      jsError
                    }))
                    .map(() => txId)
                )
            )
        )

    const handlePollTransactionStatus = (txId: string) =>
      radixEngineClient.gatewayClient
        .pollTransactionStatus(txId)
        .mapErr((jsError) => ({
          reason: TransactionWorkerError.FailedToPollTransactionStatus,
          jsError
        }))
        .andThen(() =>
          transactionModel(logger)
            .setStatus(
              { badgeId, badgeResourceAddress, transactionKey, attempt },
              TransactionStatus.COMPLETED
            )
            .mapErr(({ jsError }) => ({
              jsError,
              reason: TransactionWorkerError.FailedToSetCompletedStatus
            }))
        )
        .map(() => undefined)

    switch (type) {
      case 'MintUserBadge': {
        const { accountAddress, badgeId } = job.data

        return getItemFromDb().andThen((item) =>
          item.transactionId
            ? handlePollTransactionStatus(item.transactionId)
            : getUserIdFromBadgeId(badgeId)
                .asyncAndThen((userId) =>
                  handleSubmitTransaction((wellKnownAddresses) =>
                    createDirectDepositManifest({
                      wellKnownAddresses,
                      userId,
                      accountAddress: accountAddress
                    })
                  )
                )
                .andThen(handlePollTransactionStatus)
        )
      }

      case 'DepositReward':
        const { questId, badgeId } = job.data

        const questDefinition = QuestDefinitions()[questId as QuestId]
        const rewards = questDefinition.rewards

        return getItemFromDb().andThen((item) =>
          item.transactionId
            ? handlePollTransactionStatus(item.transactionId)
            : getUserIdFromBadgeId(badgeId).asyncAndThen((userId) =>
                auditModel(logger)
                  .getUsdAmount(userId)
                  .mapErr(({ jsError }) => ({
                    reason: TransactionWorkerError.FailedToGetTotalRewardedUsdAmount,
                    jsError
                  }))
                  .andThen(() => {
                    /**
                     * TODO:
                     *  [] Is KYC threshold reached?
                     *  [] If yes, check the NF data is_valid
                     *  [] Does it match the user KYC record of the quest reward component state?
                     *  [] If no, include the KYC record change in the transaction
                     *  👉 Proceed with the transaction
                     */

                    return handleSubmitTransaction((wellKnownAddresses) =>
                      createRewardsDepositManifest({
                        wellKnownAddresses,
                        questId,
                        userId,
                        rewards
                      })
                    ).andThen(handlePollTransactionStatus)
                  })
              )
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
        ).andThen(handlePollTransactionStatus)

      case 'CombinedElementsMintRadgem':
        return getItemFromDb()
          .andThen(() =>
            handleSubmitTransaction((wellKnownAddresses) =>
              createCombinedElementsMintRadgemManifest({
                wellKnownAddresses,
                badgeResourceAddress: job.data.badgeResourceAddress,
                badgeId: job.data.badgeId
              })
            )
          )
          .andThen(handlePollTransactionStatus)

      default:
        return errAsync({
          reason: TransactionWorkerError.UnhandledJob,
          jsError: new Error('Unhandled job')
        })
    }
  }

  return { handler }
}
