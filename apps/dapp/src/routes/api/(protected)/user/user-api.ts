import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { User } from 'database'

const me = () => fetchWrapper<User>(fetch('/api/user')).map(({ data }) => data)

const mintUserBadge = (accountAddress: string) =>
	fetchWrapper<void>(
		fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify({ accountAddress })
		})
	).map(({ data }) => data)

export const userApi = {
	me,
	mintUserBadge
} as const
