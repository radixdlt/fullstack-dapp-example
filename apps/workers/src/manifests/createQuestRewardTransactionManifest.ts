import { okAsync } from 'neverthrow'
import { DepositQuestRewardJob } from 'queues'
import { createBatchQuestRewardsDepositManifest } from '../helpers/createBatchQuestRewardsDepositManifest'
import { QuestDefinitions, QuestId, QuestReward } from 'content'

export const createQuestRewardTransactionManifest = (items: DepositQuestRewardJob[]) => {
  const questDefinitions = QuestDefinitions()

  const transformToUserReward = (input: DepositQuestRewardJob) => {
    const { questId, userId } = input

    const questDefinition = questDefinitions[questId as QuestId]
    const rewards = questDefinition.rewards as unknown as QuestReward[]

    return {
      userId,
      questId,
      rewards
    }
  }

  return okAsync(createBatchQuestRewardsDepositManifest(items.map(transformToUserReward)))
}
