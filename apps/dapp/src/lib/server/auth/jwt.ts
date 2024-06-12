import jwt from 'jsonwebtoken'
import { Result, err, ok } from 'neverthrow'
import type { Cookies } from '@sveltejs/kit'
import type { UserType } from 'database'

export type JWTInput = {
  refreshToken: { expiresIn: string; key: string; expiresInMs: number }
  authToken: { expiresIn: string }
  secret: string
  domain?: string
}

export type JWT = ReturnType<typeof JWT>
export const JWT = (input: JWTInput) => {
  const { secret, refreshToken, authToken, domain } = input

  const createAuthToken = (userId: string, userType: UserType) =>
    ok(
      jwt.sign({ userId, userType }, secret, {
        expiresIn: authToken.expiresIn
      })
    )

  const createRefreshToken = (userId: string, userType: UserType) =>
    ok(
      jwt.sign({ userId, userType }, secret, {
        expiresIn: refreshToken.expiresIn
      })
    )

  const createTokens = (userId: string, userType: UserType) =>
    Result.combine([createAuthToken(userId, userType), createRefreshToken(userId, userType)]).map(
      ([authToken, refreshToken]) => ({ authToken, refreshToken })
    )

  const getRefreshTokenFromCookies = (
    cookies: Cookies
  ): Result<string, { reason: string; jsError?: Error }> => {
    const token = cookies.get('jwt')
    return token ? ok(token) : err({ reason: 'invalidRefreshToken' })
  }

  const verifyToken = (
    token: string
  ): Result<{ userId: string; userType: UserType }, { reason: string; jsError?: Error }> => {
    try {
      const decoded = jwt.verify(token, secret) as { userId: string; userType: UserType }
      return ok({ userId: decoded.userId, userType: decoded.userType })
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
      .andThen((token) =>
        verifyToken(token).andThen(({ userId, userType }) => createRefreshToken(userId, userType))
      )
      .map((jwt) => createRefreshTokenCookie(jwt, cookies))

  const renewAuthToken = (cookies: Cookies): Result<string, { jsError?: Error; reason: string }> =>
    getRefreshTokenFromCookies(cookies).andThen((token) =>
      verifyToken(token).andThen(({ userId, userType }) => createAuthToken(userId, userType))
    )

  const createRefreshTokenOptions = (
    expiresInMs = refreshToken.expiresInMs
  ): Parameters<Cookies['serialize']>[2] => {
    return {
      httpOnly: true,
      expires: new Date(Date.now() + expiresInMs),
      sameSite: 'lax',
      path: '/',
      domain
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
