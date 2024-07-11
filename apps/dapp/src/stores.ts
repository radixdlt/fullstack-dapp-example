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
  onGoToQuest: () => void
  text: string
}

export const jettyNotifications = writable<JettyNotification[]>([])

export const hideJettyMenu = writable(false)

export const hideJetty = writable(false)

export const retractJettyMenu = writable(false)

export const scrollToNextQuest = writable(false)
