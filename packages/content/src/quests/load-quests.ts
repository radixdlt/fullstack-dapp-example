import { Language, QuestDefinitions, type QuestId } from '..'
import QuestIndex from './quest-index.json'

export type Quests = {
  [key in QuestId]: {
    text: key extends keyof typeof QuestIndex ? (typeof QuestIndex)[key][Language] : undefined
    id: key
    splashImage: string
  } & ReturnType<typeof QuestDefinitions>[key]
}

export const loadQuests = (language: Language) => {
  const quests: Quests = {} as Quests
  const questDefinitions = QuestDefinitions()

  Object.values(questDefinitions).forEach((quest) => {
    quests[quest.id] = {
      // @ts-ignore
      text: QuestIndex[quest.id]?.[language],
      // @ts-ignore
      splashImage: `/quests-images/splash/${quest.id}.webp`,
      ...quest
    }
  })

  return quests
}
