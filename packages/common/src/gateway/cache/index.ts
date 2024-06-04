import type { GatewayApi } from '../index'
import { entityDetailsCache } from './entity-details/entityDetails'

export type Cache<
  ApiCall extends GatewayApi['extractedMethods'][keyof GatewayApi['extractedMethods']],
  Params = Parameters<ApiCall>,
  Response = Awaited<ReturnType<ApiCall>>,
  GetResult = Response
> = {
  set: (params: Params, response: Response) => void
  get: (params: Params) => GetResult
  has: (params: Params) => boolean
  clear: () => void
}

export type ApiCache = {
  [apiCall in keyof GatewayApi['extractedMethods']]?: Cache<GatewayApi['extractedMethods'][apiCall]>
}

export const cache: ApiCache = {
  getEntityDetailsVaultAggregated: entityDetailsCache
}
