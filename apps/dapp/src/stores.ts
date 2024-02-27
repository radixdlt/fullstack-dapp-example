import type { LoadedQuest } from 'content'
import { writable } from 'svelte/store'

export const quests = writable<LoadedQuest[]>([])
