import { questApi } from '$lib/api/quest-api'
import { userApi } from '$lib/api/user-api'
import { ResultAsync, okAsync } from 'neverthrow'
import type { LayoutServerLoad } from './$types'
import { loadLandingPopup, loadQuests, type QuestId } from 'content'
import type { $Enums } from 'database'
import { CookieKeys, encodeBase64 } from 'common'
import { error, type Cookies } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ fetch, cookies, url, locals }) => {
  if (locals.maintenanceMode) return error(503, 'Site unavailable')
  const questStatusResult = await questApi.getQuestsInformation(fetch)
  const user = await userApi.me(fetch).unwrapOr(null)
  // @ts-ignore
  const questDefinitions = loadQuests('en')
  const landingPopupDefinitions = loadLandingPopup('en')
  const referredBy = url.searchParams.get('ref')
  const dappReferrer = url.searchParams.get('dapp_referrer')

  if (referredBy) {
    cookies.set('referredBy', referredBy, {
      path: '/',
      expires: new Date('9999-12-31'),
      httpOnly: false
    })
  }

  if (dappReferrer) {
    cookies.set('dapp_referrer', dappReferrer, {
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

    for (const questId of ['SetupWallet'] as const) {
      const questStatusCookieValue = cookies.get(`quest-status-${questId}`) ?? ''

      const syncQuestStatusCookieValueWithDb =
        questStatusCookieValue === 'COMPLETED' && questStatus[questId]?.status !== 'COMPLETED'

      const missingQuestStatusInDb = !questStatus[questId]?.status

      if (syncQuestStatusCookieValueWithDb) {
        const userId = user?.id!
        const completeQuestResult = await ResultAsync.fromPromise(
          locals.dependencies.dbClient.questProgress.upsert({
            where: { questId_userId: { userId: userId, questId } },
            create: { userId: userId, questId, status: 'COMPLETED' },
            update: { userId: userId, questId, status: 'COMPLETED' }
          }),
          (error) => error
        )

        if (completeQuestResult.isErr()) {
          locals.context.logger.error({
            error: completeQuestResult.error,
            method: 'layout.server.completeQuest'
          })
          return error(500, 'Failed to complete quest')
        }

        questStatus[questId] = {
          savedProgress: questStatus[questId]?.savedProgress ?? 0,
          status: 'COMPLETED'
        }
      } else if (
        ['COMPLETED', 'IN_PROGRESS'].includes(questStatusCookieValue) &&
        missingQuestStatusInDb
      ) {
        const startQuestResult = await questApi.startQuest(questId, fetch)

        if (startQuestResult.isErr()) {
          locals.context.logger.error({ startQuestResult, method: 'layout.server.startQuest' })
          error(500, 'Failed to start quest')
        }

        questStatus[questId] = {
          savedProgress: 0,
          status: 'IN_PROGRESS'
        }
      }
    }

    await ResultAsync.combine(
      ['requirement-Welcome-RadQuestQuiz', 'requirement-WhatIsRadix-RadixQuiz'].map(
        (cookieName) => {
          if (cookies.get(cookieName)) {
            const [, questId, requirementId] = cookieName.split('-')
            return questApi.completeRequirement(questId as QuestId, requirementId, fetch)
          }
          return okAsync(undefined)
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

  locals.context.logger.trace({
    questStatus
  })

  return {
    questStatus,
    questDefinitions,
    landingPopupDefinitions
  }
}
