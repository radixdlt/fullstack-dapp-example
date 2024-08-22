import { ResultAsync, errAsync, okAsync, err, ok } from 'neverthrow'
import { Job, TransactionJob } from 'queues'
import { User } from 'database'
import {
  GatewayApi,
  GiftBoxReward,
  GiftBoxRewardConfig,
  ImageModel,
  getRandomFloat,
  getRandomIntInclusive,
  type AppLogger,
  newRadgem,
  ColorCodeDescription,
  ShaderCodeDescription,
  transformRadgemToNfData
} from 'common'
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

const { xrd, accounts, badges, resources, components } = config.radQuest
const { system, payer } = accounts

export type TransactionWorkerController = ReturnType<typeof TransactionWorkerController>
export const TransactionWorkerController = ({
  gatewayApi,
  imageModel,
  sendMessage
}: {
  imageModel: ImageModel
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

    const getGiftBoxRewards = GiftBoxReward(
      GiftBoxRewardConfig({ getRandomFloat, getRandomIntInclusive })
    )

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

        return errAsync({
          reason: WorkerError.TemporarySkip
        })

        // return handleSubmitTransaction(
        //   `
        //     CALL_METHOD
        //       Address("${payer.accessController}")
        //       "create_proof";
        //     CALL_METHOD
        //       Address("${system.accessController}")
        //       "create_proof";
        //     CALL_METHOD
        //       Address("${payer.address}")
        //       "lock_fee"
        //       Decimal("100");
        //   CALL_METHOD
        //       Address("${system.address}")
        //       "create_proof_of_amount"
        //       Address("${badges.adminBadgeAddress}")
        //       Decimal("1");
        //    CALL_METHOD
        //         Address("${components.heroBadgeForge}")
        //         "hero_completed_quest"
        //         "${userId}"
        //         "${questId}"
        //   ;`
        // )
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
            "Tidal Wave"
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

      case 'ElementsDeposited': {
        const { elementsCount, userId } = job.data
        const numberOfRadgems = Math.floor(elementsCount / config.radQuest.elementsPerRadgem)
        const radGems = Array(numberOfRadgems)
          .fill(null)
          .map(newRadgem)
          .map(transformRadgemToNfData)

        return ResultAsync.combine(
          radGems.map((radGem) =>
            imageModel(logger)
              .getRadGemKeyImageUrl(
                radGem.color as ColorCodeDescription,
                radGem.material as ShaderCodeDescription
              )
              .map((key_image_url) => ({ ...radGem, key_image_url }))
          )
        )
          .andThen((radgems) => {
            const radgemTuples = radgems
              .map(
                ({ key_image_url, name, description, material, color, rarity, quality }) =>
                  `Tuple(
                    "${key_image_url}", 
                    "${name}", 
                    "${description}", 
                    "${material}", 
                    "${color}", 
                    "${rarity}", 
                    Decimal("${quality}")
                  )
                  `
              )
              .join(', ')

            return handleSubmitTransaction(
              [
                `
              CALL_METHOD
                Address("${payer.accessController}")
                "create_proof"
              ;`,

                `
              CALL_METHOD
                Address("${system.accessController}")
                "create_proof"
              ;`,

                `
              CALL_METHOD
                Address("${payer.address}")
                "lock_fee"
                Decimal("50")
              ;`,

                `
              CALL_METHOD
                Address("${system.address}")
                "create_proof_of_amount"
                Address("${badges.adminBadgeAddress}")
                Decimal("1")
              ;`,

                `
              CALL_METHOD
                Address("${components.radgemForgeV2}")
                "mint_radgems"
                "${userId}"
                Array<Tuple>(
                  ${radgemTuples}
                )
              ;`
              ].join('\n')
            ).andThen(() =>
              sendMessage(userId, {
                type: 'RadgemsMinted',
                radgemData: radgems,
                traceId: job.data.traceId
              })
            )
          })
          .mapErr((error) => ({ reason: WorkerError.FailedToCreateRadGem, jsError: error }))
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
