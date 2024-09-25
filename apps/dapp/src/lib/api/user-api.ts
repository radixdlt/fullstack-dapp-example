import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
import type { GoldenTicket, QuestStatus, User } from 'database'

const me = (serverFetch?: typeof fetch) =>
  fetchWrapper<User>((serverFetch ?? fetch)('/api/user')).map(({ data }) => data)

const depositHeroBadge = () =>
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

export type UserFieldData =
  | {
      field: 'name'
      name: string
    }
  | {
      field: 'email'
      email: string
      newsletter: boolean
    }
  | {
      field: 'accountAddress'
      accountAddress: string
      proof: SignedChallengeAccount
    }

type SetUserFieldProps = {
  fields: UserFieldData[]
}

const setUserFields = (props: SetUserFieldProps) =>
  fetchWrapper<void>(
    fetch(`/api/user`, {
      method: 'PUT',
      body: JSON.stringify(props)
    })
  ).map(({ data }) => data)

const hasReceivedXrd = () =>
  fetchWrapper<{ exists: boolean }>(
    fetch(`/api/user/has-received-xrd`, {
      method: 'GET'
    })
  ).map(({ data }) => data.exists)

const hasWaitingRadgemJob = () =>
  fetchWrapper<{ exists: boolean }>(
    fetch(`/api/user/has-waiting-radgem-jobs`, {
      method: 'GET'
    })
  ).map(({ data }) => data.exists)

const getReferrals = () =>
  fetchWrapper<{
    referrals: string[]
    claimed: number
    readyToClaim: number
    progress: Record<'BronzeLevel' | 'SilverLevel' | 'GoldLevel', QuestStatus>
  }>(
    fetch(`/api/user/referrals`, {
      method: 'GET'
    })
  ).map(({ data }) => data)

const getNameByReferralCode = (referralCode: string) =>
  fetchWrapper<{
    name: string
  }>(
    fetch(`/api/referral/${referralCode}`, {
      method: 'GET'
    })
  ).map(({ data }) => data)

const getOwnedSilverTickets = () =>
  fetchWrapper<GoldenTicket[]>(
    fetch(`/api/golden-tickets`, {
      method: 'GET'
    })
  ).map(({ data }) =>
    data.map((ticket) => ({
      ...ticket,
      expiresAt: new Date(ticket.expiresAt),
      createdAt: new Date(ticket.createdAt),
      claimedAt: ticket.claimedAt ? new Date(ticket.claimedAt) : null
    }))
  )

const updateSilverTicketBatch = (batchId: string, expiresAt?: Date, description?: string) =>
  fetchWrapper<void>(
    fetch(`/api/golden-tickets/${batchId}`, {
      method: 'PUT',
      body: JSON.stringify({
        expiresAt,
        description
      })
    })
  )

export const userApi = {
  me,
  getReferrals,
  hasWaitingRadgemJob,
  getNameByReferralCode,
  hasReceivedXrd,
  setUserFields,
  directDepositXrd,
  depositHeroBadge,
  getOwnedSilverTickets,
  updateSilverTicketBatch
} as const
