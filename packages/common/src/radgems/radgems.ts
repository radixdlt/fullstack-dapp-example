export type RadgemColor = (typeof RadgemColor)[keyof typeof RadgemColor]
export const RadgemColor = {
  Blood: 'Blood',
  Coral: 'Coral',
  Dusk: 'Dusk',
  Flame: 'Flame',
  Forest: 'Forest',
  Glacier: 'Glacier',
  Ocean: 'Ocean',
  Sand: 'Sand',
  Sky: 'Sky',
  Smoke: 'Smoke'
} as const

export type RadgemRarity = (typeof RadgemRarity)[keyof typeof RadgemRarity]
export const RadgemRarity = {
  Common: {
    name: 'Common',
    occurrence: 0.75,
    min_quality: 1,
    max_quality: 5
  },
  Rare: {
    name: 'Rare',
    occurrence: 0.2,
    min_quality: 6,
    max_quality: 15
  },
  UltraRare: {
    name: 'Ultra-Rare',
    occurrence: 0.05,
    min_quality: 16,
    max_quality: 25
  }
} as const

export type RadgemMaterial = (typeof RadgemMaterial)[number]
export const RadgemMaterial = [
  {
    name: 'Crystalline',
    rarity: RadgemRarity.Common
  },
  {
    name: 'Metallic',
    rarity: RadgemRarity.Rare
  },
  {
    name: 'Radiant',
    rarity: RadgemRarity.UltraRare
  }
] as const

type Radgem = {
  color: RadgemColor
  material: RadgemMaterial
  quality: number
}

export const genRadgem = (colorSeed: number, materialSeed: number, qualitySeed: number): Radgem => {
  if (colorSeed < 0 || colorSeed >= 1) throw new Error('Invalid color seed')
  if (materialSeed < 0 || materialSeed >= 1) throw new Error('Invalid material seed')
  if (qualitySeed < 0 || qualitySeed >= 1) throw new Error('Invalid quality seed')

  const color = Object.values(RadgemColor)[Math.floor(colorSeed * Object.keys(RadgemColor).length)]

  let material: RadgemMaterial
  if (materialSeed < RadgemMaterial[0].rarity.occurrence) material = RadgemMaterial[0]
  else if (materialSeed < RadgemMaterial[0].rarity.occurrence + RadgemMaterial[1].rarity.occurrence)
    material = RadgemMaterial[1]
  else if (
    materialSeed <
    RadgemMaterial[0].rarity.occurrence +
      RadgemMaterial[1].rarity.occurrence +
      RadgemMaterial[2].rarity.occurrence
  )
    material = RadgemMaterial[2]
  else throw new Error('Invalid material seed')

  const quality =
    Math.floor(qualitySeed * (1 + material.rarity.max_quality - material.rarity.min_quality)) +
    material.rarity.min_quality

  return {
    color,
    material,
    quality
  }
}

export type RadgemNfData = {
  key_image_url: string
  name: string
  description: string
  material: string
  color: string
  rarity: string
  quality: number
}

export const transformRadgemToNfData = (radgem: Radgem): RadgemNfData => {
  return {
    key_image_url: '',
    name: `${radgem.material.name} ${radgem.color} RadGem {${radgem.quality}}`,
    description: `The ${radgem.material.rarity.name} ${radgem.material.name} material of this ${radgem.color} RadGem is graded at a quality of ${radgem.quality} out of a possible 25.`,
    material: radgem.material.name.toLowerCase(),
    color: radgem.color.toLowerCase(),
    rarity: radgem.material.rarity.name.toLowerCase(),
    quality: radgem.quality
  }
}
