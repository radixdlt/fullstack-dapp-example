import { DepositPartialRewardJob } from 'queues'
import { QuestDefinitions, QuestId, QuestReward } from 'content'
import { createBatchQuestRewardsDepositManifest } from '../helpers/createBatchQuestRewardsDepositManifest'
import { okAsync } from 'neverthrow'

const questDefinitions = QuestDefinitions()

export const createDepositPartialRewardManifest = (items: DepositPartialRewardJob[]) => {
  const withRewards = items.map((item) => {
    const { questId, requirement } = item

    const questDefinition = questDefinitions[questId as QuestId] as {
      partialRewards: Record<string, QuestReward[]>
    }

    const rewards = questDefinition?.partialRewards?.[requirement]

    return { rewards, questId, userId: item.userId }
  })

  return okAsync(createBatchQuestRewardsDepositManifest(withRewards))
}
