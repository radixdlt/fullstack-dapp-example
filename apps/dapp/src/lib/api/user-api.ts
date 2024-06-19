import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
import type { User } from 'database'

const me = () => fetchWrapper<User>(fetch('/api/user')).map(({ data }) => data)

const mintHeroBadge = () =>
  fetchWrapper<void>(
    fetch('/api/user/badge', {
      method: 'POST',
      body: '{}'
    })
  ).map(({ data }) => data)

type SetUserFieldProps =
  | {
      field: 'name'
      name: string
    }
  | {
      field: 'accountAddress'
      accountAddress: string
      proof: SignedChallengeAccount
    }

const setUserField = ({ field, ...props }: SetUserFieldProps) =>
  fetchWrapper<void>(
    fetch(`/api/user?field=${field}`, {
      method: 'PUT',
      body: JSON.stringify(props)
    })
  ).map(({ data }) => data)

const getReferrals = () =>
  fetchWrapper<void>(
    fetch(`/api/user/referrals`, {
      method: 'GET'
    })
  ).map(({ data }) => data)

export const userApi = {
  me,
  getReferrals,
  mintHeroBadge,
  setUserField
} as const
