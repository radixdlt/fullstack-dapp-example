export const config = {
	postgres: {
		database: process.env.POSTGRES_DATABASE ?? 'radquest',
		host: process.env.POSTGRES_HOST ?? 'localhost',
		user: process.env.POSTGRES_USER ?? 'user',
		password: process.env.POSTGRES_PASSWORD ?? 'password',
		port: parseInt(process.env.POSTGRES_PORT ?? '5433', 10)
	}
};
