import { Addresses, GatewayApi, UserModel, createApiError } from 'common'
import type { ControllerMethodContext } from '../_types'
import { config } from '$lib/config'
import { Result, ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import { dbClient } from '$lib/db'
import {
  type StateEntityDetailsVaultResponseItem,
  type ProgrammaticScryptoSborValue,
  RadixNetwork
} from '@radixdlt/babylon-gateway-api-sdk'
import {
  colorToCode,
  rarityToNumber,
  shaderToCode,
  shapeToCode,
  type ColorCode,
  type ShaderCode,
  type ShapeCode
} from './mappings'

export const RadmorphController = ({
  gatewayApi = GatewayApi(config.dapp.networkId),
  userModel = UserModel(dbClient)
}: Partial<{ gatewayApi: GatewayApi; userModel: UserModel }>) => {
  const getKeyImageUrl = (
    shape: ShapeCode,
    material: ShaderCode,
    color1: ColorCode,
    color2: ColorCode
  ) => {
    const testUrl = `https://pvsns27x20.execute-api.eu-west-1.amazonaws.com/?color1=${color1}&color2=${color2}&shape=${shape}&shader=${material}`

    // TODO: remove this and get image url from database
    if (config.dapp.networkId === RadixNetwork.Mainnet) {
      // TODO: Implement
      return okAsync(testUrl)
    }

    return okAsync(testUrl)
  }

  const addresses = Addresses(config.dapp.networkId)

  const validateRequestBody = (requestBody: unknown) => {
    if (requestBody === null || typeof requestBody !== 'object') {
      return err(createApiError('Invalid request body', 400)())
    }

    const { card, radgem1, radgem2 } = requestBody as Record<string, string>

    if (!card || !radgem1 || !radgem2) {
      return err(createApiError('Missing data in request body', 400)())
    }

    return ok({
      card,
      radgem1,
      radgem2
    })
  }

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

  const confirmAccountHasLocalIds = (
    entityDetails: StateEntityDetailsVaultResponseItem,
    card: string,
    radgem1: string,
    radgem2: string
  ) => {
    const foundLocalIds = {
      card: false,
      radgem1: false,
      radgem2: false
    }

    for (const resource of entityDetails.non_fungible_resources.items) {
      if (resource.resource_address === addresses.resources.radgemAddress) {
        resource.vaults.items.forEach((vault) => {
          vault.items?.forEach((nfId) => {
            if (nfId === radgem1) {
              foundLocalIds.radgem1 = true
            } else if (nfId === radgem2) {
              foundLocalIds.radgem2 = true
            }
          })
        })
      } else if (resource.resource_address === addresses.resources.morphEnergyCards) {
        resource.vaults.items.forEach((vault) => {
          vault.items?.forEach((nfId) => {
            if (nfId === card) {
              foundLocalIds.card = true
            }
          })
        })
      }

      if (foundLocalIds.card && foundLocalIds.radgem1 && foundLocalIds.radgem2) {
        break
      }
    }

    if (!foundLocalIds.card) {
      return err(createApiError('Card not found in user account', 400)())
    }

    if (!foundLocalIds.radgem1) {
      return err(createApiError('Radgem1 not found in user account', 400)())
    }

    if (!foundLocalIds.radgem2) {
      return err(createApiError('Radgem2 not found in user account', 400)())
    }

    return ok({})
  }

  const getRadgemCodes = (radgemData: ProgrammaticScryptoSborValue | undefined) => {
    if (!radgemData) {
      return err(createApiError('Radgem data not found', 400)())
    }

    type Codes = {
      color: ColorCode
      material: ShaderCode
      rarity: number
    }

    const codes: Partial<Codes> = {
      color: undefined,
      material: undefined
    }

    if (radgemData.kind === 'Tuple') {
      for (const field of radgemData.fields) {
        if (field.kind === 'String') {
          if (field.field_name === 'color') {
            codes.color = colorToCode(field.value)
          }

          if (field.field_name === 'material') {
            codes.material = shaderToCode(field.value)
          }

          if (field.field_name === 'rarity') {
            codes.rarity = rarityToNumber(field.value)
          }
        }

        if (codes.color && codes.material && codes.rarity) {
          break
        }
      }
    }

    if (codes.color && codes.material && codes.rarity) {
      return ok(codes as Codes)
    }

    return err(createApiError('Radgem codes not found', 400)())
  }

  const getCardShape = (cardData: ProgrammaticScryptoSborValue | undefined) => {
    if (!cardData) {
      return err(createApiError('Card data not found', 400)())
    }

    let shapeCode: ShapeCode | undefined

    if (cardData.kind === 'Tuple') {
      for (const field of cardData.fields) {
        if (field.kind === 'String') {
          if (field.field_name === 'energy') {
            shapeCode = shapeToCode(field.value)
          }
        }

        if (shapeCode) {
          break
        }
      }
    }

    return shapeCode ? ok(shapeCode) : err(createApiError('Card shape not found', 400)())
  }

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
    validateRequestBody(requestBody).asyncAndThen(({ card, radgem1, radgem2 }) =>
      getUserAccountAddress(ctx, userId)
        .andThen((accountAddress) => getUserAccountDetails(accountAddress))
        .andThen(([accountDetails]) =>
          confirmAccountHasLocalIds(accountDetails, card, radgem1, radgem2)
        )
        .andThen(() => getRadMorphCodes(radgem1, radgem2, card))
        .andThen(([radgem1Codes, radgem2Codes, cardShape]) => {
          const { color: color1, material: material1, rarity: rarity1 } = radgem1Codes
          const { color: color2, material: material2, rarity: rarity2 } = radgem2Codes
          const material = rarity1 >= rarity2 ? material1 : material2

          return getKeyImageUrl(cardShape, material, color1, color2)
        })
        .map((imageUrl) => ({ data: { imageUrl }, httpResponseCode: 200 }))
    )

  const getRadmorphImageNoAuth = async () => {
    // TODO: Implement
    return okAsync({ data: {}, httpResponseCode: 200 })
  }

  return {
    getRadmorphImage,
    getRadmorphImageNoAuth
  }
}

export const radmorphController = RadmorphController({})
