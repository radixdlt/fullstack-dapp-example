import { PrismaClient } from 'database'

export const completeQuestRequirements =
  (db: PrismaClient) => async (userId: string, questId: string, requirementIds: string[]) => {
    await db.questProgress.upsert({
      create: { questId, userId, status: 'IN_PROGRESS' },
      update: { status: 'IN_PROGRESS' },
      where: { questId_userId: { questId, userId } }
    })

    for (const requirementId of requirementIds) {
      await db.completedQuestRequirement.upsert({
        create: {
          questId,
          userId,
          requirementId
        },
        update: {},
        where: {
          questId_userId_requirementId: {
            questId,
            userId,
            requirementId
          }
        }
      })
    }
  }
