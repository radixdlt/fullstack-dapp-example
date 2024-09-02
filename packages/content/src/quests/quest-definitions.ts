import { EventId } from 'common'
import { type TicketType } from 'database'

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

export const QuestDefinitions = (ticketType?: TicketType) => {
  return {
    Welcome: {
      id: 'Welcome',
      trackedAccountAddress: false,
      category: 'basic',
      rewards: [],
      preRequisites: [],
      minutesToComplete: 2,
      requirements: {
        RadQuestQuiz: {
          type: 'offLedger',
          completedByUser: true
        }
      },
      nextQuest: 'WhatIsRadix'
    },
    WhatIsRadix: {
      id: 'WhatIsRadix',
      category: 'basic',
      trackedAccountAddress: false,
      rewards: [],
      preRequisites: ['Welcome'],
      minutesToComplete: 3,
      requirements: {
        RadixQuiz: {
          type: 'offLedger',
          completedByUser: true,
          isHidden: false
        }
      },
      nextQuest: 'SetupWallet'
    },
    SetupWallet: {
      id: 'SetupWallet',
      category: 'basic',
      trackedAccountAddress: false,
      rewards: [],
      preRequisites: ['WhatIsRadix'],
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
      category: 'advanced',
      // Rewards given at each level of quest completion
      partialRewards:
        ticketType === 'FULL'
          ? {
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
            }
          : {
              BronzeLevel: [
                {
                  name: 'simpleGiftBox',
                  amount: 1
                }
              ]
            },
      // Rewards displayed on quest but not given as quest is never "completed"
      rewards:
        ticketType === 'FULL'
          ? [
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
            ]
          : [
              {
                name: 'simpleGiftBox',
                amount: 1
              }
            ],
      trackedAccountAddress: false,
      minutesToComplete: 1,
      preRequisites: ['CreatingRadMorphs'],
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
    JoinFriend: {
      id: 'JoinFriend',
      category: 'advanced',
      trackedAccountAddress: false,
      rewards: [
        {
          name: 'simpleGiftBox',
          amount: 1
        }
      ],
      minutesToComplete: 1,
      preRequisites: ['CreatingRadMorphs'],
      requirements: {
        CompleteBasicQuests: {
          type: 'offLedger',
          completedByUser: false
        }
      }
    },
    DEXSwaps: {
      id: 'DEXSwaps',
      category: 'advanced',
      rewards: [
        {
          name: 'fancyGiftBox',
          amount: 1
        }
      ],
      trackedAccountAddress: true,
      minutesToComplete: 10,
      preRequisites: ['CreatingRadMorphs'],
      requirements: {
        [EventId.JettySwap]: {
          eventName: 'ClamSwapEvent',
          type: 'event'
        },
        [EventId.LettySwap]: {
          eventName: 'ClamSwapEvent',
          type: 'event'
        }
      }
    },
    TransferTokens: {
      id: 'TransferTokens',
      trackedAccountAddress: true,
      category: 'advanced',
      rewards: [
        {
          name: 'simpleGiftBox',
          amount: 1
        }
      ],
      preRequisites: ['CreatingRadMorphs'],
      minutesToComplete: 6,
      requirements: {
        [EventId.JettyReceivedClams]: {
          type: 'event',
          eventName: 'DepositEvent'
        }
      }
    },
    NetworkStaking: {
      id: 'NetworkStaking',
      category: 'advanced',
      trackedAccountAddress: true,
      rewards: [
        {
          name: 'simpleGiftBox',
          amount: 1
        }
      ],
      minutesToComplete: 5,
      preRequisites: ['CreatingRadMorphs'],
      requirements: {
        [EventId.XrdStaked]: {
          eventName: 'StakedXrd',
          type: 'event'
        }
      }
    },
    Thorswap: {
      id: 'Thorswap',
      category: 'advanced',
      rewards: [
        {
          name: 'eliteGiftBox',
          amount: 1
        }
      ],
      trackedAccountAddress: true,
      minutesToComplete: 5,
      preRequisites: ['QuestTogether'],
      requirements: {
        [EventId.MayaRouterWithdrawEvent]: {
          eventName: 'MayaRouterWithdrawEvent',
          type: 'event'
        }
      }
    }
  } as const satisfies { [key: string]: QuestDefinition }
}
