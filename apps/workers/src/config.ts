export const config = {
	gateway: {
		baseUrl: process.env.GATEWAY_BASE_URL ?? 'https://babylon-stokenet-gateway.radixdlt.com'
	},
	redis: {
		host: process.env.REDIS_HOST ?? 'localhost',
		port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
		password: process.env.REDIS_PASSWORD ?? 'password'
	},
	postgres: {
		database: process.env.POSTGRES_DATABASE ?? 'radquest',
		host: process.env.POSTGRES_HOST ?? 'localhost',
		user: process.env.POSTGRES_USER ?? 'user',
		password: process.env.POSTGRES_PASSWORD ?? 'password',
		port: parseInt(process.env.POSTGRES_PORT ?? '5433', 10)
	},
	logLevel: process.env.LOG_LEVEL!
}
