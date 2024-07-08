import {
  EnergyCardRarity,
  getRandomCardByRarity,
  starterBoxCard,
  transformEnergyCardToNfData
} from '../energy-cards'
import { GiftBoxKind } from './types'

export type GiftBoxRewardConfig = ReturnType<typeof GiftBoxRewardConfig>
export const GiftBoxRewardConfig = ({
  getRandomFloat,
  getRandomIntInclusive
}: {
  getRandomFloat: () => number
  getRandomIntInclusive: ({ min, max }: { min: number; max: number }) => number
}) => {
  const getQualityByRarity = (rarity: EnergyCardRarity) => {
    switch (rarity) {
      case 'Common':
        return getRandomIntInclusive({ min: 15, max: 24 })

      case 'Rare':
        return getRandomIntInclusive({ min: 25, max: 34 })

      case 'Ultra-rare':
        return getRandomIntInclusive({ min: 35, max: 45 })
    }
  }

  return {
    [GiftBoxKind.Starter]: {
      getEnergyCard: () => ({
        card: starterBoxCard,
        quality: getQualityByRarity(starterBoxCard.rarity)
      }),
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
        return {
          card: getRandomCardByRarity({
            rarity,
            randomFloat: getRandomFloat()
          }),
          quality: getQualityByRarity(rarity)
        }
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
        return {
          card: getRandomCardByRarity({
            rarity,
            randomFloat: getRandomFloat()
          }),
          quality: getQualityByRarity(rarity)
        }
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
        return {
          card: getRandomCardByRarity({
            rarity,
            randomFloat: getRandomFloat()
          }),
          quality: getQualityByRarity(rarity)
        }
      },
      getElements: () =>
        getRandomIntInclusive({
          min: 35,
          max: 45
        })
    }
  } as const
}

export const GiftBoxReward = (config: GiftBoxRewardConfig) => (kind: GiftBoxKind) => {
  const energyCard = config[kind].getEnergyCard()
  return {
    energyCard: transformEnergyCardToNfData(energyCard.card, energyCard.quality),
    elements: config[kind].getElements()
  }
}
