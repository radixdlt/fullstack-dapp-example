export type Config = typeof config;

export const config = {
	jwt: {
		secret: process.env.JWT_SECRET!,
		refreshToken: { expiresIn: '30d', expiresInMs: 1000 * 60 * 60 * 24 * 30, key: 'jwt' },
		authToken: { expiresIn: '10m' }
	},
	challenge: { expiresInMs: 600_000, byteLength: 32 },
	postgres: {
		database: process.env.POSTGRES_DATABASE!,
		host: process.env.POSTGRES_HOST!,
		user: process.env.POSTGRES_USER!,
		password: process.env.POSTGRES_PASSWORD!,
		port: parseInt(process.env.POSTGRES_PORT!, 10)
	},
	dapp: {
		expectedOrigin: process.env.EXPECTED_ORIGIN!,
		networkId: parseInt(process.env.PUBLIC_NETWORK_ID!, 10),
		dAppDefinitionAddress: process.env.PUBLIC_DAPP_DEFINITION_ADDRESS!
	},
	logLevel: process.env.LOG_LEVEL!
};
