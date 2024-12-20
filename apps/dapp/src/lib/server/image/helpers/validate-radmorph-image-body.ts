import { createApiError } from 'common'
import { err, ok } from 'neverthrow'
import { safeParse, type InferOutput, string, object } from 'valibot'

export const validateRadmorphImageBody = (requestBody: unknown) => {
  const requestBodyType = object({
    card: string(),
    radgem1: string(),
    radgem2: string()
  })

  const parseResult = safeParse(requestBodyType, requestBody)

  if (!parseResult.success) {
    return err(createApiError('Invalid request body', 400)(parseResult.issues))
  }
  const { card, radgem1, radgem2 } = requestBody as InferOutput<typeof requestBodyType>

  return ok({
    card,
    radgem1,
    radgem2
  })
}
