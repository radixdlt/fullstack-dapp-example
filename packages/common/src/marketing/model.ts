import { PrismaClient } from 'database'
import { type AppLogger, createApiError } from '../helpers'
import { ResultAsync } from 'neverthrow'

export const UtmKey = {
  utm_campaign: 'utm_campaign',
  utm_medium: 'utm_medium',
  utm_source: 'utm_source',
  utm_id: 'utm_id',
  utm_content: 'utm_content',
  utm_term: 'utm_term'
} as const

export const utmKeys = Object.keys(UtmKey)

export type UtmKey = keyof typeof UtmKey

export type MarketingUtmValues = Partial<{
  [key in UtmKey]: string
}>

export type MarketingModel = ReturnType<typeof MarketingModel>
export const MarketingModel = (db: PrismaClient) => (logger: AppLogger) => {
  const add = (userId: string, values: MarketingUtmValues) =>
    ResultAsync.fromPromise(db.marketing.create({ data: { ...values, userId } }), (error) => {
      logger.error({ method: 'add.error', model: 'MarketingModel', error, data: values })
      return createApiError('FailedToAddMarketingEntry', 400)()
    }).map(() => {})

  return { add }
}
