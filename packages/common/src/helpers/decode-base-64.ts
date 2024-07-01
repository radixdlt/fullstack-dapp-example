import { ok, err, Result } from 'neverthrow'
import { Buffer } from 'buffer'

export const decodeBase64 = (value: string): Result<string, { reason: string; jsError: Error }> => {
  try {
    return ok(Buffer.from(value, 'base64').toString())
  } catch (error) {
    return err({
      reason: 'FailedToDecodeBase64',
      jsError: error as Error
    })
  }
}
