import type {
  ProgrammaticScryptoSborValue,
  ProgrammaticScryptoSborValueTuple
} from '@radixdlt/babylon-gateway-api-sdk'

export type RadGem = {
  keyImageUrl: string
  name: string
  description: string
  material: string
  color: string
  rarity: string
  quality: number
}

const fromCombineElementsMintedRadgemEvent = (value: ProgrammaticScryptoSborValue) => {
  if (value.kind !== 'Tuple') throw new Error('Invalid value kind')
  const tupleValue = value as ProgrammaticScryptoSborValueTuple
  const fieldNameToKey = new Map<string, string>([
    ['key_image_url', 'keyImageUrl'],
    ['name', 'name'],
    ['description', 'description'],
    ['material', 'material'],
    ['color', 'color'],
    ['rarity', 'rarity'],
    ['quality', 'quality']
  ])

  const radGemData = tupleValue.fields.reduce<RadGem>(
    (acc, field) => {
      field.type_name
      const fieldName = typeof field.field_name === 'string' ? field.field_name : ''
      const key = fieldNameToKey.get(fieldName)
      const value =
        field.kind === 'String'
          ? field.value
          : field.kind === 'Decimal'
            ? parseInt(field.value)
            : ''

      return key ? { ...acc, [key]: value } : acc
    },
    {
      keyImageUrl: '',
      name: '',
      description: '',
      material: '',
      color: '',
      rarity: '',
      quality: 0
    }
  )

  return radGemData
}

export type MorphCardMintedEventOutput = {
  keyImageUrl: string
  name: string
  description: string
  energyType: string
  energyDescription: string
  rarity: string
  quality: number
  limitedEdition: boolean
}
const fromMorphCardMintedEvent = (value: ProgrammaticScryptoSborValue) => {
  if (value.kind !== 'Tuple') throw new Error('Invalid value kind')
  const tupleValue = value as ProgrammaticScryptoSborValueTuple
  const fieldNameToKey = new Map<string, string>([
    ['key_image_url', 'keyImageUrl'],
    ['name', 'name'],
    ['description', 'description'],
    ['energy_type', 'energyType'],
    ['energy_description', 'energyDescription'],
    ['rarity', 'rarity'],
    ['quality', 'quality'],
    ['limited_edition', 'limitedEdition']
  ])

  const radGemData = tupleValue.fields.reduce<MorphCardMintedEventOutput>(
    (acc, field) => {
      field.type_name
      const fieldName = typeof field.field_name === 'string' ? field.field_name : ''
      const key = fieldNameToKey.get(fieldName)
      const value =
        field.kind === 'String'
          ? field.value
          : field.kind === 'Decimal'
            ? parseInt(field.value)
            : field.kind === 'Bool'
              ? field.value
              : ''

      return key ? { ...acc, [key]: value } : acc
    },
    {
      keyImageUrl: '',
      name: '',
      description: '',
      energyType: '',
      energyDescription: '',
      rarity: '',
      quality: 0,
      limitedEdition: false
    }
  )

  return radGemData
}

export const fromEventData = (
  eventName: 'MintedRadgemEvent' | 'MorphCardMintedEvent',
  value: ProgrammaticScryptoSborValue
) => {
  switch (eventName) {
    case 'MintedRadgemEvent':
      return fromCombineElementsMintedRadgemEvent(value)
    case 'MorphCardMintedEvent':
      return fromMorphCardMintedEvent(value)
    default:
      throw new Error(`${eventName} transform not implemented`)
  }
}
