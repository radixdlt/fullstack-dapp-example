import { Addresses } from 'common'
import { QuestReward } from 'content'
import { config } from '../config'

export type CreateBatchQuestRewardsDepositManifestInput = {
  userId: string
  questId: string
  rewards: QuestReward[]
}

export const createBatchQuestRewardsDepositManifest = (
  input: CreateBatchQuestRewardsDepositManifestInput[]
) => {
  const addresses = Addresses
  const { payer, system } = addresses.accounts
  const { adminBadgeAddress } = addresses.badges
  const { clamAddress, giftBox } = addresses.resources

  const manifest: string[] = []

  const addToManifest = (...parts: string[]) => manifest.push(...parts)

  addToManifest(
    `CALL_METHOD
      Address("${payer.accessController}")
      "create_proof"
    ;
    `,
    `CALL_METHOD
      Address("${system.accessController}")
      "create_proof"
    ;
    `,
    `CALL_METHOD
      Address("${payer.address}")
      "lock_fee"
      Decimal("50")
    ;
    `,
    `CALL_METHOD
      Address("${system.address}")
      "create_proof_of_amount"
      Address("${adminBadgeAddress}") 
      Decimal("1")
    ;`
  )

  const allRewards = input.map(({ rewards }) => rewards).flat()

  const amountOfRewardsToMint = allRewards.reduce(
    (acc, reward) => {
      acc[reward.name] = reward.amount + acc[reward.name]
      return acc
    },
    {
      xrd: 0,
      clam: 0,
      starterGiftBox: 0,
      simpleGiftBox: 0,
      fancyGiftBox: 0,
      eliteGiftBox: 0
    }
  )

  addToManifest(
    amountOfRewardsToMint.starterGiftBox
      ? `MINT_FUNGIBLE
      Address("${giftBox.Starter}")
      Decimal("${amountOfRewardsToMint.starterGiftBox}")
    ;
    `
      : '',
    amountOfRewardsToMint.simpleGiftBox
      ? `MINT_FUNGIBLE
      Address("${giftBox.Simple}")
      Decimal("${amountOfRewardsToMint.simpleGiftBox}")
    ;
    `
      : '',
    amountOfRewardsToMint.fancyGiftBox
      ? `MINT_FUNGIBLE
      Address("${giftBox.Fancy}")
      Decimal("${amountOfRewardsToMint.fancyGiftBox}")
    ;`
      : '',
    amountOfRewardsToMint.eliteGiftBox
      ? `MINT_FUNGIBLE
      Address("${giftBox.Elite}")
      Decimal("${amountOfRewardsToMint.eliteGiftBox}")
    ;`
      : '',
    amountOfRewardsToMint.clam
      ? `MINT_FUNGIBLE
      Address("${clamAddress}")
      Decimal("${amountOfRewardsToMint.clam}")
    ;`
      : '',
    amountOfRewardsToMint.xrd
      ? `CALL_METHOD
      Address("${payer.address}")
      "withdraw"
      Address("${addresses.xrd}")
      Decimal("${amountOfRewardsToMint.xrd}")
    ;`
      : ''
  )

  const depositUsersRewardInput = input
    .map(({ userId, questId, rewards }) => {
      const buckets: string[] = []

      const createBucket = (name: string) => {
        const bucketName = `${name}_${userId}_bucket_${buckets.length + 1}`
        buckets.push(bucketName)
        return bucketName
      }

      for (const reward of rewards) {
        switch (reward.name) {
          case 'starterGiftBox': {
            addToManifest(
              `TAKE_FROM_WORKTOP
              Address("${giftBox.Starter}")
              Decimal("${reward.amount}")
              Bucket("${createBucket('gift_box')}")
            ;`
            )
            break
          }

          case 'simpleGiftBox': {
            addToManifest(
              `TAKE_FROM_WORKTOP
              Address("${giftBox.Simple}")
              Decimal("${reward.amount}")
              Bucket("${createBucket('gift_box')}")
            ;`
            )
            break
          }

          case 'fancyGiftBox': {
            addToManifest(
              `TAKE_FROM_WORKTOP
              Address("${giftBox.Fancy}")
              Decimal("${reward.amount}")
              Bucket("${createBucket('gift_box')}")
            ;`
            )
            break
          }

          case 'eliteGiftBox': {
            addToManifest(
              `TAKE_FROM_WORKTOP
              Address("${giftBox.Elite}")
              Decimal("${reward.amount}")
              Bucket("${createBucket('gift_box')}")
            ;`
            )
            break
          }

          case 'clam': {
            addToManifest(
              `TAKE_FROM_WORKTOP
                Address("${clamAddress}")
                Decimal("${reward.amount}")
                Bucket("${createBucket('clam')}")
              ;`
            )
            break
          }

          case 'xrd': {
            addToManifest(
              `TAKE_FROM_WORKTOP
              Address("${addresses.xrd}")
              Decimal("${reward.amount}")
              Bucket("${createBucket('xrd')}")
            ;`
            )
            break
          }

          default:
            break
        }
      }

      const rewardBuckets = buckets.map((name) => `Bucket("${name}")`).join(', ')

      return `
      Tuple(
        "${userId}",
        "${questId}",
        Array<Bucket>(${rewardBuckets})
      )`
    })
    .join(', ')

  addToManifest(
    `CALL_METHOD
      Address("${system.address}")
      "create_proof_of_amount"
      Address("${adminBadgeAddress}")
      Decimal("1")
    ;`,
    `CALL_METHOD
      Address("${addresses.components.questRewardsV2}")
      "deposit_users_rewards"
      Array<Tuple>(${depositUsersRewardInput})
    ;`
  )

  return manifest.map((line) => line.trim()).join('\n')
}
