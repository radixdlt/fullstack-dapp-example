import { questApi } from '$lib/api/quest-api'
import type { QuestId } from 'content'
import { useCookies } from './cookies'
import { invalidateAll } from '$app/navigation'

export const completeQuest = async (id: QuestId, updateDb: boolean) => {
  if (updateDb) {
    await questApi.completeQuest(id)
  } else {
    useCookies(`quest-status-${id}`).set('COMPLETED')
  }

  await invalidateAll()
}
