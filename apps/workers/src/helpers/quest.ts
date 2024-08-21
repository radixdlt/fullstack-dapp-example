import { EventId, WorkerError } from 'common'
import { QuestDefinitions, QuestId, Quests } from 'content'
import { PrismaClient, QuestStatus } from 'database'
import { ResultAsync } from 'neverthrow'

export const getCompletedQuestRequirements = (
  userId: string,
  questId: QuestId,
  dbClient: PrismaClient
) =>
  ResultAsync.fromPromise(
    dbClient.completedQuestRequirement.findMany({
      where: {
        userId,
        questId
      }
    }),
    (error) => ({ reason: WorkerError.FailedToFindCompletedRequirements, jsError: error })
  )

export const hasCompletedAllQuestRequirements = (
  questId: keyof Quests,
  userId: string,
  dbClient: PrismaClient
) => {
  const questDefinition = QuestDefinitions()[questId]
  const requirements = Object.keys(questDefinition.requirements)

  return getCompletedQuestRequirements(userId, questId, dbClient).map((completedRequirements) => ({
    isAllCompleted: completedRequirements.length === requirements.length,
    completedRequirements
  }))
}

export const completeQuestRequirement =
  (dbClient: PrismaClient) =>
  ({ questId, userId, type }: { questId: QuestId; userId: string; type: EventId }) =>
    ResultAsync.fromPromise(
      dbClient.completedQuestRequirement.upsert({
        where: {
          questId_userId_requirementId: {
            userId,
            questId,
            requirementId: type
          }
        },
        update: {},
        create: {
          userId,
          questId,
          requirementId: type
        }
      }),
      (error) => ({ reason: WorkerError.FailedToCompleteQuestRequirement, jsError: error })
    )

export const addCompletedQuestRequirement =
  (dbClient: PrismaClient) =>
  ({
    questId,
    userId,
    requirementId
  }: {
    questId: string
    userId: string
    requirementId: string
  }) =>
    ResultAsync.fromPromise(
      dbClient.completedQuestRequirement.upsert({
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
      (error) => ({ reason: WorkerError.FailedToAddCompletedQuestRequirement, jsError: error })
    )

export const updateQuestProgressStatus =
  (dbClient: PrismaClient) =>
  ({ userId, questId, status }: { userId: string; questId: string; status: QuestStatus }) =>
    ResultAsync.fromPromise(
      dbClient.questProgress.upsert({
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
      (error) => ({ reason: WorkerError.FailedToUpdateQuestProgress, jsError: error })
    )
