import { AuditResource } from 'common'
import {
  EventsItem,
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueArray,
  ProgrammaticScryptoSborValueEnum,
  ProgrammaticScryptoSborValueReference,
  ProgrammaticScryptoSborValueString,
  ProgrammaticScryptoSborValueDecimal
} from '@radixdlt/babylon-gateway-api-sdk'
import { isQuestRewardEvent } from './isQuestRewardEvent'
import { stripNonFungibleLocalId } from './stripNonFungibleLocalId'

type SborValueKind = ProgrammaticScryptoSborValue['kind']

export type StringToSborValue<T extends SborValueKind> = Extract<
  ProgrammaticScryptoSborValue,
  { kind: T }
>

const isDecimalSborValue = (
  value: ProgrammaticScryptoSborValue
): value is ProgrammaticScryptoSborValueDecimal => value.kind === 'Decimal'

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

      const rewards = rewardsField.elements
        .map((reward) => {
          if (reward.kind === 'Tuple') {
            const resourceAddress = reward.fields.find(
              (field) => field.field_name === 'resource_address' && field.kind === 'Reference'
            ) as ProgrammaticScryptoSborValueReference
            const rewardAmount = reward.fields.find(
              (field) => field.field_name === 'reward_amount' && field.kind === 'Enum'
            ) as ProgrammaticScryptoSborValueEnum

            if (!resourceAddress || !rewardAmount) return

            if (rewardAmount.variant_name === 'FungibleAmount') {
              const fungibleAmount =
                isDecimalSborValue(rewardAmount.fields[0]) && rewardAmount.fields[0].value

              return {
                resourceAddress: resourceAddress.value,
                type: 'fungible',
                amount: Number(fungibleAmount)
              }
            } else {
              const element = rewardAmount.fields.find(
                (field) => field.kind === 'Array' && field.elements[0]
              )!
              if (element.kind !== 'NonFungibleLocalId') return

              return {
                resourceAddress: resourceAddress.value,
                type: 'nonFungible',
                localId: element.value
              }
            }
          }

          return
        })
        .filter((reward): reward is AuditResource => !!reward)

      return { userId, questId, rewards }
    }
  }

  return
}
