export type ShaderCodeDescription = keyof typeof shaderCodeDescription
export const shaderCodeDescription = {
  crystalline: 'REF',
  metallic: 'MET',
  radiant: 'GLO'
} as const

export type ColorCodeDescription = keyof typeof colorCodeDescription
export const colorCodeDescription = {
  forest: 'LGN',
  sand: 'YEL',
  sky: 'LBL',
  coral: 'PNK',
  blood: 'RED',
  smoke: 'GRY',
  ocean: 'BLU',
  flame: 'ORN',
  glacier: 'MGN',
  dusk: 'PRP'
} as const

export const gemImageMapping = () => `/gems/geem.jpg`

export const shapeCodeDescription = {
  'whirlpool spiral': 'S001',
  'earthquake tremor': 'S002',
  'gamma rays': 'S003',
  'molten lava': 'S004',
  'tidal wave': 'S005',
  'storm cell': 'S006',
  'nuclear fusion': 'S007',
  'pyroclastic flow': 'S008',
  'polar blizzard': 'S009',
  'gravity force': 'S010',
  'rainbow curve': 'S011',
  'magnetic field': 'S012',
  'hydrothermal vent': 'S013',
  'supernova explosion': 'S014',
  'volcanic lightning': 'S015',
  'fire tornado': 'S016',
  'tropical cyclone': 'S017',
  'aurora borealis': 'S018',
  'black hole': 'S019',
  'solar flare': 'S020'
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
  1: 'common',
  2: 'rare',
  3: 'ultra-rare'
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

export const rarityToNumber = (rarity: string): number => {
  return Number(
    Object.entries(rarityDescription).find(([_, value]) => value.toLowerCase() === rarity)?.[0] || 1
  )
}
