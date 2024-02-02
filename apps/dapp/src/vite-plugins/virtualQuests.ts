import { readDefinitionJson } from './helpers/readDefinitionJson'
import { tsPrinter } from './helpers/tsPrinter'
import { virtualModuleFactory } from './helpers/virtualModuleFactory'
import ts from 'typescript'
import {
  createArrayEntry,
  createNumberEntry,
  createObject,
  createStringEntry
} from './helpers/tsFactoryHelpers'
import { convertMarkdownFilePathToHtml } from './helpers/mdParser'

type QuestPageContentDefinition = string | { type: 'placeholder'; id: string }

type QuestPageDefinition =
  | {
      content: QuestPageContentDefinition[]
      actions?: {
        next?: string
        prev?: string
      }
    }
  | string

type QuestDefinition = {
  title: string
  description: string
  minutesToComplete: number
  keyImage?: string
  splashImage?: string
  rewards?: {
    type: string
    amount: number
  }[]
  pages: QuestPageDefinition[]
}

type QuestUniqueId = string

type QuestsDefinition = Record<string, QuestDefinition>

const getKeyImage = (questUniqueId: QuestUniqueId, questDefinition: QuestDefinition) =>
  questDefinition.keyImage || `/quests-images/key/${questUniqueId}.webp`

const getSplashImage = (questUniqueId: QuestUniqueId, questDefinition: QuestDefinition) =>
  questDefinition.splashImage || `/quests-images/splash/${questUniqueId}.webp`

export function virtualQuests() {
  return virtualModuleFactory({
    name: 'quests',
    loadFn: ({ directory, languages }) => {
      const parseMarkdownFilePath = (...parts: string[]) => {
        const parsedMdFile = convertMarkdownFilePathToHtml(...parts)
        return createObject([
          createStringEntry('type', 'html'),
          createStringEntry('html', parsedMdFile)
        ])
      }

      const parseRewards = (rewards: QuestDefinition['rewards']) => {
        return (rewards || []).map((reward) => {
          return createObject([
            createStringEntry('type', reward.type),
            createNumberEntry('amount', reward.amount)
          ])
        })
      }

      const parseQuestDefinition = (
        language: string,
        questUniqueId: QuestUniqueId,
        questDefinition: QuestDefinition
      ) => {
        const pages = questDefinition.pages.map((page) => {
          if (typeof page === 'string') {
            const contentObject = parseMarkdownFilePath(directory, language, page)
            return createObject([createArrayEntry('content', [contentObject])])
          }

          return createObject([
            createArrayEntry(
              'content',
              page.content.map((content) => {
                if (typeof content === 'string') {
                  return parseMarkdownFilePath(directory, language, content)
                } else if (typeof content === 'object' && content.type === 'placeholder') {
                  return createObject([
                    createStringEntry('type', content.type),
                    createStringEntry('id', content.id)
                  ])
                } else {
                  return createObject([])
                }
              })
            ),
            ts.factory.createPropertyAssignment(
              'actions',
              createObject([
                createStringEntry('next', page.actions?.next || ''),
                createStringEntry('prev', page.actions?.prev || '')
              ])
            )
          ])
        })
        const rewards = parseRewards(questDefinition.rewards)

        return ts.factory.createPropertyAssignment(
          questUniqueId,
          createObject([
            createStringEntry('id', questUniqueId),
            createStringEntry('title', questDefinition.title),
            createStringEntry('keyImage', getKeyImage(questUniqueId, questDefinition)),
            createStringEntry('splashImage', getSplashImage(questUniqueId, questDefinition)),
            createStringEntry('description', questDefinition.description),
            createNumberEntry('minutesToComplete', questDefinition.minutesToComplete),
            createArrayEntry('rewards', rewards),
            createArrayEntry('pages', pages)
          ])
        )
      }

      const parseQuestsDefinition = (language: string, questsDefinition: QuestsDefinition) => {
        const questDefinitions: [QuestUniqueId, QuestDefinition][] =
          Object.entries(questsDefinition)

        return createObject(
          questDefinitions.map(([questUniqueId, questDefinition]) =>
            parseQuestDefinition(language, questUniqueId, questDefinition)
          )
        )
      }

      try {
        const node = createObject(
          languages.map((language) => {
            const definition = readDefinitionJson<QuestsDefinition>(directory, language)

            return ts.factory.createPropertyAssignment(
              language,
              parseQuestsDefinition(language, definition)
            )
          })
        )
        return `export const QuestsContent = ${tsPrinter(node)};`
      } catch (e) {
        console.error(e)
        return 'export const QuestsContent = {};'
      }
    }
  })
}
