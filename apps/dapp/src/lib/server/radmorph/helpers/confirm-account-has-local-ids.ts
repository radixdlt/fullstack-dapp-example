import { Addresses, createApiError } from 'common'
import type { StateEntityDetailsVaultResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import { config } from '$lib/config'
import { err, ok } from 'neverthrow'

export const confirmAccountHasLocalIds = (
  entityDetails: StateEntityDetailsVaultResponseItem,
  card: string,
  radgem1: string,
  radgem2: string
) => {
  const addresses = Addresses(config.dapp.networkId)
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
