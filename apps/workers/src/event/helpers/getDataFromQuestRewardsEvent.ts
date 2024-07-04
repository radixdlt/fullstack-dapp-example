import {
  EventsItem,
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueArray,
  ProgrammaticScryptoSborValueString,
  ProgrammaticScryptoSborValueEnum,
  ProgrammaticScryptoSborValueDecimal
} from '@radixdlt/babylon-gateway-api-sdk'
import { stripNonFungibleLocalId } from './stripNonFungibleLocalId'
import { config } from '../../config'
import { Addresses } from 'common'
import { QuestId } from 'content'
import { err, ok, Result } from 'neverthrow'

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

export const getDataFromQuestRewardsEvent = (
  event: EventsItem
): Result<{ userId: string; questId: QuestId; xrdAmount: number }, { reason: string }> => {
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

    if (!userIdField || !questIdField || !rewardsField) return err({ reason: 'InvalidEventData' })

    const userId = userIdField.value!
    const questId = questIdField.value as QuestId
    const xrdAmount = getXrdAmountFromRewards(rewardsField)

    return ok({ userId, questId, xrdAmount })
  }
  return err({ reason: 'FailedToGetDataFromEvent' })
}
