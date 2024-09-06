import { gatewayApi, publicConfig } from '$lib/public-config'
import { get } from 'svelte/store'
import { user } from '../../../../../stores'
import BigNumber from 'bignumber.js'
import { okAsync } from 'neverthrow'

const THRESHOLD = 10

export const hasEnoughXrd = () => {
  const accountAddress = get(user)?.accountAddress
  if (!accountAddress) return okAsync(false)
  return gatewayApi
    .callApi('getEntityDetailsVaultAggregated', [accountAddress])
    .map(([details]) => {
      const xrd = details.fungible_resources.items.find(
        (item) => item.resource_address === publicConfig.xrd
      )

      return (
        xrd?.vaults.items
          .reduce((prev, next) => prev.plus(next.amount), new BigNumber(0))
          .toString() || '0'
      )
    })
    .map((xrd) => {
      const amountOfXrd = parseFloat(xrd)
      return amountOfXrd >= THRESHOLD
    })
}
