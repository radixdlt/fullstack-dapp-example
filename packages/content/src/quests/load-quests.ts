import { Language, QuestDefinitions, questKeys } from './quest-definitions'
import QuestIndex from './quest-index.json'

export type LoadedQuest = Awaited<ReturnType<typeof loadQuests>>[0]
export const loadQuests = (language: Language) =>
  questKeys.map((questId) => {
    const { i18n, ...questDefinitionsRest } = QuestDefinitions[questId]

    if (!i18n[language])
      throw new Error(`Language '${language}' is not supported for quest: '${questId}'`)

    const { pages: unresolvedPages, title, description } = i18n[language]

    type MarkdownFilePath = keyof (typeof QuestIndex)[typeof questId][typeof language]

    const pages = QuestIndex[questId][language]

    const resolvedPages = unresolvedPages.map((page) => {
      const content = page.content.map((item) =>
        item.type === 'markdown'
          ? { type: 'html', value: pages[item.path as MarkdownFilePath] }
          : item
      )
      return { ...page, content }
    })

    return {
      id: questId,
      ...questDefinitionsRest,
      title,
      description,
      pages: resolvedPages,
      splashImage: questDefinitionsRest.splashImage || `/quests-images/splash/${questId}.webp`
    }
  })
