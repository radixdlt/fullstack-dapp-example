import type { QuestId } from 'content'
import type { LayoutServerLoad } from './$types'
import { questApi } from '$lib/api/quest-api'
import { error } from '@sveltejs/kit'
import { $Enums } from 'database'
import type { QuestRequirement } from '$lib/server/user-quest/controller'

export const load: LayoutServerLoad = ({ fetch, cookies, url, parent }) =>
  parent().then(async ({ questDefinitions, questStatus }) => {
    const id = url.pathname.split('/')[4] as QuestId

    const requirementsResult = await questApi
      .getQuestInformation(id, fetch)
      .map((data) => data.requirements)

    let requirements: Record<string, QuestRequirement> = {}

    if (requirementsResult.isOk()) {
      if (!questStatus[id]?.status) {
        const updateResult = await questApi.startQuest(id, fetch)

        if (updateResult.isErr()) {
          if (updateResult.error.reason === 'preRequisiteNotMet')
            error(403, 'Pre-requisite not met for this quest')
          else error(500, 'Failed to start quest')
        }
      }

      requirements = requirementsResult.value
    } else if (
      (requirementsResult.error.data as any).error === 'invalidRefreshToken' &&
      [
        questDefinitions['WelcomeToRadQuest'].id,
        questDefinitions['WhatIsRadix'].id,
        questDefinitions['GetRadixWallet'].id,
        questDefinitions['LoginWithWallet'].id
        // @ts-ignore
      ].includes(id) &&
      questDefinitions[id].preRequisites.every(
        (preReq) => questStatus[preReq]?.status === 'COMPLETED'
      )
    ) {
      Object.entries(questDefinitions[id].requirements).forEach(([key, requirement]) => {
        const cachedRequirement = cookies.get(`requirement-${id}-${key}`) as
          | QuestRequirement
          | undefined

        if (!requirements[key]) {
          requirements[key] = {
            isComplete: false,
            isHidden: requirement.isHidden
          }
        }

        if (cachedRequirement) {
          requirements[key] = cachedRequirement
        }
      })

      const cachedStatus = cookies.get(`quest-status-${id}`) as $Enums.QuestStatus | undefined

      if (!cachedStatus)
        cookies.set(`quest-status-${id}`, $Enums.QuestStatus['IN_PROGRESS'], {
          path: '/',
          expires: new Date('9999-12-31'),
          httpOnly: false
        })
    } else {
      error(500, 'Failed to start quest')
    }

    if (questStatus[id]?.status === 'COMPLETED')
      cookies.delete(`saved-progress-${id}`, { path: '/' })

    return {
      id,
      requirements,
      text: questDefinitions[id].text,
      rewards: questDefinitions[id].rewards
    }
  })
