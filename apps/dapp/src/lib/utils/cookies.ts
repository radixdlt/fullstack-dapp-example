import type { QuestId } from 'content'
import type { $Enums } from 'database'

type CookieEntry<K, V> = {
  key: K
  value: V
}

type PreLoggedInQuests = Extract<QuestId, 'Welcome' | 'WhatIsRadix' | 'SetupWallet'>

export type QuestStatusCookieKey = `quest-status-${QuestId}`

export type RequirementCookieKey = `requirement-${PreLoggedInQuests}-${string}`

export type SavedProgressCookieKey = `saved-progress-${QuestId}`

export type JwtCookieKey = string

export const useCookies = <
  T extends
    | CookieEntry<QuestStatusCookieKey, $Enums.QuestStatus>
    | CookieEntry<RequirementCookieKey, boolean>
    | CookieEntry<SavedProgressCookieKey, number>
    | CookieEntry<JwtCookieKey, string>
    | CookieEntry<'golden-ticket', string>,
  V extends T['key']
>(
  item: V
) => ({
  set: (value: Extract<T, { key: V }>['value']) => {
    document.cookie = `${item}=${value}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`
  },
  get: () => {
    const cookie = document.cookie.split(';').find((cookie) => cookie.includes(item))
    return cookie ? cookie.split('=')[1] : undefined
  },
  clear: () => (document.cookie = `${item}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`)
})
