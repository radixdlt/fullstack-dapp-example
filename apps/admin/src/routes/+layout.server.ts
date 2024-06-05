import { apiCall } from '$lib/api/api-call'
import { error } from '@sveltejs/kit'
import { UserType, type User } from 'database'

export async function load({ fetch }) {
  const response = await apiCall(fetch).get<User>('api/user')
  if (response.isOk()) {
    if (response.value.type === UserType.ADMIN) {
      return {
        user: response.value
      }
    }
  }

  error(400)
}
