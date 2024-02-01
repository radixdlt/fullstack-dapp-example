import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { User } from 'database'

const me = () => fetchWrapper<User>(fetch('/api/user')).map(({ data }) => data)

export const userApi = {
  me
} as const
