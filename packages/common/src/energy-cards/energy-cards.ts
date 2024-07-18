export type EnergyCardRarity = (typeof EnergyCardRarity)[keyof typeof EnergyCardRarity]
export const EnergyCardRarity = {
  Common: 'Common',
  Rare: 'Rare',
  UltraRare: 'Ultra-rare'
} as const

type EnergyCardMap = typeof energyCardMap

type GenericEnergyCard<Rarity extends EnergyCardRarity> = {
  [Key in keyof EnergyCardMap]: EnergyCardMap[Key]['rarity'] extends Rarity
    ? EnergyCardMap[Key]
    : never
}[keyof EnergyCardMap] & { key: string }

type CommonEnergyCard = GenericEnergyCard<'Common'>
type RareEnergyCard = GenericEnergyCard<'Rare'>
type UltraRareEnergyCard = GenericEnergyCard<'Ultra-rare'>

export type EnergyCard = GenericEnergyCard<EnergyCardRarity>

export const energyCardMap = {
  S001: {
    energyType: 'Whirlpool Spiral',
    energyDescription: 'the sinking gyre of a whirlpool spiral',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: false,
    keyImageUrl: '/morph-cards/UI_S001.webp'
  },
  S005: {
    energyType: 'Tidal Wave',
    energyDescription: 'the inescapable surges of a tidal wave',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S005.webp'
  },
  S004: {
    energyType: 'Molten Lava',
    energyDescription: 'the fiery flow of molten lava',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S004.webp'
  },
  S008: {
    energyType: 'Pyroclastic Flow',
    energyDescription: 'the boiling blast of a pyroclastic flow',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S008.webp'
  },
  S011: {
    energyType: 'Rainbow Curve',
    energyDescription: 'the prismatic power of a rainbow curve',
    rarity: EnergyCardRarity.Common,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S011.webp'
  },
  S009: {
    energyType: 'Polar Blizzard',
    energyDescription: 'the furious freeze of a polar blizzard',
    rarity: EnergyCardRarity.Common,
    limitedEdition: true,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S009.webp'
  },
  S013: {
    energyType: 'Hydrothermal Vent',
    energyDescription: 'the steamy release of a hydrothermal vent',
    rarity: EnergyCardRarity.Common,
    limitedEdition: true,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S013.webp'
  },
  S015: {
    energyType: 'Volcanic Lightning',
    energyDescription: 'the high-altitude sparking of volcanic lightning',
    rarity: EnergyCardRarity.Common,
    limitedEdition: true,
    currentlyAvailable: false,
    keyImageUrl: '/morph-cards/UI_S015.webp'
  },
  S006: {
    energyType: 'Storm Cell',
    energyDescription: 'the churning rotations of a storm cell',
    rarity: EnergyCardRarity.Common,
    limitedEdition: true,
    currentlyAvailable: false,
    keyImageUrl: '/morph-cards/UI_S006.webp'
  },
  S018: {
    energyType: 'Aurora Borealis',
    energyDescription: 'the ethereal energies of the aurora borealis',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S018.webp'
  },
  S012: {
    energyType: 'Magnetic Field',
    energyDescription: 'the ineluctable intensity of a magnetic field',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S012.webp'
  },
  S007: {
    energyType: 'Nuclear Fusion',
    energyDescription: 'the tumultuous turmoil of nuclear fusion',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S007.webp'
  },
  S002: {
    energyType: 'Earthquake Tremor',
    energyDescription: 'the oscillating overthrust of an earthquake tremor',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S002.webp'
  },
  S017: {
    energyType: 'Tropical Cyclone',
    energyDescription: 'the swirling vortex of a tropical cyclone',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S017.webp'
  },
  S003: {
    energyType: 'Gamma Rays',
    energyDescription: 'the invisible frequencies of gamma rays',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: false,
    keyImageUrl: '/morph-cards/UI_S003.webp'
  },
  S010: {
    energyType: 'Gravity Force',
    energyDescription: 'the distorting interactions of the gravity force',
    rarity: EnergyCardRarity.Rare,
    limitedEdition: true,
    currentlyAvailable: false,
    keyImageUrl: '/morph-cards/UI_S010.webp'
  },
  S014: {
    energyType: 'Supernova Explosion',
    energyDescription: 'the galactic strength of a supernova explosion',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S014.webp'
  },
  S019: {
    energyType: 'Black Hole',
    energyDescription: 'the unseen unknowns of a black hole',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: false,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S019.webp'
  },
  S016: {
    energyType: 'Fire Tornado',
    energyDescription: 'the searing swirl of a fire tornado',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: true,
    currentlyAvailable: true,
    keyImageUrl: '/morph-cards/UI_S016.webp'
  },
  S020: {
    energyType: 'Solar Flare',
    energyDescription: 'the shooting jet of a solar flare',
    rarity: EnergyCardRarity.UltraRare,
    limitedEdition: true,
    currentlyAvailable: false,
    keyImageUrl: '/morph-cards/UI_S020.webp'
  }
} as const

const availableCards = Object.entries(energyCardMap)
  .filter(([, { currentlyAvailable }]) => currentlyAvailable)
  .map(([key, value]) => ({ ...value, key }))

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

export const starterBoxCard = { ...energyCardMap.S001, key: 'S001' }

export type EnergyCardNfData = ReturnType<typeof transformEnergyCardToNfData> & {
  key_image_url: string
  key: string
}
export const transformEnergyCardToNfData = (
  card: EnergyCard,
  quality: number,
  maxQuality: number
) => {
  const rarity = card.rarity.toLowerCase()
  return {
    key: card.key,
    name: `${card.energyType} Card {${quality}}${card.limitedEdition ? ' Limited' : ''}`,
    description: `Use this${card.limitedEdition ? ' limited-edition' : ''} Morph Energy Card to fuse 2 RadGems using ${card.energyDescription}! The ${rarity} shape defined by this card is rated at a quality level of ${quality} out of a possible ${maxQuality}.`,
    energy_description: card.energyDescription,
    energy_type: card.energyType.toLowerCase(),
    rarity,
    quality,
    limited_edition: card.limitedEdition
  }
}

export const getRandomCardByRarity = ({
  rarity,
  randomFloat
}: {
  rarity: EnergyCardRarity
  randomFloat: number
}) =>
  availableEnergyCardsByRarity[rarity][
    Math.floor(randomFloat * availableEnergyCardsByRarity[rarity].length)
  ]
