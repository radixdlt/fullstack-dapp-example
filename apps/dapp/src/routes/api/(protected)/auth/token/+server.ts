import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals }) => {
	const { authToken } = locals;

	return json({ authToken }, { status: 200 });
};
