import { ResultAsync, errAsync, okAsync, err, ok } from 'neverthrow'
import { Job, TransactionJob } from 'queues'
import { AuditType, User } from 'database'
import {
  AuditData,
  GatewayApi,
  GiftBoxReward,
  GiftBoxRewardConfig,
  ImageModel,
  getRandomFloat,
  getRandomIntInclusive,
  type AppLogger,
  type AuditModel
} from 'common'
import { TransactionHelper, TransactionHelperError, withSigners } from 'typescript-wallet'
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
import { ReferralRewardAction } from '../helpers/referalReward'
import { dbClient } from '../db-client'

const { xrd, accounts, badges, resources, components } = config.radQuest
const { system, payer } = accounts

export type TransactionWorkerController = ReturnType<typeof TransactionWorkerController>
export const TransactionWorkerController = ({
  auditModel,
  gatewayApi,
  imageModel,
  tokenPriceClient,
  sendMessage,
  referralRewardAction
}: {
  auditModel: AuditModel
  imageModel: ImageModel
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

    const transactionHelper = TransactionHelper({
      networkId: config.networkId,
      onSignature: withSigners(config.networkId, 'system', 'payer'),
      logger
    })

    const upsertSubmittedTransaction = ({
      transactionId,
      status
    }: {
      transactionId: string
      status: 'PENDING' | 'COMPLETED' | 'FAILED'
    }) =>
      ResultAsync.fromPromise(
        dbClient.submittedTransaction.upsert({
          create: { transactionId, transactionIntent: job.data.discriminator, status },
          update: { status },
          where: { transactionId, transactionIntent: job.data.discriminator }
        }),
        (error) => ({ reason: WorkerError.FailedToUpdateSubmittedTransaction, jsError: error })
      )

    const getGiftBoxRewards = GiftBoxReward(
      GiftBoxRewardConfig({ getRandomFloat, getRandomIntInclusive })
    )

    const handleSubmitTransaction = (manifest: string) =>
      transactionHelper
        .submitTransaction(manifest, {
          onTransactionId: (transactionId) => {
            transactionId = transactionId
            return upsertSubmittedTransaction({ transactionId, status: 'PENDING' })
          }
        })
        .orElse((error) => {
          logger.error({
            method: 'handleSubmitTransaction.err',
            transactionId: error.transactionId,
            status: 'FAILED'
          })

          return error.transactionId
            ? upsertSubmittedTransaction({
                status: 'FAILED',
                transactionId: error.transactionId
              }).andThen(() => errAsync(error))
            : errAsync(error)
        })
        .andThen((value) =>
          upsertSubmittedTransaction({
            transactionId: value.transactionId,
            status: 'COMPLETED'
          }).map(() => value)
        )

    const addEntryToAuditTable = ({
      userId,
      transactionId,
      xrdUsdValue,
      rewards,
      type
    }: {
      userId: string
      transactionId: string
      xrdUsdValue: number
      rewards: AuditData
      type: AuditType
    }) =>
      auditModel(logger)
        .add({
          transactionId,
          userId,
          type,
          xrdUsdValue,
          data: rewards
        })
        .mapErr(({ jsError }) => ({
          reason: WorkerError.FailedToAddAuditEntry,
          jsError
        }))

    const getXrdPrice = (value: string) => {
      const xrdAmount = BigNumber(value)

      return tokenPriceClient
        .getXrdPrice()
        .mapErr((error) => ({
          reason: WorkerError.CouldNotGetXrdCurrentPriceError,
          jsError: error
        }))
        .map((xrdPrice) => ({
          xrdUsdValue: xrdAmount.multipliedBy(xrdPrice).toNumber(),
          xrdAmount
        }))
    }

    const depositQuestRewards = (rewards: QuestReward[], questId: string) => {
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
            handleSubmitTransaction(
              createRewardsDepositManifest({
                questId,
                userId,
                rewards,
                includeKycOracleUpdate,
                depositRewardsTo: 'questRewards'
              })
            ).map(({ transactionId }) => ({ transactionId, xrdRewardInUsd }))
          )
          .map(({ transactionId, xrdRewardInUsd }) => ({ userId, transactionId, xrdRewardInUsd }))

      return triggerDepositRewardsTransaction(userId).andThen(
        ({ userId, transactionId, xrdRewardInUsd }) =>
          addEntryToAuditTable({
            userId,
            transactionId,
            xrdUsdValue: xrdRewardInUsd.toNumber(),
            rewards: { fungible: rewards, nonFungible: [] },
            type: AuditType.CLAIMBOX_DEPOSIT
          })
      )
    }

    switch (type) {
      case 'DepositXrdReward': {
        const { amount, transactionId } = job.data

        return depositQuestRewards(
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

        const getPartialRewards = (questId: QuestId, requirement: string) => {
          const questDefinition = QuestDefinitions()[questId as QuestId] as {
            partialRewards: Record<string, QuestReward[]>
          }

          const rewards = questDefinition?.partialRewards?.[requirement]

          return rewards ? ok(rewards) : err({ reason: WorkerError.FailedToGetPartialRewards })
        }

        return getPartialRewards(questId as QuestId, requirement).asyncAndThen((rewards) =>
          depositQuestRewards(rewards, `${questId}:${requirement}`)
        )
      }

      case 'DepositReward':
        const { questId } = job.data

        const questDefinition = QuestDefinitions()[questId as QuestId]
        const rewards = questDefinition.rewards

        return depositQuestRewards(rewards as unknown as QuestReward[], questId)

      case 'DepositGiftBoxReward': {
        const { giftBoxKind } = job.data

        const { elements: elementAmount, energyCard } = getGiftBoxRewards(giftBoxKind)

        return imageModel(logger)
          .getUrl({ shape: energyCard.key })
          .mapErr((error) => ({ reason: WorkerError.FailedToGetImageUrl, jsError: error }))
          .andThen((key_image_url) => {
            const rewards: Parameters<typeof createRewardsDepositManifest>[0]['rewards'] = [
              { name: 'elements', amount: elementAmount }
            ]

            const card = {
              ...energyCard,
              key_image_url
            }

            rewards.push({
              name: 'energyCard',
              card
            })
            return handleSubmitTransaction(
              createRewardsDepositManifest({
                userId,
                rewards,
                includeKycOracleUpdate: false,
                depositRewardsTo: 'giftBoxOpener'
              })
            ).andThen(({ transactionId }) =>
              addEntryToAuditTable({
                userId,
                transactionId,
                xrdUsdValue: 0,
                rewards: {
                  fungible: [{ name: 'elements', amount: elementAmount }],
                  nonFungible: [card]
                },
                type: AuditType.CLAIMBOX_DEPOSIT
              })
            )
          })
      }

      case 'PopulateResources':
        const { accountAddress } = job.data
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
              Decimal("100");

            CALL_METHOD
              Address("${system.address}")
              "create_proof_of_amount"
              Address("${badges.adminBadgeAddress}") 
              Decimal("1");  
              
            MINT_FUNGIBLE
              Address("${resources.clamAddress}")
              Decimal("100");

            MINT_FUNGIBLE
              Address("${resources.elementAddress}")
              Decimal("100");

              MINT_FUNGIBLE
              Address("${resources.giftBox.Starter}")
              Decimal("20");

              MINT_FUNGIBLE
              Address("${resources.giftBox.Simple}")
              Decimal("20");

              MINT_FUNGIBLE
              Address("${resources.giftBox.Fancy}")
              Decimal("20");

              MINT_FUNGIBLE
              Address("${resources.giftBox.Elite}")
              Decimal("20");


          ${Array(5)
            .fill(
              `CALL_METHOD
            Address("${config.radQuest.components.cardForge}")
            "mint_card"
            "${userId}"
            ""
            "Test Card"
            "This is just a test card"
            "Molten Banana"
            "Such amazing energy"
            "Common"
            Decimal("10")
            false
          `
            )
            .join(';')}
          ;
                
            TAKE_FROM_WORKTOP
              Address("${resources.clamAddress}")
              Decimal("100")
              Bucket("clam_bucket");

                
            TAKE_FROM_WORKTOP
              Address("${resources.morphEnergyCardAddress}")
              Decimal("5")
              Bucket("card_bucket");

            TAKE_FROM_WORKTOP
              Address("${resources.elementAddress}")
              Decimal("100")
              Bucket("element_bucket");

              TAKE_FROM_WORKTOP
              Address("${resources.giftBox.Starter}")
              Decimal("20")
              Bucket("starterBox_bucket");
      
              TAKE_FROM_WORKTOP
              Address("${resources.giftBox.Simple}")
              Decimal("20")
              Bucket("simpleBox_bucket");
      
              TAKE_FROM_WORKTOP
              Address("${resources.giftBox.Fancy}")
              Decimal("20")
              Bucket("fancyBox_bucket");
      
              TAKE_FROM_WORKTOP
              Address("${resources.giftBox.Elite}")
              Decimal("20")
              Bucket("eliteBox_bucket");

            CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("element_bucket")
              Enum<0u8>();
            
            CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("card_bucket")
              Enum<0u8>();

              CALL_METHOD
              Address("${system.address}")
              "create_proof_of_amount"
              Address("${badges.adminBadgeAddress}")
              Decimal("1")
            ;

              CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("starterBox_bucket")
              Enum<0u8>();

              CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("simpleBox_bucket")
              Enum<0u8>();

              CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("fancyBox_bucket")
              Enum<0u8>();

              CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("eliteBox_bucket")
              Enum<0u8>();

              CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("clam_bucket")
              Enum<0u8>();

              CALL_METHOD
                Address("${components.heroBadgeForge}")
                "add_user_account"
                Address("${user.accountAddress!}")
                "${userId}"
              ;

              CALL_METHOD
                Address("${payer.address}")
                "withdraw"
                Address("${xrd}")
                Decimal("${config.radQuest.directXrdDepositAmount}")
              ;

              TAKE_FROM_WORKTOP
              Address("${xrd}")
              Decimal("${config.radQuest.directXrdDepositAmount}")
              Bucket("xrd_bucket");

              CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("xrd_bucket")
              Enum<0u8>();
          `
        )

      case 'CombinedElementsMintRadgem':
        return handleSubmitTransaction(
          createCombinedElementsMintRadgemManifest({
            userId
          })
        )

      case 'CombinedElementsAddRadgemImage':
        const { radgemId } = job.data
        return handleSubmitTransaction(
          createCombinedElementsAddRadgemImageManifest({
            userId,
            radgemId,
            // TODO: keyImageUrl should be fetched from the database
            keyImageUrl:
              'https://stokenet-dashboard.radixdlt.com/_app/immutable/assets/nft-placeholder.2eDdybqV.svg'
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
        Enum < 0u8 > ()
          ; `
              ].join('\n')
            )
          )
          .andThen(({ transactionId }) =>
            getXrdPrice(`${config.radQuest.directXrdDepositAmount}`).andThen(({ xrdUsdValue }) =>
              addEntryToAuditTable({
                transactionId,
                userId: user.id,
                xrdUsdValue,
                type: 'DIRECT_DEPOSIT',
                rewards: {
                  fungible: [{ name: 'xrd', amount: config.radQuest.directXrdDepositAmount }],
                  nonFungible: []
                }
              })
            )
          )
          .andThen(() =>
            sendMessage(user.id, { type: 'XrdDepositedToAccount', traceId: job.data.traceId })
          )

      case 'AddAccountAddressToHeroBadgeForge':
        return handleSubmitTransaction(
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
                Decimal("50")
              ;`,

            `CALL_METHOD
                Address("${system.address}")
                "create_proof_of_amount"
                Address("${badges.adminBadgeAddress}")
                Decimal("1")
              ;`,

            `CALL_METHOD
                Address("${components.heroBadgeForge}")
                "add_user_account"
                Address("${user.accountAddress!}")
                 "${userId}"
              ;`
          ].join('\n')
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
