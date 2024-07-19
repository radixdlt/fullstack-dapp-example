import type { ProgrammaticScryptoSborValueTuple } from '@radixdlt/babylon-gateway-api-sdk'

export type RadGem = {
  keyImageUrl: string
  name: string
  description: string
  material: string
  color: string
  rarity: string
  quality: number
}

const fromCombineElementsMintedRadgemEvent = (tupleValue: ProgrammaticScryptoSborValueTuple) => {
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

const fromEventData = (
  eventName: 'MintedRadgemEvent',
  tupleValue: ProgrammaticScryptoSborValueTuple
) => {
  switch (eventName) {
    case 'MintedRadgemEvent':
      return fromCombineElementsMintedRadgemEvent(tupleValue)
    default:
      throw new Error(`${eventName} transform not implemented`)
  }
}

export const RadGem = { fromEventData } as const
