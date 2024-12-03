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
  nextQuest?: string
}

export type QuestId = ReturnType<typeof QuestDefinitions>[keyof ReturnType<
  typeof QuestDefinitions
>]['id']

export const QuestDefinitions = () => {
  return {
    SetupWallet: {
      id: 'SetupWallet',
      category: 'basic',
      trackedAccountAddress: false,
      rewards: [],
      preRequisites: [],
      minutesToComplete: 5,
      requirements: {
        DownloadWallet: {
          type: 'offLedger',
          completedByUser: true
        },
        ConnectWallet: {
          type: 'offLedger',
          completedByUser: true
        },
        RegisterAccount: {
          type: 'offLedger',
          completedByUser: true
        },
        [EventId.DepositHeroBadge]: {
          type: 'event',
          eventName: 'DepositEvent'
        }
      },
      nextQuest: 'GetStuff'
    },
    GetStuff: {
      id: 'GetStuff',
      category: 'basic',
      trackedAccountAddress: false,
      rewards: [
        {
          name: 'starterGiftBox',
          amount: 1
        },
        {
          name: 'clam',
          amount: 10
        }
      ],
      preRequisites: ['SetupWallet'],
      minutesToComplete: 6,
      requirements: {
        GetXRD: {
          type: 'offLedger',
          completedByUser: true
        }
      },
      nextQuest: 'CreatingRadMorphs'
    },
    CreatingRadMorphs: {
      id: 'CreatingRadMorphs',
      category: 'basic',
      trackedAccountAddress: true,
      rewards: [
        {
          amount: 1,
          name: 'simpleGiftBox'
        }
      ],
      minutesToComplete: 4,
      preRequisites: ['GetStuff'],
      requirements: {
        OpenGiftBox: {
          type: 'event',
          eventName: 'GiftBoxesOpenedEvent'
        },
        [EventId.RadGemsClaimed]: {
          type: 'event',
          eventName: 'ClaimedRadgemsEvent'
        },
        [EventId.RadMorphCreated]: {
          type: 'event',
          eventName: 'DepositEvent'
        }
      },
      nextQuest: 'TransferTokens'
    },

    QuestTogether: {
      id: 'QuestTogether',
      category: 'basic',
      // Rewards given at each level of quest completion
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
      // Rewards displayed on quest but not given as quest is never "completed"
      rewards: [
        {
          name: 'simpleGiftBox',
          amount: 1
        },
        {
          name: 'fancyGiftBox',
          amount: 1
        },
        {
          name: 'eliteGiftBox',
          amount: 1
        }
      ],
      trackedAccountAddress: false,
      minutesToComplete: 1,
      preRequisites: [],
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
        // Unachievable requirement to prevent quest completion
        SuperLevel: {
          type: 'offLedger'
        }
      }
    },
    DEXSwaps: {
      id: 'DEXSwaps',
      category: 'basic',
      rewards: [
        {
          name: 'fancyGiftBox',
          amount: 1
        }
      ],
      trackedAccountAddress: true,
      minutesToComplete: 10,
      preRequisites: ['GetStuff'],
      requirements: {
        [EventId.JettySwap]: {
          eventName: 'ClamSwapEvent',
          type: 'event'
        }
      }
    }
  } as const satisfies { [key: string]: QuestDefinition }
}
