import type { GatewayApi } from '../index'
import { entityDetailsCache } from './entity-details/entityDetails'
import { entityMetadataCache } from './entity-metadata/entityMetadata'

export type Cache<
  ApiCall extends GatewayApi['extractedMethods'][keyof GatewayApi['extractedMethods']],
  Params = Parameters<ApiCall>,
  Response = Awaited<ReturnType<ApiCall>>
> = {
  set: (params: Params, response: Response) => void
  get: (params: Params) => Response
  has: (params: Params) => boolean
  clear: () => void
}

export type ApiCache = {
  [apiCall in keyof GatewayApi['extractedMethods']]?: Cache<GatewayApi['extractedMethods'][apiCall]>
}

export const cache: ApiCache = {
  getEntityDetailsVaultAggregated: entityDetailsCache,
  getEntityMetadata: entityMetadataCache
}
