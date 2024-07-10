import { Addresses, createApiError } from 'common'
import type { ControllerDependencies, ControllerMethodContext } from '../_types'
import { config } from '$lib/config'
import { Result, ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import { type ColorCode, type ShaderCode, type ShapeCode } from 'common'

import { getCardShape } from './helpers/get-card-shape'
import { getRadgemCodes } from './helpers/get-radgem-codes'
import { confirmAccountHasLocalIds } from './helpers/confirm-account-has-local-ids'
import { validateRadmorphImageBody } from './helpers/validate-radmorph-image-body'

export type ImageController = ReturnType<typeof ImageController>
export const ImageController = ({ imageModel, gatewayApi, userModel }: ControllerDependencies) => {
  const getKeyImageUrl = (radmorphAttributes: {
    shape: ShapeCode
    material: ShaderCode
    color1: ColorCode
    color2: ColorCode
  }) =>
    imageModel
      .getUrl(radmorphAttributes)
      .andThen((data) =>
        data ? ok(data.url) : err(createApiError('Radmorph image not found', 404)())
      )

  const addresses = Addresses(config.dapp.networkId)

  const getUserAccountAddress = (ctx: ControllerMethodContext, userId: string) =>
    userModel
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
      gatewayApi.callApi('getNonFungibleData', addresses.resources.morphEnergyCardAddress, [card])
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

          return getKeyImageUrl({ shape, material, color1, color2 })
        })
        .map((imageUrl) => ({ data: { imageUrl }, httpResponseCode: 200 }))
    )

  return {
    getRadmorphImage
  }
}
