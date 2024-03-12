import { WebSocketClient } from './lib/websocket-client'
import type { LoadedQuest } from 'content'
import { writable } from 'svelte/store'
import type { User } from 'database'

export const quests = writable<LoadedQuest[]>([])

export const user = writable<User | undefined>(undefined)

export const webSocketClient = writable<WebSocketClient | undefined>(undefined)
