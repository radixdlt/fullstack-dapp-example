import { describe, it, expect } from 'vitest'
import { FilterTransactions } from './filter-transactions'
import DepositUserBadge from '../fixtures/transactions/deposit-user-badge'
import QuestRewardsEvents from '../fixtures/transactions/quest-rewards-events'
// import StakedXrdTx from '../fixtures/transactions/staked-xrd'
import { getTrackedTransactionTypes } from './tracked-transaction-types'
import { RedisConnection } from 'queues'
import { config } from '../config'
import { ActiveQuestsModel } from 'common'

const redisConnection = new RedisConnection(config.redis)
const activeQuestsModel = ActiveQuestsModel(redisConnection)
const trackedTransactionTypes = getTrackedTransactionTypes()
const filterTransactions = FilterTransactions(trackedTransactionTypes, activeQuestsModel)

describe('filter transactions', () => {
  it('should find DepositUserBadge transaction', async () => {
    const result = await filterTransactions(DepositUserBadge)

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
    const result = await filterTransactions(QuestRewardsEvents)

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
    // const addActiveQuestResult = await activeQuestsModel
    //   .addActiveQuestAccount(
    //     'account_tdx_2_12ys6rt7m4zsut5fpm77melt0wl3kj659vv59xzm4dduqtqse4fv7wa',
    //     'StakingQuest'
    //   )
    //   .map(() => console.log('OK'))
    //   .mapErr(() => console.error('SDSDDSDDS'))
    // console.log(addActiveQuestResult)
    // expect(addActiveQuestResult.isOk()).toBe(true)
    // const result = filterTransactions(StakedXrdTx)
    // if (result.isErr()) throw result.error
    // const filteredTransactions = result.value
    // expect(filteredTransactions.length).toEqual(2)
    // const [xrdStaked, withdraw] = filteredTransactions
    // console.log(xrdStaked, withdraw)
  }, 15000)
})
