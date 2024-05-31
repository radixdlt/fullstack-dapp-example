type Shape = string
type Shader = string
type Color = string

export type ShaderCode = 'REF' | 'MET' | 'GLO'
export type ShapeCode =
  | 'S001'
  | 'S002'
  | 'S003'
  | 'S004'
  | 'S005'
  | 'S006'
  | 'S007'
  | 'S008'
  | 'S009'
  | 'S010'
  | 'S011'
  | 'S012'
  | 'S013'
  | 'S014'
  | 'S015'
  | 'S016'
  | 'S017'
  | 'S018'
  | 'S019'
  | 'S020'

export type ColorCode =
  | 'LGN'
  | 'YEL'
  | 'LBL'
  | 'PNK'
  | 'RED'
  | 'GRY'
  | 'BLU'
  | 'ORN'
  | 'MGN'
  | 'PRP'

export const shaderCodeDescription: Record<ShaderCode, Shader> = {
  REF: 'Crystalline',
  MET: 'Metallic',
  GLO: 'Radiant'
}

export const colorCodeDescription: Record<ColorCode, Color> = {
  LGN: 'Forest',
  YEL: 'Sand',
  LBL: 'Sky',
  PNK: 'Coral',
  RED: 'Blood',
  GRY: 'Smoke',
  BLU: 'Ocean',
  ORN: 'Flame',
  MGN: 'Glacier',
  PRP: 'Dusk'
}

export const shapeCodeDescription: Record<ShapeCode, Shape> = {
  S001: 'Molten Lava',
  S002: 'Pyroclastic Flow',
  S003: 'Volcanic Lightning',
  S004: 'Tropical Cyclone',
  S005: 'Polar Blizzard',
  S006: 'Earthquake',
  S007: 'Fire Tornado',
  S008: 'Tidal Wave',
  S009: 'Hydrothermal Vent',
  S010: 'Rainbow Power',
  S011: 'Storm Cell',
  S012: 'Solar Flare',
  S013: 'Nuclear Fusion',
  S014: 'Aurora Borealis',
  S015: 'Gravity Force',
  S016: 'Magnetic Field',
  S017: 'Gamma Rays',
  S018: 'Black Hole',
  S019: 'Supernova',
  S020: 'Whirlpool'
}

export const rarityDescription: Record<number, string> = {
  1: 'Common',
  2: 'Uncommon',
  3: 'Rare',
  4: 'Fine',
  5: 'Precious',
  6: 'Superb',
  7: 'Magnificent'
}

export const colorToCode = (color: Color): ColorCode =>
  Object.entries(colorCodeDescription).find(([_, value]) => value === color)?.[0] as ColorCode

export const shapeToCode = (shape: Shape): ShapeCode =>
  Object.entries(shapeCodeDescription).find(([_, value]) => value === shape)?.[0] as ShapeCode

export const shaderToCode = (shader: Shader): ShaderCode =>
  Object.entries(shaderCodeDescription).find(([_, value]) => value === shader)?.[0] as ShaderCode

export const rarityToNumber = (rarity: string): number =>
  Number(Object.entries(rarityDescription).find(([_, value]) => value === rarity)?.[0] || 1)
