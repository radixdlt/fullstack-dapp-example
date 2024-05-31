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
  'Molten Lava': 'S001',
  'Pyroclastic Flow': 'S002',
  'Volcanic Lightning': 'S003',
  'Tropical Cyclone': 'S004',
  'Polar Blizzard': 'S005',
  Earthquake: 'S006',
  'Fire Tornado': 'S007',
  'Tidal Wave': 'S008',
  'Hydrothermal Vent': 'S009',
  'Rainbow Power': 'S010',
  'Storm Cell': 'S011',
  'Solar Flare': 'S012',
  'Nuclear Fusion': 'S013',
  'Aurora Borealis': 'S014',
  'Gravity Force': 'S015',
  'Magnetic Field': 'S016',
  'Gamma Rays': 'S017',
  'Black Hole': 'S018',
  Supernova: 'S019',
  Whirlpool: 'S020'
} as const

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
