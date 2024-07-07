import {
  EnergyCardRarity,
  availableEnergyCardsByRarity,
  getRandomCardByRarity,
  starterBoxCard
} from '../energy-cards'

const GiftBoxKind = {
  Starter: 'Starter',
  Simple: 'Simple',
  Fancy: 'Fancy',
  Elite: 'Elite'
} as const

export type GiftBoxKind = (typeof GiftBoxKind)[keyof typeof GiftBoxKind]

const getRandomIntInclusiveFn = ({ min, max }: { min: number; max: number }) => {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

const getRandomFloatFn = () => Math.random()

type GiftBoxConfig = ReturnType<typeof GiftBoxConfig>
const GiftBoxConfig = ({
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

const GiftBox = (config: GiftBoxConfig) => {
  const open = (kind: GiftBoxKind) => ({
    rewards: {
      energyCard: config[kind].getEnergyCard(),
      elements: config[kind].getElements()
    }
  })

  return { open }
}

export const giftBox = GiftBox(
  GiftBoxConfig({
    getRandomFloat: getRandomFloatFn,
    getRandomIntInclusive: getRandomIntInclusiveFn
  })
)
