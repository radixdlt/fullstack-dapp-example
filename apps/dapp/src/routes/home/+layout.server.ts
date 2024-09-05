import { questApi } from '$lib/api/quest-api'
import { userApi } from '$lib/api/user-api'
import { ResultAsync, okAsync } from 'neverthrow'
import type { LayoutServerLoad } from './$types'
import { loadLandingPopup, loadQuests, type QuestId } from 'content'
import type { $Enums } from 'database'
import { CookieKeys, encodeBase64, utmKeys, type MarketingUtmValues } from 'common'
import { error, type Cookies } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ fetch, cookies, url, locals }) => {
  if (locals.maintenanceMode) return error(503, 'Site unavailable')
  const questStatusResult = await questApi.getQuestsInformation(fetch)
  const user = await userApi.me(fetch).unwrapOr(null)
  // @ts-ignore
  const questDefinitions = loadQuests('en', user?.goldenTicketClaimed?.type)
  const landingPopupDefinitions = loadLandingPopup('en')
  const referredBy = url.searchParams.get('ref')
  const dappReferrer = url.searchParams.get('dapp_referrer')

  const storeUtmValues = (searchParams: URLSearchParams, cookie: Cookies) => {
    const referredBy = searchParams.get('ref')

    const searchParamsFormatted = new URLSearchParams(url.search.toLowerCase())

    const utmValues: MarketingUtmValues = Object.fromEntries(
      utmKeys.map((key) => [key, searchParamsFormatted.get(key)]).filter(([, value]) => value)
    )

    if (referredBy) {
      utmValues.utm_medium = 'Referral'
      utmValues.utm_source = referredBy
    }

    if (Object.keys(utmValues).length) {
      encodeBase64(JSON.stringify(utmValues)).map((base64Encoded) => {
        cookie.set(CookieKeys.Utm, base64Encoded, {
          path: '/',
          expires: new Date('9999-12-31'),
          httpOnly: false
        })
        locals.context.logger.trace({ utmValues, base64Encoded, method: 'storeUtmValues' })
      })
    }
  }

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

    for (const questId of ['Welcome', 'WhatIsRadix', 'SetupWallet'] as const) {
      const questStatusCookieValue = cookies.get(`quest-status-${questId}`) ?? ''

      const syncQuestStatusCookieValueWithDb =
        questStatusCookieValue === 'COMPLETED' && questStatus[questId]?.status !== 'COMPLETED'

      const missingQuestStatusInDb = !questStatus[questId]?.status

      if (syncQuestStatusCookieValueWithDb) {
        await questApi.completeContentRequirement(questId, fetch)
        await questApi.completeQuest(questId, fetch)
        questStatus[questId] = {
          savedProgress: questStatus[questId]?.savedProgress ?? 0,
          status: 'COMPLETED'
        }
      } else if (
        ['COMPLETED', 'IN_PROGRESS'].includes(questStatusCookieValue) &&
        missingQuestStatusInDb
      ) {
        await questApi.startQuest(questId, fetch)
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
    storeUtmValues(url.searchParams, cookies)
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
