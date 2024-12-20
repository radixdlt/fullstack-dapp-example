import { ok, err, Result } from 'neverthrow'
import { Buffer } from 'buffer'

export const encodeBase64 = (value: string): Result<string, { reason: string; jsError: Error }> => {
  try {
    return ok(Buffer.from(value, 'utf-8').toString('base64'))
  } catch (error) {
    return err({
      reason: 'FailedToEncodeBase64',
      jsError: error as Error
    })
  }
}
