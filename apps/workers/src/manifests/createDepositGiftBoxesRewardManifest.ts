import { ResultAsync } from 'neverthrow'
import { DepositGiftBoxesRewardJob } from 'queues'
import { getRandomFloat, getRandomIntInclusive, GiftBoxReward, GiftBoxRewardConfig } from 'common'
import { WorkerError } from '../_types'
import { createBatchDepositGiftBoxRewardManifest } from '../helpers/createBatchDepositGiftBoxRewardManifest'
import { PrismaClient } from 'database'

export const createDepositGiftBoxesRewardManifest =
  (dbClient: PrismaClient) => (items: DepositGiftBoxesRewardJob[]) => {
    const getGiftBoxRewards = GiftBoxReward(
      GiftBoxRewardConfig({ getRandomFloat, getRandomIntInclusive })
    )

    const addRewardsToItem = (job: DepositGiftBoxesRewardJob) => {
      const rewards = new Array(job.amount).fill(null).map(() => getGiftBoxRewards(job.giftBoxKind))
      const elementAmount = rewards.reduce((acc, { elements }) => acc + elements, 0)
      const energyCards = rewards.map(({ energyCard }) => energyCard)
      return { ...job, elementAmount, energyCards }
    }

    const getCardImages = (keys: string[]) => {
      const cardShapes = new Map<string, string>()
      keys.forEach((key) => cardShapes.set(key, ''))
      const uniqueKeys = [...cardShapes.keys()]

      return ResultAsync.fromPromise(
        dbClient.image
          .findMany({ where: { id: { in: uniqueKeys } }, select: { id: true, url: true } })
          .then((images) =>
            images.reduce<Record<string, string>>((acc, { id, url }) => ({ ...acc, [id]: url }), {})
          ),
        (error) => ({ reason: WorkerError.FailedToGetImageUrl, jsError: error })
      )
    }

    const itemsWithRewards = items.map(addRewardsToItem)
    const cardImageKeys = itemsWithRewards
      .map((item) => item.energyCards.map(({ key }) => key))
      .flat()

    return getCardImages(cardImageKeys)
      .map((cardImages) =>
        itemsWithRewards.map((item) => ({
          userId: item.userId,
          elementsAmount: item.elementAmount,
          energyCards: item.energyCards.map((item) => ({
            ...item,
            key_image_url: cardImages[item.key]
          })),
          numberOfGiftBoxes: item.amount
        }))
      )
      .map(createBatchDepositGiftBoxRewardManifest)
  }
