import { questApi } from '$lib/api/quest-api'
import type { LayoutServerLoad } from './$types'
import { loadLandingPopup, loadQuests, type QuestId } from 'content'
import type { $Enums } from 'database'

export const load: LayoutServerLoad = async ({ fetch, cookies, url }) => {
  const questStatusResult = await questApi.getQuestsInformation(fetch)
  const questDefinitions = loadQuests('en')
  const landingPopupDefinitions = loadLandingPopup('en')
  const referredBy = url.searchParams.get('ref')

  if (referredBy) {
    cookies.set('referredBy', referredBy, {
      path: '/',
      expires: new Date('9999-12-31'),
      httpOnly: false
    })
  }

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

    Promise.all(
      ['requirement-WelcomeToRadQuest-RadQuestQuiz', 'requirement-WhatIsRadix-RadixQuiz'].map(
        (cookieName) => {
          if (cookies.get(cookieName)) {
            const [, questId, requirementId] = cookieName.split('-')
            return questApi.completeRequirement(questId as QuestId, requirementId, fetch)
          }

          return Promise.resolve()
        }
      )
    )
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
    questDefinitions,
    landingPopupDefinitions
  }
}
