import { config } from '$lib/config';
import { PrismaClient } from '$lib/db';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { user, password, host, port, database } = config.postgres;

	const client = new PrismaClient({
		datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`
	});
	const response = await resolve(event, {});
	const result = await client.user.findMany();
	console.log(result);
	return response;
};
