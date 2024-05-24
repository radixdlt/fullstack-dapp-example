import { ResultAsync, errAsync, okAsync, err, ok, Result } from 'neverthrow'
import { Job, TransactionJob } from 'queues'
import { AuditType, TransactionStatus } from 'database'
import {
  Addresses,
  GatewayApi,
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
import { TokenPriceClient } from '../token-price-client'
import BigNumber from 'bignumber.js'
import { createCombinedElementsAddRadgemImageManifest } from './helpers/createCombinedElementsAddRadgemImageManifest'

export type TransactionWorkerError =
  (typeof TransactionWorkerError)[keyof typeof TransactionWorkerError]
export const TransactionWorkerError = {
  FailedToSubmitToRadixNetwork: 'FailedToSubmitToRadixNetwork',
  FailedToPollTransactionStatus: 'FailedToPollTransactionStatus',
  FailedToGetManifestBuilder: 'FailedToGetManifestBuilder',
  FailedToConvertStringManifest: 'FailedToConvertStringManifest',
  FailedToSetTransactionId: 'FailedToSetTransactionId',
  FailedToGetTotalRewardedUsdAmount: 'FailedToGetTotalRewardedUsdAmount',
  FailedToQueryNetworkGateway: 'FailedToQueryNetworkGateway',
  FailedToSetCompletedStatus: 'FailedToSetCompletedStatus',
  FailedToGetUserIdFromBadgeId: 'FailedToGetUserIdFromBadgeId',
  FailedToGetXrdPrice: 'FailedToGetXrdPrice',
  FailedToAddAuditEntry: 'FailedToAddAuditEntry',
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
  transactionModel,
  gatewayApi,
  tokenPriceClient
}: {
  auditModel: AuditModel
  gatewayApi: GatewayApi
  transactionModel: TransactionModel
  tokenPriceClient: TokenPriceClient
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
        const xrdReward = rewards.find((reward) => reward.name === 'xrd')?.amount ?? 0

        const triggerDepositRewardsTransaction = (userId: string) => {
          const hasXrdReward = xrdReward > 0
          return (
            hasXrdReward
              ? tokenPriceClient
                  .getXrdPrice()
                  .mapErr((jsError) => ({
                    reason: TransactionWorkerError.FailedToGetXrdPrice,
                    jsError
                  }))
                  .map((xrdPrice) => xrdPrice.multipliedBy(xrdReward))
                  .andThen((xrdRewardInUsd) =>
                    checkIfUserHasExceededKycThreshold(userId, xrdRewardInUsd).andThen(
                      (hasExceededKycThreshold) =>
                        hasExceededKycThreshold
                          ? checkIfKycOracleEntryExists(userId).map((hasEntry) => ({
                              includeKycOracleUpdate: !hasEntry,
                              xrdRewardInUsd
                            }))
                          : ok({ includeKycOracleUpdate: false, xrdRewardInUsd })
                    )
                  )
              : okAsync({ includeKycOracleUpdate: false, xrdRewardInUsd: new BigNumber(0) })
          )
            .andThen(({ includeKycOracleUpdate, xrdRewardInUsd }) =>
              handleSubmitTransaction((wellKnownAddresses) =>
                createRewardsDepositManifest({
                  wellKnownAddresses,
                  questId,
                  userId,
                  rewards,
                  includeKycOracleUpdate
                })
              ).map((transactionId) => ({ transactionId, xrdRewardInUsd }))
            )
            .map(({ transactionId, xrdRewardInUsd }) => ({ userId, transactionId, xrdRewardInUsd }))
        }

        const checkIfUserHasExceededKycThreshold = (
          userId: string,
          xrdRewardInUsd: BigNumber
        ): ResultAsync<boolean, { reason: TransactionWorkerError; jsError: unknown }> =>
          auditModel(logger)
            .getUsdAmount(userId)
            .map((distributedUsdAmount) =>
              xrdRewardInUsd.plus(distributedUsdAmount).isGreaterThan(config.usdKYCThreshold)
            )
            .mapErr((error) => ({
              reason: TransactionWorkerError.FailedToGetTotalRewardedUsdAmount,
              jsError: error
            }))

        const checkIfKycOracleEntryExists = (userId: string) =>
          gatewayApi.hasKycEntry(userId).mapErr(({ jsError }) => ({
            reason: TransactionWorkerError.FailedToQueryNetworkGateway,
            jsError
          }))

        return getItemFromDb().andThen((item) =>
          item.transactionId
            ? handlePollTransactionStatus(item.transactionId)
            : getUserIdFromBadgeId(badgeId)
                .asyncAndThen(triggerDepositRewardsTransaction)
                .andThen(({ userId, transactionId, xrdRewardInUsd }) =>
                  handlePollTransactionStatus(transactionId).andThen(() =>
                    auditModel(logger)
                      .add({
                        transactionId,
                        userId,
                        type: AuditType.CLAIMBOX_DEPOSIT,
                        xrdUsdValue: xrdRewardInUsd.toNumber()
                      })
                      .mapErr(({ jsError }) => ({
                        reason: TransactionWorkerError.FailedToAddAuditEntry,
                        jsError
                      }))
                  )
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

      case 'CombinedElementsAddRadgemImage':
        const { radgemId } = job.data
        return handleSubmitTransaction((wellKnownAddresses) =>
          createCombinedElementsAddRadgemImageManifest({
            wellKnownAddresses,
            badgeResourceAddress: job.data.badgeResourceAddress,
            badgeId: job.data.badgeId,
            radgemId,
            keyImageUrl:
              'https://stokenet-dashboard.radixdlt.com/_app/immutable/assets/nft-placeholder.2eDdybqV.svg'
          })
        ).andThen(handlePollTransactionStatus)

      default:
        return errAsync({
          reason: TransactionWorkerError.UnhandledJob,
          jsError: new Error('Unhandled job')
        })
    }
  }

  return { handler }
}
