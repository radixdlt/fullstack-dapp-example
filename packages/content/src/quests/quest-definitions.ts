import { getEntityAddresses } from '../helpers/getEntityAddresses'

export type MatchField = {
  value: string
  kind: 'Reference'
  type_name: 'ResourceAddress'
}

export type QuestRequirements = {
  DepositEvent: {
    type: 'event'
    matchField: MatchField
  }
  VerifyPhoneNumber: {
    type: 'offLedger'
  }
  ConnectWallet: {
    type: 'offLedger'
  }
}

export type EventId = keyof typeof EventId
export const EventId = {
  DepositUserBadge: 'DepositUserBadge',
  VerifyPhoneNumber: 'VerifyPhoneNumber',
  ConnectWallet: 'ConnectWallet'
} as const

export type QuestRequirement = Record<
  EventId,
  {
    [Key in keyof QuestRequirements]: QuestRequirements[Key] & { eventName: Key }
  }[keyof QuestRequirements]
>

export type QuestCategory = keyof typeof QuestCategory

export const QuestCategory = {
  Basic: 'Basic',
  Advanced: 'Advanced',
  dApp: 'dApp'
} as const

export type FungibleToken = { amount: number }

export type QuestRewards = {
  xrd: FungibleToken
  element: FungibleToken
}

export type QuestReward = {
  [Key in keyof QuestRewards]: QuestRewards[Key] & { name: Key }
}[keyof QuestRewards]

export type QuestPageContents = {
  markdown: { path: string }
  component: { name: string }
}

export type QuestPageContent = {
  [Key in keyof QuestPageContents]: QuestPageContents[Key] & { type: Key }
}[keyof QuestPageContents]

export type Pages = {
  QuestPage: {
    content: QuestPageContent[]
    actions?: Partial<{
      next: string
      previous: string
    }>
  }
  JettyPage: {
    jetty: { emotion: 'Happy' | 'Excited' | 'Thinking' | 'Sad' | 'Greeting' | 'Playful' }
    content: QuestPageContent[]
    actions?: Partial<{
      next: string
      previous: string
    }>
  }
}

export type Page = {
  [Key in keyof Pages]: Pages[Key] & { type: Key }
}[keyof Pages]

export type QuestContentDefinition = {
  title: string
  description: string
  requirements?: Partial<Record<EventId, string>>
  pages: Page[]
}

export type Language = keyof typeof Language

export const Language = { en: 'en' } as const

export type QuestDefinition = {
  category: QuestCategory
  rewards: Readonly<QuestReward[]>
  preRequisites: Readonly<QuestId[]>
  requirements: Partial<QuestRequirement>
  minutesToComplete: number
}

export type QuestId = 'RadixQuest' | 'FirstTransactionQuest'

export const QuestDefinitions = (networkId: number): { [key in QuestId]: QuestDefinition } => {
  const { badges } = getEntityAddresses(networkId)

  return {
    RadixQuest: {
      category: 'Basic',
      rewards: [{ name: 'element', amount: 10 }],
      preRequisites: [],
      minutesToComplete: 3,
      requirements: {}
    },
    FirstTransactionQuest: {
      category: 'Basic',
      rewards: [
        {
          name: 'element',
          amount: 20
        }
      ],
      preRequisites: [],
      minutesToComplete: 3,
      requirements: {
        VerifyPhoneNumber: {
          type: 'offLedger',
          eventName: 'VerifyPhoneNumber'
        },
        DepositUserBadge: {
          type: 'event',
          eventName: 'DepositEvent',
          matchField: {
            value: badges.userBadgeAddress,
            kind: 'Reference',
            type_name: 'ResourceAddress'
          }
        }
      }
    }
  } as const
}
