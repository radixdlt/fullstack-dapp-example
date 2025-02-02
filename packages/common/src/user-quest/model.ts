import { QuestStatus } from 'database'
import type { CompletedQuestRequirement, PrismaClient } from 'database'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import { type ApiError, createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers/logger'

export type UserQuestModel = ReturnType<typeof UserQuestModel>

export type UserQuestModelMethods = ReturnType<UserQuestModel>

export const UserQuestModel = (db: PrismaClient) => (logger: AppLogger) => {
  const addCompletedRequirement = (questId: string, userId: string, requirementId: string) =>
    ResultAsync.fromPromise(
      db.completedQuestRequirement.upsert({
        where: {
          questId_userId_requirementId: {
            userId,
            questId,
            requirementId
          }
        },
        create: {
          userId,
          questId,
          requirementId
        },
        update: {}
      }),
      (error) => {
        logger?.error({ error, method: 'addCompletedRequirement', model: 'UserQuestModel' })
        return createApiError('failed to create completed requirement', 400)()
      }
    )

  const getDepositedRewards = (userId: string, questId: string) => {
    return ResultAsync.fromPromise(
      db.event.findFirst({
        where: {
          questId,
          id: 'QuestRewardDeposited',
          userId
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getDepositedRewards', model: 'UserQuestModel' })
        return createApiError('failed to get deposited rewards', 400)()
      }
    ).map(
      (data) =>
        (data?.data as { rewards?: { amount: string; resourceAddress: string }[] })?.rewards || []
    )
  }

  const saveProgress = (questId: string, userId: string, progress: number) =>
    ResultAsync.fromPromise(
      db.savedProgress.upsert({
        where: {
          userId
        },
        create: {
          userId,
          questId,
          progress: 0
        },
        update: {
          progress
        }
      }),
      (error) => {
        logger?.error({ error, method: 'saveProgress', model: 'UserQuestModel' })
        return createApiError('failed to save quest progress', 400)()
      }
    )

  const getSavedProgress = (userId: string) =>
    ResultAsync.fromPromise(
      db.savedProgress.findFirst({
        where: {
          userId
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getSavedProgress', model: 'UserQuestModel' })
        return createApiError('failed to get saved progress', 400)()
      }
    )

  const deleteSavedProgress = (userId: string) =>
    ResultAsync.fromPromise(
      db.savedProgress.deleteMany({
        where: {
          userId
        }
      }),
      (error) => {
        logger?.error({ error, method: 'deleteSavedProgress', model: 'UserQuestModel' })
        return createApiError('failed to delete saved progress', 400)()
      }
    )

  const updateQuestStatus = (questId: string, userId: string, status: QuestStatus) => {
    const transitions = {
      IN_PROGRESS: ['REWARDS_DEPOSITED', 'COMPLETED', 'PARTIALLY_COMPLETED'],
      REWARDS_DEPOSITED: ['REWARDS_CLAIMED'],
      REWARDS_CLAIMED: ['COMPLETED'],
      COMPLETED: ['COMPLETED'],
      PARTIALLY_COMPLETED: ['IN_PROGRESS', 'REWARDS_DEPOSITED', 'PARTIALLY_COMPLETED']
    }

    return getQuestStatus(userId, questId)
      .andThen((data) => {
        const currentStatus = data?.status
        if (currentStatus && !transitions[currentStatus].includes(status)) {
          return errAsync(
            createApiError(`cannot update from '${currentStatus}' to '${status}'`, 400)()
          )
        }
        return okAsync(undefined)
      })
      .andThen(() =>
        ResultAsync.fromPromise(
          db.questProgress.upsert({
            where: {
              questId_userId: {
                userId,
                questId
              }
            },
            create: {
              userId,
              questId,
              status
            },
            update: {
              status
            }
          }),
          (error) => {
            logger?.error({ error, method: 'updateQuestStatus', model: 'UserQuestModel' })
            return createApiError('failed to update quest status', 400)(error)
          }
        )
      )
  }

  const findCompletedRequirements = (
    userId: string,
    questId: string
  ): ResultAsync<CompletedQuestRequirement[], ApiError> =>
    ResultAsync.fromPromise(
      (db as any).$primary().completedQuestRequirement.findMany({
        where: {
          userId,
          questId
        }
      }),
      (error) => {
        logger?.error({ error, method: 'findCompletedRequirements', model: 'UserQuestModel' })
        return createApiError('failed to find completed requirements', 400)()
      }
    )

  const getQuestsStatus = (userId: string) =>
    ResultAsync.fromPromise(
      db.questProgress.findMany({
        where: {
          userId
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getQuestsStatus', model: 'UserQuestModel' })
        return createApiError('failed to get quests status', 400)()
      }
    )

  const getQuestStatus = (userId: string, questId: string) =>
    ResultAsync.fromPromise(
      db.questProgress.findFirst({
        where: {
          userId,
          questId
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getQuestStatus', model: 'UserQuestModel' })
        return createApiError('failed to get quest status', 400)()
      }
    )

  const findPrerequisites = (userId: string, preRequisites: string[]) =>
    ResultAsync.fromPromise(
      ((db as any).$primary() as PrismaClient).questProgress.findMany({
        where: {
          userId,
          questId: { in: preRequisites },
          status: { not: 'IN_PROGRESS' }
        }
      }),
      (error) => {
        logger?.error({ error, method: 'findPrerequisites', model: 'UserQuestModel' })
        return createApiError('failed to get quest prerequisites', 400)()
      }
    )

  const setDownloadWalletRequirement = (userId: string) =>
    ResultAsync.fromPromise(
      db.completedQuestRequirement.upsert({
        where: {
          questId_userId_requirementId: {
            userId,
            questId: 'SetupWallet',
            requirementId: 'DownloadWallet'
          }
        },
        update: {},
        create: {
          userId,
          questId: 'SetupWallet',
          requirementId: 'DownloadWallet'
        }
      }),
      (error) => {
        logger?.error({
          error,
          method: 'updateDownloadWalletRequirement',
          model: 'UserQuestModel'
        })
        return createApiError('failed to update download wallet requirement', 400)()
      }
    )

  const setConnectWalletRequirement = (userId: string) =>
    ResultAsync.fromPromise(
      db.completedQuestRequirement.upsert({
        where: {
          questId_userId_requirementId: {
            userId,
            questId: 'SetupWallet',
            requirementId: 'ConnectWallet'
          }
        },
        update: {},
        create: {
          userId,
          questId: 'SetupWallet',
          requirementId: 'ConnectWallet'
        }
      }),
      (error) => {
        logger?.error({ error, method: 'updateConnectWalletRequirement', model: 'UserQuestModel' })
        return createApiError('failed to update connect wallet requirement', 400)()
      }
    )

  return {
    getQuestStatus,
    getQuestsStatus,
    updateQuestStatus,
    findPrerequisites,
    getDepositedRewards,
    setConnectWalletRequirement,
    setDownloadWalletRequirement,
    addCompletedRequirement,
    findCompletedRequirements,
    saveProgress,
    getSavedProgress,
    deleteSavedProgress
  }
}
