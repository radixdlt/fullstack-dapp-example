import type { QuestStatus } from 'database'
import { type ControllerMethodContext } from '../_types'
import { AccountAddressModel, appLogger, UserModel, UserQuestModel } from 'common'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import { QuestDefinitions, type Quests } from 'content'
import { ResultAsync, errAsync, ok, okAsync } from 'neverthrow'
import { dbClient } from '$lib/db'
import { ErrorReason, createApiError } from '../../errors'
import type { QuestId } from 'content'
import { config } from '$lib/config'
import { RedisConnection } from 'bullmq'
import { config } from '$lib/config'

type GetAccountAddressModelFn = typeof getAccountAddressModelFn
const getAccountAddressModelFn = () => {
  let accountAddressModel: AccountAddressModel | undefined
  if (accountAddressModel) return accountAddressModel

  accountAddressModel = AccountAddressModel(new RedisConnection(config.redis), appLogger)

  return accountAddressModel
}

const UserQuestController = ({
  userQuestModel = UserQuestModel(dbClient),
  userModel = UserModel(dbClient),
  getAccountAddressModel = getAccountAddressModelFn
}: Partial<{
  userQuestModel: UserQuestModel
  userModel: UserModel
  getAccountAddressModel: GetAccountAddressModelFn
}>) => {
  const getQuestsProgress = (ctx: ControllerMethodContext, userId: string) =>
    userQuestModel(ctx.logger)
      .getQuestsStatus(userId)
      .map((output) => ({
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

  const saveProgress = (
    ctx: ControllerMethodContext,
    userId: string,
    questId: QuestId,
    progress: number
  ) => {
    const trackedAccountAddressQuestIds = ['StakingQuest']
    return ResultAsync.combine([
      userQuestModel(ctx.logger)
        .saveProgress(questId, userId, progress)
        .map(() => ({ httpResponseCode: 200, data: undefined })),
      progress === 1 && trackedAccountAddressQuestIds.some((id) => id === questId)
        ? userModel(ctx.logger)
            .getById(userId, {})
            .andThen(({ accountAddress }) => {
              if (!accountAddress)
                return errAsync(createApiError(ErrorReason.preRequisiteNotMet, 400))

              return getAccountAddressModel().addTrackedAddress(accountAddress, questId, userId)
            })
        : okAsync('')
    ]).map((output) => ({
      data: output,
      httpResponseCode: 200
    }))
  }

  const getSavedProgress = (ctx: ControllerMethodContext, userId: string) =>
    userQuestModel(ctx.logger)
      .getSavedProgress(userId)
      .map((output) => ({
        data: output,
        httpResponseCode: 200
      }))

  const deleteSavedProgress = (ctx: ControllerMethodContext, userId: string) =>
    userQuestModel(ctx.logger)
      .deleteSavedProgress(userId)
      .map(() => ({ httpResponseCode: 200, data: undefined }))

  const completeQuest = (ctx: ControllerMethodContext, userId: string, questId: QuestId) =>
    userQuestModel(ctx.logger)
      .findCompletedRequirements(userId, questId)
      .andThen((completedRequirements) => {
        const questDefinition = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))[questId]
        if (completedRequirements.length !== Object.keys(questDefinition.requirements).length) {
          return errAsync(createApiError(ErrorReason.requirementsNotMet, 400)())
        }

        return userQuestModel(ctx.logger).updateQuestStatus(questId, userId, 'COMPLETED')
      })
      .map(() => ({ httpResponseCode: 200, data: undefined }))

  const setQuestProgress = (
    ctx: ControllerMethodContext,
    userId: string,
    questId: keyof Quests
  ) => {
    const questDefinition = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))[questId]

    const preRequisites = questDefinition.preRequisites

    const questStatusResult = userQuestModel(ctx.logger)
      .getQuestStatus(userId, questId)
      .andThen((questStatus) => {
        if (questStatus?.status === 'COMPLETED') {
          return errAsync(createApiError(ErrorReason.questAlreadyCompleted, 400)())
        }
        return okAsync(questStatus)
      })

    return questStatusResult.andThen(() =>
      userQuestModel(ctx.logger)
        .findPrerequisites(userId, preRequisites as unknown as string[])
        .andThen((completedPrerequisites) => {
          if (
            completedPrerequisites.length !== preRequisites.length &&
            config.dapp.networkId === 1
          ) {
            return errAsync(createApiError(ErrorReason.preRequisiteNotMet, 400)())
          }

          return userQuestModel(ctx.logger).updateQuestStatus(questId, userId, 'IN_PROGRESS')
        })
        .map(() => ({ httpResponseCode: 200, data: undefined }))
    )
  }

  const getQuestProgress = (ctx: ControllerMethodContext, userId: string, questId: keyof Quests) =>
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
          status:
            questStatus?.status ||
            ('NOT_STARTED' as NonNullable<typeof questStatus>['status'] | 'NOT_STARTED'),
          requirements
        },
        httpResponseCode: 200
      }
    })

  const completeContentRequirement = (
    ctx: ControllerMethodContext,
    questId: QuestId,
    userId: string
  ) => {
    const questDefinition = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))[questId]

    const requirementId = Object.keys(questDefinition.requirements).find(
      // @ts-ignore
      (req) => questDefinition.requirements[req].type === 'content'
    )

    if (!requirementId) {
      return errAsync(createApiError(ErrorReason.invalidRequirement, 400)())
    }

    const questStatus = userQuestModel(ctx.logger)
      .getQuestStatus(userId, questId)
      .andThen((questStatus) => {
        if (questStatus?.status === 'COMPLETED') {
          return errAsync(createApiError(ErrorReason.questAlreadyCompleted, 400)())
        }
        return okAsync(questStatus)
      })

    return questStatus.andThen(() =>
      userQuestModel(ctx.logger)
        .addCompletedRequirement(questId, userId, requirementId)
        .map(() => ({ httpResponseCode: 200, data: undefined }))
    )
  }

  return {
    getQuestsProgress,
    completeQuest,
    setQuestProgress,
    getQuestProgress,
    saveProgress,
    getSavedProgress,
    deleteSavedProgress,
    completeContentRequirement
  }
}

export const userQuestController = UserQuestController({})
