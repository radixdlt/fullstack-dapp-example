import { env as privateEnv } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'

export type Config = typeof config

const {
  EXPECTED_ORIGIN,
  JWT_SECRET,
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} = privateEnv

const { PUBLIC_DAPP_DEFINITION_ADDRESS, PUBLIC_LOG_LEVEL, PUBLIC_NETWORK_ID } = publicEnv

export const config = {
  jwt: {
    secret: JWT_SECRET!,
    refreshToken: { expiresIn: '30d', expiresInMs: 1000 * 60 * 60 * 24 * 30, key: 'jwt' },
    authToken: { expiresIn: '10m' }
  },
  challenge: { expiresInMs: 600_000, byteLength: 32 },
  postgres: {
    database: POSTGRES_DATABASE,
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT, 10)
  },
  dapp: {
    expectedOrigin: EXPECTED_ORIGIN,
    networkId: parseInt(PUBLIC_NETWORK_ID, 10),
    dAppDefinitionAddress: PUBLIC_DAPP_DEFINITION_ADDRESS
  },
  logLevel: PUBLIC_LOG_LEVEL
}
