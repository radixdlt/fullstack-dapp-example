import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
import type { User } from 'database'

const me = () => fetchWrapper<User>(fetch('/api/user')).map(({ data }) => data)

const mintUserBadge = () =>
  fetchWrapper<void>(
    fetch('/api/user/badge', {
      method: 'POST',
      body: '{}'
    })
  ).map(({ data }) => data)

type SetUserFieldProps = {
  accountAddress?: string
  name?: string
  proof?: SignedChallengeAccount
  field: 'accountAddress' | 'name'
}

const setUserField = ({ name, accountAddress, proof, field }: SetUserFieldProps) =>
  fetchWrapper<void>(
    fetch(`/api/user?field=${field}`, {
      method: 'PUT',
      body: JSON.stringify({
        proof,
        accountAddress,
        name
      })
    })
  ).map(({ data }) => data)

export const userApi = {
  me,
  mintUserBadge,
  setUserField
} as const
