import { err, ok } from 'neverthrow'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import type { AppLogger } from '../helpers/logger'
import type { MorphCardMintedEventOutput } from '../event-data/event-data'

export const MessageType = {
  QuestRequirementCompleted: 'QuestRequirementCompleted',
  QuestRequirementsCompleted: 'QuestRequirementsCompleted',
  QuestRewardsDeposited: 'QuestRewardsDeposited',
  QuestRewardsClaimed: 'QuestRewardsClaimed',
  CombineElementsDeposited: 'CombineElementsDeposited',
  CombineElementsMintRadgem: 'CombineElementsMintRadgem',
  CombineElementsClaimed: 'CombineElementsClaimed',
  HeroBadgeReadyToBeClaimed: 'HeroBadgeReadyToBeClaimed',
  ReferralCompletedBasicQuests: 'ReferralCompletedBasicQuests',
  XrdDepositedToAccount: 'XrdDepositedToAccount',
  GiftBoxDeposited: 'GiftBoxDeposited',
  GiftBoxesDeposited: 'GiftBoxesDeposited',
  RadgemsMinted: 'RadgemsMinted',
  CombineElementsAddRadgemImage: 'CombineElementsAddRadgemImage',
  HeroBadgeDeposited: 'HeroBadgeDeposited',
  TicketsPurchased: 'TicketsPurchased'
} as const

export type MessageType = (typeof MessageType)[keyof typeof MessageType]

export type Messages = {
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
  [MessageType.CombineElementsClaimed]: {
    traceId: string
  }
  [MessageType.HeroBadgeReadyToBeClaimed]: {
    traceId: string
  }
  [MessageType.XrdDepositedToAccount]: {
    traceId: string
  }
  [MessageType.ReferralCompletedBasicQuests]: { traceId: string }
  [MessageType.GiftBoxDeposited]: {
    traceId: string
    energyCard: MorphCardMintedEventOutput
    rewards: {
      fungibles: {
        amount: number
        resourceAddress: string
      }[]
      nonFungibles: {
        localIds: string[]
        resourceAddress: string
      }[]
    }
  }
  [MessageType.GiftBoxesDeposited]: {
    traceId: string
  }
  [MessageType.RadgemsMinted]: {
    traceId: string
  }
  [MessageType.CombineElementsAddRadgemImage]: {
    traceId: string
  }
  [MessageType.HeroBadgeDeposited]: {
    traceId: string
  }
  [MessageType.TicketsPurchased]: {
    traceId: string
  }
}

export type Message = {
  [Key in keyof Messages]: Messages[Key] & { type: Key }
}[keyof Messages]

export type MessageApi = ReturnType<typeof MessageApi>
export const MessageApi = ({ baseUrl, logger }: { baseUrl: string; logger?: AppLogger }) => {
  return {
    send: (userId: string, data: Message, id: number) => {
      logger?.trace({ method: 'messageApi.send', userId, data, id })
      return fetchWrapper<undefined>(
        fetch(`${baseUrl}/api/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, data: { ...data, id } })
        })
      )
        .map(({ status }) => {
          logger?.trace({ method: 'messageApi.send.response', data, status })
        })
        .orElse((error) => {
          if (error.status === 404) return ok(undefined)
          logger?.error({ method: 'messageApi.send.error', data, error })
          return err(error)
        })
    }
  }
}
