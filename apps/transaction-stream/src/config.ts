import { Addresses } from 'common'

const networkId = parseInt(process.env.PUBLIC_NETWORK_ID!, 10)

export const config = {
  redis: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!, 10),
    password: process.env.REDIS_PASSWORD!
  },
  logLevel: process.env.LOG_LEVEL!,
  ledger: {
    fromStateVersion: parseInt(process.env.FROM_STATE_VERSION!, 10)
  },
  networkId,
  addresses: Addresses(networkId),
  stream: {
    limitPerPage: 100
  },
  radQuest: {
    ...Addresses(networkId)
  },
  postgres: {
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT!, 10)
  }
}
