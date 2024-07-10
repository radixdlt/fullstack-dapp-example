import { createApiError } from 'common'
import { err, ok } from 'neverthrow'
import { safeParse, type Output, string, record, object } from 'valibot'

export const validateRadmorphConfiguration = (requestBody: unknown) => {
  const radmorphsConfiguration = object({
    data: record(string(), string()),
    imageType: string()
  })

  type Config = Output<typeof radmorphsConfiguration>

  const parseResult = safeParse(radmorphsConfiguration, requestBody)

  if (!parseResult.success) {
    return err(createApiError('Invalid request body', 400)(parseResult.issues))
  }

  return ok(requestBody as Config)
}
