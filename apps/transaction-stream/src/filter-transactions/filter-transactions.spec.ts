import { describe, it, expect, beforeAll } from 'vitest'
import DepositUserBadge from '../fixtures/transactions/deposit-user-badge'
import QuestRewardsEvents from '../fixtures/transactions/quest-rewards-events'
import NotSupportedTx from '../fixtures/transactions/not-supported-tx'
import StakedXrdTx from '../fixtures/transactions/staked-xrd'
import StakedXrdTxCorrupted from '../fixtures/transactions/staked-xrd-corrupted'
import { getTrackedTransactionTypes } from './tracked-transaction-types'
import { AccountAddressModel } from 'common'
import { FilterTransactionsByType } from './filter-transactions-by-type'
import { FilterTransactions } from './filter-transactions'
import { RedisServer } from '../test-helpers/inMemoryRedisServer'
import { RedisConnection } from 'queues'

let accountAddressModel: AccountAddressModel
const trackedTransactionTypes = getTrackedTransactionTypes()
let filterTransactionsByType = FilterTransactionsByType(trackedTransactionTypes)
let filterTransaction: FilterTransactions
const stakingAddress = 'account_tdx_2_12ys6rt7m4zsut5fpm77melt0wl3kj659vv59xzm4dduqtqse4fv7wa'
const stakingUserId = '555'

describe('filter transactions', () => {
  beforeAll(async () => {
    const inMemoryRedis = await RedisServer()
    accountAddressModel = AccountAddressModel(new RedisConnection(inMemoryRedis))
    filterTransaction = FilterTransactions(accountAddressModel)
  })

  it('should find DepositUserBadge transaction', () => {
    const result = filterTransactionsByType([...DepositUserBadge, ...NotSupportedTx])

    if (result.isErr()) throw result.error

    const filteredTransactions = result.value

    expect(filteredTransactions.length).toEqual(1)

    const [userBadge] = filteredTransactions

    expect(userBadge.type).toEqual('UserBadge')
    expect(userBadge.transactionId).toBeDefined()
    expect(userBadge.relevantEvents.UserBadgeDeposited).toBeDefined()
    expect(userBadge.relevantEvents.XrdDeposited).toBeDefined()
  })

  it('should find QuestRewardClaimed & QuestRewardDeposited transaction', () => {
    const result = filterTransactionsByType([...QuestRewardsEvents, ...NotSupportedTx])

    if (result.isErr()) throw result.error

    const filteredTransactions = result.value

    expect(filteredTransactions.length).toEqual(2)

    const [claimedReward, depositedReward] = filteredTransactions

    expect(depositedReward.transactionId).toBeDefined()
    expect(depositedReward.type).toEqual('QuestRewardDeposited')
    expect(depositedReward.relevantEvents.RewardDepositedEvent).toBeDefined()

    expect(claimedReward.transactionId).toBeDefined()
    expect(claimedReward.type).toEqual('QuestRewardClaimed')
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
    const result = filterTransactionsByType([...StakedXrdTx, ...StakedXrdTxCorrupted])
    if (result.isErr()) throw result.error

    const result2 = await Promise.all(result.value.map(filterTransaction))
    const txs = result2.filter((r) => !!r)
    expect(txs).lengthOf(1)
    expect(txs[0]).toEqual(result.value[0])
  })
})
