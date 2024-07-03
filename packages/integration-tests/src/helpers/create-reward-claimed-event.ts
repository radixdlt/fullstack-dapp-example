import { Addresses } from 'common'

const addresses = Addresses(2)

export const createRewardClaimedEvent = (userId: string, questId: string) => {
  return {
    name: 'RewardClaimedEvent',
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
          value: userId,
          kind: 'String',
          type_name: 'UserId',
          field_name: 'user_id'
        },
        {
          value: questId,
          kind: 'String',
          type_name: 'QuestId',
          field_name: 'quest_id'
        },
        {
          element_kind: 'Reference',
          elements: [
            {
              value: 'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72',
              kind: 'Reference',
              type_name: 'ResourceAddress'
            }
          ],
          kind: 'Array',
          field_name: 'rewards'
        }
      ],
      kind: 'Tuple',
      type_name: 'RewardClaimedEvent'
    }
  }
}
