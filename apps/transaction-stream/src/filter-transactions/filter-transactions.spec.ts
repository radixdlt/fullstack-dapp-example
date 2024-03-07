import { describe, it, expect } from 'vitest'
import { getTrackedEvents } from './tracked-events'
import { FilterTransactions } from './filter-transactions'
import DepositUserBadge from '../fixtures/transactions/deposit-user-badge'
import QuestRewardsEvents from '../fixtures/transactions/quest-rewards-events'
import { QuestDefinitions } from 'content'
import { config } from '../config'

const trackedEvents = getTrackedEvents(QuestDefinitions(config.networkId))
const filterTransactions = FilterTransactions(trackedEvents)

describe('filter transactions', () => {
  it('should find DepositUserBadge transaction', () => {
    const result = filterTransactions(DepositUserBadge)

    if (result.isErr()) throw result.error

    const filteredTransactions = result.value

    expect(filteredTransactions.length).toEqual(1)

    const [userBadge] = filteredTransactions

    expect(userBadge).toEqual({
      questId: 'FirstTransactionQuest',
      transactionId: 'txid_tdx_2_183ua49r0hr8np2c7mw529xv5hrda77zcldxvmm7frafmp7pzc06sw3fzl3',
      userId: '2dae9e584f69432794890f4f4fbc8eea',
      eventId: 'DepositUserBadge'
    })
  })

  it('should find QuestRewardClaimed & QuestRewardDeposited transaction', () => {
    const result = filterTransactions(QuestRewardsEvents)

    if (result.isErr()) throw result.error

    const filteredTransactions = result.value

    expect(filteredTransactions.length).toEqual(2)

    const [claimedReward, depositedReward] = filteredTransactions

    expect(depositedReward).toEqual({
      questId: 'FirstTransactionQuest',
      transactionId: 'txid_tdx_2_173sjhqlzgt5nycweelrcnduf9qx7zw77kt7hg4yd5hyehfh9m2zs5l8w25',
      userId: 'aaf4f0f9515640bab87f073eafa58b37',
      eventId: 'RewardDepositedEvent'
    })
    expect(claimedReward).toEqual({
      questId: 'FirstTransactionQuest',
      transactionId: 'txid_tdx_2_1xq90ucr0a7e9f8g2lw2r0eusqy6jxu8jhcma5utsgcrxe4k64wmswj3v3g',
      userId: 'aaf4f0f9515640bab87f073eafa58b37',
      eventId: 'RewardClaimedEvent'
    })
  })
})
