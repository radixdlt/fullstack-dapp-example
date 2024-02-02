import type { gatewayApi } from '../index'
import { entityDetailsCache } from './entity-details/entityDetails'

export type Cache<
  ApiCall extends (typeof gatewayApi)[keyof typeof gatewayApi],
  Params = Parameters<ApiCall>,
  Response = Awaited<ReturnType<ApiCall>>
> = {
  set: (params: Params, response: Response) => void
  get: (params: Params) => Response
  has: (params: Params) => boolean
  clear: () => void
}

export type ApiCache = {
  [apiCall in keyof typeof gatewayApi]?: Cache<(typeof gatewayApi)[apiCall]>
}

export const cache: ApiCache = {
  getEntityDetailsVaultAggregated: entityDetailsCache
}
