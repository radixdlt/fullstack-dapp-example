import { EventId } from 'common'

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
}

type OffLedgerRequirement = {
  type: 'offLedger'
  completedByUser?: boolean
}

type ContentRequirement = {
  type: 'content'
}

export type QuestDefinition = {
  id: string
  category: QuestCategory
  trackedAccountAddress: boolean
  rewards: Readonly<QuestReward[]>
  preRequisites: Readonly<string[]>
  requirements: Requirements
  minutesToComplete: number
}

export type QuestId = ReturnType<typeof QuestDefinitions>[keyof ReturnType<
  typeof QuestDefinitions
>]['id']

export const QuestDefinitions = () => {
  return {
    WelcomeToRadQuest: {
      id: 'WelcomeToRadQuest',
      trackedAccountAddress: false,
      category: 'Basic',
      rewards: [{ name: 'element', amount: 5 }],
      preRequisites: [],
      minutesToComplete: 3,
      requirements: {
        Introduction: {
          type: 'content'
        },
        Glossary: {
          type: 'offLedger',
          completedByUser: true
        },
        RadQuestQuiz: {
          type: 'offLedger',
          completedByUser: true
        }
      }
    },
    WhatIsRadix: {
      id: 'WhatIsRadix',
      category: 'Basic',
      trackedAccountAddress: false,
      rewards: [{ name: 'element', amount: 5 }],
      preRequisites: ['WelcomeToRadQuest'],
      minutesToComplete: 3,
      requirements: {
        LearnAboutRadix: {
          type: 'content'
        },
        RadixQuiz: {
          type: 'offLedger',
          completedByUser: true
        },
        dAppQuiz: {
          type: 'offLedger',
          completedByUser: true
        }
      }
    },
    GetRadixWallet: {
      id: 'GetRadixWallet',
      category: 'Basic',
      trackedAccountAddress: false,
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
      trackedAccountAddress: false,
      rewards: [{ name: 'element', amount: 5 }],
      preRequisites: ['GetRadixWallet'],
      minutesToComplete: 3,
      requirements: {
        ConnectWallet: {
          type: 'offLedger'
        },
        ConnectAccount: {
          type: 'offLedger'
        }
      }
    },
    FirstTransactionQuest: {
      id: 'FirstTransactionQuest',
      category: 'Basic',
      trackedAccountAddress: false,
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
        [EventId.DepositUserBadge]: {
          type: 'event',
          eventName: 'DepositEvent'
        }
      }
    },
    TransferTokens: {
      id: 'TransferTokens',
      trackedAccountAddress: false,
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
          eventName: 'DepositEvent'
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
        [EventId.XrdStaked]: {
          eventName: 'StakedXrd',
          type: 'event'
        }
      }
    },
    SwapQuest: {
      id: 'SwapQuest',
      category: 'Advanced',
      rewards: [
        {
          name: 'element',
          amount: 10
        },
        {
          name: 'xrd',
          amount: 10
        },
        {
          name: 'energyCard',
          amount: 1
        }
      ],
      trackedAccountAddress: true,
      minutesToComplete: 5,
      preRequisites: ['TransferTokens'],
      requirements: {
        LearnAboutDexes: {
          type: 'content'
        },
        SwapTokensOnJettySwap: {
          eventName: 'SwapTokensOnJettySwap',
          type: 'event'
        },
        SwapTokensOnLettySwap: {
          eventName: 'SwapTokensOnLettySwap',
          type: 'event'
        }
      }
    },
    InstapassQuest: {
      id: 'InstapassQuest',
      category: 'Advanced',
      rewards: [
        {
          name: 'element',
          amount: 50
        },
        {
          name: 'xrd',
          amount: 120
        }
      ],
      trackedAccountAddress: true,
      minutesToComplete: 20,
      preRequisites: ['TransferTokens'],
      requirements: {
        [EventId.InstapassBadgeDeposited]: {
          eventName: 'InstapassBadgeDeposited',
          type: 'event'
        }
      }
    }
  } as const satisfies { [key: string]: QuestDefinition }
}
