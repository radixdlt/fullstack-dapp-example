import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { describe, it, expect } from 'vitest'
import { getDataFromQuestRewardsEvent } from './getDataFromQuestRewardsEvent'
import { Addresses } from 'common'
const addresses = Addresses(2)

describe('GetDataFromQuestRewardsEvent', () => {
  it('should get correct xrd amount', () => {
    const fixture = {
      name: 'RewardDepositedEvent',
      emitter: {
        type: 'Method',
        entity: {
          is_global: true,
          entity_type: 'GlobalGenericComponent',
          entity_address: addresses.components.questRewards
        },
        object_module_id: 'Main'
      },
      data: {
        fields: [
          {
            value: 'ddf270cb3276418a9ba24e86f92cc27f',
            kind: 'String',
            type_name: 'UserId',
            field_name: 'user_id'
          },
          {
            value: 'TransferTokens',
            kind: 'String',
            type_name: 'QuestId',
            field_name: 'quest_id'
          },
          {
            element_kind: 'Tuple',
            elements: [
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
          }
        ],
        kind: 'Tuple',
        type_name: 'RewardDepositedEvent'
      }
    } as EventsItem
    const result = getDataFromQuestRewardsEvent(fixture)._unsafeUnwrap()
    expect(result?.xrdAmount).toEqual(20)
  })

  it('should get correct xrd amount', () => {
    const fixture = {
      name: 'RewardDepositedEvent',
      emitter: {
        type: 'Method',
        entity: {
          is_global: true,
          entity_type: 'GlobalGenericComponent',
          entity_address: 'component_tdx_2_1cq687ktpqvegwcuegzl2mfe90eqg2u39q8sdxw3vxe7wwxtuyv9jvy'
        },
        object_module_id: 'Main'
      },
      data: {
        fields: [
          {
            value: 'ddf270cb3276418a9ba24e86f92cc27f',
            kind: 'String',
            type_name: 'UserId',
            field_name: 'user_id'
          },
          {
            value: 'FirstTransactionQuest',
            kind: 'String',
            type_name: 'QuestId',
            field_name: 'quest_id'
          },
          {
            element_kind: 'Tuple',
            elements: [
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
              },
              {
                fields: [
                  {
                    value: 'resource_tdx_2_1thhecsamda2fsql9rqrth0rnlee8k6049n6dgswvj7g99rfe9u5nd5',
                    kind: 'Reference',
                    type_name: 'ResourceAddress',
                    field_name: 'resource_address'
                  },
                  {
                    variant_id: 0,
                    variant_name: 'FungibleAmount',
                    fields: [
                      {
                        value: '10',
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
          }
        ],
        kind: 'Tuple',
        type_name: 'RewardDepositedEvent'
      }
    } as EventsItem
    const result = getDataFromQuestRewardsEvent(fixture)._unsafeUnwrap()
    expect(result?.xrdAmount).toEqual(20)
  })
})
