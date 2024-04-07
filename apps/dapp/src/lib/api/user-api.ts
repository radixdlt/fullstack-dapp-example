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

const setAccountAddress = (account: string, proof: SignedChallengeAccount) =>
  fetchWrapper<void>(
    fetch(`/api/user/account/${account}`, {
      method: 'PUT',
      body: JSON.stringify({
        proof
      })
    })
  ).map(({ data }) => data)

export const userApi = {
  me,
  mintUserBadge,
  setAccountAddress
} as const
