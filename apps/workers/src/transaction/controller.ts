import { ResultAsync, errAsync, okAsync, err, ok, Result } from 'neverthrow'
import { Job, TransactionJob } from 'queues'
import { AuditType, PrismaClient, TransactionStatus, User } from 'database'
import {
  Addresses,
  GatewayApi,
  Message,
  MessageApi,
  type AppLogger,
  type AuditModel,
  type ConfigModel,
  type TransactionModel,
  type WellKnownAddresses
} from 'common'
import { radixEngineClient } from 'typescript-wallet'
import { createRewardsDepositManifest } from './helpers/createRewardsDepositManifest'
import { QuestDefinitions, QuestId } from 'content'
import { config } from '../config'
import { createCombinedElementsMintRadgemManifest } from './helpers/createCombinedElementsMintRadgemManifest'
import { stripNonFungibleLocalId } from '../event/helpers/stripNonFungibleLocalId'
import { TokenPriceClient } from '../token-price-client'
import BigNumber from 'bignumber.js'
import { createCombinedElementsAddRadgemImageManifest } from './helpers/createCombinedElementsAddRadgemImageManifest'
import { DbTransactionBuilder } from '../helpers/dbTransactionBuilder'

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
  FailedToSetPendingStatus: 'FailedToSetPendingStatus',
  FailedToSetCompletedStatus: 'FailedToSetCompletedStatus',
  FailedToGetUserIdFromBadgeId: 'FailedToGetUserIdFromBadgeId',
  FailedToGetXrdPrice: 'FailedToGetXrdPrice',
  FailedToAddAuditEntry: 'FailedToAddAuditEntry',
  FailedToGetTransactionFromDb: 'FailedToGetTransactionFromDb',
  MissingTransactionInDb: 'MissingTransactionInDb',
  UnhandledJob: 'UnhandledJob',
  FeatureDisabled: 'FeatureDisabled',
  FailedToSendMessage: 'FailedToSendMessage',
  GatewayError: 'GatewayError',
  HeroBadgeAlreadyClaimed: 'HeroBadgeAlreadyClaimed',
  FailedToExecuteDbTransaction: 'FailedToExecuteDbTransaction',
  FailedToDeriveUserIdFromBadgeId: 'FailedToDeriveUserIdFromBadgeId',
  UserNotFound: 'UserNotFound',
  UserDisabledXrdDeposit: 'UserDisabledXrdDeposit',
  FailedToCreateMessageInDb: 'FailedToCreateMessageInDb'
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

export type TransactionWorkerControllerError = { reason: TransactionWorkerError; jsError?: unknown }
export type TransactionWorkerController = ReturnType<typeof TransactionWorkerController>
export const TransactionWorkerController = ({
  auditModel,
  transactionModel,
  gatewayApi,
  tokenPriceClient,
  configModel,
  messageApi,
  dbClient
}: {
  auditModel: AuditModel
  gatewayApi: GatewayApi
  transactionModel: TransactionModel
  tokenPriceClient: TokenPriceClient
  configModel: ConfigModel
  messageApi: MessageApi
  dbClient: PrismaClient
}) => {
  const handler = ({
    job,
    logger
  }: {
    job: Job<TransactionJob>
    logger: AppLogger
  }): ResultAsync<any, TransactionWorkerControllerError> => {
    const { type, transactionKey, attempt, badgeResourceAddress, badgeId } = job.data

    const hasHeroBadge = (user: User) =>
      gatewayApi
        .hasHeroBadge(user.accountAddress!)
        .mapErr((error) => ({
          reason: TransactionWorkerError.GatewayError,
          jsError: error
        }))
        .andThen((hasHeroBadge) =>
          hasHeroBadge
            ? err({
                reason: TransactionWorkerError.HeroBadgeAlreadyClaimed
              })
            : ok(user)
        )

    const sendMessage = (userId: string, message: Message) =>
      ResultAsync.fromPromise(
        dbClient.message.create({
          data: {
            userId,
            data: JSON.stringify(message)
          }
        }),
        (error) => ({
          reason: TransactionWorkerError.FailedToCreateMessageInDb,
          jsError: error as Error
        })
      ).andThen(({ id }) => messageApi.send(userId, message, id).orElse(() => ok(undefined)))

    const dbTransactionBuilder = DbTransactionBuilder({ messageApi, tokenPriceClient, dbClient })
    const addresses = Addresses(config.networkId)

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

    const getUserByBadgeId = (
      badgeId: string
    ): ResultAsync<User, TransactionWorkerControllerError> =>
      getUserIdFromBadgeId(badgeId)
        .mapErr((error) => ({
          reason: TransactionWorkerError.FailedToDeriveUserIdFromBadgeId,
          jsError: error.jsError
        }))
        .asyncAndThen((userId) =>
          ResultAsync.fromPromise(dbClient.user.findUnique({ where: { id: userId } }), (error) => ({
            reason: TransactionWorkerError.FailedToGetUserIdFromBadgeId,
            jsError: error
          })).andThen((user) =>
            user ? ok(user) : err({ reason: TransactionWorkerError.UserNotFound })
          )
        )

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
                .andThen(({ txId }) => {
                  return transactionModel(logger)
                    .setTransactionId(
                      { transactionKey, badgeId, badgeResourceAddress, attempt },
                      txId
                    )
                    .mapErr(({ jsError }) => ({
                      reason: TransactionWorkerError.FailedToSetTransactionId,
                      jsError
                    }))
                    .map(() => txId)
                })
            )
        )

    const handlePollTransactionStatus = (
      txId: string
    ): ResultAsync<void, TransactionWorkerControllerError> =>
      transactionModel(logger)
        .setStatus(
          { badgeId, badgeResourceAddress, transactionKey, attempt },
          TransactionStatus.PENDING
        )
        .mapErr(({ jsError }) => ({
          jsError,
          reason: TransactionWorkerError.FailedToSetPendingStatus
        }))
        .andThen(() =>
          radixEngineClient.gatewayClient
            .pollTransactionStatus(txId)
            .mapErr((jsError) => ({
              reason: TransactionWorkerError.FailedToPollTransactionStatus,
              jsError
            }))
            .andThen((response) => {
              logger.debug({
                method: 'pollTransactionStatus',
                txId,
                status: response?.status
              })
              return transactionModel(logger)
                .setStatus(
                  { badgeId, badgeResourceAddress, transactionKey, attempt },
                  TransactionStatus.COMPLETED
                )
                .mapErr(({ jsError }) => ({
                  jsError,
                  reason: TransactionWorkerError.FailedToSetCompletedStatus
                }))
            })
            .map(() => undefined)
        )

    switch (type) {
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

            MINT_FUNGIBLE
              Address("${addresses.resources.elementAddress}")
              Decimal("100");
                
            TAKE_FROM_WORKTOP
              Address("${addresses.resources.clamAddress}")
              Decimal("100")
              Bucket("clam_bucket");

            TAKE_FROM_WORKTOP
              Address("${addresses.resources.elementAddress}")
              Decimal("100")
              Bucket("element_bucket");

            CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("clam_bucket")
              Enum<0u8>();

            CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("element_bucket")
              Enum<0u8>();
          `
        ).andThen(handlePollTransactionStatus)

      case 'CombinedElementsMintRadgem':
        return configModel(logger)
          .isRadGemMintingEnabled()
          .mapErr(({ jsError }) => ({ reason: TransactionWorkerError.FeatureDisabled, jsError }))
          .andThen((isEnabled) =>
            isEnabled
              ? getItemFromDb()
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
              : errAsync({
                  reason: TransactionWorkerError.FeatureDisabled,
                  jsError: new Error('Disabled feature')
                })
          )

      case 'CombinedElementsAddRadgemImage':
        const { radgemId } = job.data
        return configModel(logger)
          .isRadGemMintingEnabled()
          .mapErr(({ jsError }) => ({ reason: TransactionWorkerError.FeatureDisabled, jsError }))
          .andThen((isEnabled) =>
            isEnabled
              ? handleSubmitTransaction((wellKnownAddresses) =>
                  createCombinedElementsAddRadgemImageManifest({
                    wellKnownAddresses,
                    badgeResourceAddress: job.data.badgeResourceAddress,
                    badgeId: job.data.badgeId,
                    radgemId,
                    keyImageUrl:
                      'https://stokenet-dashboard.radixdlt.com/_app/immutable/assets/nft-placeholder.2eDdybqV.svg'
                  })
                ).andThen(handlePollTransactionStatus)
              : errAsync({
                  reason: TransactionWorkerError.FeatureDisabled,
                  jsError: new Error('Disabled feature')
                })
          )

      case 'DepositXrdToAccount': {
        return getUserByBadgeId(job.data.badgeId).andThen((user) =>
          gatewayApi
            .isDepositDisabledForResource(user.accountAddress!, addresses.xrd)
            .mapErr((error) => ({ reason: TransactionWorkerError.GatewayError, jsError: error }))
            .andThen((isDisabled) =>
              isDisabled
                ? err({ reason: TransactionWorkerError.UserDisabledXrdDeposit })
                : ok(undefined)
            )
            .andThen(() =>
              handleSubmitTransaction((wellKnownAddresses) =>
                [
                  `CALL_METHOD
                    Address("${wellKnownAddresses.accountAddress.payerAccount}")
                    "lock_fee"
                    Decimal("10")
                  ;`,

                  `CALL_METHOD
                    Address("${wellKnownAddresses.accountAddress.payerAccount}")
                    "withdraw"
                    Address("${wellKnownAddresses.resourceAddresses.xrd}")
                    Decimal("${config.radQuest.directXrdDepositAmount}")
                  ;`,

                  `CALL_METHOD
                    Address("${user.accountAddress!}")
                    "try_deposit_batch_or_abort"
                    Expression("ENTIRE_WORKTOP")
                    Enum<0u8>()
                  ;`
                ].join('\n')
              ).andThen((transactionId) =>
                handlePollTransactionStatus(transactionId).andThen(() =>
                  dbTransactionBuilder.helpers
                    .addXrdDepositToAuditTable({
                      transactionId,
                      userId: user.id,
                      xrdAmount: `${config.radQuest.directXrdDepositAmount}`
                    })
                    .andThen((api) => api.exec())
                    .mapErr((error) => ({
                      reason: TransactionWorkerError.FailedToExecuteDbTransaction,
                      jsError: error
                    }))
                )
              )
            )
            .andThen(() =>
              sendMessage(user.id, { type: 'XrdDepositedToAccount', traceId: job.data.traceId })
            )
        )
      }

      case 'AddAccountAddressToHeroBadgeForge': {
        return getUserByBadgeId(job.data.badgeId)
          .andThen(hasHeroBadge)
          .andThen((user) =>
            handleSubmitTransaction((wellKnownAddresses) =>
              [
                `CALL_METHOD
                  Address("${wellKnownAddresses.accountAddress.payerAccount}")
                  "lock_fee"
                  Decimal("50")
                ;`,

                `CALL_METHOD
                  Address("${wellKnownAddresses.accountAddress.systemAccount}")
                  "create_proof_of_amount"
                  Address("${addresses.badges.adminBadgeAddress}")
                  Decimal("1")
                ;`,

                `CALL_METHOD
                  Address("${addresses.components.heroBadgeForge}")
                  "add_user_account"
                  Address("${user.accountAddress!}")
                ;`
              ].join('\n')
            ).andThen(handlePollTransactionStatus)
          )
      }

      default:
        return errAsync({
          reason: TransactionWorkerError.UnhandledJob,
          jsError: new Error('Unhandled job')
        })
    }
  }

  return { handler }
}
