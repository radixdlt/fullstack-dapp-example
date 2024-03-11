import { fetchWrapper } from '$lib/helpers/fetch-wrapper'

const updateQuestProgress = (questId: string, progress: number) =>
  fetchWrapper<void>(
    fetch(`/api/quest/${questId}`, {
      method: 'POST',
      body: JSON.stringify({ progress })
    })
  ).map(({ data }) => data)

const getQuestsInformation = () =>
  fetchWrapper<void>(
    fetch('/api/quest', {
      method: 'GET'
    })
  ).map(({ data }) => data)

const getQuestInformation = (questId: string) =>
  fetchWrapper<{ status: string; requirements: Record<string, boolean> }>(
    fetch(`/api/quest/${questId}`, {
      method: 'GET'
    })
  ).map(({ data }) => data)

const completeQuest = (questId: string) =>
  fetchWrapper<void>(
    fetch(`/api/quest/${questId}/complete`, {
      method: 'GET'
    })
  )

export const questApi = {
  getQuestsInformation,
  getQuestInformation,
  updateQuestProgress,
  completeQuest
} as const
