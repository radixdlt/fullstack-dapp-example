import type { QuestId } from 'content'
import type { LayoutServerLoad } from './$types'
import { questApi } from '$lib/api/quest-api'
import { error } from '@sveltejs/kit'
import { $Enums } from 'database'

export const load: LayoutServerLoad = ({ fetch, cookies, url, parent }) =>
  parent().then(async ({ questDefinitions, questStatus }) => {
    const id = url.pathname.split('/')[2] as QuestId

    const requirementsResult = await questApi
      .getQuestInformation(id, fetch)
      .map((data) => data.requirements)

    let requirements: Record<string, boolean> = {}

    if (requirementsResult.isOk()) {
      const updateResult = await questApi.startQuest(id, fetch)

      if (updateResult.isErr() && updateResult.error.reason === 'preRequisiteNotMet') {
        error(403, 'Pre-requisite not met')
      }

      requirements = requirementsResult.value
    } else {
      Object.keys(questDefinitions[id].requirements).forEach((key) => {
        const cachedRequirement = cookies.get(`requirement-${id}-${key}`) as boolean | undefined

        if (!requirements[key]) {
          requirements[key] = false
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
