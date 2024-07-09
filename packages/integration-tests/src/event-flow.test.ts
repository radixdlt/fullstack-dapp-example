import { describe, it, expect, beforeAll } from 'vitest'
import {
  RadixEngineClient,
  generateMnemonic,
  mintHeroBadge,
  mintElements,
  radquestEntityAddresses,
  mintClams,
  AccountHelper,
  Account,
  mintGiftBox
} from 'typescript-wallet'
import {
  AccountAddressModel,
  Addresses,
  GatewayApi,
  GiftBoxKind,
  TransactionModel,
  UserModel,
  UserQuestModel,
  createAppLogger,
  createUser
} from 'common'
import { PrismaClient, User } from 'database'
import { ResultAsync, errAsync } from 'neverthrow'
import { Queues, RedisConnection, getQueues } from 'queues'
import { config } from './config'
import { QueueEvents } from 'bullmq'
import crypto from 'crypto'
import { addVerifiedPhoneNumberRequirement } from './helpers/add-completed-requirement'
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
const networkName = gatewayApi.networkConfig.networkName

const accountHelper = AccountHelper(db)

const logger = createAppLogger({ level: 'debug' })

if (!networkName) throw new Error('PUBLIC_NETWORK_ID env var not set to a valid network')

const radixEngineClient = RadixEngineClient({
  accounts: { testAccount: 1 },
  gatewayApi,
  mnemonic: generateMnemonic()
})

let accountAddress: string
let identityAddress: string
let user: User
let queues: ReturnType<typeof getQueues>

const transactionModel = TransactionModel(db, transactionQueue)
const userQuestModel = UserQuestModel(db)(logger)
const userModel = UserModel(db)(logger)
const accountAddressModel = AccountAddressModel(redisClient)(logger)

const addresses = Addresses(2)

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

const createUsers = async ({
  referredBy,
  numberOfUsers = 1,
  networkId = 2
}: Partial<{ referredBy: string; numberOfUsers: number; networkId: number }>) =>
  ResultAsync.combine(
    new Array(numberOfUsers).fill(0).map(() =>
      accountHelper.createAccount({
        referredBy,
        logger,
        networkId
      })
    )
  )

const executeUserReferralFlow = async ({ user, getXrdFromFaucet, submitTransaction }: Account) => {
  console.log('Getting XRD from faucet')
  await getXrdFromFaucet()
  console.log('Mining hero badge')
  const mintHeroBadgeResult = await mintHeroBadge(user.id, user.accountAddress!, undefined, [], 0, {
    heroBadgeAddress: addresses.badges.heroBadgeAddress
  })

  if (mintHeroBadgeResult.isErr()) throw mintHeroBadgeResult.error
  console.log('Completing transfer tokens quest')
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
  `).andThen((api) => api.pollTransactionStatus())
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
  `).andThen((api) => api.pollTransactionStatus())

  if (claimRewardResult.isErr()) throw claimRewardResult.error
}

const getXrdRewardToClaim = async (userId: string) =>
  db.referral
    .aggregate({
      where: { userId },
      _sum: {
        xrdValue: true
      }
    })
    .then((result) => {
      console.log({ sum: result._sum })
      return result._sum?.xrdValue?.toNumber()
    })

describe('Event flows', () => {
  beforeAll(async () => {
    const result = await ResultAsync.combine([
      radixEngineClient.getAccounts(),
      radixEngineClient.getIdentityAddressAtDerivationIndex(0)
    ])
    if (result.isErr()) throw result.error
    const value = result.value
    accountAddress = value[0].testAccount
    identityAddress = value[1]
    user = (await createUser(db)({ identityAddress, accountAddress }))._unsafeUnwrap()
    await addVerifiedPhoneNumberRequirement(db)(user.id)
    queues = getQueues(config.redis)
  })
  it(
    'should add account address, track event, send notification to user, and mint hero badge',
    { timeout: 60_000, skip: false },
    async () => {
      const discriminator = `AddAccountAddressToHeroBadgeForge:${crypto.randomUUID()}`

      await completeQuestRequirements(db)(user.id, 'FirstTransactionQuest', [
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

      await radixEngineClient.getXrdFromFaucet()

      const claimBadgeResult = await radixEngineClient
        .getManifestBuilder()
        .andThen(({ convertStringManifest, submitTransaction }) => {
          const transactionManifest = `
          CALL_METHOD
              Address("${accountAddress}")
              "lock_fee"
              Decimal("50")
          ;
          CALL_METHOD
              Address("${addresses.components.heroBadgeForge}")
              "claim_badge"
              Address("${accountAddress}")
              "${user.id}"
          ;
          CALL_METHOD
              Address("${accountAddress}")
              "deposit_batch"
              Expression("ENTIRE_WORKTOP")
          ;
        `
          return convertStringManifest(transactionManifest)
            .andThen((transactionManifest) =>
              submitTransaction({ transactionManifest, signers: [] })
            )
            .andThen(({ txId }) =>
              radixEngineClient.gatewayClient
                .pollTransactionStatus(txId)
                .mapErr((err) => ({ err, txId }))
            )
        })

      if (claimBadgeResult.isErr()) throw claimBadgeResult.error

      const result = await gatewayApi.hasHeroBadge(accountAddress)

      if (result.isErr()) throw result.error

      expect(result.value).toBe(true)
    }
  )

  it('should deposit XRD to account', { timeout: 60_000, skip: false }, async () => {
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

    const result = await gatewayApi.callApi('getEntityDetailsVaultAggregated', [accountAddress])

    if (result.isErr()) throw result.error

    expect(
      result.value.some((item) =>
        item.fungible_resources.items.some((token) => token.resource_address === addresses.xrd)
      )
    ).toBe(true)
  })

  describe('radgem', async () => {
    const userResult = await accountHelper.createAccount({ logger, networkId: 2 })

    if (userResult.isErr()) throw userResult.error

    const { user, getXrdFromFaucet, submitTransaction } = userResult.value

    await getXrdFromFaucet()

    await mintElements(10, user.accountAddress!)

    const mintHeroBadgeResult = await mintHeroBadge(
      user.id,
      user.accountAddress!,
      undefined,
      [],
      0,
      {
        heroBadgeAddress: radquestEntityAddresses.badges.heroBadgeAddress
      }
    )

    if (mintHeroBadgeResult.isErr()) throw mintHeroBadgeResult.error

    it('combine elements into a RadGem', { timeout: 30_000, skip: false }, async () => {
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
            Decimal("10") 
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
        ;


        `).andThen((api) => api.pollTransactionStatus().map(() => api.transactionId))

      if (result.isErr()) throw result.error
      console.log('Transaction ID:', result.value)
    })
  })

  it('should send clams to jetty and claim rewards', { timeout: 60_000, skip: false }, async () => {
    const questId = 'TransferTokens'

    await startQuestAndAddTrackedAccount(user.id, questId)
    await completeQuestRequirements(db)(user.id, questId, [
      'PersonaQuiz',
      'TransactionQuiz',
      'XrdQuiz'
    ])
    expect(
      (await accountAddressModel.getTrackedAddressUserId(accountAddress, questId))._unsafeUnwrap()
    ).toBe(user.id)

    const mintClamsResult = await mintClams(10, accountAddress)

    if (mintClamsResult.isErr()) throw mintClamsResult.error

    await radixEngineClient.getXrdFromFaucet()

    await radixEngineClient
      .getManifestBuilder()
      .andThen(({ convertStringManifest, submitTransaction }) => {
        const transactionManifest = `
            CALL_METHOD
                Address("${accountAddress}")
                "lock_fee"
                Decimal("50")
            ;
            CALL_METHOD
                Address("${accountAddress}")
                "withdraw"
                Address("${addresses.resources.clamAddress}")
                Decimal("10")
            ;
            TAKE_FROM_WORKTOP
                Address("${addresses.resources.clamAddress}")
                Decimal("10")
                Bucket("bucket1")
            ;
            CALL_METHOD
                Address("${addresses.accounts.jetty.address}")
                "try_deposit_or_abort"
                Bucket("bucket1")
                Enum<0u8>()
            ;
        `
        return convertStringManifest(transactionManifest)
          .andThen((transactionManifest) => submitTransaction({ transactionManifest, signers: [] }))
          .andThen(({ txId }) => radixEngineClient.gatewayClient.pollTransactionStatus(txId))
      })

    await waitForMessage(logger, db)(user.id, 'QuestRequirementCompleted')

    const userMessages = await db.user.findUnique({
      include: { messages: true },
      where: { id: user.id }
    })

    const questRequirementMessageExists = userMessages?.messages.some((message) => {
      const data = message.data as any
      return data.type === 'QuestRequirementCompleted' && data.questId === questId
    })

    expect(questRequirementMessageExists).toBeTruthy()
  })

  describe('Referral flow', () => {
    it(
      'should complete basic quest, deposit reward, claim reward',
      { timeout: 90_000, skip: false },
      async () => {
        const referrer = (
          await accountHelper.createAccount({ logger, networkId: 2 })
        )._unsafeUnwrap()

        const users = (
          await createUsers({ referredBy: referrer.user.referralCode, numberOfUsers: 1 })
        )._unsafeUnwrap()

        await referrer.getXrdFromFaucet()

        await mintHeroBadge(referrer.user.id, referrer.user.accountAddress!, undefined, [], 0, {
          heroBadgeAddress: radquestEntityAddresses.badges.heroBadgeAddress
        })

        for (const account of users) {
          await executeUserReferralFlow(account)
          await waitForMessage(logger, db)(referrer.user.id, 'ReferralCompletedBasicQuests')
        }

        await waitForMessage(logger, db)(referrer.user.id, 'QuestRewardsDeposited')

        // expect(await getXrdRewardToClaim(referrer.user.id)).toEqual(50)

        const claimRewardResult = await referrer
          .submitTransaction(
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
                "ReferralQuest"
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
          .andThen((api) => api.pollTransactionStatus())

        if (claimRewardResult.isErr()) throw claimRewardResult.error

        await waitForMessage(logger, db)(referrer.user.id, 'QuestRewardsClaimed')

        expect(await getXrdRewardToClaim(referrer.user.id)).toEqual(0)
      }
    )
  })

  describe('giftbox', async () => {
    const userResult = await accountHelper.createAccount({ logger, networkId: 2 })

    if (userResult.isErr()) throw userResult.error

    const { user, getXrdFromFaucet, submitTransaction } = userResult.value

    await mintHeroBadge(user.id, user.accountAddress!, undefined, [], 0, {
      heroBadgeAddress: radquestEntityAddresses.badges.heroBadgeAddress
    })

    await getXrdFromFaucet()

    const mintGiftBoxes = async () =>
      await ResultAsync.combine([
        mintGiftBox('Starter', user.accountAddress!),
        mintGiftBox('Simple', user.accountAddress!),
        mintGiftBox('Fancy', user.accountAddress!),
        mintGiftBox('Elite', user.accountAddress!)
      ])

    const mintGiftBoxesResult = await mintGiftBoxes()

    if (mintGiftBoxesResult.isErr()) throw mintGiftBoxesResult.error

    const openGiftBox = async (kind: GiftBoxKind) => {
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
      `).andThen((api) => api.pollTransactionStatus().map(() => api.transactionId))

      if (openGiftBoxResult.isErr()) throw openGiftBoxResult.error
    }

    const claimGiftBoxReward = async () => {
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
        ;`).andThen((api) => api.pollTransactionStatus())
      if (result.isErr()) throw result.error
    }

    it('open Starter gift box', { timeout: 60_000, skip: false }, async () => {
      await openGiftBox('Starter')
      await waitForMessage(logger, db)(user.id, 'GiftBoxDeposited')
      await claimGiftBoxReward()
    })

    it('open Simple gift box', { timeout: 60_000, skip: false }, async () => {
      await openGiftBox('Simple')
      await waitForMessage(logger, db)(user.id, 'GiftBoxDeposited')
      await claimGiftBoxReward()
    })

    it('open Fancy gift box', { timeout: 60_000, skip: false }, async () => {
      await openGiftBox('Fancy')
      await waitForMessage(logger, db)(user.id, 'GiftBoxDeposited')
      await claimGiftBoxReward()
    })

    it('open Elite gift box', { timeout: 60_000, skip: false }, async () => {
      await openGiftBox('Elite')
      await waitForMessage(logger, db)(user.id, 'GiftBoxDeposited')
      await claimGiftBoxReward()
    })
  })
})
