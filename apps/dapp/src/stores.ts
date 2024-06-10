import { writable } from 'svelte/store'
import type { User } from 'database'
import { WebSocketClient } from './lib/websocket-client'
import { type Quests } from 'content'
import { SvelteComponent } from 'svelte'

export const quests = writable<Quests>()

export const user = writable<(User & { label: string }) | undefined>(undefined)

export const webSocketClient = writable<WebSocketClient | undefined>(undefined)

export type JettyDialog = {
  component: typeof SvelteComponent
  props: Record<string, unknown>
}
export const jettyDialog = writable<JettyDialog | undefined>()

type _JettyNotification<T extends string> = {
  id: string
  type: T
  onGoToQuest: () => void
}

type JettyTextNotification = _JettyNotification<'text'> & {
  text: string
}

type JettyComponentNotification = _JettyNotification<'component'> & {
  component: typeof SvelteComponent
  props: Record<string, unknown>
}

export type JettyNotification = JettyTextNotification | JettyComponentNotification

export const jettyNotifications = writable<JettyNotification[]>([])

export const showJetty = writable(true)

export const scrollToNextQuest = writable(false)
