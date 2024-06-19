import { fetchWrapper } from '../helpers/fetch-wrapper'
import type { AppLogger } from '../helpers/logger'

export const MessageType = {
  QuestRequirementCompleted: 'QuestRequirementCompleted',
  QuestRequirementsCompleted: 'QuestRequirementsCompleted',
  QuestRewardsDeposited: 'QuestRewardsDeposited',
  QuestRewardsClaimed: 'QuestRewardsClaimed',
  CombineElementsDeposited: 'CombineElementsDeposited',
  CombineElementsMintRadgem: 'CombineElementsMintRadgem',
  CombineElementsAddRadgemImage: 'CombineElementsAddRadgemImage',
  CombineElementsClaimed: 'CombineElementsClaimed',
  HeroBadgeReadyToBeClaimed: 'HeroBadgeReadyToBeClaimed'
} as const

export type MessageType = (typeof MessageType)[keyof typeof MessageType]

type Messages = {
  [MessageType.QuestRequirementCompleted]: {
    questId: string
    requirementId: string
    traceId: string
  }
  [MessageType.QuestRequirementsCompleted]: {
    questId: string
    traceId: string
  }
  [MessageType.QuestRewardsDeposited]: {
    questId: string
    traceId: string
  }
  [MessageType.QuestRewardsClaimed]: {
    questId: string
    traceId: string
  }
  [MessageType.CombineElementsDeposited]: {
    traceId: string
  }
  [MessageType.CombineElementsMintRadgem]: {
    traceId: string
  }
  [MessageType.CombineElementsAddRadgemImage]: {
    traceId: string
  }
  [MessageType.CombineElementsClaimed]: {
    traceId: string
  }
  [MessageType.HeroBadgeReadyToBeClaimed]: {
    traceId: string
  }
}

export type Message = {
  [Key in keyof Messages]: Messages[Key] & { type: Key }
}[keyof Messages]

export type MessageApi = ReturnType<typeof MessageApi>
export const MessageApi = ({ baseUrl, logger }: { baseUrl: string; logger?: AppLogger }) => {
  return {
    send: (userId: string, data: Message, id: number) =>
      fetchWrapper<undefined>(
        fetch(`${baseUrl}/api/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, data: { ...data, id } })
        })
      )
        .map(({ status }) => {
          logger?.debug({ method: 'messageApi.send.response', data, status })
        })
        .mapErr((error) => {
          logger?.error({ method: 'messageApi.send.error', data, error })
        })
  }
}
