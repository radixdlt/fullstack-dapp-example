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

  const getQuestsWithTrackedAccounts = (limit: number, offset: number) =>
    ResultAsync.fromPromise<{ accountAddress: string; questId: string; id: string }[], ApiError>(
      db.$queryRaw`
        SELECT u."accountAddress", qp."questId", u."id"
          FROM "User" u
          JOIN "QuestProgress" qp ON u."id" = qp."userId"
          LEFT JOIN "CompletedQuestRequirement" cqr1 ON u."id" = cqr1."userId" AND cqr1."requirementId" = 'JettyReceivedClams'
          LEFT JOIN "CompletedQuestRequirement" cqr2 ON u."id" = cqr2."userId" AND cqr2."requirementId" = 'InstapassBadgeDeposited'
          LEFT JOIN "CompletedQuestRequirement" cqr3 ON u."id" = cqr3."userId" AND cqr3."requirementId" = 'XrdStaked'
          LEFT JOIN "CompletedQuestRequirement" cqr4 ON u."id" = cqr4."userId" AND cqr4."requirementId" = 'JettySwap'
          LEFT JOIN "CompletedQuestRequirement" cqr5 ON u."id" = cqr5."userId" AND cqr5."requirementId" = 'LettySwap'
          LEFT JOIN "CompletedQuestRequirement" cqr6 ON u."id" = cqr5."userId" AND cqr5."requirementId" = 'MayaRouterWithdrawEvent'
          WHERE 
              (qp."questId" = 'TransferTokens' AND qp."status" = 'IN_PROGRESS' AND cqr1."requirementId" IS NULL)
              OR
              (qp."questId" = 'Instapass' AND qp."status" = 'IN_PROGRESS' AND cqr2."requirementId" IS NULL)
              OR
              (qp."questId" = 'NetworkStaking' AND qp."status" = 'IN_PROGRESS' AND cqr3."requirementId" IS NULL)
              OR
              (qp."questId" = 'ThorSwap' AND qp."status" = 'IN_PROGRESS' AND cqr6."requirementId" IS NULL)
              OR
              (qp."questId" = 'DEXSwaps' AND qp."status" = 'IN_PROGRESS' AND (cqr4."requirementId" IS NULL OR cqr5."requirementId" IS NULL))
        LIMIT ${limit}
        OFFSET ${offset};`,
      (error) => {
        logger?.error({ error, method: 'getQuestsWithTrackedAccounts', model: 'UserQuestModel' })
        return createApiError('failed to getQuestsWithTrackedAccounts', 400)()
      }
    )

  const findPrerequisites = (userId: string, preRequisites: string[]) =>
    ResultAsync.fromPromise(
      db.questProgress.findMany({
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
    getQuestsWithTrackedAccounts,
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
