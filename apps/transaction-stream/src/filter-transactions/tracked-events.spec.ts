import { describe, beforeEach, it, expect } from 'vitest'
import { TrackedEvents, getTrackedEvents } from './tracked-events'
import { Addresses } from 'common'
import { EventId, QuestDefinitions } from 'content'
import { config } from '../config'

const { badges } = Addresses(parseInt(process.env.PUBLIC_NETWORK_ID!))

const { userBadgeAddress } = badges

describe('tracked events', () => {
  let trackedEvents: TrackedEvents

  beforeEach(() => {
    trackedEvents = getTrackedEvents(QuestDefinitions(config.networkId))
  })

  it('should track DepositUserBadge event', () => {
    const depositUserBadgeEvent = trackedEvents['DepositEvent'].find(
      (item) => item.questId === 'FirstTransactionQuest'
    )!

    expect(depositUserBadgeEvent).toEqual({
      questId: 'FirstTransactionQuest',
      type: 'event',
      eventName: 'DepositEvent',
      eventId: EventId.DepositUserBadge,
      matchField: {
        value: userBadgeAddress,
        kind: 'Reference',
        type_name: 'ResourceAddress'
      }
    })
  })
})
