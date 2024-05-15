import { questApi } from '$lib/api/quest-api'
import type { LayoutServerLoad } from './$types'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import { loadQuests, type QuestId } from 'content'
import type { $Enums } from 'database'

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
  const questStatusResult = await questApi.getQuestsInformation(fetch)
  const questDefinitions = loadQuests('en')

  let questStatus = {} as Record<
    QuestId,
    {
      savedProgress: number
      status: $Enums.QuestStatus
    }
  >

  if (questStatusResult.isOk()) {
    questStatus = questStatusResult.value

    for (const questId of ['WelcomeToRadQuest', 'WhatIsRadix', 'GetRadixWallet'] as const) {
      if (
        cookies.get(`quest-status-${questId}`) === 'COMPLETED' &&
        questStatus[questId]?.status !== 'COMPLETED'
      ) {
        await questApi.completeContentRequirement(questId, fetch).mapErr(() => {})
        await questApi.completeQuest(questId, fetch).mapErr(() => {})
        questStatus[questId] = {
          savedProgress: questStatus[questId]?.savedProgress ?? 0,
          status: 'COMPLETED'
        }
      } else if (
        cookies.get(`quest-status-${questId}`) === 'COMPLETED' &&
        !questStatus[questId]?.status
      ) {
        await questApi.startQuest(questId, fetch)
        questStatus[questId] = {
          savedProgress: 0,
          status: 'IN_PROGRESS'
        }
      }
    }

    if (
      cookies.get('quest-status-LoginWithWallet') === 'IN_PROGRESS' &&
      questStatus['LoginWithWallet']?.status !== 'COMPLETED'
    ) {
      await questApi.startQuest('LoginWithWallet', fetch)
      questStatus['LoginWithWallet'] = {
        savedProgress: 0,
        status: 'IN_PROGRESS'
      }
    }
  } else {
    for (const quest of Object.values(questDefinitions)) {
      const cachedStatus = cookies.get(`quest-status-${quest.id}`) as $Enums.QuestStatus | undefined
      const cachedProgress = cookies.get(`saved-progress-${quest.id}`) as number | undefined

      if (cachedStatus) {
        questStatus[quest.id] = {
          savedProgress: cachedProgress || 0,
          status: cachedStatus
        }
      }
    }
  }

  return {
    questStatus,
    questDefinitions
  }
}
