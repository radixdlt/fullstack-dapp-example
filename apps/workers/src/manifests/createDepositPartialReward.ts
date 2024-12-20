import { DepositPartialRewardJob } from 'queues'
import { QuestDefinitions, QuestId, QuestReward } from 'content'
import { createBatchQuestRewardsDepositManifest } from '../helpers/createBatchQuestRewardsDepositManifest'
import { okAsync } from 'neverthrow'
import { AppLogger } from 'common'

const questDefinitions = QuestDefinitions()

export const createDepositPartialRewardManifest = (
  items: DepositPartialRewardJob[],
  logger: AppLogger
) => {
  const withRewards = items.map((item) => {
    const { questId: fullQuestId, requirement } = item
    const [questId] = fullQuestId.split(':')

    const questDefinition = questDefinitions[questId as QuestId] as {
      partialRewards: Record<string, QuestReward[]>
    }

    const rewards = questDefinition?.partialRewards?.[requirement]

    return { rewards, questId: fullQuestId, userId: item.userId }
  })

  logger.debug({ method: 'createDepositPartialRewardManifest', items, withRewards })

  return okAsync(createBatchQuestRewardsDepositManifest(withRewards))
}
