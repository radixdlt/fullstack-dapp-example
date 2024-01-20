import { Result, err, ok } from 'neverthrow'
import { config } from '../config'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const verifyToken = (
	token: string,
	secret = config.jwt.secret
): Result<string, { reason: string; jsError?: Error }> => {
	try {
		const decoded = jwt.verify(token, secret) as JwtPayload
		return ok(typeof decoded === 'string' ? decoded : decoded.identityAddress)
	} catch (error: unknown) {
		return err({ jsError: error as Error, reason: 'invalidToken' })
	}
}
