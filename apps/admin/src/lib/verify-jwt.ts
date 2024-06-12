import jwt from 'jsonwebtoken'
import { Result, err, ok } from 'neverthrow'
import type { UserType } from 'database'

export const verifyJwt = (
  token: string,
  secret: string
): Result<{ userId: string; userType: UserType }, { reason: string; jsError?: Error }> => {
  try {
    const decoded = jwt.verify(token, secret) as { userId: string; userType: UserType }
    return ok({ userId: decoded.userId, userType: decoded.userType })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return err({ jsError: error, reason: 'invalidToken' })
  }
}
