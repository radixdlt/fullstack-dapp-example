import Pino from 'pino'

const { PUBLIC_LOG_LEVEL = 'debug' } = (
  typeof process === 'undefined' ? { env: { PUBLIC_LOG_LEVEL: 'debug' } } : process
).env

export type AppLogger = typeof appLogger

export const createAppLogger = (options?: Parameters<typeof Pino>[0]) => Pino(options)

export const appLogger = createAppLogger({ level: PUBLIC_LOG_LEVEL })
