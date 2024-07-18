import type { ProgrammaticScryptoSborValue } from '@radixdlt/babylon-gateway-api-sdk'
import { getRadgemCodes } from './get-radgem-codes'
import { describe, it, expect } from 'vitest'

const values = [
  {
    kind: 'Tuple',
    type_name: 'RadgemData',
    fields: [
      {
        kind: 'String',
        type_name: 'Url',
        field_name: 'key_image_url',
        value: 'https://pvsns27x20.execute-api.eu-west-1.amazonaws.com/radgem?color=ORN&shader=REF'
      },
      {
        kind: 'String',
        field_name: 'name',
        value: 'Crystalline Flame RadGem {3}'
      },
      {
        kind: 'String',
        field_name: 'description',
        value:
          'The Common Crystalline material of this Flame RadGem is graded at a quality of 3 out of a possible 25.'
      },
      {
        kind: 'String',
        field_name: 'material',
        value: 'crystalline'
      },
      {
        kind: 'String',
        field_name: 'color',
        value: 'flame'
      },
      {
        kind: 'String',
        field_name: 'rarity',
        value: 'common'
      },
      {
        kind: 'Decimal',
        field_name: 'quality',
        value: '3'
      }
    ]
  },
  {
    kind: 'Tuple',
    type_name: 'RadgemData',
    fields: [
      {
        kind: 'String',
        type_name: 'Url',
        field_name: 'key_image_url',
        value: 'https://pvsns27x20.execute-api.eu-west-1.amazonaws.com/radgem?color=LBL&shader=MET'
      },
      {
        kind: 'String',
        field_name: 'name',
        value: 'Metallic Sky RadGem {9}'
      },
      {
        kind: 'String',
        field_name: 'description',
        value:
          'The Rare Metallic material of this Sky RadGem is graded at a quality of 9 out of a possible 25.'
      },
      {
        kind: 'String',
        field_name: 'material',
        value: 'metallic'
      },
      {
        kind: 'String',
        field_name: 'color',
        value: 'sky'
      },
      {
        kind: 'String',
        field_name: 'rarity',
        value: 'rare'
      },
      {
        kind: 'Decimal',
        field_name: 'quality',
        value: '9'
      }
    ]
  }
] satisfies ProgrammaticScryptoSborValue[]

describe('getRadGem codes', () => {
  it('should get codes from ProgrammaticScryptoSborValue', () => {
    const actual = values.map(getRadgemCodes).map((result) => result._unsafeUnwrap())
    expect(actual).toEqual([
      { color: 'ORN', material: 'REF', rarity: 1 },
      { color: 'LBL', material: 'MET', rarity: 3 }
    ])
  })
})
