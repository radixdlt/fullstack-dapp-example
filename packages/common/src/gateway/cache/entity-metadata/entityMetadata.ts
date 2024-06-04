import type { GatewayApi } from '../../'
import type { Cache } from '..'
import type { StateEntityMetadataPageResponse } from '@radixdlt/babylon-gateway-api-sdk'

const storage = new Map<string, StateEntityMetadataPageResponse>()
export type GetEntityMetadata = GatewayApi['extractedMethods']['getEntityMetadata']

const key = (params: Parameters<GetEntityMetadata>) => (address: string) =>
  `${address}${params[1] ? JSON.stringify(params[1]) : ''}`

export const entityMetadataCache: Cache<
  GetEntityMetadata,
  Parameters<GetEntityMetadata>,
  Awaited<ReturnType<GetEntityMetadata>>,
  Awaited<ReturnType<GetEntityMetadata>> | undefined
> = {
  set: (params, response) => {
    storage.set(key(params)(params[0]), response)
  },

  get: (params) => storage.get(key(params)(params[0])),

  has: (params) => storage.has(key(params)(params[0])),

  clear: () => storage.clear()
}
