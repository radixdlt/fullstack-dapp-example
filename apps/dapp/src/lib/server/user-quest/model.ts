import { dbClient } from '$lib/db'
import { UserQuestModel } from 'common'
import type { PrismaClient } from 'database'

export const userQuestModel = UserQuestModel(dbClient as PrismaClient)
