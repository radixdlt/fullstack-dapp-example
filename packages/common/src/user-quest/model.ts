import { QuestStatus } from 'database'
import type { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import { AppLogger } from '../helpers/logger'

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

  const addVerifiedPhoneNumber = (userId: string, phoneNumber: string) =>
    ResultAsync.fromPromise(
      db.$transaction([
        db.userPhoneNumber.create({
          data: {
            userId: userId,
            phoneNumber: phoneNumber
          }
        }),
        db.completedQuestRequirement.create({
          data: {
            userId: userId,
            questId: 'FirstTransactionQuest',
            requirementId: 'VerifyPhoneNumber'
          }
        })
      ]),
      (error) => {
        logger?.error({ error, method: 'addVerifiedPhoneNumber', model: 'UserQuestModel' })
        return createApiError('failed to add verified phone number', 400)()
      }
    )

  const updateQuestStatus = (
    questId: string,
    userId: string,
    status: QuestStatus,
    progress?: number
  ) =>
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
          progress: 0
        },
        update: {
          status,
          progress
        }
      }),
      (error) => {
        logger?.error({ error, method: 'updateQuestStatus', model: 'UserQuestModel' })
        return createApiError('failed to update quest status', 400)()
      }
    )

  const findCompletedRequirements = (userId: string, questId: string) =>
    ResultAsync.fromPromise(
      db.completedQuestRequirement.findMany({
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
      db.questProgress.findMany({
        where: {
          userId,
          questId: { in: preRequisites },
          status: 'COMPLETED'
        }
      }),
      (error) => {
        logger?.error({ error, method: 'findPrerequisites', model: 'UserQuestModel' })
        return createApiError('failed to get quest prerequisites', 400)()
      }
    )

  return {
    getQuestStatus,
    getQuestsStatus,
    updateQuestStatus,
    findPrerequisites,
    addVerifiedPhoneNumber,
    addCompletedRequirement,
    findCompletedRequirements
  }
}
