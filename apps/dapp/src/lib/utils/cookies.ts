import { PUBLIC_NETWORK_ID } from '$env/static/public'
import type { QuestId } from 'content'
import { QuestDefinitions } from 'content'
import type { $Enums } from 'database'

type CookieEntry<K, V> = {
  key: K
  value: V
}

type PreLoggedInQuests = Extract<
  QuestId,
  'WelcomeToRadQuest' | 'WhatIsRadix' | 'GetRadixWallet' | 'LoginWithWallet'
>

export const useCookies = <
  T extends
    | CookieEntry<`quest-status-${QuestId}`, $Enums.QuestStatus>
    | CookieEntry<`requirement-${PreLoggedInQuests}-${string}`, boolean>
    | CookieEntry<`saved-progress-${PreLoggedInQuests}`, number>,
  V extends T['key']
>(
  item: V
) => ({
  set: (value: Extract<T, { key: V }>['value']) => {
    document.cookie = `${item}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
  },
  get: () => {
    const cookie = document.cookie.split(';').find((cookie) => cookie.includes(item))
    return cookie ? cookie.split('=')[1] : undefined
  },
  clear: () => (document.cookie = `${item}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`)
})

export const clearQuestStatusFromCookies = () => {
  const questDefinitions = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))

  for (const questId of Object.keys(questDefinitions)) {
    useCookies(`quest-status-${questId as QuestId}`).clear()
  }
}
