import { dbClient } from '$lib/db'
import { UserQuestModel } from 'common'

export const userQuestModel = UserQuestModel(dbClient)
