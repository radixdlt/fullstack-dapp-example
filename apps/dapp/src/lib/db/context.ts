import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended'
import type { Cookies } from '@sveltejs/kit'
import type { GatewayApi } from 'common'
import type { DbClient } from './index'

export type Context = {
  prisma: DbClient
  gatewayApi: GatewayApi
  cookies: Cookies
}

export type MockContext = {
  prisma: DeepMockProxy<DbClient>
  gatewayApi: DeepMockProxy<GatewayApi>
  cookies: DeepMockProxy<Cookies>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<DbClient>(),
    gatewayApi: mockDeep<GatewayApi>(),
    cookies: mockDeep<Cookies>()
  }
}
