import {
  EventsItem,
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueArray,
  ProgrammaticScryptoSborValueString
} from '@radixdlt/babylon-gateway-api-sdk'
import { isQuestRewardEvent } from './isQuestRewardEvent'
import { stripNonFungibleLocalId } from './stripNonFungibleLocalId'

type SborValueKind = ProgrammaticScryptoSborValue['kind']

export type StringToSborValue<T extends SborValueKind> = Extract<
  ProgrammaticScryptoSborValue,
  { kind: T }
>

export const getDataFromQuestRewardsEvent = (event: EventsItem) => {
  if (isQuestRewardEvent(event)) {
    if (event.data.kind === 'Tuple') {
      const userIdField = event.data.fields.find(
        (field) => field.field_name === 'user_id' && field.kind === 'String'
      ) as ProgrammaticScryptoSborValueString
      const questIdField = event.data.fields.find(
        (field) => field.field_name === 'quest_id' && field.kind === 'String'
      ) as ProgrammaticScryptoSborValueString
      const rewardsField = event.data.fields.find(
        (field) => field.field_name === 'rewards' && field.kind === 'Array'
      ) as ProgrammaticScryptoSborValueArray

      if (!userIdField || !questIdField || !rewardsField) return

      const userId = stripNonFungibleLocalId(userIdField.value)
      const questId = questIdField.value

      return { userId, questId }
    }
  }

  return
}
