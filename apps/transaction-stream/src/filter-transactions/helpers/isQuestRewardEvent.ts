import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { config } from '../../config'

type EventEmitter = {
  entity: {
    entity_address: string
    entity_type: string
    is_global: boolean
  }
  type: string
  object_module_id: string
}

export const isQuestRewardEvent = (event: EventsItem) => {
  return (
    ['RewardDepositedEvent', 'RewardClaimedEvent'].includes(event.name) &&
    (event.emitter as EventEmitter).entity.entity_address ===
      config.radQuest.components.questRewards
  )
}
