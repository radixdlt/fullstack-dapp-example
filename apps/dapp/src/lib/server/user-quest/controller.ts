import type { QuestStatus } from 'database'
import { type ControllerDependencies, type ControllerMethodContext } from '../_types'
import { QuestDefinitions, type Quests } from 'content'
import { ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import { ErrorReason, createApiError } from '../../errors'
import type { QuestId, Requirement } from 'content'
import { config } from '$lib/config'
export type QuestRequirement = { isHidden: boolean; isComplete: boolean }

export const UserQuestController = ({
  userQuestModel,
  userModel,
  accountAddressModel
}: ControllerDependencies) => {
  const getQuestsProgress = (userId: string) =>
    userQuestModel.getQuestsStatus(userId).map((output) => ({
      data: output.reduce<Record<string, { status: QuestStatus }>>(
        (acc, curr) => ({
          ...acc,
          [curr.questId]: {
            status: curr.status
          }
        }),
        {}
      ),
      httpResponseCode: 200
    }))

  const saveProgress = (userId: string, questId: QuestId, progress: number) =>
    userQuestModel
      .saveProgress(questId, userId, progress)
      .map((data) => ({ data, httpResponseCode: 200 }))

  const getSavedProgress = (userId: string) =>
    userQuestModel.getSavedProgress(userId).map((output) => ({
      data: output,
      httpResponseCode: 200
    }))

  const deleteSavedProgress = (userId: string) =>
    userQuestModel
      .deleteSavedProgress(userId)
      .map(() => ({ httpResponseCode: 200, data: undefined }))

  const completeQuest = (userId: string, questId: QuestId) =>
    userQuestModel
      .findCompletedRequirements(userId, questId)
      .andThen((completedRequirements) => {
        const questDefinition = QuestDefinitions()[questId]
        if (completedRequirements.length !== Object.keys(questDefinition.requirements).length) {
          return errAsync(createApiError(ErrorReason.requirementsNotMet, 400)())
        }

        return userQuestModel.updateQuestStatus(questId, userId, 'COMPLETED')
      })
      .map(() => ({ httpResponseCode: 200, data: undefined }))

  const startQuest = (userId: string, questId: keyof Quests) => {
    const questDefinition = QuestDefinitions()[questId]

    const preRequisites = questDefinition.preRequisites

    const questStatusResult = userQuestModel
      .getQuestStatus(userId, questId)
      .andThen((questStatus) => {
        if (questStatus?.status === 'COMPLETED') {
          return errAsync(createApiError(ErrorReason.questAlreadyCompleted, 400)())
        }
        return okAsync(questStatus)
      })

    return questStatusResult.andThen((statusResult) =>
      userQuestModel
        .findPrerequisites(userId, preRequisites as unknown as string[])
        .andThen((completedPrerequisites) => {
          if (
            completedPrerequisites.length !== preRequisites.length &&
            config.dapp.networkId === 1
          ) {
            return errAsync(createApiError(ErrorReason.preRequisiteNotMet, 400)())
          }
          return okAsync(statusResult)
        })
        .andThen((statusResult) => {
          const shouldTrackAccountAddress =
            !statusResult && QuestDefinitions()[questId].trackedAccountAddress

          return shouldTrackAccountAddress
            ? userModel
                .getById(userId, {})
                .andThen((user) =>
                  user ? ok(user) : err(createApiError(ErrorReason.userNotFound, 404)())
                )
                .andThen(({ accountAddress }) => {
                  return accountAddressModel.addTrackedAddress(
                    accountAddress as string,
                    questId,
                    userId
                  )
                })
            : okAsync(undefined)
        })
        .andThen(() => {
          return userQuestModel.updateQuestStatus(questId, userId, 'IN_PROGRESS')
        })
        .map(() => ({ httpResponseCode: 200, data: undefined }))
    )
  }

  const getQuestRequirements = (userId: string, questId: keyof Quests) =>
    ResultAsync.combine([
      userQuestModel.getQuestStatus(userId, questId),
      userQuestModel.findCompletedRequirements(userId, questId)
    ]).map(([questStatus, completedRequirements]) => {
      const questDefinition = QuestDefinitions()[questId]
      const requirementsState = completedRequirements.reduce(
        (acc, requirement) => {
          acc[requirement.requirementId] = { isComplete: true }
          return acc
        },
        {} as Record<string, Omit<QuestRequirement, 'isHidden'>>
      )

      const requirements = Object.keys(questDefinition.requirements).reduce(
        (acc, eventId) => {
          const requirement = questDefinition.requirements[
            eventId as keyof typeof questDefinition.requirements
          ] as Requirement
          acc[eventId] = {
            isComplete: requirementsState[eventId]?.isComplete || false,
            isHidden: requirement.isHidden || false
          }
          return acc
        },
        {} as Record<string, QuestRequirement>
      )

      return {
        data: {
          status:
            questStatus?.status ||
            ('NOT_STARTED' as NonNullable<typeof questStatus>['status'] | 'NOT_STARTED'),
          requirements
        },
        httpResponseCode: 200
      }
    })

  const completeRequirement = (
    ctx: ControllerMethodContext,
    questId: QuestId,
    requirementId: string,
    userId: string
  ) => {
    ctx.logger.debug({
      method: 'completeRequirement',
      questId,
      requirementId,
      userId
    })

    const questDefinition = QuestDefinitions()[questId]

    const requirement = (questDefinition.requirements as Record<string, Requirement>)[requirementId]

    if (!requirement || requirement.type !== 'offLedger' || !requirement.completedByUser) {
      return errAsync(createApiError(ErrorReason.invalidRequirement, 400)())
    }

    return userQuestModel
      .addCompletedRequirement(questId, userId, requirementId)
      .map(() => ({ httpResponseCode: 200, data: undefined }))
  }

  const completeContentRequirement = (questId: QuestId, userId: string) => {
    const questDefinition = QuestDefinitions()[questId]

    const requirementId = Object.keys(questDefinition.requirements).find(
      // @ts-ignore
      (req) => questDefinition.requirements[req].type === 'content'
    )

    if (!requirementId) {
      return errAsync(createApiError(ErrorReason.invalidRequirement, 400)())
    }

    const questStatus = userQuestModel.getQuestStatus(userId, questId).andThen((questStatus) => {
      if (questStatus?.status === 'COMPLETED') {
        return errAsync(createApiError(ErrorReason.questAlreadyCompleted, 400)())
      }
      return okAsync(questStatus)
    })

    return questStatus.andThen(() =>
      userQuestModel
        .addCompletedRequirement(questId, userId, requirementId)
        .map(() => ({ httpResponseCode: 200, data: undefined }))
    )
  }

  return {
    getQuestsProgress,
    completeQuest,
    startQuest,
    getQuestRequirements,
    saveProgress,
    getSavedProgress,
    deleteSavedProgress,
    completeRequirement,
    completeContentRequirement
  }
}
