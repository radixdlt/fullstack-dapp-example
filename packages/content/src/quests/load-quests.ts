import { Language, QuestDefinitions, QuestId } from '..'
import QuestIndex from './quest-index.json'

export type Quests = {
  [key in QuestId]: {
    text: (typeof QuestIndex)[key][Language]
    id: key
    splashImage: string
  } & ReturnType<typeof QuestDefinitions>[key]
}

export const loadQuests = (language: Language, networkId: number) => {
  const quests: Quests = {} as Quests
  const questDefinitions = QuestDefinitions(networkId)

  Object.entries(questDefinitions).forEach(([id, quest]) => {
    // @ts-ignore
    quests[id] = {
      // @ts-ignore
      text: QuestIndex[id][language],
      id,
      splashImage: `/quests-images/splash/${id}.webp`,
      ...quest
    }
  })

  return quests
}
