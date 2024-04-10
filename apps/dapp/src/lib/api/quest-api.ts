import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { QuestId } from 'content'
import type { QuestStatus } from 'database'

const updateQuestProgress = (questId: string, progress: number, serverFetch?: typeof fetch) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)(`/api/quest/${questId}`, {
      method: 'POST',
      body: JSON.stringify({ progress })
    })
  ).map(({ data }) => data)

const getQuestsInformation = (serverFetch?: typeof fetch) =>
  fetchWrapper<Record<string, { savedProgress: number; status: QuestStatus }>>(
    (serverFetch ?? fetch)('/api/quest', {
      method: 'GET'
    })
  ).map(({ data }) => data)

const getQuestInformation = (questId: string, serverFetch?: typeof fetch) =>
  fetchWrapper<{ status: string; requirements: Record<string, boolean>; savedProgress?: number }>(
    (serverFetch ?? fetch)(`/api/quest/${questId}`, {
      method: 'GET'
    })
  ).map(({ data }) => data)

const completeQuest = (questId: QuestId, serverFetch?: typeof fetch) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)(`/api/quest/${questId}/complete`, {
      method: 'GET'
    })
  )

const saveProgress = (questId: string, progress: number, serverFetch?: typeof fetch) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)(`/api/quest/${questId}/save-progress/${progress}`, {
      method: 'POST'
    })
  )

const getSavedProgress = (serverFetch?: typeof fetch) =>
  fetchWrapper<{ questId: string; progress: number }>(
    (serverFetch ?? fetch)('/api/user/saved-progress', {
      method: 'GET'
    })
  ).map(({ data }) => data)

const deleteSavedProgress = (serverFetch?: typeof fetch) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)('/api/user/saved-progress', {
      method: 'DELETE'
    })
  )

const completeContentRequirement = (
  questId: QuestId,
  requirementId: string,
  serverFetch?: typeof fetch
) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)(`/api/quest/${questId}/complete-content-requirement/${requirementId}`, {
      method: 'PUT'
    })
  )

export const questApi = {
  getQuestsInformation,
  getQuestInformation,
  updateQuestProgress,
  completeQuest,
  saveProgress,
  getSavedProgress,
  deleteSavedProgress,
  completeContentRequirement
} as const
