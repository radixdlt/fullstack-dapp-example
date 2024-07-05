import { RadMorphModel, createApiError } from 'common'

import { ResultAsync } from 'neverthrow'

import { chunk } from '@radixdlt/babylon-gateway-api-sdk'
import { Queue } from 'bullmq'
import { SystemJobType, type SystemJob } from 'queues'
import { validateRadmorphConfiguration } from './helpers/validate-radmorph-configuration'

const RADMORPH_CHUNK_SIZE = 350

export type RadmorphController = ReturnType<typeof RadmorphController>
export const RadmorphController = ({
  radMorphModel,
  systemQueue
}: {
  radMorphModel: ReturnType<RadMorphModel>
  systemQueue: Queue<SystemJob>
}) => {
  const addChunksToQueue = (chunks: { id: string; url: string }[][]) => {
    return ResultAsync.fromPromise(
      systemQueue.addBulk(
        chunks.map((chunk) => {
          const traceId = crypto.randomUUID()
          return {
            name: traceId,
            data: {
              traceId,
              type: SystemJobType.PopulateRadmorphs,
              data: chunk
            }
          }
        })
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

  const uploadRadmorphConfiguration = (requestBody: unknown) =>
    validateRadmorphConfiguration(requestBody)
      .map((configuration) => duplicateConfigurationWithReversedColors(configuration))
      .map((items) => Object.entries(items).map(([id, url]) => ({ id, url })))
      .asyncAndThen((chunks) => radMorphModel.addMany(chunks))
      .map(() => ({ data: {}, httpResponseCode: 200 }))

  const populateImageOracle = () => {
    return radMorphModel
      .list()
      .map((items) => chunk(items, RADMORPH_CHUNK_SIZE))
      .andThen((chunks) => addChunksToQueue(chunks))
      .map(() => ({ data: {}, httpResponseCode: 200 }))
  }

  return {
    uploadRadmorphConfiguration,
    populateImageOracle
  }
}
