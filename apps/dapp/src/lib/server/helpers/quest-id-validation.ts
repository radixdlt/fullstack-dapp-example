import { QuestDefinitions } from 'content'

export const createInvalidQuestIdResponse = () =>
  new Response(JSON.stringify({ error: 'invalid quest id', status: 400 }), {
    headers: {
      'content-type': 'application/json'
    },
    status: 400
  })

export const isValidQuestId = (questId: string) =>
  Object.keys(QuestDefinitions()).includes(questId) ||
  ['QuestTogether:BronzeLevel', 'QuestTogether:SilverLevel', 'QuestTogether:GoldLevel'].includes(
    questId
  )
