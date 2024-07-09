import { EventId } from 'common'

export type QuestCategory = (typeof QuestCategory)[keyof typeof QuestCategory]

export const QuestCategory = {
  Basic: 'basic',
  Advanced: 'advanced'
} as const

export type FungibleToken = { amount: number }

export type QuestRewards = {
  xrd: FungibleToken
  clam: FungibleToken
  starterGiftBox: FungibleToken
  simpleGiftBox: FungibleToken
  fancyGiftBox: FungibleToken
  eliteGiftBox: FungibleToken
}

export type QuestReward = {
  [Key in keyof QuestRewards]: QuestRewards[Key] & { name: Key }
}[keyof QuestRewards]

export const questRewardDisplayName = {
  xrd: 'XRD',
  clam: 'Clam',
  starterGiftBox: 'Starter Gift Box',
  simpleGiftBox: 'Simple Gift Box',
  fancyGiftBox: 'Fancy Gift Box',
  eliteGiftBox: 'Elite Gift Box'
} as const satisfies { [key in QuestReward['name']]: string }

export type Language = keyof typeof Language

export const Language = { en: 'en' } as const

type Requirements = { [key: string]: Requirement }

export type Requirement = (OnLedgerRequirement | OffLedgerRequirement | ContentRequirement) & {
  isHidden?: boolean
}

type OnLedgerRequirement = {
  type: 'event'
  eventName: string
}

type OffLedgerRequirement = {
  type: 'offLedger'
  completedByUser?: boolean
  threshold?: number
}

type ContentRequirement = {
  type: 'content'
}

export type QuestDefinition = {
  id: string
  category: QuestCategory
  trackedAccountAddress: boolean
  rewards: Readonly<QuestReward[]>
  partialRewards?: Record<string, QuestReward[]>
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
      rewards: [],
      preRequisites: [],
      minutesToComplete: 3,
      requirements: {
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
      rewards: [],
      preRequisites: ['WelcomeToRadQuest'],
      minutesToComplete: 3,
      requirements: {
        RadixQuiz: {
          type: 'offLedger',
          completedByUser: true,
          isHidden: false
        }
      }
    },
    GetRadixWallet: {
      id: 'GetRadixWallet',
      category: 'basic',
      trackedAccountAddress: false,
      rewards: [],
      preRequisites: ['WhatIsRadix'],
      minutesToComplete: 3,
      requirements: {
        ConnectWallet: {
          type: 'offLedger',
          completedByUser: true
        }
      }
    },
    FirstTransactionQuest: {
      id: 'FirstTransactionQuest',
      category: 'basic',
      trackedAccountAddress: false,
      rewards: [
        {
          name: 'xrd',
          amount: 25
        },
        {
          name: 'starterGiftBox',
          amount: 1
        },
        {
          name: 'clam',
          amount: 10
        }
      ],
      preRequisites: ['GetRadixWallet'],
      minutesToComplete: 3,
      requirements: {
        VerifyPhoneNumber: {
          type: 'offLedger',
          completedByUser: false
        },
        RegisterAccount: {
          type: 'offLedger',
          completedByUser: false
        },
        [EventId.DepositHeroBadge]: {
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
          name: 'xrd',
          amount: 20
        },
        {
          name: 'fancyGiftBox',
          amount: 1
        }
      ],
      preRequisites: ['FirstTransactionQuest'],
      minutesToComplete: 3,
      requirements: {
        [EventId.JettyReceivedClams]: {
          type: 'event',
          eventName: 'DepositEvent'
        },
        PersonaQuiz: {
          type: 'offLedger',
          completedByUser: true,
          isHidden: true
        },
        TransactionQuiz: {
          type: 'offLedger',
          completedByUser: true,
          isHidden: true
        },
        XrdQuiz: {
          type: 'offLedger',
          completedByUser: true,
          isHidden: true
        }
      }
    },
    StakingQuest: {
      id: 'StakingQuest',
      category: 'advanced',
      trackedAccountAddress: true,
      rewards: [
        {
          name: 'simpleGiftBox',
          amount: 1
        },
        {
          name: 'xrd',
          amount: 50
        }
      ],
      minutesToComplete: 5,
      preRequisites: ['TransferTokens'],
      requirements: {
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
          name: 'xrd',
          amount: 10
        },
        {
          name: 'fancyGiftBox',
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
          eventName: 'JettySwapEvent',
          type: 'event'
        }
      }
    },
    InstapassQuest: {
      id: 'InstapassQuest',
      category: 'advanced',
      rewards: [
        {
          name: 'xrd',
          amount: 50
        },
        {
          name: 'simpleGiftBox',
          amount: 1
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
          name: 'eliteGiftBox',
          amount: 1
        },
        {
          name: 'xrd',
          amount: 250
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
      partialRewards: {
        BronzeLevel: [
          {
            name: 'simpleGiftBox',
            amount: 1
          }
        ],
        SilverLevel: [
          {
            name: 'fancyGiftBox',
            amount: 1
          }
        ],
        GoldLevel: [
          {
            name: 'eliteGiftBox',
            amount: 1
          }
        ]
      },
      rewards: [
        {
          name: 'xrd',
          amount: 30
        }
      ],
      trackedAccountAddress: false,
      minutesToComplete: 3,
      preRequisites: ['TransferTokens'],
      requirements: {
        BronzeLevel: {
          type: 'offLedger',
          threshold: 1
        },
        SilverLevel: {
          type: 'offLedger',
          threshold: 5
        },
        GoldLevel: {
          type: 'offLedger',
          threshold: 10
        },
        SuperLevel: {
          type: 'offLedger'
        }
      }
    }
  } as const satisfies { [key: string]: QuestDefinition }
}
