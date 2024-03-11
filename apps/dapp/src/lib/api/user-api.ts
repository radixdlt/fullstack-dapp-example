import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { User } from 'database'

const me = () => fetchWrapper<User>(fetch('/api/user')).map(({ data }) => data)

const mintUserBadge = () =>
  fetchWrapper<void>(
    fetch('/api/user/badge', {
      method: 'POST',
      body: '{}'
    })
  ).map(({ data }) => data)

export const userApi = {
  me,
  mintUserBadge
} as const
