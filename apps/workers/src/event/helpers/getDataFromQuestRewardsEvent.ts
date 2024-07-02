import {
  EventsItem,
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueArray,
  ProgrammaticScryptoSborValueString,
  ProgrammaticScryptoSborValueEnum,
  ProgrammaticScryptoSborValueDecimal
} from '@radixdlt/babylon-gateway-api-sdk'
import { isQuestRewardEvent } from './isQuestRewardEvent'
import { stripNonFungibleLocalId } from './stripNonFungibleLocalId'
import { config } from '../../config'
import { Addresses } from 'common'

type SborValueKind = ProgrammaticScryptoSborValue['kind']

export type StringToSborValue<T extends SborValueKind> = Extract<
  ProgrammaticScryptoSborValue,
  { kind: T }
>

const addresses = Addresses(config.networkId)

export const getXrdAmountFromRewards = (rewardsField: ProgrammaticScryptoSborValueArray) => {
  let xrdAmount = 0
  rewardsField.elements.find((element) => {
    if (element.kind === 'Tuple') {
      const xrdAddressField = element.fields.find(
        (field) => field.kind === 'Reference' && field.value === addresses.xrd
      )
      const xrdAmountField = element.fields.find(
        (field) =>
          field.kind === 'Enum' &&
          field.type_name === 'RewardAmount' &&
          field.variant_name === 'FungibleAmount'
      ) as ProgrammaticScryptoSborValueEnum | undefined
      if (xrdAddressField && xrdAmountField) {
        xrdAmount = Number(
          (
            xrdAmountField.fields.find(
              (field) => field.kind === 'Decimal'
            ) as ProgrammaticScryptoSborValueDecimal
          )?.value || 0
        )
        return true
      }
    }

    return false
  })

  return xrdAmount
}

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
      const xrdAmount = getXrdAmountFromRewards(rewardsField)

      return { userId, questId, xrdAmount }
    }
  }

  return
}
