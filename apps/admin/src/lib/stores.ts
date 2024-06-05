import { writable } from 'svelte/store'
import type { User } from 'database'
import { RadixDappToolkit } from 'common/rdt'

export const user = writable<User>()

export const rdt = writable<RadixDappToolkit>()
