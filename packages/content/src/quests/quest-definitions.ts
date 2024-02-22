import { getEntityAddresses } from '../helpers/getEntityAddresses'
import QuestIndex from './quest-index.json'

export type QuestId = keyof typeof QuestIndex

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
}

export type EventId = keyof typeof EventId
export const EventId = {
  DepositUserBadge: 'DepositUserBadge'
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
  pages: Page[]
}

export type Language = keyof typeof Language

export const Language = { en: 'en' } as const

export type QuestDefinition = {
  category: QuestCategory
  rewards: QuestReward[]
  requirements: Partial<QuestRequirement>
  preRequisites: QuestId[]
  i18n: Record<Language, QuestContentDefinition>
  minutesToComplete: number
  splashImage?: string
}

export const QuestDefinitions = (networkId: number): Record<QuestId, QuestDefinition> => {
  const { badges } = getEntityAddresses(networkId)
  return {
    RadixQuest: {
      category: 'Basic',
      rewards: [{ name: 'element', amount: 10 }],
      requirements: {},
      preRequisites: [],
      minutesToComplete: 3,
      i18n: {
        en: {
          title: 'Introduction to Radix',
          description: 'Get familiar with Radar, the radically better Web3 network.',
          pages: [
            {
              type: 'QuestPage',
              content: [{ type: 'markdown', path: '0.md' }]
            },
            {
              type: 'QuestPage',
              content: [{ type: 'markdown', path: '1.md' }]
            },
            {
              type: 'QuestPage',
              content: [{ type: 'markdown', path: '2.md' }]
            },
            {
              type: 'QuestPage',
              content: [{ type: 'markdown', path: '3.md' }]
            },
            {
              type: 'QuestPage',
              content: [{ type: 'markdown', path: '4.md' }]
            }
          ]
        }
      }
    },
    RadQuest: {
      category: 'Basic',
      rewards: [],
      requirements: {},
      preRequisites: ['RadixQuest'],
      minutesToComplete: 1,
      i18n: {
        en: {
          title: 'Your Quest to Learn About RadQuest',
          description: "Find out what you'll learn and what to expect during your quest",
          pages: []
        }
      }
    },
    RadixWalletQuest: {
      category: 'Basic',
      rewards: [],
      preRequisites: ['RadQuest'],
      requirements: {},
      minutesToComplete: 3,
      i18n: {
        en: {
          title: 'Set Up Your Radar Wallet',
          description: 'Learn about the Radar Wallet. Install & set up the Wallet app',
          pages: []
        }
      }
    },
    ConnectQuest: {
      category: 'Basic',
      rewards: [],
      preRequisites: ['RadixWalletQuest'],
      requirements: {},
      minutesToComplete: 3,
      i18n: {
        en: {
          title: 'Login with Your Radix Wallet',
          description: 'Learn how to use your wallet to log in to dApps on the Radar network.',
          pages: []
        }
      }
    },
    FirstTransactionQuest: {
      category: 'Basic',
      rewards: [],
      preRequisites: ['ConnectQuest'],
      requirements: {
        DepositUserBadge: {
          type: 'event',
          eventName: 'DepositEvent',
          matchField: {
            value: badges.userBadgeAddress,
            kind: 'Reference',
            type_name: 'ResourceAddress'
          }
        }
      },
      minutesToComplete: 3,
      i18n: {
        en: {
          title: 'Your First Transaction on Radix',
          description: 'Try your first transaction on the Radar network',
          pages: []
        }
      }
    },
    ProofOfHuman: {
      category: 'Basic',
      rewards: [],
      preRequisites: ['FirstTransactionQuest'],
      requirements: {},
      minutesToComplete: 6,
      i18n: {
        en: {
          title: 'Proof of Human',
          description: 'Register your email to be able to receive XRD tokens.',
          pages: [
            {
              type: 'QuestPage',
              content: [{ type: 'markdown', path: '0.md' }]
            },
            {
              type: 'JettyPage',
              jetty: { emotion: 'Thinking' },
              content: [{ type: 'component', name: 'SmsOtpVerification' }]
            }
          ]
        }
      }
    },
    SendAssetsQuest: {
      category: 'Basic',
      rewards: [],
      preRequisites: ['ProofOfHuman'],
      requirements: {},
      minutesToComplete: 3,
      i18n: {
        en: {
          title: 'Send a Web3 Asset on Radix',
          description: 'Learn how to send a web3 asset to somebody else on Radix',
          pages: []
        }
      }
    },
    ConvertElementsQuest: {
      category: 'Basic',
      rewards: [],
      preRequisites: ['SendAssetsQuest'],
      requirements: {},
      minutesToComplete: 3,
      i18n: {
        en: {
          title: 'Convert Elements Into Gemstones (NFTs)',
          description: 'Learn how to use Jetty’s superpower!',
          pages: []
        }
      }
    },
    SwapQuest: {
      category: 'Basic',
      rewards: [],
      preRequisites: ['ConvertElementsQuest'],
      requirements: {},
      minutesToComplete: 3,
      i18n: {
        en: {
          title: 'Set Up Your Radar Wallet',
          description: 'Learn about the Radar Wallet. Install & set up the Wallet app',
          pages: []
        }
      }
    }
  } as const
}
