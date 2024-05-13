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

export type EventId = keyof typeof EventId

export const EventId = {
  DepositUserBadge: 'DepositUserBadge',
  JettyReceivedClams: 'JettyReceivedClams'
} as const

export type FungibleToken = { amount: number }

export type QuestRewards = {
  xrd: FungibleToken
  element: FungibleToken
  clam: FungibleToken
  energyCard: FungibleToken
}

export type QuestReward = {
  [Key in keyof QuestRewards]: QuestRewards[Key] & { name: Key }
}[keyof QuestRewards]

export type Language = keyof typeof Language

export const Language = { en: 'en' } as const

type Requirements = { [key: string]: Requirement }

export type Requirement = OnLedgerRequirement | OffLedgerRequirement | ContentRequirement

type OnLedgerRequirement = {
  type: 'event'
  eventName: string
  matchField: MatchField
}

type OffLedgerRequirement = {
  type: 'offLedger'
}

type ContentRequirement = {
  type: 'content'
}

export type QuestDefinition = {
  id: string
  category: QuestCategory
  trackedAccountAddress?: boolean
  rewards: Readonly<QuestReward[]>
  preRequisites: Readonly<string[]>
  requirements: Requirements
  minutesToComplete: number
}

export type QuestId = ReturnType<typeof QuestDefinitions>[keyof ReturnType<
  typeof QuestDefinitions
>]['id']

export const QuestDefinitions = (networkId: number) => {
  const { badges, xrd } = getEntityAddresses(networkId)

  return {
    WelcomeToRadQuest: {
      id: 'WelcomeToRadQuest',
      category: 'Basic',
      rewards: [{ name: 'element', amount: 5 }],
      preRequisites: [],
      minutesToComplete: 3,
      requirements: {
        Introduction: {
          type: 'content'
        }
      }
    },
    WhatIsRadix: {
      id: 'WhatIsRadix',
      category: 'Basic',
      rewards: [{ name: 'element', amount: 5 }],
      preRequisites: ['WelcomeToRadQuest'],
      minutesToComplete: 3,
      requirements: {
        LearnAboutRadix: {
          type: 'content'
        }
      }
    },
    GetRadixWallet: {
      id: 'GetRadixWallet',
      category: 'Basic',
      rewards: [{ name: 'element', amount: 5 }],
      preRequisites: ['WhatIsRadix'],
      minutesToComplete: 3,
      requirements: {
        GetTheWallet: {
          type: 'content'
        }
      }
    },
    LoginWithWallet: {
      id: 'LoginWithWallet',
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
      id: 'FirstTransactionQuest',
      category: 'Basic',
      rewards: [
        {
          name: 'element',
          amount: 20
        },
        {
          name: 'clam',
          amount: 25
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
    },
    TransferTokens: {
      id: 'TransferTokens',
      category: 'Basic',
      rewards: [
        {
          name: 'element',
          amount: 10
        },
        {
          name: 'clam',
          amount: 25
        },
        {
          name: 'energyCard',
          amount: 1
        }
      ],
      preRequisites: ['FirstTransactionQuest'],
      minutesToComplete: 3,
      requirements: {
        [EventId.JettyReceivedClams]: {
          type: 'event',
          eventName: 'DepositEvent',
          matchField: {
            value: badges.userBadgeAddress,
            kind: 'Reference',
            type_name: 'ResourceAddress'
          }
        }
      }
    },
    StakingQuest: {
      id: 'StakingQuest',
      category: 'Advanced',
      trackedAccountAddress: true,
      rewards: [
        {
          name: 'element',
          amount: 50
        }
      ],
      minutesToComplete: 5,
      preRequisites: ['TransferTokens'],
      requirements: {
        LearnStaking: {
          type: 'content'
        },
        StakedXrd: {
          eventName: 'StakedXrd',
          type: 'event',
          matchField: {
            value: xrd,
            kind: 'Reference',
            type_name: 'ResourceAddress'
          }
        }
      }
    }
  } as const satisfies { [key: string]: QuestDefinition }
}
