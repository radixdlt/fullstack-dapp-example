import { fetchWrapper } from '$lib/helpers/fetch-wrapper'

const updateQuestProgress = (questId: string, progress: number, serverFetch?: typeof fetch) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)(`/api/quest/${questId}`, {
      method: 'POST',
      body: JSON.stringify({ progress })
    })
  ).map(({ data }) => data)

const getQuestsInformation = (serverFetch?: typeof fetch) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)('/api/quest', {
      method: 'GET'
    })
  ).map(({ data }) => data)

const getQuestInformation = (questId: string, serverFetch?: typeof fetch) =>
  fetchWrapper<{ status: string; requirements: Record<string, boolean> }>(
    (serverFetch ?? fetch)(`/api/quest/${questId}`, {
      method: 'GET'
    })
  ).map(({ data }) => data)

const completeQuest = (questId: string, serverFetch?: typeof fetch) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)(`/api/quest/${questId}/complete`, {
      method: 'GET'
    })
  )

export const questApi = {
  getQuestsInformation,
  getQuestInformation,
  updateQuestProgress,
  completeQuest
} as const
