import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { QuestRequirement } from '$lib/server/user-quest/controller'
import type { QuestId } from 'content'
import type { QuestStatus } from 'database'

const startQuest = (questId: string, serverFetch?: typeof fetch) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)(`/api/quest/${questId}`, {
      method: 'POST'
    })
  ).map(({ data }) => data)

const getQuestsInformation = (serverFetch?: typeof fetch) =>
  fetchWrapper<Record<string, { savedProgress: number; status: QuestStatus }>>(
    (serverFetch ?? fetch)('/api/quest', {
      method: 'GET'
    })
  ).map(({ data }) => data)

const getQuestInformation = (questId: string, serverFetch?: typeof fetch) =>
  fetchWrapper<{
    status: string
    requirements: Record<string, QuestRequirement>
    savedProgress?: number
  }>(
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

const completeContentRequirement = (questId: QuestId, serverFetch?: typeof fetch) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)(`/api/quest/${questId}/complete-content-requirement`, {
      method: 'PUT'
    })
  )

const completeRequirement = (questId: QuestId, requirementId: string, serverFetch?: typeof fetch) =>
  fetchWrapper<void>(
    (serverFetch ?? fetch)(`/api/quest/${questId}/complete-requirement/${requirementId}`, {
      method: 'PUT'
    })
  )

const getDepositedRewards = (questId: QuestId) =>
  fetchWrapper<{ amount: string; resourceAddress: string }[]>(
    fetch(`/api/quest/${questId}/deposited-rewards`)
  ).map(({ data }) => data)

const handleAllRequirementsCompleted = (questId: QuestId) =>
  fetchWrapper<{ amount: string; resourceAddress: string }[]>(
    fetch(`/api/quest/${questId}/handle-requirements-completed`)
  ).map(({ data }) => data)

export const questApi = {
  handleAllRequirementsCompleted,
  getQuestsInformation,
  getQuestInformation,
  getDepositedRewards,
  startQuest,
  completeQuest,
  saveProgress,
  getSavedProgress,
  deleteSavedProgress,
  completeRequirement,
  completeContentRequirement
} as const
