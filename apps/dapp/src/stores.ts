import { writable } from 'svelte/store'
import type { User } from 'database'
import { WebSocketClient } from './lib/websocket-client'
import { type Quests } from 'content'

export const quests = writable<Quests>()

export const user = writable<(User & { label: string }) | undefined>(undefined)

export const webSocketClient = writable<WebSocketClient | undefined>(undefined)

type JettyMessage = 'LoggedIn'

export const jettyMessage = writable<JettyMessage | undefined>(undefined)
