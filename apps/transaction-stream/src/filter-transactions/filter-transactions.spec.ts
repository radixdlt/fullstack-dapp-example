import { describe, it, expect } from 'vitest'
import { FilterTransactions } from './filter-transactions'
import DepositUserBadge from '../fixtures/transactions/deposit-user-badge'
import QuestRewardsEvents from '../fixtures/transactions/quest-rewards-events'
import NotSupportedTx from '../fixtures/transactions/not-supported-tx'
import StakedXrdTx from '../fixtures/transactions/staked-xrd'
import {
  getTrackedTransactionTypes,
  resourceStaked,
  resourceWithdrawn
} from './tracked-transaction-types'
import { RedisConnection } from 'queues'
import { config } from '../config'
import { ActiveQuestsModel } from 'common'

const redisConnection = new RedisConnection(config.redis)
const activeQuestsModel = ActiveQuestsModel(redisConnection)
const trackedTransactionTypes = getTrackedTransactionTypes()
const filterTransactions = FilterTransactions(trackedTransactionTypes, activeQuestsModel)

describe('filter transactions', () => {
  it('should find DepositUserBadge transaction', async () => {
    const result = await filterTransactions([...DepositUserBadge, ...NotSupportedTx])

    if (result.isErr()) throw result.error

    const filteredTransactions = result.value

    expect(filteredTransactions.length).toEqual(1)

    const [userBadge] = filteredTransactions

    expect(userBadge.type).toEqual('UserBadge')
    expect(userBadge.transactionId).toBeDefined()
    expect(userBadge.relevantEvents.UserBadgeDeposited).toBeDefined()
    expect(userBadge.relevantEvents.XrdDeposited).toBeDefined()
  })

  it('should find QuestRewardClaimed & QuestRewardDeposited transaction', async () => {
    const result = await filterTransactions([...QuestRewardsEvents, ...NotSupportedTx])

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

  it('should find XrdStaked transaction', async () => {
    const stakingAccount = 'account_tdx_2_12ys6rt7m4zsut5fpm77melt0wl3kj659vv59xzm4dduqtqse4fv7wa'

    const addActiveQuestResult = await activeQuestsModel.addActiveQuestAccount(
      stakingAccount,
      'StakingQuest'
    )

    if (addActiveQuestResult.isErr()) throw addActiveQuestResult.error

    const filterResult = await filterTransactions([...StakedXrdTx, ...NotSupportedTx])

    if (filterResult.isErr()) throw filterResult.error

    const filteredTransactions = filterResult.value
    expect(filteredTransactions).lengthOf(1)

    const relevantEvents = Object.values(filteredTransactions[0].relevantEvents)
    expect(relevantEvents).lengthOf(2)

    const [withdraw, xrdStaked] = relevantEvents
    expect(withdraw.name).toBe('WithdrawEvent')
    expect(xrdStaked.name).toBe('StakeEvent')
  })
})
