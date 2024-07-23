import { ok } from 'neverthrow'
import { Job, RedisConnection, SystemJob, SystemJobType } from 'queues'
import { AccountAddressModel, AppLogger, TransactionStreamModel, waitForMessage } from 'common'
import { getImageOracleManifest } from './helpers/getImageOracleManifest'
import { config } from '../config'
import { AccountHelper, TransactionHelper, withSigners } from 'typescript-wallet'
import { completeQuestRequirements } from './helpers/completeQuestRequirements'
import { PrismaClient } from 'database'
import { lettySwapDappDefinitionTransactionManifest } from './helpers/setLettySwapDappDefintion'

export type SystemWorkerController = ReturnType<typeof SystemWorkerController>
export const SystemWorkerController = ({
  logger,
  AccountAddressModel,
  dbClient,
  redisClient,
  transactionStreamModel
}: {
  logger: AppLogger
  AccountAddressModel: AccountAddressModel
  redisClient: Awaited<RedisConnection['client']>
  transactionStreamModel: TransactionStreamModel
  dbClient: PrismaClient
}) => {
  const handler = async (job: Job<SystemJob>) => {
    const { traceId, type } = job.data

    const childLogger = logger.child({
      traceId,
      type,
      method: 'systemWorkerController.handler'
    })

    const accountAddressModel = AccountAddressModel(childLogger)

    const transactionHelper = TransactionHelper({
      networkId: config.networkId,
      onSignature: withSigners(config.networkId, 'system', 'payer'),
      logger
    })

    const { payer, system, jetty, owner } = config.radQuest.accounts
    const { superAdminBadgeAddress, adminBadgeAddress, heroBadgeAddress, kycBadgeAddress } =
      config.radQuest.badges
    const { clamAddress } = config.radQuest.resources
    const { questRewards } = config.radQuest.components

    const accountHelper = AccountHelper(dbClient)

    const mintHeroBadge = async (userId: string, accountAddress: string) => {
      const result = await transactionHelper.submitTransaction(`
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
              Decimal("10")
            ;
    
            CALL_METHOD
              Address("${system.address}")
              "create_proof_of_amount"
              Address("${adminBadgeAddress}")
              Decimal("1")
            ;
              
            MINT_NON_FUNGIBLE
              Address("${heroBadgeAddress}")
              Map<NonFungibleLocalId, Tuple>(NonFungibleLocalId("<${userId}>") => Tuple(Tuple(
                "Your Hero Badge",
                "Your progress through your RadQuest journey",
                "",
                Array<String>(),
                0u32,
              )))
            ;
    
            CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_batch_or_abort"
              Expression("ENTIRE_WORKTOP")
              Enum<0u8>()
            ;`)
      if (result.isErr()) throw result.error
    }

    const createAccount = async (
      value?: Partial<{ withXrd: boolean; withHeroBadge: boolean; referredBy: string }>
    ) => {
      const { withXrd = false, withHeroBadge = false, referredBy } = value ?? {}
      const userResult = await accountHelper.createAccount({ logger, networkId: 2, referredBy })

      if (userResult.isErr()) throw userResult.error

      const { getXrdFromFaucet, user } = userResult.value
      logger.debug({ method: 'createAccount', user })
      if (withXrd) {
        const faucetResult = await getXrdFromFaucet()
        if (faucetResult.isErr()) throw faucetResult.error
      }
      if (withHeroBadge)
        await mintHeroBadge(userResult.value.user.id, userResult.value.user.accountAddress!)

      return userResult.value
    }

    switch (type) {
      case SystemJobType.PopulateRadmorphs:
        return transactionHelper
          .submitTransaction(getImageOracleManifest(job.data.data))
          .map(() => undefined)

      case SystemJobType.UpdateKycBadgeAddress:
        return TransactionHelper({
          networkId: config.networkId,
          onSignature: withSigners(config.networkId, 'owner', 'payer'),
          logger
        })
          .submitTransaction(
            `
            CALL_METHOD 
              Address("${payer.accessController}") 
              "create_proof"
            ;

            CALL_METHOD 
              Address("${payer.address}") 
              "lock_fee"
              Decimal("10")
            ;

            CALL_METHOD 
              Address("${owner.accessController}") 
              "create_proof"
            ;
            
            CALL_METHOD
              Address("${owner.address}")
              "create_proof_of_amount"
              Address("${superAdminBadgeAddress}")
              Decimal("1")
            ;
            
            CALL_METHOD
              Address("${questRewards}")
              "set_kyc_badge_address"
              Address("${kycBadgeAddress}")
            ;`
          )
          .map(() => undefined)

      case SystemJobType.UpdateLettySwapDappDefinition:
        return TransactionHelper({
          networkId: config.networkId,
          onSignature: withSigners(config.networkId, 'lettySwapDappDefinition', 'payer'),
          logger
        })
          .submitTransaction(lettySwapDappDefinitionTransactionManifest)
          .map(() => undefined)

      case SystemJobType.UpdateKycOracle: {
        return transactionHelper
          .submitTransaction(
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
              Decimal("10")
            ;

            CALL_METHOD
              Address("${system.address}")
              "create_proof_of_amount"
              Address("${adminBadgeAddress}")
              Decimal("1")
            ;

            CALL_METHOD
              Address("${config.radQuest.components.kycOracle}")
              "update_user_kyc_requirement"
              "${job.data.userId}"
              true
            ;
              `
          )
          .map(() => undefined)
      }

      case SystemJobType.AddReferral: {
        const { user, submitTransaction } = await createAccount({
          referredBy: job.data.referralCode,
          withHeroBadge: true,
          withXrd: true
        })
        await accountAddressModel.addTrackedAddress(user.accountAddress!, 'TransferTokens', user.id)

        await completeQuestRequirements(dbClient)(user.id, 'TransferTokens', [
          'PersonaQuiz',
          'TransactionQuiz',
          'XrdQuiz'
        ])

        await transactionHelper.submitTransaction(`
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
            Decimal("20")
          ;

          CALL_METHOD
            Address("${system.address}")
            "create_proof_of_amount"
            Address("${adminBadgeAddress}")
            Decimal("1")
          ;
            
          MINT_FUNGIBLE
            Address("${clamAddress}")
            Decimal("10")
          ;

          CALL_METHOD
            Address("${user.accountAddress}")
            "try_deposit_batch_or_abort"
            Expression("ENTIRE_WORKTOP")
            None
          ;`)

        await submitTransaction(`
            CALL_METHOD
              Address("${user.accountAddress}")
              "lock_fee"
              Decimal("50")
            ;
            CALL_METHOD
              Address("${user.accountAddress}")
              "withdraw"
              Address("${clamAddress}")
              Decimal("10")
            ;
            TAKE_FROM_WORKTOP
              Address("${clamAddress}")
              Decimal("10")
              Bucket("clam_bucket")
            ;
            CALL_METHOD
              Address("${jetty.address}")
              "try_deposit_or_abort"
              Bucket("clam_bucket")
              Enum<0u8>()
            ;
          `)

        await waitForMessage(logger, dbClient)(user.id, 'QuestRewardsDeposited')

        await submitTransaction(`
            CALL_METHOD
              Address("${user.accountAddress}")
              "lock_fee"
              Decimal("10")
            ;
            CALL_METHOD
              Address("${user.accountAddress}")
              "create_proof_of_non_fungibles"
              Address("${heroBadgeAddress}")
              Array<NonFungibleLocalId>(NonFungibleLocalId("<${user.id}>"))
            ;
            POP_FROM_AUTH_ZONE
              Proof("hero_badge_proof")
            ;
            CALL_METHOD
              Address("${questRewards}")
              "claim_reward"
              "TransferTokens"
              Proof("hero_badge_proof")
              None
            ;
            CALL_METHOD
              Address("${user.accountAddress}")
              "deposit_batch"
              Expression("ENTIRE_WORKTOP")
            ;
          `)

        return ok(undefined)
      }

      default:
        childLogger.error({
          message: 'Unhandled Event'
        })
        return ok({})
    }
  }

  return { handler }
}
