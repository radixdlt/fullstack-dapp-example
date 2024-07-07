import { EnergyCardRarity, getRandomCardByRarity, starterBoxCard } from '../energy-cards'
import { GiftBoxKind } from './types'

export type GiftBoxRewardConfig = ReturnType<typeof GiftBoxRewardConfig>
export const GiftBoxRewardConfig = ({
  getRandomFloat,
  getRandomIntInclusive
}: {
  getRandomFloat: () => number
  getRandomIntInclusive: ({ min, max }: { min: number; max: number }) => number
}) =>
  ({
    [GiftBoxKind.Starter]: {
      getEnergyCard: () => starterBoxCard,
      getElements: () => 10
    },
    [GiftBoxKind.Simple]: {
      getEnergyCard: () => {
        const randomFloat = getRandomFloat()
        let rarity: EnergyCardRarity
        if (randomFloat < 0.8) {
          rarity = EnergyCardRarity.Common
        } else {
          rarity = EnergyCardRarity.Rare
        }
        return getRandomCardByRarity(rarity, getRandomFloat())
      },
      getElements: () =>
        getRandomIntInclusive({
          min: 15,
          max: 24
        })
    },
    [GiftBoxKind.Fancy]: {
      getEnergyCard: () => {
        const randomFloat = getRandomFloat()
        let rarity: EnergyCardRarity
        if (randomFloat < 0.5) {
          rarity = EnergyCardRarity.Common
        } else if (randomFloat < 0.8) {
          rarity = EnergyCardRarity.Rare
        } else {
          rarity = EnergyCardRarity.UltraRare
        }
        return getRandomCardByRarity(rarity, getRandomFloat())
      },
      getElements: () =>
        getRandomIntInclusive({
          min: 25,
          max: 34
        })
    },
    [GiftBoxKind.Elite]: {
      getEnergyCard: () => {
        const randomFloat = getRandomFloat()
        let rarity: EnergyCardRarity
        if (randomFloat < 0.7) {
          rarity = EnergyCardRarity.Rare
        } else {
          rarity = EnergyCardRarity.UltraRare
        }
        return getRandomCardByRarity(rarity, getRandomFloat())
      },
      getElements: () =>
        getRandomIntInclusive({
          min: 35,
          max: 45
        })
    }
  }) as const

export const GiftBoxReward = (config: GiftBoxRewardConfig) => (kind: GiftBoxKind) => ({
  energyCard: config[kind].getEnergyCard(),
  elements: config[kind].getElements()
})
