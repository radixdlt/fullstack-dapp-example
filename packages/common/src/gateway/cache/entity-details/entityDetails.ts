import type { gatewayApi } from '../../'
import type { Cache } from '..'
import type { StateEntityDetailsVaultResponseItem } from '@radixdlt/babylon-gateway-api-sdk'

const storage = new Map<string, StateEntityDetailsVaultResponseItem>()

const key =
  (params: Parameters<(typeof gatewayApi)['getEntityDetailsVaultAggregated']>) =>
  (address: string) =>
    `${address}${params[1] ? JSON.stringify(params[1]) : ''}${
      params[2] ? JSON.stringify(params[2]) : ''
    }`

export const entityDetailsCache: Cache<(typeof gatewayApi)['getEntityDetailsVaultAggregated']> = {
  set: (params, response) => {
    params[0].forEach((address) => {
      const item = response.find((item) => item.address === address)
      if (item) {
        storage.set(key(params)(address), item)
      }
    })
  },

  get: (params) =>
    Array.from(storage.entries())
      .filter(([_key, _]) => params[0].map(key(params)).includes(_key))
      .map(([_, value]) => value),

  has: (params) =>
    params[0]
      .map(key(params))
      .map((key) => storage.has(key))
      .every((has) => has),

  clear: () => storage.clear()
}
