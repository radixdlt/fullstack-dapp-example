import { ImageModel, createApiError } from 'common'

import { ResultAsync } from 'neverthrow'

import { chunk } from '@radixdlt/babylon-gateway-api-sdk'
import { SystemJobType, type Queues } from 'queues'
import { validateRadmorphConfiguration } from './helpers/validate-radmorph-configuration'
import type { ImageType } from 'database'

const RADMORPH_CHUNK_SIZE = 350

export type ImageController = ReturnType<typeof ImageController>
export const ImageController = ({
  imageModel,
  systemQueue
}: {
  imageModel: ReturnType<ImageModel>
  systemQueue: Queues['System']
}) => {
  const addChunksToQueue = (chunks: { id: string; url: string }[][]) => {
    return ResultAsync.fromPromise(
      systemQueue.add(
        chunks.map((chunk) => ({
          id: crypto.randomUUID(),
          type: SystemJobType.PopulateRadmorphs,
          data: chunk
        }))
      ),
      (e) => createApiError('Failed to add chunks to queue', 400)(e)
    )
  }

  const duplicateConfigurationWithReversedColors = (configuration: Record<string, string>) =>
    Object.entries(configuration).reduce(
      (acc, [id, url]) => {
        const [shape, shader, color1, color2] = id.split('_')
        const reversedId = `${shape}_${shader}_${color2}_${color1}`
        acc[id] = url
        acc[reversedId] = url
        return acc
      },
      {} as Record<string, string>
    )

  const uploadImagesJson = (requestBody: unknown) =>
    validateRadmorphConfiguration(requestBody).asyncAndThen(({ data, imageType }) => {
      const items = imageType === 'RadMorph' ? duplicateConfigurationWithReversedColors(data) : data
      const chunks = Object.entries(items).map(([id, url]) => ({
        id,
        url,
        type: imageType as ImageType
      }))
      return imageModel.addMany(chunks).map(() => ({ data: {}, httpResponseCode: 200 }))
    })

  const populateImageOracle = () => {
    return imageModel
      .listRadmorphs()
      .map((items) => chunk(items, RADMORPH_CHUNK_SIZE))
      .andThen((chunks) => addChunksToQueue(chunks))
      .map(() => ({ data: {}, httpResponseCode: 200 }))
  }

  return {
    uploadImagesJson,
    populateImageOracle
  }
}
