import { QuestDefinitions, type QuestId } from 'content'

export const hasAnyRewards = (quest: QuestId) =>
  QuestDefinitions()[quest].rewards && QuestDefinitions()[quest].rewards.length > 0
