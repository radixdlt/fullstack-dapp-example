declare module 'virtual:glossary' {
  const GlossaryContent: Record<
    'en',
    {
      title: string
      content: string
    }[]
  >

  export { GlossaryContent }
}

declare module 'virtual:quests' {
  type QuestPageDefinition = {
    actions?: {
      next?: string
      prev?: string
    }
    content: (
      | {
          type: 'placeholder'
          id: string
        }
      | {
          type: 'html'
          html: string
        }
    )[]
  }

  type QuestRewardType = 'XRD' | 'Fragment' | 'Purple Card'

  type QuestRewardDefinition = {
    type: QuestRewardType
    amount: number
  }

  type QuestDefinition = {
    id: string
    title: string
    keyImage: string
    splashImage: string
    description: string
    minutesToComplete: number
    pages: QuestPageDefinition[]
    rewards: QuestRewardDefinition[]
  }

  const QuestsContent: Record<'en', Record<string, QuestDefinition>>

  export {
    QuestsContent,
    QuestRewardType,
    QuestDefinition,
    QuestPageDefinition,
    QuestRewardDefinition
  }
}
