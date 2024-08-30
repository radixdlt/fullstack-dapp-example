import { gatewayApi, publicConfig } from '$lib/public-config'
import { get } from 'svelte/store'
import { user } from '../../../../../stores'
import BigNumber from 'bignumber.js'

const THRESHOLD = 10

export const hasEnoughXrd = () =>
  gatewayApi
    .callApi('getEntityDetailsVaultAggregated', [get(user)!.accountAddress!])
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
