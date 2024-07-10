export const shaderCodeDescription = {
  Crystalline: 'REF',
  Metallic: 'MET',
  Radiant: 'GLO'
} as const

export const colorCodeDescription = {
  Forest: 'LGN',
  Sand: 'YEL',
  Sky: 'LBL',
  Coral: 'PNK',
  Blood: 'RED',
  Smoke: 'GRY',
  Ocean: 'BLU',
  Flame: 'ORN',
  Glacier: 'MGN',
  Dusk: 'PRP'
} as const

export const shapeCodeDescription = {
  'Whirlpool Spiral': 'S001',
  'Earthquake Tremor': 'S002',
  'Gamma Rays': 'S003',
  'Molten Lava': 'S004',
  'Tidal Wave': 'S005',
  'Storm Cell': 'S006',
  'Nuclear Fusion': 'S007',
  'Pyroclastic Flow': 'S008',
  'Polar Blizzard': 'S009',
  'Gravity Force': 'S010',
  'Rainbow Curve': 'S011',
  'Magnetic Field': 'S012',
  'Hydrothermal Vent': 'S013',
  'Supernova Explosion': 'S014',
  'Volanic Lightning': 'S015',
  'Fire Tornado': 'S016',
  'Tropical Cyclone': 'S017',
  'Aurora Borealis': 'S018',
  'Black Hole': 'S019',
  'Solar Flare': 'S020'
} as const

const reverse = <T extends Record<any, any>>(obj: T): ReverseMap<T> =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]))

type ReverseMap<T extends Record<keyof T, keyof any>> = {
  [P in T[keyof T]]: {
    [K in keyof T]: T[K] extends P ? K : never
  }[keyof T]
}

export const shaderDescription = reverse(shaderCodeDescription)
export const shapeDescription = reverse(shapeCodeDescription)
export const colorDescription = reverse(colorCodeDescription)

export const rarityDescription = {
  1: 'Common',
  2: 'Uncommon',
  3: 'Rare',
  4: 'Fine',
  5: 'Precious',
  6: 'Superb',
  7: 'Magnificent'
} as const

export type Color = keyof typeof colorCodeDescription
export type ColorCode = (typeof colorCodeDescription)[Color]

export type Shape = keyof typeof shapeCodeDescription
export type ShapeCode = (typeof shapeCodeDescription)[Shape]

export type Shader = keyof typeof shaderCodeDescription
export type ShaderCode = (typeof shaderCodeDescription)[Shader]

export const colorToCode = (color: Color): ColorCode => colorCodeDescription[color]

export const shapeToCode = (shape: Shape): ShapeCode => shapeCodeDescription[shape]

export const shaderToCode = (shader: Shader): ShaderCode => shaderCodeDescription[shader]

export const rarityToNumber = (rarity: string): number =>
  Number(Object.entries(rarityDescription).find(([_, value]) => value === rarity)?.[0] || 1)
