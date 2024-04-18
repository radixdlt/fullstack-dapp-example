import { writable } from 'svelte/store'
import type { User } from 'database'
import { WebSocketClient } from './lib/websocket-client'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import type { QuestStatus } from './types'
import { loadQuests, type QuestId, type Quests, type Requirement } from 'content'

export const quests = writable<Quests>(loadQuests('en', parseInt(PUBLIC_NETWORK_ID)))

export const user = writable<(User & { label: string }) | undefined>(undefined)

export const webSocketClient = writable<WebSocketClient | undefined>(undefined)

export const questStatus = writable<Record<QuestId, QuestStatus>>(
  {} as Record<QuestId, QuestStatus>
)

export type StoredRequirements = {
  id: string
  complete: boolean
  text: string
  type: Requirement['type']
}

export const questRequirements = writable<Record<QuestId, StoredRequirements[]>>(
  {} as Record<QuestId, StoredRequirements[]>
)

type JettyMessage = 'LoggedIn'

export const jettyMessage = writable<JettyMessage | undefined>(undefined)
