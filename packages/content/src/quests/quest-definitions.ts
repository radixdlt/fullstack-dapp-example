import { EventId } from 'common'

export type QuestCategory = (typeof QuestCategory)[keyof typeof QuestCategory]

export const QuestCategory = {
  Basic: 'basic',
  Advanced: 'advanced'
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

export const questRewardDisplayName = {
  xrd: 'XRD',
  element: 'Element',
  clam: 'Clam',
  energyCard: 'Energy Card'
} as const satisfies { [key in QuestReward['name']]: string }

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
  splashImage?: string
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
      category: 'basic',
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
      category: 'basic',
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
      category: 'basic',
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
      category: 'basic',
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
      category: 'basic',
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
      category: 'basic',
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
      category: 'advanced',
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
      category: 'advanced',
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
        [EventId.JettySwap]: {
          eventName: 'JettySwapEvent',
          type: 'event'
        },
        [EventId.LettySwap]: {
          eventName: 'LettySwapEvent',
          type: 'event'
        }
      }
    },
    InstapassQuest: {
      id: 'InstapassQuest',
      category: 'advanced',
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
    },
    MayaQuest: {
      id: 'MayaQuest',
      category: 'advanced',
      rewards: [
        {
          name: 'element',
          amount: 50
        },
        {
          name: 'xrd',
          amount: 50
        }
      ],
      splashImage: '/quests-images/splash/InstabridgeQuest.webp',
      trackedAccountAddress: true,
      minutesToComplete: 10,
      preRequisites: ['TransferTokens'],
      requirements: {
        [EventId.MayaRouterWithdrawEvent]: {
          eventName: 'MayaRouterWithdrawEvent',
          type: 'event'
        }
      }
    },
    ReferralQuest: {
      id: 'ReferralQuest',
      category: 'advanced',
      rewards: [
        {
          name: 'element',
          amount: 20
        },
        {
          name: 'energyCard',
          amount: 1
        },
        {
          name: 'xrd',
          amount: 10
        }
      ],
      trackedAccountAddress: false,
      minutesToComplete: 3,
      preRequisites: ['TransferTokens'],
      requirements: {
        LearnAboutParty: {
          type: 'content'
        },
        ClaimReferralQuestRewards: {
          eventName: 'ClaimReferralQuestRewards',
          type: 'event'
        }
      }
    }
  } as const satisfies { [key: string]: QuestDefinition }
}
