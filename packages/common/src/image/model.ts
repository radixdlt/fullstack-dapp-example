import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'

export type ImageModel = ReturnType<typeof ImageModel>

export type ImageModelMethods = ReturnType<ImageModel>

export const ImageModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const addMany = (data: { url: string; id: string }[]) =>
    ResultAsync.fromPromise(
      db.$transaction(async (transaction) => {
        await transaction.image.deleteMany({
          where: { id: { in: data.map((d) => d.id) } }
        })
        await transaction.image.createMany({
          data: data.map((item) => ({ ...item, type: 'RadMorph' }))
        })
      }),
      (error) => {
        logger?.error({ error, method: 'addMany', model: 'ImageModel' })
        return createApiError('failed to add many radmorphs images', 400)()
      }
    )

  const listRadmorphs = () =>
    ResultAsync.fromPromise(
      db.image.findMany({
        where: {
          type: 'RadMorph'
        }
      }),
      (error) => {
        logger?.error({ error, method: 'listRadmorphs', model: 'ImageModel' })
        return createApiError('failed to get radmorph images', 400)()
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
      db.image.findFirst({
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
        logger?.error({ error, method: 'getUrl', model: 'ImageModel' })
        return createApiError('failed to get radmorph image url', 400)()
      }
    )

  return {
    getUrl,
    addMany,
    listRadmorphs
  }
}
