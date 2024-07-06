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
    currentlyAvailable: false
  },
  S005: {
    energyType: 'Tidal Wave',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true
  },
  S004: {
    energyType: 'Molten Lava',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true
  },
  S008: {
    energyType: 'Pyroclastic Flow',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true
  },
  S011: {
    energyType: 'Rainbow Curve',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true
  },
  S009: {
    energyType: 'Polar Blizzard',
    rarity: EnergyCardRarity.Common,
    limitedEdition: true,
    currentlyAvailable: true
  },
  S013: {
    energyType: 'Hydrothermal Vent',
    rarity: EnergyCardRarity.Common,
    limitedEdition: true,
    currentlyAvailable: true
  },
  S015: {
    energyType: 'Volcanic Lightning',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: false
  },
  S006: {
    energyType: 'Storm Cell',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: false
  },
  S018: {
    energyType: 'Aurora Borealis',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: false,
    currentlyAvailable: true
  },
  S012: {
    energyType: 'Magnetic Field',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: false,
    currentlyAvailable: true
  },
  S007: {
    energyType: 'Nuclear Fusion',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: false,
    currentlyAvailable: true
  },
  S002: {
    energyType: 'Earthquake Tremor',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: true
  },
  S017: {
    energyType: 'Tropical Cyclone',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: true
  },
  S003: {
    energyType: 'Gamma Rays',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: false
  },
  S010: {
    energyType: 'Gravity Force',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: false
  },
  S014: {
    energyType: 'Supernova Explosion',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: false,
    currentlyAvailable: true
  },
  S019: {
    energyType: 'Black Hole',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: false,
    currentlyAvailable: true
  },
  S016: {
    energyType: 'Fire Tornado',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: true,
    currentlyAvailable: true
  },
  S020: {
    energyType: 'Solar Flare',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: true,
    currentlyAvailable: false
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
    if (value.rarity === EnergyCardRarity.Common) acc['Common'].push(value)
    else if (value.rarity === EnergyCardRarity.Rare) acc['Rare'].push(value)
    else acc['Ultra-Rare'].push(value)
    return acc
  },
  {
    [EnergyCardRarity.Common]: [],
    [EnergyCardRarity.Rare]: [],
    [EnergyCardRarity.UltraRare]: []
  } as const
)

export const starterBoxCard = energyCardMap.S001
