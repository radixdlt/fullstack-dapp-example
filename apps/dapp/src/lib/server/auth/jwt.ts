import jwt, { type JwtPayload } from 'jsonwebtoken'
import { Result, err, ok } from 'neverthrow'
import type { Cookies } from '@sveltejs/kit'
import { config } from '$lib/config'

export type JWTInput = {
  refreshToken: { expiresIn: string; key: string }
  authToken: { expiresIn: string }
  secret: string
}

export type JWT = ReturnType<typeof JWT>
export const JWT = (input: JWTInput) => {
  const { secret, refreshToken, authToken } = input

	const createAuthToken = (userId: string) =>
		ok(
			jwt.sign({ userId }, secret, {
				expiresIn: authToken.expiresIn
			})
		)

	const createRefreshToken = (userId: string) =>
		ok(
			jwt.sign({ userId }, secret, {
				expiresIn: refreshToken.expiresIn
			})
		)

	const createTokens = (userId: string) =>
		Result.combine([createAuthToken(userId), createRefreshToken(userId)]).map(
			([authToken, refreshToken]) => ({ authToken, refreshToken })
		)

  const getRefreshTokenFromCookies = (
    cookies: Cookies
  ): Result<string, { reason: string; jsError?: Error }> => {
    const token = cookies.get('jwt')
    return token ? ok(token) : err({ reason: 'invalidRefreshToken' })
  }

	const verifyToken = (token: string): Result<string, { reason: string; jsError?: Error }> => {
		try {
			const decoded = jwt.verify(token, secret) as JwtPayload
			return ok(typeof decoded === 'string' ? decoded : decoded.userId)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return err({ jsError: error, reason: 'invalidToken' })
		}
	}

  const createRefreshTokenCookie = (token: string, cookies: Cookies) => ({
    'Set-Cookie': cookies.serialize(refreshToken.key, token, createRefreshTokenOptions())
  })

  const rotateRefreshToken = (
    cookies: Cookies
  ): Result<{ ['Set-Cookie']: string }, { jsError?: Error; reason: string }> =>
    getRefreshTokenFromCookies(cookies)
      .andThen(verifyToken)
      .andThen(createRefreshToken)
      .map((jwt) => createRefreshTokenCookie(jwt, cookies))

  const renewAuthToken = (cookies: Cookies): Result<string, { jsError?: Error; reason: string }> =>
    getRefreshTokenFromCookies(cookies).andThen(verifyToken).andThen(createAuthToken)

  const createRefreshTokenOptions = (
    expiresInMs = config.jwt.refreshToken.expiresInMs
  ): Parameters<Cookies['serialize']>[2] => {
    return {
      httpOnly: true,
      expires: new Date(Date.now() + expiresInMs),
      sameSite: 'lax',
      path: '/'
    }
  }

  return {
    createTokens,
    rotateRefreshToken,
    renewAuthToken,
    createRefreshTokenCookie,
    verifyToken
  }
}
