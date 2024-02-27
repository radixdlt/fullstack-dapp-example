import { describe, it, expect } from 'vitest'
import { getTrackedEvents } from './tracked-events'
import { FilterTransactions } from './filter-transactions'
import DepositUserBadge from '../fixtures/transactions/deposit-user-badge'
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
})
