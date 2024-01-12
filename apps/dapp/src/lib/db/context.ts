import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';
import type { Cookies } from '@sveltejs/kit';
import type { PrismaClient } from 'database';
import type { GatewayApiClient } from '@radixdlt/radix-dapp-toolkit';

export type Context = {
	prisma: PrismaClient;
	gatewayApi: GatewayApiClient;
	cookies: Cookies;
};

export type MockContext = {
	prisma: DeepMockProxy<PrismaClient>;
	gatewayApi: DeepMockProxy<GatewayApiClient>;
	cookies: DeepMockProxy<Cookies>;
};

export const createMockContext = (): MockContext => {
	return {
		prisma: mockDeep<PrismaClient>(),
		gatewayApi: mockDeep<GatewayApiClient>(),
		cookies: mockDeep<Cookies>()
	};
};
