import { describe, it, expect } from 'vitest'
import {
  mintElements,
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
  createAppLogger,
  EventModel,
  EventId,
  BusinessLogic,
  Priority
} from 'common'
import { PrismaClient, User } from 'database'
import { errAsync } from 'neverthrow'
import { RedisConnection, getQueues } from 'queues'
import { config } from './config'
import crypto from 'crypto'
import { completeQuestRequirements } from './helpers/complete-quest-requirements'
import { waitForMessage } from './helpers/wait-for-message'
import { QuestId } from 'content'

const queues = getQueues(config.redis)

const gatewayApi = GatewayApi(2)

const db = new PrismaClient()
const redisClient = new RedisConnection(config.redis)

const accountHelper = AccountHelper(db)

const logger = createAppLogger({ level: 'debug' })

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

let account: Account

const getAccount = async () => {
  if (!account) {
    account = await createAccount({ withXrd: true, withHeroBadge: true })
  }
  return account
}

let accountAddress: string

const transactionModel = TransactionModel(db, queues)(logger)
const eventModel = EventModel({ db, queues })(logger)
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

const mintClams = (accountAddress: string) => {
  return systemTransactionHelper.submitTransaction(`
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
    Address("${accountAddress}")
    "try_deposit_batch_or_abort"
    Expression("ENTIRE_WORKTOP")
    None
  ;`)
}

const sendClamsToJetty = ({ user, submitTransaction }: Awaited<ReturnType<typeof getAccount>>) =>
  submitTransaction(`
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

  await mintClams(user.accountAddress!)
}

const claimQuestReward = async (
  { user, submitTransaction }: Awaited<ReturnType<typeof getAccount>>,
  questId: QuestId
) => {
  const result = await submitTransaction(`
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
    Address("${addresses.components.questRewardsV2}")
    "claim_reward"
    "${questId}"
    Proof("hero_badge_proof")
  ;
  
  CALL_METHOD
    Address("${user.accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP")
  ;`)
  if (result.isErr()) throw result.error.reason
  return result
}

const openGiftBox = async ({
  kind,
  amount = 1,
  account
}: {
  kind: GiftBoxKind
  amount?: number
  account?: Awaited<ReturnType<typeof getAccount>>
}) => {
  const { submitTransaction, user } = account ?? (await getAccount())
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
      Decimal("${amount}")
    ;

    TAKE_ALL_FROM_WORKTOP
      Address("${addresses.resources.giftBox[kind]}")
      Bucket("gift_box")
    ;

    CALL_METHOD
      Address("${addresses.components.giftBoxOpenerV2}")
      "open_gift_boxes"
      Proof("hero_badge_proof")
      Bucket("gift_box")
    ;
  `)

  if (openGiftBoxResult.isErr()) throw openGiftBoxResult.error
}

const claimGiftBoxReward = async ({ user, submitTransaction }: Account) => {
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
        Address("${addresses.components.giftBoxOpenerV2}")
        "claim_gift_box_rewards"
        Proof("hero_badge_proof")
        1u64
    ;
    CALL_METHOD
        Address("${user.accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;`)
  if (result.isErr()) throw result.error
  return result
}

const isQuestRequirementCompleted = (questId: QuestId, requirementId: string) =>
  db.completedQuestRequirement.findFirst({ where: { questId, requirementId } })

const createRadGem = (account: Account, amount = 50) =>
  account.submitTransaction(`
  CALL_METHOD
    Address("${account.user.accountAddress}")
    "lock_fee"
    Decimal("50")
  ;

  CALL_METHOD
    Address("${account.user.accountAddress}")
    "create_proof_of_non_fungibles"
    Address("${addresses.badges.heroBadgeAddress}")
    Array<NonFungibleLocalId>(NonFungibleLocalId("<${account.user.id}>"))
  ;

  POP_FROM_AUTH_ZONE
    Proof("hero_badge")
  ;

  CALL_METHOD
    Address("${account.user.accountAddress}")
    "withdraw" 
    Address("${addresses.resources.elementAddress}")
    Decimal("${amount}") 
  ;

  TAKE_ALL_FROM_WORKTOP 
    Address("${addresses.resources.elementAddress}") 
    Bucket("elements")
  ;

  CALL_METHOD
    Address("${addresses.components.radgemForgeV2}")
    "deposit_elements"
    Proof("hero_badge")
    Bucket("elements")
  ;
`)

const claimRadGems = (account: Account) =>
  account.submitTransaction(`
  CALL_METHOD
    Address("${account.user.accountAddress}")
    "lock_fee"
    Decimal("50")
  ;

  CALL_METHOD
    Address("${account.user.accountAddress}")
    "create_proof_of_non_fungibles"
    Address("${addresses.badges.heroBadgeAddress}")
    Array<NonFungibleLocalId>(NonFungibleLocalId("<${account.user.id}>"))
  ;

  POP_FROM_AUTH_ZONE
    Proof("hero_badge")
  ;

  CALL_METHOD
    Address("${addresses.components.radgemForgeV2}")
    "claim_radgems"
    Proof("hero_badge")
  ;

  CALL_METHOD
    Address("${account.user.accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP")
  ;
`)

const triggerQuestTogetherReward = async (account: Account) => {
  await accountAddressModel.addTrackedAddress(
    account.user.accountAddress!,
    'CreatingRadMorphs',
    account.user.id
  )

  await completeQuestRequirements(db)(account.user.id, 'CreatingRadMorphs', [
    'OpenGiftBox',
    'RadGemsClaimed'
  ])

  // Simulate RadMorph mint event
  await eventModel.add([
    {
      transactionId: crypto.randomUUID(),
      traceId: crypto.randomUUID(),
      userId: account.user.id,
      eventId: EventId.RadMorphCreated,
      type: EventId.RadMorphCreated,
      data: {}
    }
  ])

  await waitForMessage(logger, db)(account.user.id, 'QuestRewardsDeposited')

  await claimQuestReward(account, 'CreatingRadMorphs')

  await waitForMessage(logger, db)(account.user.id, 'QuestRewardsClaimed')
}

describe('Event flows', () => {
  it('should deposit XRD to account', { timeout: 60_000 }, async () => {
    const nAccounts = new Array(5)
      .fill(null)
      .map(() => createAccount({ withXrd: false, withHeroBadge: true }))

    const accounts = await Promise.all(nAccounts)

    await Promise.all(
      accounts.map((account) =>
        transactionModel.add({
          discriminator: `DepositXrd:${account.user.id}`,
          userId: account.user.id,
          type: 'DepositXrd',
          accountAddress: account.user.accountAddress!,
          traceId: crypto.randomUUID()
        })
      )
    )

    for (const account of accounts.slice(0, 2)) {
      await waitForMessage(logger, db)(account.user.id, 'XrdDepositedToAccount')

      const result = await gatewayApi.callApi('getEntityDetailsVaultAggregated', [
        account.user.accountAddress!
      ])

      if (result.isErr()) throw result.error

      expect(
        result.value.some((item) =>
          item.fungible_resources.items.some((token) => token.resource_address === addresses.xrd)
        )
      ).toBe(true)
    }
  })

  describe('Create RadGems', async () => {
    it(
      `should deposit elements and wait for 'RadgemsMinted' message`,
      { timeout: 30_000, skip: false },
      async () => {
        const nAccounts = new Array(4)
          .fill(null)
          .map(() => createAccount({ withXrd: true, withHeroBadge: true }))

        const accounts = await Promise.all([getAccount(), ...nAccounts])

        await Promise.all(
          accounts.map((account) => {
            mintElements(1000, account.user.accountAddress!).andThen(() => createRadGem(account))
          })
        )

        for (const account of accounts.slice(0, 2)) {
          await waitForMessage(logger, db)(account.user.id, 'RadgemsMinted')
        }
      }
    )
  })

  describe('Quest flows', () => {
    describe('SetupWallet', () => {
      it(`should register account and deposit hero's badge`, { timeout: 60_000 }, async () => {
        const nAccounts = new Array(5)
          .fill(null)
          .map(() => createAccount({ withXrd: true, withHeroBadge: false }))

        const accounts = await Promise.all(nAccounts)

        for (const account of accounts) {
          await completeQuestRequirements(db)(account.user.id, 'SetupWallet', [
            'DownloadWallet',
            'ConnectWallet',
            'RegisterAccount'
          ])

          await transactionModel.add({
            type: 'DepositHeroBadge',
            discriminator: `DepositHeroBadge:${account.user.id}`,
            traceId: crypto.randomUUID(),
            userId: account.user.id,
            accountAddress: account.user.accountAddress!
          })
        }

        for (const account of accounts.slice(0, 3)) {
          await waitForMessage(logger, db)(account.user.id, 'QuestRequirementsCompleted')
        }
      })
    })

    describe('GetStuff', () => {
      it(
        'should get complete quest requirements and claim rewards',
        { timeout: 60_000 },
        async () => {
          const nAccounts = new Array(5)
            .fill(null)
            .map(() => createAccount({ withXrd: true, withHeroBadge: true }))

          const accounts = await Promise.all(nAccounts)

          for (const account of accounts) {
            await completeQuestRequirements(db)(account.user.id, 'GetStuff', [
              'GetXRD',
              'PersonaQuiz',
              'TransactionQuiz',
              'XrdQuiz'
            ])

            await transactionModel.add({
              userId: account.user.id,
              discriminator: `GetStuff:DepositReward:${account.user.id}`,
              type: 'DepositReward',
              traceId: crypto.randomUUID(),
              questId: 'GetStuff'
            })
          }

          for (const account of accounts.slice(0, 3)) {
            await waitForMessage(logger, db)(account.user.id, 'QuestRewardsDeposited')

            await claimQuestReward(account, 'GetStuff')

            await waitForMessage(logger, db)(account.user.id, 'QuestRewardsClaimed')
          }
        }
      )
    })
    describe('TransferTokens', () => {
      it('should send clams to jetty and claim quest rewards', { timeout: 60_000 }, async () => {
        const nAccounts = new Array(5)
          .fill(null)
          .map(() => createAccount({ withXrd: true, withHeroBadge: true }))

        const accounts = await Promise.all([getAccount(), ...nAccounts])
        const [account1] = accounts

        for (const account of accounts) {
          await Promise.all([
            accountAddressModel.addTrackedAddress(
              account.user.accountAddress!,
              'TransferTokens',
              account.user.id
            )
          ])
        }

        await Promise.all(
          accounts.map((account) =>
            mintClams(account.user.accountAddress!).andThen(() => sendClamsToJetty(account))
          )
        )

        await waitForMessage(logger, db)(account1.user.id, 'QuestRewardsDeposited')

        await claimQuestReward(account1, 'TransferTokens')

        await waitForMessage(logger, db)(account1.user.id, 'QuestRewardsClaimed')
      })
    })
    describe('CreatingRadMorphs', () => {
      it('should create a RadMorph and claim rewards', { timeout: 120_000 }, async () => {
        const account = await createAccount({ withHeroBadge: true, withXrd: true })

        await accountAddressModel.addTrackedAddress(
          account.user.accountAddress!,
          'CreatingRadMorphs',
          account.user.id
        )

        await Promise.all([
          mintGiftBox('Starter', account.user.accountAddress!),
          mintElements(1000, account.user.accountAddress!)
        ])

        console.log('Gift box and elements minted')

        await openGiftBox({ account, kind: 'Starter' })

        console.log('Starter Gift box opened')

        await waitForMessage(logger, db)(account.user.id, 'QuestRequirementCompleted')

        console.log('QuestRequirementCompleted')

        expect(await isQuestRequirementCompleted('CreatingRadMorphs', 'OpenGiftBox')).toBeTruthy()

        await waitForMessage(logger, db)(account.user.id, 'GiftBoxesDeposited')

        console.log('GiftBoxesDeposited')

        await claimGiftBoxReward(account)

        console.log('Gift box rewards claimed')

        await createRadGem(account, 15)

        console.log('Create RadGems')

        await waitForMessage(logger, db)(account.user.id, 'RadgemsMinted')

        console.log('RadGem ready to claim')

        await claimRadGems(account)

        console.log('RadGem claimed')

        await waitForMessage(logger, db)(account.user.id, 'QuestRequirementCompleted')

        await isQuestRequirementCompleted('CreatingRadMorphs', 'CreateRadGems')

        // Simulate RadMorph mint event
        await eventModel.add([
          {
            transactionId: crypto.randomUUID(),
            traceId: crypto.randomUUID(),
            userId: account.user.id,
            eventId: EventId.RadMorphCreated,
            type: EventId.RadMorphCreated,
            data: {}
          }
        ])

        await waitForMessage(logger, db)(account.user.id, 'QuestRewardsDeposited')

        await claimQuestReward(account, 'CreatingRadMorphs')

        await waitForMessage(logger, db)(account.user.id, 'QuestRewardsClaimed')
      })
    })
    describe('Thorswap', () => {
      const simulateMayaSwapEvent = (
        userId: string,
        token: keyof typeof BusinessLogic.Maya.supportedTokens,
        amount: string
      ) =>
        eventModel.add([
          {
            transactionId: crypto.randomUUID(),
            traceId: crypto.randomUUID(),
            userId,
            eventId: EventId.MayaRouterWithdrawEvent,
            type: EventId.MayaRouterWithdrawEvent,
            data: {
              amount,
              resourceAddress: BusinessLogic.Maya.supportedTokens[token]
            }
          }
        ])

      it('should handle swapped xUSDC and claim quest rewards', { timeout: 60_000 }, async () => {
        const account = await createAccount({ withHeroBadge: true, withXrd: true })

        await accountAddressModel.addTrackedAddress(
          account.user.accountAddress!,
          'Thorswap',
          account.user.id
        )

        await simulateMayaSwapEvent(account.user.id, 'xUSDC', '100')

        await waitForMessage(logger, db)(account.user.id, 'QuestRewardsDeposited')

        await claimQuestReward(account, 'Thorswap')

        await waitForMessage(logger, db)(account.user.id, 'QuestRewardsClaimed')
      })

      it('should handle swapped xwBTC and claim quest rewards', { timeout: 60_000 }, async () => {
        const account = await createAccount({ withHeroBadge: true, withXrd: true })

        await accountAddressModel.addTrackedAddress(
          account.user.accountAddress!,
          'Thorswap',
          account.user.id
        )

        await simulateMayaSwapEvent(account.user.id, 'xwBTC', '1')

        await waitForMessage(logger, db)(account.user.id, 'QuestRewardsDeposited')

        await claimQuestReward(account, 'Thorswap')

        await waitForMessage(logger, db)(account.user.id, 'QuestRewardsClaimed')
      })

      it('should handle swapped xETH and claim quest rewards', { timeout: 60_000 }, async () => {
        const account = await createAccount({ withHeroBadge: true, withXrd: true })

        await accountAddressModel.addTrackedAddress(
          account.user.accountAddress!,
          'Thorswap',
          account.user.id
        )

        await simulateMayaSwapEvent(account.user.id, 'xETH', '1')

        await waitForMessage(logger, db)(account.user.id, 'QuestRewardsDeposited')

        await claimQuestReward(account, 'Thorswap')

        await waitForMessage(logger, db)(account.user.id, 'QuestRewardsClaimed')
      })
    })
    describe('Quest together', () => {
      it(
        'should complete basic quests and claim referral reward',
        { timeout: 60_000 },
        async () => {
          const referrerAccount = await getAccount()
          const referredAccount = await createAccount({
            withHeroBadge: true,
            withXrd: true,
            referredBy: referrerAccount.user.referralCode
          })

          await triggerQuestTogetherReward(referredAccount)

          await waitForMessage(logger, db)(referredAccount.user.id, 'QuestRewardsDeposited')

          await claimQuestReward(referredAccount, 'JoinFriend')

          await waitForMessage(logger, db)(referrerAccount.user.id, 'QuestRewardsDeposited')

          await claimQuestReward(referrerAccount, `QuestTogether:BronzeLevel` as QuestId)
        }
      )
    })
  })

  describe('giftbox', async () => {
    describe('open and claim gift boxes', () => {
      it('open Starter gift box', { timeout: 120_000, skip: false }, async () => {
        const account = await getAccount()
        await mintGiftBox('Starter', account.user.accountAddress!)
        await openGiftBox({ kind: 'Starter' })
        await waitForMessage(logger, db)(account.user.id, 'GiftBoxesDeposited')
        await claimGiftBoxReward(account)
      })

      it('open Simple gift box', { timeout: 60_000, skip: false }, async () => {
        const account = await getAccount()
        await mintGiftBox('Simple', account.user.accountAddress!)
        await openGiftBox({ kind: 'Simple' })
        await waitForMessage(logger, db)(account.user.id, 'GiftBoxesDeposited')
        await claimGiftBoxReward(account)
      })

      it('open Fancy gift box', { timeout: 60_000, skip: false }, async () => {
        const account = await getAccount()
        await mintGiftBox('Fancy', account.user.accountAddress!)
        await openGiftBox({ kind: 'Fancy' })
        await waitForMessage(logger, db)(account.user.id, 'GiftBoxesDeposited')
        await claimGiftBoxReward(account)
      })

      it('open Elite gift box', { timeout: 60_000, skip: false }, async () => {
        const account = await getAccount()
        await mintGiftBox('Elite', account.user.accountAddress!)
        await openGiftBox({ kind: 'Elite' })
        await waitForMessage(logger, db)(account.user.id, 'GiftBoxesDeposited')
        await claimGiftBoxReward(account)
      })
    })

    describe('gift box reward deposit batching', () => {
      it.skip(
        'should batch gift box reward deposits',
        { timeout: 600_000, skip: false },
        async () => {
          const account1 = await getAccount()

          const [account2, account3] = await Promise.all(
            new Array(2).fill(null).map(() => createAccount({ withXrd: true, withHeroBadge: true }))
          )

          await Promise.all([
            mintGiftBox('Simple', account1.user.accountAddress!, 100),
            mintGiftBox('Simple', account2.user.accountAddress!, 100),
            mintGiftBox('Simple', account3.user.accountAddress!, 100)
          ])

          for (const _ of new Array(1).fill(null)) {
            await Promise.all(
              [account1, account2, account3].map((account) =>
                Promise.all(
                  new Array(3)
                    .fill(null)
                    .map(() => openGiftBox({ kind: 'Simple', account, amount: 5 }))
                )
              )
            )
          }
        }
      )
    })
  })

  describe('tracked accounts', () => {
    it('should work for transfer tokens', { timeout: 60_000, skip: false }, async () => {
      const { user } = await createAccount({ withXrd: true, withHeroBadge: true })
      await startQuestAndAddTrackedAccount(user.id, 'TransferTokens')
      const data = await userQuestModel.getQuestsWithTrackedAccounts(100, 0)
      expect(data.isOk()).toBe(true)
      if (data.isOk()) {
        const userTracked = data.value.filter((el) => el.accountAddress === user.accountAddress)
        expect(userTracked.length).toBe(1)
      }
    })

    it('should work for advanced quests', { timeout: 60_000, skip: false }, async () => {
      const { user } = await createAccount({
        withXrd: true,
        withHeroBadge: true
      })
      await completeTransferTokensQuest(user)
      await userQuestModel.updateQuestStatus('TransferTokens', user.id, 'COMPLETED')

      await startQuestAndAddTrackedAccount(user.id, 'Instapass')
      await startQuestAndAddTrackedAccount(user.id, 'NetworkStaking')
      await startQuestAndAddTrackedAccount(user.id, 'DEXSwaps')

      const data = await userQuestModel.getQuestsWithTrackedAccounts(100, 0)
      expect(data.isOk()).toBe(true)
      if (data.isOk()) {
        const userTracked = data.value.filter((el) => el.accountAddress === user.accountAddress)
        console.log(userTracked)
        expect(userTracked.length).toBe(3)
      }
    })
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

  describe('quest completed', () => {
    it(
      'should write quest completion to hero badge',
      { timeout: 60_000, skip: false },
      async () => {
        const nAccounts = new Array(5)
          .fill(null)
          .map(() => createAccount({ withXrd: true, withHeroBadge: true }))

        const accounts = await Promise.all([getAccount(), ...nAccounts])

        await Promise.all(
          accounts.map((account) =>
            transactionModel.add({
              userId: account.user.id,
              discriminator: `TransferTokens:QuestCompleted:${account.user.id}`,
              type: 'QuestCompleted',
              questId: 'TransferTokens',
              traceId: crypto.randomUUID()
            })
          )
        )
      }
    )
  })

  describe('deposit partial reward', () => {
    it('should deposit partial reward to account', { timeout: 60_000, skip: false }, async () => {
      const nAccounts = new Array(5)
        .fill(null)
        .map(() => createAccount({ withXrd: false, withHeroBadge: false }))

      const accounts = await Promise.all(nAccounts)

      await Promise.all(
        accounts.map((account) =>
          transactionModel.add({
            userId: account.user.id,
            discriminator: `QuestTogether:BronzeLevel:${account.user.id}`,
            type: 'DepositPartialReward',
            requirement: 'BronzeLevel',
            questId: 'QuestTogether',
            traceId: crypto.randomUUID()
          })
        )
      )

      for (const account of accounts.slice(0, 2)) {
        await waitForMessage(logger, db)(account.user.id, 'QuestRewardsDeposited')
      }
    })
  })
})

describe.only('queue', () => {
  it('should process prioritized jobs first', { timeout: 60_000 }, async () => {
    await queues.DepositXrd.buffer.queue.pause()
    await queues.DepositXrd.queue.pause()

    for (const [_index] of Object.entries(new Array(100).fill(null))) {
      const account = await createAccount({ withXrd: false, withHeroBadge: false })
      const index = parseInt(_index)
      const priority =
        index % 40 === 0 ? Priority.High : index % 25 === 0 ? Priority.Medium : Priority.Low
      await transactionModel.add(
        {
          discriminator:
            priority === Priority.High
              ? `DepositXrd:${account.user.id}:high`
              : priority === Priority.Medium
                ? `DepositXrd:${account.user.id}:medium`
                : `DepositXrd:${account.user.id}`,
          userId: account.user.id,
          type: 'DepositXrd',
          accountAddress: account.user.accountAddress!,
          traceId: crypto.randomUUID()
        },
        priority
      )
    }

    await queues.DepositXrd.buffer.queue.resume()
    await queues.DepositXrd.queue.resume()
  })
})
