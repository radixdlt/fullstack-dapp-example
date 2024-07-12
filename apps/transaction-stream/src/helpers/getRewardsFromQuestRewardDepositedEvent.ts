import {
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueArray
} from '@radixdlt/babylon-gateway-api-sdk'
import { config } from '../config'
import { GiftBoxKind } from 'common'

const getResourceAddressValue = (field?: ProgrammaticScryptoSborValue) => {
  if (field?.kind !== 'Reference') return
  return field?.value
}

const getRewardAmountDecimal = (field?: ProgrammaticScryptoSborValue) => {
  if (field?.kind !== 'Decimal') return
  return field?.value
}

const getRewardAmount = (field?: ProgrammaticScryptoSborValue) => {
  if (field?.kind !== 'Enum') return
  return getRewardAmountDecimal(field?.fields[0])
}

const { resources, xrd } = config.addresses

const rewardMap: Record<string, string> = {
  [resources.clamAddress]: 'clam',
  [resources.elementAddress]: 'elements',
  [xrd]: 'xrd',
  [resources.giftBox.Starter]: GiftBoxKind.Starter,
  [resources.giftBox.Simple]: GiftBoxKind.Simple,
  [resources.giftBox.Fancy]: GiftBoxKind.Fancy,
  [resources.giftBox.Elite]: GiftBoxKind.Elite
}

export type Reward = { resourceAddress: string; amount: string; name: string }
export const getRewardsFromQuestRewardDepositedEvent = (
  data: ProgrammaticScryptoSborValueArray
) => {
  const rewards = data.elements
    .map((element) => {
      if (element.kind !== 'Tuple') return
      const resourceAddress = getResourceAddressValue(
        element.fields.find((field) => field.field_name === 'resource_address')
      )
      const amount = getRewardAmount(
        element.fields.find((field) => field.field_name === 'reward_amount')
      )

      return {
        resourceAddress,
        amount,
        name: resourceAddress ? rewardMap[resourceAddress] : undefined
      }
    })
    .filter((reward): reward is Reward => !!reward?.amount && !!reward?.resourceAddress)

  return rewards
}
