import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended'
import type { Cookies } from '@sveltejs/kit'
import type { GatewayApiClient } from '@radixdlt/babylon-gateway-api-sdk'
import type { DbClient } from './index'

export type Context = {
  prisma: DbClient
  gatewayApi: GatewayApiClient
  cookies: Cookies
}

export type MockContext = {
  prisma: DeepMockProxy<DbClient>
  gatewayApi: DeepMockProxy<GatewayApiClient>
  cookies: DeepMockProxy<Cookies>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<DbClient>(),
    gatewayApi: mockDeep<GatewayApiClient>(),
    cookies: mockDeep<Cookies>()
  }
}
