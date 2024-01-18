import { userController } from '$lib/server/user/controller'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals }) => {
	const { identityAddress } = locals
	const result = await userController.getUser(identityAddress)

	if (result.isErr()) {
		throw error(result.error.httpResponseCode, result.error.reason)
	}

	return json(result.value, { status: 200 })
}
