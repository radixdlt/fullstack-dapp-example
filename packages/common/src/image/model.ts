import { ImageType, PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'

export type ImageModel = ReturnType<typeof ImageModel>

export type ImageModelMethods = ReturnType<ImageModel>

export const ImageModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const addMany = (data: { url: string; id: string; type: ImageType }[]) => {
    return ResultAsync.fromPromise(
      db.$transaction(async (transaction) => {
        await transaction.image.deleteMany({
          where: { id: { in: data.map((d) => d.id) } }
        })
        await transaction.image.createMany({ data })
      }),
      (error) => {
        logger?.error({ error, method: 'addMany', model: 'ImageModel' })
        return createApiError('failed to add many radmorphs images', 400)()
      }
    )
  }

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
    shape?: string
    material?: string
    color1?: string
    color2?: string
  }) => {
    const id1 = [shape, material, color1, color2].filter(Boolean).join('_')
    const id2 = [shape, material, color2, color1].filter(Boolean).join('_')
    return ResultAsync.fromPromise(
      db.image.findFirst({
        where: {
          OR: [
            {
              id: id1
            },
            {
              id: id2
            }
          ]
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getUrl', model: 'ImageModel' })
        return createApiError('failed to get image url', 400)()
      }
    ).map((image) => image?.url ?? '')
  }

  return {
    getUrl,
    addMany,
    listRadmorphs
  }
}
