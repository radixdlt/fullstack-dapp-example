import type { ProgrammaticScryptoSborValue } from '@radixdlt/babylon-gateway-api-sdk'
import { createApiError } from 'common'
import { err, ok } from 'neverthrow'
import {
  type ColorCode,
  type ShaderCode,
  colorToCode,
  type Color,
  shaderToCode,
  type Shader,
  rarityToNumber
} from 'common'

export const getRadgemCodes = (radgemData: ProgrammaticScryptoSborValue | undefined) => {
  if (!radgemData) {
    return err(createApiError('Radgem data not found', 400)())
  }

  type Codes = {
    color: ColorCode
    material: ShaderCode
    rarity: number
  }

  const codes: Partial<Codes> = {
    color: undefined,
    material: undefined
  }

  if (radgemData.kind === 'Tuple') {
    for (const field of radgemData.fields) {
      if (field.kind === 'String') {
        if (field.field_name === 'color') {
          codes.color = colorToCode(field.value as Color)
        }

        if (field.field_name === 'material') {
          codes.material = shaderToCode(field.value as Shader)
        }

        if (field.field_name === 'rarity') {
          codes.rarity = rarityToNumber(field.value)
        }
      }

      if (codes.color && codes.material && codes.rarity) {
        break
      }
    }
  }

  if (codes.color && codes.material && codes.rarity) {
    return ok(codes as Codes)
  }

  return err(createApiError('Radgem codes not found', 400)())
}
