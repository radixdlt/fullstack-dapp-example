import { writable } from 'svelte/store'
import type { User } from 'database'
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
  AccountLocked: 'AccountLocked',
  AccountAlreadyRegistered: 'AccountAlreadyRegistered',
  HighDemand: 'HighDemand'
} as const

export type ErrorPopupId = (typeof ErrorPopupId)[keyof typeof ErrorPopupId]

export type ErrorPopup = {
  id: ErrorPopupId
}

export const errorPopupStore = writable<ErrorPopup | undefined>(undefined)
