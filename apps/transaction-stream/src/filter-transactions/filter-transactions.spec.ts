import { describe, it, expect, beforeAll } from 'vitest'
import DepositHeroBadgeV2 from '../fixtures/transactions/deposit-hero-badge-v2'
import QuestRewardsDeposited from '../fixtures/transactions/quest-rewards-deposited'
import QuestRewardsDepositedV2 from '../fixtures/transactions/quest-rewards-deposited-v2'
import QuestRewardClaimed from '../fixtures/transactions/quest-rewards-claimed'
import QuestRewardClaimedV2 from '../fixtures/transactions/quest-rewards-claimed-v2'
import NotSupportedTx from '../fixtures/transactions/not-supported-tx'
import JettySwap from '../fixtures/transactions/jetty-swap'
import JettyReceivedClams from '../fixtures/transactions/jetty-recevied-clams'
import GiftBoxesOpened from '../fixtures/transactions/gift-boxes-opened'
import { trackedTransactionTypes } from './tracked-transaction-types'
import { AccountAddressModel, EventId } from 'common'
import { FilterTransactionsByType } from './filter-transactions-by-type'
import { RedisServer } from '../test-helpers/inMemoryRedisServer'
import { RedisConnection } from 'queues'
import DepositElementsToRadGemv2 from '../fixtures/transactions/radgem-forgev2'

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
      it(`should find ${EventId.DepositHeroBadge} transaction`, () => {
        const result = filterTransactionsByType([...DepositHeroBadgeV2, ...NotSupportedTx])

        if (result.isErr()) throw result.error

        const filteredTransactions = result.value

        expect(filteredTransactions.length).toEqual(1)

        const [transaction] = filteredTransactions

        expect(transaction.type).toEqual(EventId.DepositHeroBadge)
        expect(transaction.data.items).toBeDefined()
        expect(transaction.data.isBatch).toBeTruthy()
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
    })
  })

  describe('Gift boxes', () => {
    it(`should find ${EventId.GiftBoxesOpenedEvent} transaction`, () => {
      const result = filterTransactionsByType([...GiftBoxesOpened])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions

      expect(transaction.type).toEqual(EventId.GiftBoxesOpenedEvent)
      expect(transaction.userId).toBeDefined()
      expect(transaction.data.giftBoxResourceAddress).toBeDefined()
      expect(transaction.data.quantity).toBeDefined()
    })
  })

  describe('RadGem', () => {
    it(`should find ${EventId.DepositedElements} transaction`, () => {
      const result = filterTransactionsByType([...DepositElementsToRadGemv2])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions
      expect(transaction.type).toEqual(EventId.DepositedElements)
      expect(transaction.userId).toBeDefined()
      expect(transaction.data.elementsCount).toBe('5')
    })
  })

  describe('Quest rewards', () => {
    it(`should find ${EventId.QuestRewardDepositedV2} transaction`, () => {
      const result = filterTransactionsByType([...QuestRewardsDepositedV2])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions

      expect(transaction.transactionId).toBeDefined()
      expect(transaction.type).toEqual(EventId.QuestRewardDepositedV2)
      expect(transaction.data.items).toBeDefined()
      expect(transaction.data.isBatch).toBeTruthy()
    })

    it(`should find ${EventId.QuestRewardClaimedV2}`, () => {
      const result = filterTransactionsByType([...QuestRewardClaimedV2, ...NotSupportedTx])

      if (result.isErr()) throw result.error

      const filteredTransactions = result.value

      expect(filteredTransactions.length).toEqual(1)

      const [transaction] = filteredTransactions

      expect(transaction.type).toEqual(EventId.QuestRewardClaimedV2)
      expect(transaction.userId).toBeDefined()
      expect(transaction.data.questId).toBeDefined()
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
