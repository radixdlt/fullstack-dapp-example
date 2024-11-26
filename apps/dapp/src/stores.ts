import { writable, derived, type Writable, type Readable } from 'svelte/store'
import type { $Enums, User } from 'database'
import { type Quests } from 'content'

export const quests = writable<Quests>()

export const user = writable<
  | (User & {
      label: string
      email?: { email: string; newsletter: boolean }
      referredByUser?: { name?: string }
    })
  | undefined
>(undefined)

export const isUserBlocked = derived(user, ($user) => $user?.status !== 'OK')

export const deriveIsUserBlockedAlternative = (store: Writable<boolean> | Readable<boolean>) =>
  derived([store, isUserBlocked], ([$store, $isUserBlocked]) => $store || $isUserBlocked)

export type JettyNotification = {
  id: string
  title: string
  action: () => void
  text: string
}

export const jettyNotifications = writable<JettyNotification[]>([])

export const hideJettyMenu = writable(false)

export const hideJetty = writable(false)

export const retractJettyMenu = writable(false)

export const scrollToQuestIndex = writable<number | null>(null)

export const hasHeroBadge = writable(false)

export const ErrorPopupId = {
  XrdRewardLimit: 'XrdRewardLimit',
  AccountAlreadyRegistered: 'AccountAlreadyRegistered',
  CannotClaimRewards: 'CannotClaimRewards',
  SessionBlocked: 'SessionBlocked',
  PermanentlyBlocked: 'PermanentlyBlocked',
  GetOffVPN: 'GetOffVPN',
  HighDemand: 'HighDemand'
} as const

export type ErrorPopupId = (typeof ErrorPopupId)[keyof typeof ErrorPopupId]

export type ErrorPopup = {
  id: ErrorPopupId
}

export const errorPopupStore = writable<ErrorPopup | undefined>(undefined)
