import {
  Addresses,
  GatewayApi,
  RadMorphModel,
  UserModel,
  createApiError,
  type AppLogger
} from 'common'
import type { ControllerMethodContext } from '../_types'
import { config } from '$lib/config'
import { Result, ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import { dbClient } from '$lib/db'
import { type ColorCode, type ShaderCode, type ShapeCode } from 'common'

import { chunk } from '@radixdlt/babylon-gateway-api-sdk'
import { Queue } from 'bullmq'
import { SystemJobType, type SystemJob } from 'queues'
import { getCardShape } from './helpers/get-card-shape'
import { getRadgemCodes } from './helpers/get-radgem-codes'
import { confirmAccountHasLocalIds } from './helpers/confirm-account-has-local-ids'
import { validateRadmorphConfiguration } from './helpers/validate-radmorph-configuration'
import { validateRadmorphImageBody } from './helpers/validate-radmorph-image-body'

const RADMORPH_CHUNK_SIZE = 350

export const RadmorphController = ({
  gatewayApi = GatewayApi(config.dapp.networkId),
  userModel = UserModel(dbClient),
  radMorphModel = RadMorphModel(dbClient),
  systemQueue = new Queue<SystemJob>('SystemQueue', { connection: config.redis })
}: Partial<{
  gatewayApi: GatewayApi
  userModel: UserModel
  radMorphModel: RadMorphModel
  systemQueue: Queue<SystemJob>
}>) => {
  const getKeyImageUrl = (
    logger: AppLogger,
    radmorphAttributes: {
      shape: ShapeCode
      material: ShaderCode
      color1: ColorCode
      color2: ColorCode
    }
  ) =>
    radMorphModel(logger)
      .getUrl(radmorphAttributes)
      .andThen((data) =>
        data ? ok(data.url) : err(createApiError('Radmorph image not found', 404)())
      )

  const addresses = Addresses(config.dapp.networkId)

  const getUserAccountAddress = (ctx: ControllerMethodContext, userId: string) =>
    userModel(ctx.logger)
      .getById(userId, {})
      .andThen((user) =>
        user?.accountAddress
          ? okAsync(user.accountAddress)
          : errAsync(createApiError('User account address not found', 400)())
      )

  const getUserAccountDetails = (accountAddress: string) =>
    gatewayApi
      .callApi('getEntityDetailsVaultAggregated', [accountAddress])
      .mapErr(() => createApiError('Failed to get entity details', 400)())

  const getRadMorphCodes = (radgem1: string, radgem2: string, card: string) =>
    ResultAsync.combine([
      gatewayApi.callApi('getNonFungibleData', addresses.resources.radgemAddress, [
        radgem1,
        radgem2
      ]),
      gatewayApi.callApi('getNonFungibleData', addresses.resources.morphEnergyCards, [card])
    ])
      .andThen(([radgemData, cardData]) =>
        Result.combine([
          getRadgemCodes(radgemData[0].data?.programmatic_json),
          getRadgemCodes(radgemData[1].data?.programmatic_json),
          getCardShape(cardData[0].data?.programmatic_json)
        ])
      )
      .mapErr((jsError) => createApiError('Failed to get radmorph codes', 400)(jsError))

  const getRadmorphImage = (ctx: ControllerMethodContext, userId: string, requestBody: unknown) =>
    validateRadmorphImageBody(requestBody).asyncAndThen(({ card, radgem1, radgem2 }) =>
      getUserAccountAddress(ctx, userId)
        .andThen((accountAddress) => getUserAccountDetails(accountAddress))
        .andThen(([accountDetails]) =>
          confirmAccountHasLocalIds(accountDetails, card, radgem1, radgem2)
        )
        .andThen(() => getRadMorphCodes(radgem1, radgem2, card))
        .andThen(([radgem1Codes, radgem2Codes, shape]) => {
          const { color: color1, material: material1, rarity: rarity1 } = radgem1Codes
          const { color: color2, material: material2, rarity: rarity2 } = radgem2Codes
          const material = rarity1 >= rarity2 ? material1 : material2

          return getKeyImageUrl(ctx.logger, { shape, material, color1, color2 })
        })
        .map((imageUrl) => ({ data: { imageUrl }, httpResponseCode: 200 }))
    )

  const addChunksToQueue = (ctx: ControllerMethodContext, chunks: [string, string][][]) =>
    ResultAsync.fromPromise(
      systemQueue.addBulk(
        chunks.map((chunk) => ({
          name: crypto.randomUUID(),
          data: {
            traceId: ctx.traceId,
            type: SystemJobType.PopulateRadmorphs,
            data: chunk.map(([id, url]) => ({ url, id }))
          }
        }))
      ),
      (e) => createApiError('Failed to add chunks to queue', 400)(e)
    )

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

  const uploadRadmorphConfiguration = (ctx: ControllerMethodContext, requestBody: unknown) => {
    return validateRadmorphConfiguration(requestBody)
      .map((configuration) => duplicateConfigurationWithReversedColors(configuration))
      .map((configuration) => chunk(Object.entries(configuration), RADMORPH_CHUNK_SIZE))
      .asyncAndThen((chunks) => addChunksToQueue(ctx, chunks))
      .map(() => ({ data: {}, httpResponseCode: 200 }))
  }

  const getRadmorphImageNoAuth = () => {
    // TODO: Implement
    return okAsync({ data: {}, httpResponseCode: 200 })
  }

  return {
    getRadmorphImage,
    getRadmorphImageNoAuth,
    uploadRadmorphConfiguration
  }
}

export const radmorphController = RadmorphController({})
