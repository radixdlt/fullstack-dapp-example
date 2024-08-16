import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'

export type BlockedCountryModel = ReturnType<typeof BlockedCountryModel>

export const BlockedCountryModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const getAll = () =>
    ResultAsync.fromPromise(
      db.blockedCountry.findMany({
        orderBy: [{ country: 'asc' }]
      }),
      (error) => {
        logger?.error({ error, method: 'getAll', model: 'BlockedCountryModel' })
        return createApiError('failed to get all countries', 400)()
      }
    )

  const isBlocked = (countryCode: string) =>
    ResultAsync.fromPromise(
      db.blockedCountry.count({
        where: {
          countryCode,
          blocked: true
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getBlocked', model: 'BlockedCountryModel' })
        return createApiError('failed to get blocked countries', 400)()
      }
    ).map((count) => count > 0)

  const update = (countryCode: string, blocked: boolean) =>
    ResultAsync.fromPromise(
      db.blockedCountry.update({
        where: { countryCode },
        data: { blocked }
      }),
      (error) => {
        logger?.error({ error, method: 'update', model: 'BlockedCountryModel' })
        return createApiError('failed to update country', 400)()
      }
    )

  return {
    getAll,
    isBlocked,
    update
  }
}
