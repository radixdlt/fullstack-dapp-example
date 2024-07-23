import type { QuestStatus } from 'database'
import { type ControllerDependencies, type ControllerMethodContext } from '../_types'
import { QuestDefinitions, type Quests } from 'content'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import { ErrorReason, createApiError } from '../../errors'
import type { QuestId, Requirement } from 'content'
import { config } from '$lib/config'
import { hasAnyRewards } from '../helpers/has-any-rewards'
export type QuestRequirement = { isHidden: boolean; isComplete: boolean }

export type UserQuestController = ReturnType<typeof UserQuestController>
export const UserQuestController = ({
  userQuestModel,
  userModel,
  accountAddressModel,
  transactionModel,
  logger
}: ControllerDependencies) => {
  const hasAllRequirementsCompleted = (questId: keyof Quests, userId: string) => {
    const questDefinition = QuestDefinitions()[questId]
    const requirements = Object.keys(questDefinition.requirements)
    return userQuestModel
      .findCompletedRequirements(userId, questId)
      .map((completedRequirements) => ({
        isAllCompleted: completedRequirements.length === requirements.length,
        completedRequirements
      }))
  }

  const handleAllRequirementsCompleted = ({
    userId,
    questId,
    traceId
  }: {
    userId: string
    questId: keyof Quests
    traceId: string
  }) => {
    return hasAllRequirementsCompleted(questId, userId).andThen(({ isAllCompleted }) =>
      isAllCompleted && hasAnyRewards(questId)
        ? transactionModel.add({
            userId,
            discriminator: `${questId}:DepositReward:${userId}`,
            type: 'DepositReward',
            traceId: traceId,
            questId
          })
        : okAsync(undefined)
    )
  }

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

  const saveProgress = (userId: string, questId: QuestId, progress: number) => {
    logger.debug({ method: 'saveProgress', userId, questId, progress })
    return userQuestModel
      .saveProgress(questId, userId, progress)
      .map((data) => ({ data, httpResponseCode: 200 }))
  }

  const getSavedProgress = (userId: string) =>
    userQuestModel.getSavedProgress(userId).map((output) => ({
      data: output,
      httpResponseCode: 200
    }))

  const deleteSavedProgress = (userId: string) =>
    userQuestModel
      .deleteSavedProgress(userId)
      .map(() => ({ httpResponseCode: 200, data: undefined }))

  const completeQuest = (userId: string, questId: QuestId, traceId: string) =>
    userQuestModel
      .findCompletedRequirements(userId, questId)
      .andThen((completedRequirements) => {
        const questDefinition = QuestDefinitions()[questId]
        if (completedRequirements.length !== Object.keys(questDefinition.requirements).length) {
          return errAsync(createApiError(ErrorReason.requirementsNotMet, 400)())
        }

        return userQuestModel.updateQuestStatus(questId, userId, 'COMPLETED')
      })
      .andThen(() => {
        if (['Welcome', 'WhatIsRadix', 'SetupWallet'].includes(questId)) {
          return okAsync(undefined)
        }
        return transactionModel.add({
          userId,
          discriminator: `${questId}:QuestCompleted:${userId}`,
          type: 'QuestCompleted',
          questId,
          traceId
        })
      })
      .map(() => ({ httpResponseCode: 200, data: undefined }))

  const startQuest = (userId: string, questId: keyof Quests) => {
    logger.debug({ method: 'startQuest', userId, questId })
    const questDefinition = QuestDefinitions()[questId]

    const preRequisites = questDefinition.preRequisites

    const questStatusResult = userQuestModel
      .getQuestStatus(userId, questId)
      .andThen((questStatus) => {
        if (questStatus?.status === 'COMPLETED') {
          return errAsync(createApiError(ErrorReason.questAlreadyCompleted, 400)())
        }
        const shouldTrackAccountAddress = !questStatus && questDefinition.trackedAccountAddress
        return okAsync(shouldTrackAccountAddress)
      })
      .andThen((shouldTrackAccountAddress) =>
        shouldTrackAccountAddress
          ? userModel
              .getById(userId, {})
              .andThen((user) =>
                accountAddressModel.addTrackedAddress(user.accountAddress!, questId, userId)
              )
          : okAsync(undefined)
      )

    return questStatusResult.andThen(() => {
      return userQuestModel
        .findPrerequisites(userId, preRequisites as unknown as string[])
        .andThen((completedPrerequisites) => {
          if (
            completedPrerequisites.length !== preRequisites.length &&
            config.dapp.networkId === 1
          ) {
            return errAsync(createApiError(ErrorReason.preRequisiteNotMet, 400)())
          }
          return userQuestModel.updateQuestStatus(questId, userId, 'IN_PROGRESS')
        })
        .map(() => ({ httpResponseCode: 200, data: undefined }))
    })
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
      .andThen(() => handleAllRequirementsCompleted({ userId, questId, traceId: ctx.traceId }))
      .map(() => ({ httpResponseCode: 200, data: undefined }))
  }

  const completeContentRequirement = (
    ctx: ControllerMethodContext,
    questId: QuestId,
    userId: string
  ) => {
    const questDefinition = QuestDefinitions()[questId]

    const requirementId = Object.keys(questDefinition.requirements).find(
      // @ts-ignore
      (req) => questDefinition.requirements[req].type === 'content'
    )

    if (!requirementId) {
      return okAsync({ httpResponseCode: 200, data: undefined })
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
        .andThen(() => handleAllRequirementsCompleted({ userId, questId, traceId: ctx.traceId }))
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
