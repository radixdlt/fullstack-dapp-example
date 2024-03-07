import type { QuestStatus } from 'database'
import {
  createApiError,
  type ControllerMethodContext,
  type ControllerMethodOutput
} from '../_types'
import { UserQuestModel } from 'common'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import { QuestDefinitions } from 'content'
import { ResultAsync, errAsync } from 'neverthrow'
import { dbClient } from '$lib/db'

const UserQuestController = ({
  userQuestModel = UserQuestModel(dbClient)
}: Partial<{
  userQuestModel: UserQuestModel
}>) => {
  const getQuestsProgress = (
    ctx: ControllerMethodContext,
    userId: string
  ): ControllerMethodOutput<Record<string, { progress: number; status: string }>> =>
    userQuestModel(ctx.logger)
      .getQuestsStatus(userId)
      .map((output) => ({
        data: output.reduce<Record<string, { progress: number; status: QuestStatus }>>(
          (acc, curr) => ({
            ...acc,
            [curr.questId]: {
              progress: curr.progress,
              status: curr.status
            }
          }),
          {}
        ),
        httpResponseCode: 200
      }))

  const completeQuest = (
    ctx: ControllerMethodContext,
    userId: string,
    questId: string
  ): ControllerMethodOutput<void> =>
    userQuestModel(ctx.logger)
      .findCompletedRequirements(userId, questId)
      .andThen((completedRequirements) => {
        const questDefinition = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))[questId]
        if (completedRequirements.length !== Object.keys(questDefinition.requirements).length) {
          return errAsync(createApiError('Requirements not met', 400)())
        }

        return userQuestModel(ctx.logger).updateQuestStatus(questId, userId, 'COMPLETED')
      })
      .map(() => ({ httpResponseCode: 200, data: undefined }))

  const setQuestProgress = (
    ctx: ControllerMethodContext,
    userId: string,
    questId: string,
    progress: number
  ) => {
    const questDefinition = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))[questId]

    if (progress > questDefinition.i18n.en.pages.length) {
      return errAsync(createApiError('Invalid progress', 400)())
    }

    const preRequisites = questDefinition.preRequisites as string[]

    return userQuestModel(ctx.logger)
      .findPrerequisites(userId, preRequisites)
      .andThen((completedPrerequisites) => {
        if (completedPrerequisites.length !== preRequisites.length) {
          return errAsync(createApiError('Pre-requisites not met', 400)())
        }

        return userQuestModel(ctx.logger).updateQuestStatus(questId, userId, 'IN_PROGRESS', 0)
      })
      .map(() => ({ httpResponseCode: 200, data: undefined }))
  }

  const getQuestProgress = (ctx: ControllerMethodContext, userId: string, questId: string) =>
    ResultAsync.combine([
      userQuestModel(ctx.logger).getQuestStatus(userId, questId),
      userQuestModel(ctx.logger).findCompletedRequirements(userId, questId)
    ]).map(([questStatus, completedRequirements]) => {
      const questDefinition = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))[questId]
      const requirementsState = completedRequirements.reduce(
        (acc, requirement) => {
          acc[requirement.requirementId] = true
          return acc
        },
        {} as Record<string, boolean>
      )

      const requirements = Object.keys(questDefinition.requirements).reduce(
        (acc, eventId) => {
          acc[eventId] = requirementsState[eventId] || false
          return acc
        },
        {} as Record<string, boolean>
      )

      return {
        data: {
          status: questStatus?.status || 'NOT_STARTED',
          requirements
        },
        httpResponseCode: 200
      }
    })

  return { getQuestsProgress, completeQuest, setQuestProgress, getQuestProgress }
}

export const userQuestController = UserQuestController({})
