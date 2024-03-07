import { Language, QuestDefinitions } from './quest-definitions'
import QuestIndex from './quest-index.json'

export type LoadedQuest = Awaited<ReturnType<typeof loadQuests>>[0]
export const loadQuests = (language: Language, networkId: number) => {
  return Object.entries(QuestDefinitions(networkId)).map(
    ([id, { i18n, ...questDefinitionsRest }]) => {
      const questId = id as keyof typeof QuestIndex

      if (!i18n[language])
        throw new Error(`Language '${language}' is not supported for quest: '${questId}'`)

      const { pages: unresolvedPages, title, description, requirements } = i18n[language]

      type MarkdownFilePath = keyof (typeof QuestIndex)[typeof questId][typeof language]

      const pages = QuestIndex[questId][language]

      const resolvedPages = unresolvedPages.map((page) => {
        const content = page.content.map((item) =>
          item.type === 'markdown'
            ? { type: 'html' as const, value: pages[item.path as MarkdownFilePath] }
            : (item as { type: 'component'; name: string })
        )
        return { ...page, content }
      })

      return {
        id: questId,
        ...questDefinitionsRest,
        title,
        description,
        pages: resolvedPages,
        requirementTexts: requirements,
        splashImage: questDefinitionsRest.splashImage || `/quests-images/splash/${questId}.webp`
      }
    }
  )
}
