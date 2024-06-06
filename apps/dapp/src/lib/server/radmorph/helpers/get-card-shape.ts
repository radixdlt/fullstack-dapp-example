import type { ProgrammaticScryptoSborValue } from '@radixdlt/babylon-gateway-api-sdk'
import { createApiError } from 'common'
import { err, ok } from 'neverthrow'
import { type ShapeCode, shapeToCode, type Shape } from 'common'

export const getCardShape = (cardData: ProgrammaticScryptoSborValue | undefined) => {
  if (!cardData) {
    return err(createApiError('Card data not found', 400)())
  }

  let shapeCode: ShapeCode | undefined

  if (cardData.kind === 'Tuple') {
    for (const field of cardData.fields) {
      if (field.kind === 'String') {
        if (field.field_name === 'energy') {
          shapeCode = shapeToCode(field.value as Shape)
        }
      }

      if (shapeCode) {
        break
      }
    }
  }

  return shapeCode ? ok(shapeCode) : err(createApiError('Card shape not found', 400)())
}
