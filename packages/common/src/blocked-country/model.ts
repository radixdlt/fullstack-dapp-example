import { CountryStatus, PrismaClient } from 'database'
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

  const getCountryStatus = (countryCode: string) =>
    ResultAsync.fromPromise(
      db.blockedCountry.findFirst({
        where: {
          countryCode
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getCountryStatus', model: 'BlockedCountryModel' })
        return createApiError('failed to get country status', 400)()
      }
    )

  const isSanctioned = (countryCode: string) =>
    ResultAsync.fromPromise(
      db.blockedCountry.count({
        where: {
          countryCode,
          status: 'SANCTIONED'
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getBlocked', model: 'BlockedCountryModel' })
        return createApiError('failed to get blocked countries', 400)()
      }
    ).map((count) => count > 0)

  const update = (countryCode: string, status: CountryStatus) =>
    ResultAsync.fromPromise(
      db.blockedCountry.update({
        where: { countryCode },
        data: { status }
      }),
      (error) => {
        logger?.error({ error, method: 'update', model: 'BlockedCountryModel' })
        return createApiError('failed to update country', 400)()
      }
    )

  return {
    getAll,
    update,
    isSanctioned,
    getCountryStatus
  }
}
