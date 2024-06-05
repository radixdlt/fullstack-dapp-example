import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'

export type RadMorphModel = ReturnType<typeof RadMorphModel>

export type RadMorphModelMethods = ReturnType<RadMorphModel>

export const RadMorphModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const addMany = (data: { url: string; id: string }[]) =>
    ResultAsync.fromPromise(
      db.$transaction(async (transaction) => {
        await transaction.radMorphImage.deleteMany({
          where: { id: { in: data.map((d) => d.id) } }
        })
        await transaction.radMorphImage.createMany({
          data
        })
      }),
      (error) => {
        logger?.error({ error, method: 'addMany', model: 'RadMorphModel' })
        return createApiError('failed to add many radmorphs images', 400)()
      }
    )

  const list = () =>
    ResultAsync.fromPromise(
      db.radMorphImage.findMany({
        where: {}
      }),
      (error) => {
        logger?.error({ error, method: 'list', model: 'RadMorphModel' })
        return createApiError('failed to get radmorphs', 400)()
      }
    )

  const getUrl = ({
    shape,
    material,
    color1,
    color2
  }: {
    shape: string
    material: string
    color1: string
    color2: string
  }) =>
    ResultAsync.fromPromise(
      db.radMorphImage.findFirst({
        where: {
          OR: [
            {
              id: `${shape}_${material}_${color1}_${color2}`
            },
            {
              id: `${shape}_${material}_${color2}_${color1}`
            }
          ]
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getUrl', model: 'RadMorphModel' })
        return createApiError('failed to get radmorph image url', 400)()
      }
    )

  return {
    getUrl,
    addMany,
    list
  }
}
