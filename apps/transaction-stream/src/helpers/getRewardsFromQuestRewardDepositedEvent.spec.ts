import { ProgrammaticScryptoSborValueArray } from '@radixdlt/babylon-gateway-api-sdk'
import { getRewardsFromQuestRewardDepositedEvent } from './getRewardsFromQuestRewardDepositedEvent'
import { describe, it, expect } from 'vitest'

const eventData = {
  element_kind: 'Tuple',
  elements: [
    {
      fields: [
        {
          value: 'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn',
          kind: 'Reference',
          type_name: 'ResourceAddress',
          field_name: 'resource_address'
        },
        {
          variant_id: 0,
          variant_name: 'FungibleAmount',
          fields: [
            {
              value: '1',
              kind: 'Decimal'
            }
          ],
          kind: 'Enum',
          type_name: 'RewardAmount',
          field_name: 'reward_amount'
        }
      ],
      kind: 'Tuple',
      type_name: 'RewardInfo'
    },
    {
      fields: [
        {
          value: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          kind: 'Reference',
          type_name: 'ResourceAddress',
          field_name: 'resource_address'
        },
        {
          variant_id: 0,
          variant_name: 'FungibleAmount',
          fields: [
            {
              value: '20',
              kind: 'Decimal'
            }
          ],
          kind: 'Enum',
          type_name: 'RewardAmount',
          field_name: 'reward_amount'
        }
      ],
      kind: 'Tuple',
      type_name: 'RewardInfo'
    }
  ],
  kind: 'Array',
  field_name: 'rewards'
} satisfies ProgrammaticScryptoSborValueArray

describe('getRewardsFromQuestRewardDepositedEvent', () => {
  it('should extract rewards from event data', () => {
    const values = getRewardsFromQuestRewardDepositedEvent(eventData)
    expect(values).toEqual([
      {
        resourceAddress: 'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn',
        amount: '1'
      },
      {
        resourceAddress: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
        amount: '20'
      }
    ])
  })
})
