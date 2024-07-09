import { ResultAsync, errAsync, okAsync, err, ok } from 'neverthrow'
import { Job, TransactionJob } from 'queues'
import { AuditType, User } from 'database'
import {
  Addresses,
  GatewayApi,
  GiftBoxReward,
  GiftBoxRewardConfig,
  getRandomFloat,
  getRandomIntInclusive,
  type AppLogger,
  type AuditModel,
  type WellKnownAddresses
} from 'common'
import { radixEngineClient } from 'typescript-wallet'
import { createRewardsDepositManifest } from './helpers/createRewardsDepositManifest'
import { QuestDefinitions, QuestId, QuestReward } from 'content'
import { config } from '../config'
import { createCombinedElementsMintRadgemManifest } from './helpers/createCombinedElementsMintRadgemManifest'
import { TokenPriceClient } from '../token-price-client'
import BigNumber from 'bignumber.js'
import { createCombinedElementsAddRadgemImageManifest } from './helpers/createCombinedElementsAddRadgemImageManifest'
import { DbTransactionBuilder } from '../helpers/dbTransactionBuilder'
import { WorkerOutputError, WorkerError } from '../_types'
import { MessageHelper } from '../helpers/messageHelper'
import { SetTransactionIntentStatus } from '../helpers/setTransactionIntentStatus'
import { ReferralRewardAction } from '../helpers/referalReward'

export type TransactionWorkerController = ReturnType<typeof TransactionWorkerController>
export const TransactionWorkerController = ({
  auditModel,
  gatewayApi,
  tokenPriceClient,
  sendMessage,
  referralRewardAction
}: {
  auditModel: AuditModel
  gatewayApi: GatewayApi
  tokenPriceClient: TokenPriceClient
  sendMessage: MessageHelper
  referralRewardAction: ReferralRewardAction
}) => {
  const handler = ({
    job,
    user,
    logger,
    dbTransactionBuilder
  }: {
    job: Job<TransactionJob>
    user: User
    logger: AppLogger
    dbTransactionBuilder: DbTransactionBuilder
  }): ResultAsync<any, WorkerOutputError> => {
    const { type, userId } = job.data

    const addresses = Addresses(config.networkId)

    const getGiftBoxRewards = GiftBoxReward(
      GiftBoxRewardConfig({ getRandomFloat, getRandomIntInclusive })
    )

    const handleSubmitTransaction = (
      manifestFactory: (wellKnownAddresses: WellKnownAddresses) => string
    ): ResultAsync<string, { reason: WorkerError; jsError: unknown }> =>
      radixEngineClient
        .getManifestBuilder()
        .mapErr((jsError) => ({
          reason: WorkerError.FailedToGetManifestBuilder,
          jsError
        }))
        .andThen(({ convertStringManifest, submitTransaction, wellKnownAddresses }) => {
          const manifest = manifestFactory(wellKnownAddresses)
          return convertStringManifest(manifest)
            .mapErr((jsError) => {
              logger.debug(manifest)
              return {
                reason: WorkerError.FailedToConvertStringManifest,
                jsError
              }
            })
            .andThen((transactionManifest) =>
              submitTransaction({
                transactionManifest,
                signers: ['systemAccount'],
                logger
              }).mapErr((jsError) => ({
                reason: WorkerError.FailedToSubmitToRadixNetwork,
                jsError
              }))
            )
            .map(({ txId }) => txId)
        })

    const handlePollTransactionStatus = (txId: string): ResultAsync<string, WorkerOutputError> =>
      radixEngineClient.gatewayClient
        .pollTransactionStatus(txId)
        .mapErr((jsError) => ({
          reason: WorkerError.FailedToPollTransactionStatus,
          txId,
          jsError
        }))
        .map(() => txId)

    const handleDepositRewards = (rewards: QuestReward[], questId: string) => {
      const xrdReward = rewards.find((reward) => reward.name === 'xrd')?.amount ?? 0
      const hasXrdReward = xrdReward > 0

      const checkIfKycOracleEntryExists = (userId: string) =>
        gatewayApi.hasKycEntry(userId).mapErr(({ jsError }) => ({
          reason: WorkerError.GatewayError,
          jsError
        }))

      const checkIfUserHasExceededKycThreshold = (
        userId: string,
        xrdRewardInUsd: BigNumber
      ): ResultAsync<boolean, { reason: WorkerError; jsError: unknown }> =>
        auditModel(logger)
          .getUsdAmount(userId)
          .map((distributedUsdAmount) =>
            xrdRewardInUsd.plus(distributedUsdAmount).isGreaterThan(config.usdKYCThreshold)
          )
          .mapErr((error) => ({
            reason: WorkerError.FailedToGetTotalRewardedUsdAmount,
            jsError: error
          }))

      const handleKycOracleUpdate = hasXrdReward
        ? tokenPriceClient
            .getXrdPrice()
            .mapErr((jsError) => ({
              reason: WorkerError.FailedToGetXrdPrice,
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

      const triggerDepositRewardsTransaction = (userId: string) =>
        handleKycOracleUpdate
          .andThen(({ includeKycOracleUpdate, xrdRewardInUsd }) =>
            handleSubmitTransaction((wellKnownAddresses) =>
              createRewardsDepositManifest({
                wellKnownAddresses,
                questId,
                userId,
                rewards,
                includeKycOracleUpdate,
                depositRewardsTo: 'questRewards'
              })
            ).map((transactionId) => ({ transactionId, xrdRewardInUsd }))
          )
          .map(({ transactionId, xrdRewardInUsd }) => ({ userId, transactionId, xrdRewardInUsd }))

      return triggerDepositRewardsTransaction(userId).andThen(
        ({ userId, transactionId, xrdRewardInUsd }) =>
          handlePollTransactionStatus(transactionId).andThen(() =>
            auditModel(logger)
              .add({
                transactionId,
                userId,
                type: AuditType.CLAIMBOX_DEPOSIT,
                xrdUsdValue: xrdRewardInUsd.toNumber()
              })
              .mapErr(({ jsError }) => ({
                reason: WorkerError.FailedToAddAuditEntry,
                jsError
              }))
          )
      )
    }

    const getPartialRewards = (questId: QuestId, requirement: string) => {
      const questDefinition = QuestDefinitions()[questId as QuestId] as {
        partialRewards: Record<string, QuestReward[]>
      }

      const rewards = questDefinition?.partialRewards?.[requirement]

      return rewards ? ok(rewards) : err({ reason: WorkerError.FailedToGetPartialRewards })
    }

    switch (type) {
      case 'DepositXrdReward': {
        const { amount, transactionId } = job.data

        return handleDepositRewards(
          [
            {
              name: 'xrd',
              amount
            }
          ],
          job.data.questId
        ).andThen(() =>
          referralRewardAction({
            action: 'INC',
            xrdValue: amount,
            userId: user.id,
            transactionId
          })
        )
      }

      case 'DepositPartialReward': {
        const { questId, requirement } = job.data

        return getPartialRewards(questId as QuestId, requirement).asyncAndThen((rewards) =>
          handleDepositRewards(rewards, `${questId}:${requirement}`)
        )
      }
      case 'DepositReward':
        const { questId } = job.data

        const questDefinition = QuestDefinitions()[questId as QuestId]
        const rewards = questDefinition.rewards

        return handleDepositRewards(rewards as unknown as QuestReward[], questId)

      case 'DepositGiftBoxReward': {
        const { giftBoxKind } = job.data

        const { elements: elementAmount, energyCard } = getGiftBoxRewards(giftBoxKind)

        const rewards: Parameters<typeof createRewardsDepositManifest>[0]['rewards'] = [
          { name: 'elements', amount: elementAmount }
        ]

        if (energyCard)
          rewards.push({
            name: 'energyCard',
            card: {
              ...energyCard,
              key_image_url: `https://pvsns27x20.execute-api.eu-west-1.amazonaws.com/card?shape=${energyCard.key}`
            }
          })

        return handleSubmitTransaction((wellKnownAddresses) =>
          createRewardsDepositManifest({
            wellKnownAddresses,
            userId,
            rewards,
            includeKycOracleUpdate: false,
            depositRewardsTo: 'giftBoxOpener'
          })
        ).andThen(handlePollTransactionStatus)
      }

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

              CALL_METHOD
                Address("${wellKnownAddresses.accountAddress.systemAccount}")
                "create_proof_of_amount"
                Address("${addresses.badges.adminBadgeAddress}")
                Decimal("1")
              ;

              CALL_METHOD
                Address("${addresses.components.heroBadgeForge}")
                "add_user_account"
                Address("${user.accountAddress!}")
              ;

              CALL_METHOD
                Address("${wellKnownAddresses.accountAddress.payerAccount}")
                "withdraw"
                Address("${wellKnownAddresses.resourceAddresses.xrd}")
                Decimal("${config.radQuest.directXrdDepositAmount}")
              ;

              TAKE_FROM_WORKTOP
              Address("${addresses.xrd}")
              Decimal("${config.radQuest.directXrdDepositAmount}")
              Bucket("xrd_bucket");

              CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("xrd_bucket")
              Enum<0u8>();
          `
        ).andThen(handlePollTransactionStatus)

      case 'CombinedElementsMintRadgem':
        return handleSubmitTransaction((wellKnownAddresses) =>
          createCombinedElementsMintRadgemManifest({
            wellKnownAddresses,
            userId
          })
        ).andThen(handlePollTransactionStatus)

      case 'CombinedElementsAddRadgemImage':
        const { radgemId } = job.data
        return handleSubmitTransaction((wellKnownAddresses) =>
          createCombinedElementsAddRadgemImageManifest({
            wellKnownAddresses,
            userId,
            radgemId,
            // TODO: keyImageUrl should be fetched from the database
            keyImageUrl:
              'https://stokenet-dashboard.radixdlt.com/_app/immutable/assets/nft-placeholder.2eDdybqV.svg'
          })
        ).andThen(handlePollTransactionStatus)

      case 'DepositXrdToAccount':
        return gatewayApi
          .isDepositDisabledForResource(user.accountAddress!, addresses.xrd)
          .mapErr((error) => ({ reason: WorkerError.GatewayError, jsError: error }))
          .andThen((isDisabled) =>
            isDisabled ? err({ reason: WorkerError.UserDisabledXrdDeposit }) : ok(undefined)
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
            )
          )
          .andThen(handlePollTransactionStatus)
          .andThen((transactionId) =>
            dbTransactionBuilder.helpers.addXrdDepositToAuditTable({
              transactionId,
              userId: user.id,
              xrdAmount: `${config.radQuest.directXrdDepositAmount}`
            })
          )
          .andThen((api) => api.exec())
          .andThen(() =>
            sendMessage(user.id, { type: 'XrdDepositedToAccount', traceId: job.data.traceId })
          )

      case 'AddAccountAddressToHeroBadgeForge':
        return handleSubmitTransaction((wellKnownAddresses) =>
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

      default:
        return errAsync({
          reason: WorkerError.UnhandledJob,
          jsError: new Error('Unhandled job')
        })
    }
  }

  return { handler }
}
