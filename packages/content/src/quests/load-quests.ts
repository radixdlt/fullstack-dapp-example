import { Language, QuestDefinitions, QuestId } from '..'
import QuestIndex from './quest-index.json'

export type Quests = {
  [key in QuestId]: {
    text: key extends keyof typeof QuestIndex ? (typeof QuestIndex)[key][Language] : undefined
    id: key
    splashImage: string
  } & ReturnType<typeof QuestDefinitions>[key]
}

export const loadQuests = (language: Language, networkId: number) => {
  const quests: Quests = {} as Quests
  const questDefinitions = QuestDefinitions(networkId)

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
