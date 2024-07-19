import { describe, it, expect, beforeAll } from 'vitest'
import {
  mintElements,
  mintClams,
  AccountHelper,
  Account,
  mintGiftBox,
  withSigners,
  TransactionHelper
} from 'typescript-wallet'
import {
  AccountAddressModel,
  Addresses,
  GatewayApi,
  GiftBoxKind,
  TransactionModel,
  UserModel,
  UserQuestModel,
  createAppLogger
} from 'common'
import { PrismaClient, User } from 'database'
import { ResultAsync, errAsync } from 'neverthrow'
import { Queues, RedisConnection, getQueues } from 'queues'
import { config } from './config'
import { QueueEvents } from 'bullmq'
import crypto from 'crypto'
import { completeQuestRequirements } from './helpers/complete-quest-requirements'
import { waitForMessage } from './helpers/wait-for-message'

const eventQueueEvents = new QueueEvents(Queues.EventQueue, { connection: config.redis })
const transactionQueueEvents = new QueueEvents(Queues.TransactionQueue, {
  connection: config.redis
})

const { transactionQueue } = getQueues(config.redis)

const waitForQueueEvent = async (
  status: Parameters<(typeof eventQueueEvents)['on']>[0],
  queueEvents: QueueEvents,
  jobId: string
) =>
  new Promise<void>((resolve) => {
    queueEvents.on(status, async (data: any) => {
      if (jobId === data.jobId) return resolve(undefined)
    })
  })

const gatewayApi = GatewayApi(2)

const db = new PrismaClient()
const redisClient = new RedisConnection(config.redis)

const accountHelper = AccountHelper(db)

const logger = createAppLogger({ level: 'debug' })

let account: Account

const getAccount = async () => {
  if (!account) {
    account = await createAccount({ withXrd: true, withHeroBadge: true })
  }
  return account
}

let accountAddress: string

const transactionModel = TransactionModel(db, transactionQueue)
const userQuestModel = UserQuestModel(db)(logger)
const userModel = UserModel(db)(logger)
const accountAddressModel = AccountAddressModel(redisClient)(logger)

const addresses = Addresses(2)

const { payer, system } = addresses.accounts
const { adminBadgeAddress, heroBadgeAddress } = addresses.badges

const systemTransactionHelper = TransactionHelper({
  networkId: 2,
  onSignature: withSigners(2, 'system', 'payer'),
  logger
})

const mintHeroBadge = async (userId: string, accountAddress: string) => {
  const result = await systemTransactionHelper.submitTransaction(`
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

const startQuestAndAddTrackedAccount = (userId: string, questId: string) =>
  userModel
    .getById(userId, {})
    .andThen((user) =>
      user
        ? accountAddressModel.addTrackedAddress(accountAddress as string, questId, userId)
        : errAsync('User not found')
    )
    .andThen(() => userQuestModel.updateQuestStatus(questId, userId, 'IN_PROGRESS'))

const completeTransferTokensQuest = async (user: User) => {
  const questId = 'TransferTokens'

  await startQuestAndAddTrackedAccount(user.id, questId)
  await completeQuestRequirements(db)(user.id, questId, [
    'PersonaQuiz',
    'TransactionQuiz',
    'XrdQuiz'
  ])

  await mintClams(10, user.accountAddress!)
}

const executeUserReferralFlow = async ({ user, submitTransaction }: Account) => {
  console.log('Completing transfer tokens quest')
  await accountAddressModel.addTrackedAddress(user.accountAddress!, 'TransferTokens', user.id)
  await completeTransferTokensQuest(user)

  await submitTransaction(`
    CALL_METHOD
      Address("${user.accountAddress}")
      "lock_fee"
      Decimal("50")
    ;
    CALL_METHOD
      Address("${user.accountAddress}")
      "withdraw"
      Address("${addresses.resources.clamAddress}")
      Decimal("10")
    ;
    TAKE_FROM_WORKTOP
      Address("${addresses.resources.clamAddress}")
      Decimal("10")
      Bucket("clam_bucket")
    ;
    CALL_METHOD
      Address("${addresses.accounts.jetty.address}")
      "try_deposit_or_abort"
      Bucket("clam_bucket")
      Enum<0u8>()
    ;
  `)
  await waitForMessage(logger, db)(user.id, 'QuestRewardsDeposited')
  console.log('Claiming rewards for transfer tokens quest')
  const claimRewardResult = await submitTransaction(`
    CALL_METHOD
      Address("${user.accountAddress}")
      "lock_fee"
      Decimal("10")
    ;
    CALL_METHOD
      Address("${user.accountAddress}")
      "create_proof_of_non_fungibles"
      Address("${addresses.badges.heroBadgeAddress}")
      Array<NonFungibleLocalId>(NonFungibleLocalId("<${user.id}>"))
    ;
    POP_FROM_AUTH_ZONE
      Proof("hero_badge_proof")
    ;
    CALL_METHOD
      Address("${addresses.components.questRewards}")
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

  if (claimRewardResult.isErr()) throw claimRewardResult.error
}

const createAccount = async (
  value?: Partial<{ withXrd: boolean; withHeroBadge: boolean; referredBy: string }>
) => {
  const { withXrd = false, withHeroBadge = false, referredBy } = value ?? {}
  const userResult = await accountHelper.createAccount({ logger, networkId: 2, referredBy })
  if (userResult.isErr()) throw userResult.error
  const { getXrdFromFaucet } = userResult.value
  if (withXrd) {
    const faucetResult = await getXrdFromFaucet()
    if (faucetResult.isErr()) throw faucetResult.error
  }
  if (withHeroBadge)
    await mintHeroBadge(userResult.value.user.id, userResult.value.user.accountAddress!)

  return userResult.value
}

describe('Event flows', () => {
  it(
    'should add account address, track event, send notification to user, and mint hero badge',
    { timeout: 60_000, skip: false },
    async () => {
      const { user, submitTransaction } = await createAccount({ withXrd: true })

      const discriminator = `AddAccountAddressToHeroBadgeForge:${crypto.randomUUID()}`

      await completeQuestRequirements(db)(user.id, 'GetStuff', [
        'VerifyPhoneNumber',
        'RegisterAccount',
        'LearnAboutTransactions'
      ])

      await transactionModel(logger).add({
        userId: user.id,
        discriminator,
        type: 'AddAccountAddressToHeroBadgeForge',
        traceId: crypto.randomUUID(),
        accountAddress: user.accountAddress!
      })

      await waitForQueueEvent('completed', transactionQueueEvents, discriminator)

      const item = await db.transactionIntent.findFirst({
        where: { discriminator }
      })

      expect(item?.status).toBe('COMPLETED')

      await waitForMessage(logger, db)(user.id, 'HeroBadgeReadyToBeClaimed')

      const claimBadgeResult = await submitTransaction(`
        CALL_METHOD
            Address("${user.accountAddress}")
            "lock_fee"
            Decimal("50")
        ;
        CALL_METHOD
            Address("${addresses.components.heroBadgeForge}")
            "claim_badge"
            Address("${user.accountAddress}")
        ;
        CALL_METHOD
            Address("${user.accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
      `)

      if (claimBadgeResult.isErr()) throw claimBadgeResult.error

      const result = await gatewayApi.hasHeroBadge(user.accountAddress!)

      if (result.isErr()) throw result.error

      expect(result.value).toBe(true)
    }
  )

  it('should deposit XRD to account', { timeout: 60_000, skip: false }, async () => {
    const { user } = await createAccount()
    const discriminator = `DepositXrdToAccount:${crypto.randomUUID()}`

    const traceId = crypto.randomUUID()

    await transactionModel(logger).add({
      discriminator,
      userId: user.id,
      type: 'DepositXrdToAccount',
      traceId
    })

    await waitForQueueEvent('completed', transactionQueueEvents, discriminator)

    const item = await db.transactionIntent.findFirst({
      where: { discriminator }
    })

    expect(item?.status).toBe('COMPLETED')

    const result = await gatewayApi.callApi('getEntityDetailsVaultAggregated', [
      user.accountAddress!
    ])

    if (result.isErr()) throw result.error

    expect(
      result.value.some((item) =>
        item.fungible_resources.items.some((token) => token.resource_address === addresses.xrd)
      )
    ).toBe(true)
  })

  describe('radgem', async () => {
    it('combine elements into a RadGem', { timeout: 30_000, skip: false }, async () => {
      const { submitTransaction, user } = await createAccount({
        withXrd: true,
        withHeroBadge: true
      })

      await mintElements(10, user.accountAddress!)

      const result = await submitTransaction(`
        CALL_METHOD
            Address("${user.accountAddress}")
            "lock_fee"
            Decimal("50")
        ;

        CALL_METHOD
            Address("${user.accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${addresses.badges.heroBadgeAddress}")
            Array<NonFungibleLocalId>(NonFungibleLocalId("<${user?.id}>"))
        ;

        POP_FROM_AUTH_ZONE
            Proof("userBadge")
        ;

        CALL_METHOD
            Address("${user?.accountAddress}")
            "withdraw" 
            Address("${addresses.resources.elementAddress}")
            Decimal("5") 
        ;

        TAKE_ALL_FROM_WORKTOP 
            Address("${addresses.resources.elementAddress}") 
            Bucket("elements")
        ;

        CALL_METHOD
            Address("${addresses.components.refinery}")
            "combine_elements_deposit"
            Proof("userBadge")
            Bucket("elements")
        ;

        CALL_METHOD
            Address("${user.accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;`)

      if (result.isErr()) throw result.error

      await waitForMessage(logger, db)(user.id, 'CombineElementsAddRadgemImage')

      console.log('Transaction ID:', result.value)
    })
  })

  it('should send clams to jetty and claim rewards', { timeout: 60_000, skip: false }, async () => {
    const { submitTransaction, user } = await createAccount({
      withXrd: true,
      withHeroBadge: true
    })
    await accountAddressModel.addTrackedAddress(user.accountAddress!, 'TransferTokens', user.id)

    await completeQuestRequirements(db)(user.id, 'TransferTokens', [
      'PersonaQuiz',
      'TransactionQuiz',
      'XrdQuiz'
    ])

    const clamResult = await systemTransactionHelper.submitTransaction(`
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
        Address("${addresses.resources.clamAddress}")
        Decimal("10")
      ;

      CALL_METHOD
        Address("${user.accountAddress}")
        "try_deposit_batch_or_abort"
        Expression("ENTIRE_WORKTOP")
        None
      ;`)

    if (clamResult.isErr()) throw clamResult.error

    await submitTransaction(`
        CALL_METHOD
          Address("${user.accountAddress}")
          "lock_fee"
          Decimal("50")
        ;
        CALL_METHOD
          Address("${user.accountAddress}")
          "withdraw"
          Address("${addresses.resources.clamAddress}")
          Decimal("10")
        ;
        TAKE_FROM_WORKTOP
          Address("${addresses.resources.clamAddress}")
          Decimal("10")
          Bucket("clam_bucket")
        ;
        CALL_METHOD
          Address("${addresses.accounts.jetty.address}")
          "try_deposit_or_abort"
          Bucket("clam_bucket")
          Enum<0u8>()
        ;
      `)

    await waitForMessage(logger, db)(user.id, 'QuestRewardsDeposited')

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
          Address("${addresses.components.questRewards}")
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
    await waitForMessage(logger, db)(user.id, 'QuestRewardsClaimed')
  })

  describe('Referral flow', () => {
    it(
      'should complete basic quest, deposit reward, claim reward',
      { timeout: 90_000, skip: false },
      async () => {
        const referrer = await createAccount({ withXrd: true, withHeroBadge: true })

        const users = await Promise.all(
          new Array(1).fill(0).map(() =>
            createAccount({
              referredBy: referrer.user.referralCode,
              withHeroBadge: true,
              withXrd: true
            })
          )
        )

        for (const account of users) {
          await executeUserReferralFlow(account)
          await waitForMessage(logger, db)(referrer.user.id, 'ReferralCompletedBasicQuests')
        }

        await waitForMessage(logger, db)(referrer.user.id, 'QuestRewardsDeposited')

        // expect(await getXrdRewardToClaim(referrer.user.id)).toEqual(50)

        const claimRewardResult = await referrer.submitTransaction(
          `
              CALL_METHOD
                Address("${referrer.user.accountAddress}")
                "lock_fee"
                Decimal("10")
              ;
              CALL_METHOD
                Address("${referrer.user.accountAddress}")
                "create_proof_of_non_fungibles"
                Address("${addresses.badges.heroBadgeAddress}")
                Array<NonFungibleLocalId>(NonFungibleLocalId("<${referrer.user.id}>"))
              ;
              POP_FROM_AUTH_ZONE
                Proof("hero_badge_proof")
              ;
              CALL_METHOD
                Address("${addresses.components.questRewards}")
                "claim_reward"
                "QuestTogether"
                Proof("hero_badge_proof")
                None
              ;
              CALL_METHOD
                Address("${referrer.user.accountAddress}")
                "deposit_batch"
                Expression("ENTIRE_WORKTOP")
              ;
          `
        )

        if (claimRewardResult.isErr()) throw claimRewardResult.error

        await waitForMessage(logger, db)(referrer.user.id, 'QuestRewardsClaimed')
      }
    )
  })

  describe('giftbox', async () => {
    beforeAll(async () => {
      const { user } = await getAccount()
      const mintGiftBoxes = async () =>
        await ResultAsync.combine([
          mintGiftBox('Starter', user.accountAddress!),
          mintGiftBox('Simple', user.accountAddress!),
          mintGiftBox('Fancy', user.accountAddress!),
          mintGiftBox('Elite', user.accountAddress!)
        ])

      const mintGiftBoxesResult = await mintGiftBoxes()

      if (mintGiftBoxesResult.isErr()) throw mintGiftBoxesResult.error
    }, 60_000)

    const openGiftBox = async (kind: GiftBoxKind) => {
      const { submitTransaction, user } = await getAccount()
      const openGiftBoxResult = await submitTransaction(`
        CALL_METHOD
          Address("${user.accountAddress}")
          "lock_fee"
          Decimal("50")
        ;

        CALL_METHOD
          Address("${user.accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${addresses.badges.heroBadgeAddress}")
          Array<NonFungibleLocalId>(
              NonFungibleLocalId("<${user.id}>")
          )
        ;

        POP_FROM_AUTH_ZONE
          Proof("hero_badge_proof")
        ;

        CALL_METHOD
          Address("${user.accountAddress}")
          "withdraw"
          Address("${addresses.resources.giftBox[kind]}")
          Decimal("1")
        ;

        TAKE_ALL_FROM_WORKTOP
          Address("${addresses.resources.giftBox[kind]}")
          Bucket("gift_box")
        ;

        CALL_METHOD
          Address("${addresses.components.giftBoxOpener}")
          "open_gift_box"
          Proof("hero_badge_proof")
          Bucket("gift_box")
        ;
      `)

      if (openGiftBoxResult.isErr()) throw openGiftBoxResult.error
    }

    const claimGiftBoxReward = async () => {
      const { submitTransaction, user } = await getAccount()
      const result = await submitTransaction(`
        CALL_METHOD
            Address("${user.accountAddress}")
            "lock_fee"
            Decimal("50")
        ;
        CALL_METHOD
            Address("${user.accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${addresses.badges.heroBadgeAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("<${user.id}>")
            )
        ;
        POP_FROM_AUTH_ZONE
            Proof("hero_badge_proof")
        ;
        CALL_METHOD
            Address("${addresses.components.giftBoxOpener}")
            "claim_gift_box_rewards"
            Proof("hero_badge_proof")
        ;
        CALL_METHOD
            Address("${user.accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;`)
      if (result.isErr()) throw result.error
    }

    it('open Starter gift box', { timeout: 60_000, skip: false }, async () => {
      const { user } = await getAccount()
      await openGiftBox('Starter')
      await waitForMessage(logger, db)(user.id, 'GiftBoxDeposited')
      await claimGiftBoxReward()
    })

    it('open Simple gift box', { timeout: 60_000, skip: false }, async () => {
      const { user } = await getAccount()
      await openGiftBox('Simple')
      await waitForMessage(logger, db)(user.id, 'GiftBoxDeposited')
      await claimGiftBoxReward()
    })

    it('open Fancy gift box', { timeout: 60_000, skip: false }, async () => {
      const { user } = await getAccount()
      await openGiftBox('Fancy')
      await waitForMessage(logger, db)(user.id, 'GiftBoxDeposited')
      await claimGiftBoxReward()
    })

    it('open Elite gift box', { timeout: 60_000, skip: false }, async () => {
      const { user } = await getAccount()
      await openGiftBox('Elite')
      await waitForMessage(logger, db)(user.id, 'GiftBoxDeposited')
      await claimGiftBoxReward()
    })
  })

  describe('KYC', () => {
    it(
      'should prevent user from claiming rewards without KYC',
      { timeout: 60_000, skip: false },
      async () => {
        const user = await createAccount({ withXrd: true, withHeroBadge: true })

        await db.audit.create({
          data: {
            transactionId: crypto.randomUUID(),
            userId: user.user.id,
            xrdUsdValue: 100,
            xrdPrice: 1,
            type: 'DIRECT_DEPOSIT'
          }
        })

        try {
          await executeUserReferralFlow(user)
          throw new Error("User shouldn't be able to claim rewards without KYC")
        } catch (error) {
          expect(error).toBeDefined()
        }
      }
    )
  })

  describe.skip('utm', () => {
    it('should set users with utm', async () => {
      const numberOfUsers = new Array(100).fill(0)

      const country = ['us', 'ca', 'gb', 'se', 'ge', 'pl', 'fr', 'es', 'it', 'ru', 'jp', 'cn']

      const utm_source = ['twitter', 'google', 'facebook', 'instagram', 'reddit']

      const utm_medium = ['cpc', 'organic', 'referral', 'social']

      const utm_campaign = ['radquest-launch', 'radquest-influencer', 'radquest-ads']

      const utm_content = ['logolink', 'buttonlink', 'textlink']

      const utm_term = ['web3', 'crypto', 'blockchain']

      const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

      for (const _ of numberOfUsers) {
        const { user } = (
          await accountHelper.createAccount({ logger, networkId: 2 })
        )._unsafeUnwrap()

        await db.user.update({ data: { country: getRandom(country) }, where: { id: user.id } })

        await db.marketing.create({
          data: {
            userId: user.id,
            utm_id: crypto.randomUUID(),
            utm_source: getRandom(utm_source),
            utm_medium: getRandom(utm_medium),
            utm_campaign: getRandom(utm_campaign),
            utm_content: getRandom(utm_content),
            utm_term: getRandom(utm_term)
          }
        })
      }
    })
  })
})
