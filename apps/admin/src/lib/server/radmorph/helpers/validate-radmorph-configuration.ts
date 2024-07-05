import { createApiError } from 'common'
import { err, ok } from 'neverthrow'
import { safeParse, type Output, string, record } from 'valibot'

export const validateRadmorphConfiguration = (requestBody: unknown) => {
  const radmorphsConfiguration = record(string(), string())

  type Config = Output<typeof radmorphsConfiguration>

  const parseResult = safeParse(radmorphsConfiguration, requestBody)

  if (!parseResult.success) {
    return err(createApiError('Invalid request body', 400)(parseResult.issues))
  }

  return ok(requestBody as Config)
}
