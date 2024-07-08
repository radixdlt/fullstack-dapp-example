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
              value: addresses.resources.radgemAddress,
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
