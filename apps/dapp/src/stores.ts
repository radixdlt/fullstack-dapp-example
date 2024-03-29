import { writable } from 'svelte/store'
import type { User } from 'database'
import { WebSocketClient } from './lib/websocket-client'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import type { QuestStatus } from './types'
import { loadQuests, type QuestId, type Quests } from 'content'

export const quests = writable<Quests>(loadQuests('en', parseInt(PUBLIC_NETWORK_ID)))

export const user = writable<User | undefined>(undefined)

export const webSocketClient = writable<WebSocketClient | undefined>(undefined)

export const questStatus = writable<Record<QuestId, QuestStatus>>(
  {} as Record<QuestId, QuestStatus>
)
