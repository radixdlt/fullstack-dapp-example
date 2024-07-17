import type { QuestId } from 'content'
import type { LayoutServerLoad } from './$types'
import { questApi } from '$lib/api/quest-api'
import { error, redirect } from '@sveltejs/kit'
import { $Enums } from 'database'
import { userApi } from '$lib/api/user-api'
import type { QuestRequirement } from '$lib/server/user-quest/controller'

export const load: LayoutServerLoad = ({ fetch, cookies, url, parent, locals }) =>
  parent().then(async ({ questDefinitions, questStatus }) => {
    const id = url.pathname.split('/')[4] as QuestId

    const requiresLogin = !['Welcome', 'WhatIsRadix', 'SetupWallet'].includes(id)

    if (requiresLogin) {
      const user = await userApi.me(fetch)
      if (user.isErr()) return redirect(301, '/home/basic')
    }

    const requirementsResult = await questApi
      .getQuestInformation(id, fetch)
      .map((data) => data.requirements)

    const failedToFetchRequirements = requirementsResult.isErr()

    const isInvalidRefreshToken =
      failedToFetchRequirements &&
      (requirementsResult.error.data as any).error === 'invalidRefreshToken'

    const hasCompletedFirstQuests =
      [
        questDefinitions['Welcome'].id,
        questDefinitions['WhatIsRadix'].id,
        questDefinitions['SetupWallet'].id
        // @ts-ignore
      ].includes(id) &&
      questDefinitions[id].preRequisites.every(
        (preReq) => questStatus[preReq]?.status === 'COMPLETED'
      )

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
    } else if (failedToFetchRequirements && isInvalidRefreshToken && hasCompletedFirstQuests) {
      Object.entries(questDefinitions[id].requirements).forEach(([key, requirement]) => {
        const cachedRequirement = cookies.get(`requirement-${id}-${key}`) as boolean | undefined

        if (!requirements[key]) {
          requirements[key] = {
            isComplete: false,
            isHidden: requirement.isHidden
          }
        }

        if (cachedRequirement) {
          requirements[key] = {
            isComplete: cachedRequirement ?? false,
            isHidden: requirements[key].isHidden
          }
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

    locals.context.logger.info({ questId: id, requirements })

    return {
      id,
      requirements,
      text: questDefinitions[id].text,
      rewards: questDefinitions[id].rewards
    }
  })
