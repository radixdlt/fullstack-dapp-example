import { userApi } from '$lib/api/user-api.js'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, url }) => {
  const result = await userApi.me(fetch)

  if (result.isErr())
    return error(500, {
      message: 'Not logged in'
    })

  if (!result.value.accountAddress)
    return error(403, {
      message: 'No account found'
    })

  if (result.value.status !== 'OK')
    return error(403, {
      message: 'You have been blocked from accessing this page'
    })

  return {
    id: result.value.id,
    accountAddress: result.value.accountAddress,
    baseUrl: url.origin
  }
}
