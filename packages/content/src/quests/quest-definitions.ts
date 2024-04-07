import { getEntityAddresses } from '../helpers/getEntityAddresses'

export type MatchField = {
  value: string
  kind: 'Reference'
  type_name: 'ResourceAddress'
}

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

export type EventId = keyof typeof EventId

export const EventId = {
  DepositUserBadge: 'DepositUserBadge'
} as const

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
  requirements?: Requirements
  pages: Page[]
}

export type Language = keyof typeof Language

export const Language = { en: 'en' } as const

type Requirements = { [key: string]: OnLedgerRequirement | OffLedgerRequirement }

type OnLedgerRequirement = {
  type: 'event'
  eventName: string
  matchField: MatchField
}

type OffLedgerRequirement = {
  type: 'offLedger'
}

export type QuestDefinition = {
  category: QuestCategory
  rewards: Readonly<QuestReward[]>
  preRequisites: Readonly<QuestId[]>
  requirements: Requirements
  minutesToComplete: number
}

export type QuestId =
  | 'WelcomeToRadQuest'
  | 'WhatIsRadix'
  | 'GetRadixWallet'
  | 'LoginWithWallet'
  | 'FirstTransactionQuest'

export const QuestDefinitions = (networkId: number): { [key in QuestId]: QuestDefinition } => {
  const { badges } = getEntityAddresses(networkId)

  return {
    WelcomeToRadQuest: {
      category: 'Basic',
      rewards: [{ name: 'element', amount: 5 }],
      preRequisites: [],
      minutesToComplete: 3,
      requirements: {}
    },
    WhatIsRadix: {
      category: 'Basic',
      rewards: [{ name: 'element', amount: 5 }],
      preRequisites: ['WelcomeToRadQuest'],
      minutesToComplete: 3,
      requirements: {}
    },
    GetRadixWallet: {
      category: 'Basic',
      rewards: [{ name: 'element', amount: 5 }],
      preRequisites: ['WhatIsRadix'],
      minutesToComplete: 3,
      requirements: {}
    },
    LoginWithWallet: {
      category: 'Basic',
      rewards: [{ name: 'element', amount: 5 }],
      preRequisites: ['GetRadixWallet'],
      minutesToComplete: 3,
      requirements: {
        ConnectWallet: {
          type: 'offLedger'
        }
      }
    },
    FirstTransactionQuest: {
      category: 'Basic',
      rewards: [
        {
          name: 'element',
          amount: 20
        }
      ],
      preRequisites: ['LoginWithWallet'],
      minutesToComplete: 3,
      requirements: {
        VerifyPhoneNumber: {
          type: 'offLedger'
        },
        ConnectAccount: {
          type: 'offLedger'
        },
        [EventId.DepositUserBadge]: {
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
