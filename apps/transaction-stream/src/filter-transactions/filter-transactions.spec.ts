import { describe, it, expect } from 'vitest'
import { FilterTransactions } from './filter-transactions'
import DepositUserBadge from '../fixtures/transactions/deposit-user-badge'
import QuestRewardsEvents from '../fixtures/transactions/quest-rewards-events'
import { getTrackedTransactionTypes } from './tracked-transaction-types'

const trackedTransactions = getTrackedTransactionTypes()
const filterTransactions = FilterTransactions(trackedTransactions)

describe('filter transactions', () => {
  it('should find DepositUserBadge transaction', () => {
    const result = filterTransactions(DepositUserBadge)

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
    const result = filterTransactions(QuestRewardsEvents)

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
})
