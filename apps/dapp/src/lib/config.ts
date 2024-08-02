import { env as privateEnv } from '$env/dynamic/private'
import { publicConfig } from './public-config'
import { Addresses } from 'common'
export type Config = typeof config

const {
  EXPECTED_ORIGIN,
  JWT_SECRET,
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  RO_DATABASE_URL,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID,
  MAX_USER_PER_IP,
  MAILER_LITE_API_KEY
} = privateEnv

// $env/dynamic/public does not work in CI build
const { PUBLIC_LOG_LEVEL = 'debug' } = process.env

const getDomain = () => {
  if (!EXPECTED_ORIGIN) return ''
  const urlParts = new URL(EXPECTED_ORIGIN).hostname.split('.')

  return urlParts
    .slice(0)
    .slice(-(urlParts.length === 4 ? 3 : 2))
    .join('.')
}

export const config = {
  jwt: {
    secret: JWT_SECRET!,
    refreshToken: { expiresIn: '30d', expiresInMs: 1000 * 60 * 60 * 24 * 30, key: 'jwt' },
    authToken: { expiresIn: '10m' },
    domain: getDomain()
  },
  challenge: { expiresInMs: 600_000, byteLength: 32 },
  postgres: {
    database: POSTGRES_DATABASE,
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT, 10),
    readUrl: RO_DATABASE_URL
  },
  redis: {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT ?? '6379', 10),
    password: REDIS_PASSWORD
  },
  twilio: {
    accountSid: TWILIO_ACCOUNT_SID || 'AC',
    authToken: TWILIO_AUTH_TOKEN || '',
    serviceSid: TWILIO_SERVICE_SID || ''
  },
  dapp: {
    expectedOrigin: EXPECTED_ORIGIN,
    maxUserPerIp: parseInt(MAX_USER_PER_IP || '4', 10),
    networkId: publicConfig.networkId,
    dAppDefinitionAddress: publicConfig.dAppDefinitionAddress ?? '',
    ...Addresses(publicConfig.networkId)
  },
  mailerLite: {
    apiKey: MAILER_LITE_API_KEY ?? ''
  },
  logLevel: PUBLIC_LOG_LEVEL
}
