import { PrismaClient } from 'database'

export const addCompletedRequirement =
  (db: PrismaClient) => async (userId: string, questId: string, requirementId: string) =>
    db.completedQuestRequirement.create({
      data: { userId, questId, requirementId }
    })
