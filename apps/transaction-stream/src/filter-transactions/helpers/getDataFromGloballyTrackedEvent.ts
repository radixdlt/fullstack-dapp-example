import { EventsItem, ProgrammaticScryptoSborValueString } from '@radixdlt/babylon-gateway-api-sdk'
import { isQuestRewardEvent } from './isQuestRewardEvent'
import { stripNonFungibleLocalId } from './stripNonFungibleLocalId'

export const getDataFromGloballyTrackedEvent = (event: EventsItem) => {
  if (isQuestRewardEvent(event)) {
    if (event.data.kind === 'Tuple') {
      const userIdField = event.data.fields.find(
        (field) => field.field_name === 'user_id' && field.kind === 'String'
      ) as ProgrammaticScryptoSborValueString
      const questIdField = event.data.fields.find(
        (field) => field.field_name === 'quest_id' && field.kind === 'String'
      ) as ProgrammaticScryptoSborValueString
      if (!userIdField || !questIdField) return

      const userId = stripNonFungibleLocalId(userIdField.value)
      const questId = questIdField.value

      return { userId, questId }
    }
  }

  return
}
