import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
import type { User } from 'database'

const me = (serverFetch?: typeof fetch) =>
  fetchWrapper<User>((serverFetch ?? fetch)('/api/user')).map(({ data }) => data)

const allowAccountAddressToMintHeroBadge = () =>
  fetchWrapper<void>(
    fetch('/api/user/badge', {
      method: 'POST',
      body: '{}'
    })
  )

const directDepositXrd = () =>
  fetchWrapper<void>(
    fetch('/api/user/direct-deposit', {
      method: 'POST',
      body: '{}'
    })
  )

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
  fetchWrapper<string[]>(
    fetch(`/api/user/referrals`, {
      method: 'GET'
    })
  ).map(({ data }) => data)

export const userApi = {
  me,
  getReferrals,
  allowAccountAddressToMintHeroBadge,
  setUserField,
  directDepositXrd
} as const
