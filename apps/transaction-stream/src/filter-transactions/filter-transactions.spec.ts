import { describe, it, expect, beforeAll } from 'vitest'
import DepositUserBadge from '../fixtures/transactions/deposit-user-badge'
import QuestRewardsEvents from '../fixtures/transactions/quest-rewards-events'
import NotSupportedTx from '../fixtures/transactions/not-supported-tx'
import StakedXrdTx from '../fixtures/transactions/staked-xrd'
import MintInstapassBadge from '../fixtures/transactions/mint-instapass-badge'
import MayaRouterWithdraw from '../fixtures/transactions/maya-router-withdraw'
import { getTrackedTransactionTypes, resourceWithdrawn } from './tracked-transaction-types'
import { AccountAddressModel, EventId } from 'common'
import { FilterTransactionsByType } from './filter-transactions-by-type'
import { FilterTransactionsByAccountAddress } from './filter-transactions-by-account-address'
import { RedisServer } from '../test-helpers/inMemoryRedisServer'
import { RedisConnection } from 'queues'
import { config } from '../config'
import CombineElementsDepositedEvents from '../fixtures/transactions/combine-elements-deposited-events'
import CombineElementsMintedRadgemEvents from '../fixtures/transactions/combine-elements-minted-radgem-events'

let accountAddressModel: AccountAddressModel
const trackedTransactionTypes = getTrackedTransactionTypes()
let filterTransactionsByType = FilterTransactionsByType(trackedTransactionTypes)
let filterTransactionByAccountAddress: FilterTransactionsByAccountAddress
const stakingAddress = 'account_tdx_2_12ys6rt7m4zsut5fpm77melt0wl3kj659vv59xzm4dduqtqse4fv7wa'
const stakingUserId = '555'

describe('filter transactions', () => {
  beforeAll(async () => {
    const inMemoryRedis = await RedisServer()
    accountAddressModel = AccountAddressModel(new RedisConnection(inMemoryRedis))
    filterTransactionByAccountAddress = FilterTransactionsByAccountAddress(accountAddressModel)
  })

  it('should find maya withdraw transaction', () => {
    const result = filterTransactionsByType([...MayaRouterWithdraw])

    if (result.isErr()) throw result.error

    const filteredTransactions = result.value

    expect(filteredTransactions.length).toEqual(1)

    const [withdrawal] = filteredTransactions

    expect(withdrawal.type).toEqual(EventId.MayaRouterWithdrawEvent)
    expect(withdrawal.transactionId).toBeDefined()
    expect(withdrawal.relevantEvents.MayaRouterWithdrawEvent).toBeDefined()
  })

  it('should find DepositUserBadge transaction', () => {
    const result = filterTransactionsByType([...DepositUserBadge, ...NotSupportedTx])

    if (result.isErr()) throw result.error

    const filteredTransactions = result.value

    expect(filteredTransactions.length).toEqual(1)

    const [userBadge] = filteredTransactions

    expect(userBadge.type).toEqual(EventId.DepositUserBadge)
    expect(userBadge.transactionId).toBeDefined()
    expect(userBadge.relevantEvents.UserBadgeDeposited).toBeDefined()
    expect(userBadge.relevantEvents.XrdDeposited).toBeDefined()
  })

  it('should find instapass badge deposited transaction', () => {
    const result = filterTransactionsByType([...MintInstapassBadge])

    if (result.isErr()) throw result.error

    const filteredTransactions = result.value

    expect(filteredTransactions.length).toEqual(1)

    const [instapassBadge] = filteredTransactions

    expect(instapassBadge.type).toEqual(EventId.InstapassBadgeDeposited)
    expect(instapassBadge.transactionId).toBeDefined()
    expect(instapassBadge.relevantEvents.MintedEvent).toBeDefined()
    expect(instapassBadge.relevantEvents.DepositedEvent).toBeDefined()
  })

  it('should find QuestRewardClaimed & QuestRewardDeposited transaction', () => {
    const result = filterTransactionsByType([...QuestRewardsEvents, ...NotSupportedTx])

    if (result.isErr()) throw result.error

    const filteredTransactions = result.value

    expect(filteredTransactions.length).toEqual(2)

    const [claimedReward, depositedReward] = filteredTransactions

    expect(depositedReward.transactionId).toBeDefined()
    expect(depositedReward.type).toEqual(EventId.QuestRewardDeposited)
    expect(depositedReward.relevantEvents.RewardDepositedEvent).toBeDefined()

    expect(claimedReward.transactionId).toBeDefined()
    expect(claimedReward.type).toEqual(EventId.QuestRewardClaimed)
    expect(claimedReward.relevantEvents.RewardClaimedEvent).toBeDefined()
  })

  it('should find XrdStaked transaction', () => {
    const filterResult = filterTransactionsByType([...StakedXrdTx, ...NotSupportedTx])

    if (filterResult.isErr()) throw filterResult.error

    const filteredTransactions = filterResult.value
    expect(filteredTransactions).lengthOf(1)

    const relevantEvents = Object.values(filteredTransactions[0].relevantEvents)
    expect(relevantEvents).lengthOf(2)

    const [withdraw, xrdStaked] = relevantEvents
    expect(withdraw.name).toBe('WithdrawEvent')
    expect(xrdStaked.name).toBe('StakeEvent')
  })

  it('should add tracked address and validate that it exists in redis', async () => {
    const addActiveQuestResult = await accountAddressModel.addTrackedAddress(
      stakingAddress,
      'StakingQuest',
      stakingUserId
    )

    if (addActiveQuestResult.isErr()) throw addActiveQuestResult.error

    const trackedAdress = await accountAddressModel.getTrackedAddressUserId(
      stakingAddress,
      'StakingQuest'
    )

    if (trackedAdress.isErr()) throw trackedAdress.error
    else expect(trackedAdress.value).toBe(stakingUserId)
  })

  it('should filter XrdStaked when user is in redis', async () => {
    const stakedXrd1 = { ...StakedXrdTx[0] }
    /* Override entity address to not match the one in redis */
    const stakedXrd2 = {
      ...StakedXrdTx[0],
      receipt: {
        ...StakedXrdTx[0].receipt,
        events: StakedXrdTx[0].receipt?.events?.map((e) => {
          if (!resourceWithdrawn(config.radQuest.xrd)(e)) return e

          return {
            ...e,
            emitter: {
              ...e.emitter,
              entity: { ...(e.emitter as any).entity, entity_address: '123' }
            }
          }
        })
      }
    }

    const result = filterTransactionsByType([stakedXrd1, stakedXrd2])
    if (result.isErr()) throw result.error
    const result2 = await Promise.all(result.value.map(filterTransactionByAccountAddress))
    const txs = result2.filter((r) => !!r)
    expect(txs).lengthOf(1)
    expect(txs[0]).toEqual(result.value[0])
  })

  it('should find CombineElementsDeposited', () => {
    const result = filterTransactionsByType([...CombineElementsDepositedEvents, ...NotSupportedTx])

    if (result.isErr()) throw result.error

    const filteredTransactions = result.value

    expect(filteredTransactions.length).toEqual(1)

    const [combineElementsDeposited] = filteredTransactions

    expect(combineElementsDeposited.transactionId).toBeDefined()
    expect(combineElementsDeposited.type).toEqual('CombineElementsDeposited')
    expect(combineElementsDeposited.relevantEvents.DepositedEvent).toBeDefined()
  })

  it('should find CombineElementsMintedRadgem', () => {
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
    expect(CombineElementsMintedRadgem.relevantEvents.MintedRadgemEvent).toBeDefined()
  })
})
