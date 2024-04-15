import { QuestDefinitions, type QuestId } from 'content'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import type { QuestStatus } from '../../types'
import { questStatus } from '../../stores'
import { questApi } from '../api/quest-api'
import { okAsync } from 'neverthrow'

type LocalStorageEntry<K, V> = {
  key: K
  value: V
}

export const useLocalStorage = <
  T extends
    | LocalStorageEntry<`quest-status-${QuestId}`, 'in-progress' | 'completed'>
    | LocalStorageEntry<'savedProgress', { questId: QuestId; progress: number }>
    | LocalStorageEntry<'seen-landing-popup', boolean>
    | LocalStorageEntry<
        'requirements',
        Record<
          Extract<QuestId, 'WelcomeToRadQuest' | 'WhatIsRadix' | 'GetRadixWallet'>,
          Record<string, boolean>
        >
      >,
  V extends T['key']
>(
  item: V
) => ({
  set: (value: Extract<T, { key: V }>['value']) =>
    localStorage.setItem(item, JSON.stringify(value)),
  get: () => {
    if (!item) return undefined
    const loadedValue = localStorage.getItem(item)
    return loadedValue ? (JSON.parse(loadedValue) as Extract<T, { key: V }>['value']) : undefined
  },
  clear: () => localStorage.removeItem(item)
})

export const loadQuestStatusFromLocalStorage = () => {
  const questDefinitions = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))

  const savedStatus: { [key in QuestId]?: 'completed' | 'in-progress' | undefined } = {}

  for (const questId of Object.keys(questDefinitions)) {
    savedStatus[questId as QuestId] = useLocalStorage(`quest-status-${questId as QuestId}`).get()
  }

  return Object.entries(questDefinitions).reduce(
    (acc, curr) => {
      let status: QuestStatus
      const saved = savedStatus[curr[0] as QuestId]

      if (saved) {
        status = saved
      } else {
        status =
          curr[1].preRequisites.length === 0 ||
          curr[1].preRequisites.every(
            (pre) => savedStatus[pre] === 'completed' || savedStatus[pre] === 'in-progress'
          )
            ? 'unlocked'
            : 'locked'
      }

      return {
        ...acc,
        [curr[0]]: status
      }
    },
    {} as Record<QuestId, QuestStatus>
  )
}

export const clearQuestStatusFromLocalStorage = () => {
  const questDefinitions = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))

  for (const questId of Object.keys(questDefinitions)) {
    useLocalStorage(`quest-status-${questId as QuestId}`).clear()
  }
}

export const completeQuest = (id: QuestId, updateDb: boolean) => {
  useLocalStorage(`quest-status-${id}`).set('completed')

  questStatus.set(loadQuestStatusFromLocalStorage())

  if (updateDb) {
    return questApi.completeQuest(id)
  } else {
    return okAsync(undefined)
  }
}
