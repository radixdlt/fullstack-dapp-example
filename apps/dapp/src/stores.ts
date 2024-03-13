import { writable } from 'svelte/store'
import type { User } from 'database'
import { loadQuests, type Quests } from 'content'
import { WebSocketClient } from './lib/websocket-client'
import { PUBLIC_NETWORK_ID } from '$env/static/public'

export const quests = writable<Quests>(loadQuests('en', parseInt(PUBLIC_NETWORK_ID)))

export const user = writable<User | undefined>(undefined)

export const webSocketClient = writable<WebSocketClient | undefined>(undefined)
