export type EnergyCardRarity = (typeof EnergyCardRarity)[keyof typeof EnergyCardRarity]
export const EnergyCardRarity = {
  Common: 'Common',
  Rare: 'Rare',
  UltraRare: 'Ultra-Rare'
} as const

type EnergyCardMap = typeof energyCardMap

type EnergyCard<Rarity extends EnergyCardRarity> = {
  [Key in keyof EnergyCardMap]: EnergyCardMap[Key]['rarity'] extends Rarity
    ? EnergyCardMap[Key]
    : never
}[keyof EnergyCardMap]

type CommonEnergyCard = EnergyCard<'Common'>
type RareEnergyCard = EnergyCard<'Rare'>
type UltraRareEnergyCard = EnergyCard<'Ultra-Rare'>

const energyCardMap = {
  S001: {
    energyType: 'Whirlpool Spiral',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: false,
    keyImageUrl: ''
  },
  S005: {
    energyType: 'Tidal Wave',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S004: {
    energyType: 'Molten Lava',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S008: {
    energyType: 'Pyroclastic Flow',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S011: {
    energyType: 'Rainbow Curve',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S009: {
    energyType: 'Polar Blizzard',
    rarity: EnergyCardRarity.Common,
    limitedEdition: true,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S013: {
    energyType: 'Hydrothermal Vent',
    rarity: EnergyCardRarity.Common,
    limitedEdition: true,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S015: {
    energyType: 'Volcanic Lightning',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: false,
    keyImageUrl: ''
  },
  S006: {
    energyType: 'Storm Cell',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: false,
    keyImageUrl: ''
  },
  S018: {
    energyType: 'Aurora Borealis',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S012: {
    energyType: 'Magnetic Field',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S007: {
    energyType: 'Nuclear Fusion',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S002: {
    energyType: 'Earthquake Tremor',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S017: {
    energyType: 'Tropical Cyclone',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S003: {
    energyType: 'Gamma Rays',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: false,
    keyImageUrl: ''
  },
  S010: {
    energyType: 'Gravity Force',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: false,
    keyImageUrl: ''
  },
  S014: {
    energyType: 'Supernova Explosion',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S019: {
    energyType: 'Black Hole',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S016: {
    energyType: 'Fire Tornado',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: true,
    currentlyAvailable: true,
    keyImageUrl: ''
  },
  S020: {
    energyType: 'Solar Flare',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: true,
    currentlyAvailable: false,
    keyImageUrl: ''
  }
} as const

const availableCards = Object.values(energyCardMap).filter(
  ({ currentlyAvailable }) => currentlyAvailable
)

export const availableEnergyCardsByRarity = availableCards.reduce<{
  [EnergyCardRarity.Common]: CommonEnergyCard[]
  [EnergyCardRarity.Rare]: RareEnergyCard[]
  [EnergyCardRarity.UltraRare]: UltraRareEnergyCard[]
}>(
  (acc, value) => {
    if (value.rarity === EnergyCardRarity.Common) acc[value.rarity].push(value)
    else if (value.rarity === EnergyCardRarity.Rare) acc[value.rarity].push(value)
    else acc[value.rarity].push(value)
    return acc
  },
  {
    [EnergyCardRarity.Common]: [],
    [EnergyCardRarity.Rare]: [],
    [EnergyCardRarity.UltraRare]: []
  } as const
)

export const starterBoxCard = energyCardMap.S001

export const getRandomCardByRarity = (rarity: EnergyCardRarity, randomFloat: number) =>
  availableEnergyCardsByRarity[rarity][
    Math.floor(randomFloat * availableEnergyCardsByRarity[rarity].length)
  ]
