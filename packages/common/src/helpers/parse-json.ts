import { typedError } from 'common'
import type { Result } from 'neverthrow'
import { err, ok } from 'neverthrow'

export const parseJSON = <T = any>(text: string): Result<T, Error> => {
  try {
    return ok(JSON.parse(text))
  } catch (error) {
    return err(typedError(error))
  }
}
