import { describe, it, expect, beforeAll } from 'vitest'
import DepositHeroBadge from '../fixtures/transactions/deposit-hero-badge'
import QuestRewardsEvents from '../fixtures/transactions/quest-rewards-events'
import RewardClaimed from '../fixtures/transactions/quest-rewards-claimed'
import NotSupportedTx from '../fixtures/transactions/not-supported-tx'
import StakedXrdTx from '../fixtures/transactions/staked-xrd'
import JettySwap from '../fixtures/transactions/jetty-swap'
import LettySwap from '../fixtures/transactions/letty-swap'
import CombineElementsImageAdded from '../fixtures/transactions/combine-elements-image-added'
import MintInstapassBadge from '../fixtures/transactions/mint-instapass-badge'
import JettyReceivedClams from '../fixtures/transactions/jetty-recevied-clams'
import MayaRouterWithdraw from '../fixtures/transactions/maya-router-withdraw'
import GiftBoxDeposited from '../fixtures/transactions/giftbox-deposited'
import GiftBoxOpened from '../fixtures/transactions/open-giftbox'
import AccountAddedTransaction from '../fixtures/transactions/allow-user-to-forge-hero-badge'
import { trackedTransactionTypes } from './tracked-transaction-types'
import { AccountAddressModel, EventId } from 'common'
import { FilterTransactionsByType } from './filter-transactions-by-type'
import { RedisServer } from '../test-helpers/inMemoryRedisServer'
import { RedisConnection } from 'queues'
import CombineElementsDepositedEvents from '../fixtures/transactions/combine-elements-deposited-events'
import CombineElementsMintedRadgemEvents from '../fixtures/transactions/combine-elements-minted-radgem-events'
import CombineElementsClaimed from '../fixtures/transactions/combine-elements-claimed'

let accountAddressModel: ReturnType<AccountAddressModel>
let filterTransactionsByType = FilterTransactionsByType(trackedTransactionTypes)
const stakingAndSwapAddress =
  'account_tdx_2_12ys6rt7m4zsut5fpm77melt0wl3kj659vv59xzm4dduqtqse4fv7wa'
const stakingAndSwapUserId = '555'

describe('filter transactions', () => {
  beforeAll(async () => {
    const inMemoryRedis = await RedisServer()
    accountAddressModel = AccountAddressModel(new RedisConnection(inMemoryRedis))()
  })

  describe('Quests', () => {
    describe('Get web3 stuff', () => {
      it(`should find ${EventId.AccountAllowedToForgeHeroBadge} transaction`, () => {
        const result = filterTransactionsByType(AccountAddedTransaction)

        if (result.isErr()) throw result.error

        const filteredTransactions = result.value

        expect(filteredTransactions.length).toEqual(1)

        const [tx] = filteredTransactions

        expect(tx.transactionId).toBeDefined()
        expect(tx.accountAddress).toBeDefined()
      })

      it(`should find ${EventId.DepositHeroBadge} transaction`, () => {
        const result = filterTransactionsByType([...DepositHeroBadge, ...NotSupportedTx])

        if (result.isErr()) throw result.error

        const filteredTransactions = result.value

        expect(filteredTransactions.length).toEqual(1)

        const [transaction] = filteredTransactions

        expect(transaction.type).toEqual(EventId.DepositHeroBadge)
        expect(transaction.transactionId).toBeDefined()
        expect(transaction.userId).toBeDefined()
      })
    })

    describe('First transaction', () => {
      it(`should find ${EventId.JettyReceivedClams} transaction`, () => {
        const result = filterTransactionsByType([...JettyReceivedClams])

        if (result.isErr()) throw result.error

        const filteredTransactions = result.value

        expect(filteredTransactions.length).toEqual(1)

        const [transaction] = filteredTransactions

        expect(transaction.type).toEqual(EventId.JettyReceivedClams)
        expect(transaction.accountAddress).toBeDefined()
      })
    })

    describe('Staking', () => {
      it('should find XrdStaked transaction', () => {
        const filterResult = filterTransactionsByType([...StakedXrdTx, ...NotSupportedTx])

        if (filterResult.isErr()) throw filterResult.error

        const [transaction] = filterResult.value
        console.log(transaction)
        expect(transaction.type).toEqual(EventId.XrdStaked)
        expect(transaction.accountAddress).toBeDefined()
      })
    })

    describe('Instapass', () => {
      it(`should find ${EventId.InstapassBadgeDeposited} transaction`, () => {
        const result = filterTransactionsByType([...MintInstapassBadge])

        if (result.isErr()) throw result.error

        const filteredTransactions = result.value

        expect(filteredTransactions.length).toEqual(1)

        const [transaction] = filteredTransactions

        expect(transaction.type).toEqual(EventId.InstapassBadgeDeposited)
        expect(transaction.transactionId).toBeDefined()
        expect(transaction.accountAddress).toBeDefined()
      })
    })

    describe('Thorswap', () => {
      it(`should find ${EventId.MayaRouterWithdrawEvent} transaction`, () => {
        const result = filterTransactionsByType([...MayaRouterWithdraw])

        if (result.isErr()) throw result.error

        const filteredTransactions = result.value

        expect(filteredTransactions.length).toEqual(1)

        const [transaction] = filteredTransactions

        expect(transaction.type).toEqual(EventId.MayaRouterWithdrawEvent)
        expect(transaction.transactionId).toBeDefined()
        expect(transaction.accountAddress).toBeDefined()
      })
    })

    describe('DEX', () => {
      it(`should find ${EventId.JettySwap} transaction`, () => {
        const filterResult = filterTransactionsByType([...JettySwap, ...NotSupportedTx])

        if (filterResult.isErr()) throw filterResult.error

        const filteredTransactions = filterResult.value
        expect(filteredTransactions).lengthOf(1)

        const [transaction] = filteredTransactions

        expect(transaction.type).toEqual(EventId.JettySwap)
        expect(transaction.accountAddress).toBeTruthy()
      })

      it(`should find ${EventId.LettySwap} transaction`, () => {
        const filterResult = filterTransactionsByType([...NotSupportedTx, ...LettySwap])

        if (filterResult.isErr()) throw filterResult.error

        const filteredTransactions = filterResult.value
        expect(filteredTransactions).lengthOf(1)

        const [transaction] = filteredTransactions

        expect(transaction.type).toEqual(EventId.LettySwap)
        expect(transaction.accountAddress).toBeTruthy()
      })
    })
  })

  describe('Gift boxes', () => {
    it(`should find ${EventId.GiftBoxDeposited} transaction`, () => {
      const result = filterTransactionsByType([...GiftBoxDeposited])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions

      expect(transaction.type).toEqual(EventId.GiftBoxDeposited)
      expect(transaction.userId).toBeDefined()
    })

    it(`should find ${EventId.GiftBoxOpened} transaction`, () => {
      const result = filterTransactionsByType([...GiftBoxOpened])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions

      expect(transaction.type).toEqual(EventId.GiftBoxOpened)
      expect(transaction.userId).toBeDefined()
      expect(transaction.data.GiftBoxOpenedEvent.giftBoxResourceAddress).toBeDefined()
    })
  })

  describe('RadGem', () => {
    it(`should find ${EventId.CombineElementsDeposited} transaction`, () => {
      const result = filterTransactionsByType([
        ...CombineElementsDepositedEvents,
        ...NotSupportedTx
      ])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions

      expect(transaction.transactionId).toBeDefined()
      expect(transaction.type).toEqual(EventId.CombineElementsDeposited)
      expect(transaction.userId).toBeDefined()
    })

    it(`should find ${EventId.CombineElementsMintedRadgem} transaction`, () => {
      const result = filterTransactionsByType([
        ...CombineElementsMintedRadgemEvents,
        ...NotSupportedTx
      ])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [CombineElementsMintedRadgem] = filteredTransactions

      expect(CombineElementsMintedRadgem.transactionId).toBeDefined()
      expect(CombineElementsMintedRadgem.type).toEqual('CombineElementsMintedRadgem')
      expect(CombineElementsMintedRadgem.data.MintedRadgemEvent).toBeDefined()
    })

    it(`should find ${EventId.CombineElementsAddedRadgemImage} transaction`, () => {
      const result = filterTransactionsByType([...CombineElementsImageAdded])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions

      expect(transaction.type).toEqual(EventId.CombineElementsAddedRadgemImage)
      expect(transaction.userId).toBeDefined()
    })

    it(`should find ${EventId.CombineElementsClaimed} transaction`, () => {
      const result = filterTransactionsByType([...CombineElementsClaimed])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions
      expect(transaction.type).toEqual(EventId.CombineElementsClaimed)
      expect(transaction.userId).toBeDefined()
    })
  })

  describe('Quest rewards', () => {
    it(`should find ${EventId.QuestRewardDeposited} transaction`, () => {
      const result = filterTransactionsByType([...QuestRewardsEvents, ...NotSupportedTx])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions

      expect(transaction.transactionId).toBeDefined()
      expect(transaction.type).toEqual(EventId.QuestRewardDeposited)
      expect(transaction.data.RewardDepositedEvent.questId).toBeDefined()
      expect(transaction.userId).toBeDefined()
      expect(transaction.data).toBeDefined()
    })

    it(`should find ${EventId.QuestRewardClaimed}`, () => {
      const result = filterTransactionsByType([...RewardClaimed, ...NotSupportedTx])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions

      expect(transaction.type).toEqual(EventId.QuestRewardClaimed)
      expect(transaction.userId).toBeDefined()
      expect(transaction.data.RewardClaimedEvent.questId).toBeDefined()
    })
  })

  describe('Tracked account address', () => {
    it('should add tracked address and validate', async () => {
      const addActiveQuestResult = await accountAddressModel.addTrackedAddress(
        stakingAndSwapAddress,
        'NetworkStaking',
        stakingAndSwapUserId
      )

      if (addActiveQuestResult.isErr()) throw addActiveQuestResult.error

      const trackedAdress = await accountAddressModel.getTrackedAddressUserId(
        stakingAndSwapAddress,
        'NetworkStaking'
      )

      if (trackedAdress.isErr()) throw trackedAdress.error
      else expect(trackedAdress.value).toBe(stakingAndSwapUserId)
    })
  })
})
