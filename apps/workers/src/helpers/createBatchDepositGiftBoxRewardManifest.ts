import { Addresses, EnergyCardNfData } from 'common'
import { config } from '../config'

export type CreateBatchDepositGiftBoxRewardManifest = {
  userId: string
  energyCards: EnergyCardNfData[]
  elementsAmount: number
  numberOfGiftBoxes: number
}

export const createBatchDepositGiftBoxRewardManifest = (
  input: CreateBatchDepositGiftBoxRewardManifest[]
) => {
  const addresses = Addresses(config.networkId)
  const { payer, system } = addresses.accounts
  const { adminBadgeAddress } = addresses.badges
  const { elementAddress, morphEnergyCardAddress } = addresses.resources
  const { giftBoxOpenerV2 } = addresses.components

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
      Decimal("100")
    ;
    `,
    `CALL_METHOD
      Address("${system.address}")
      "create_proof_of_amount"
      Address("${adminBadgeAddress}") 
      Decimal("1")
    ;`
  )

  const numberOfElementsToMint = input.reduce((acc, { elementsAmount }) => acc + elementsAmount, 0)

  addToManifest(
    `MINT_FUNGIBLE
      Address("${elementAddress}")
      Decimal("${numberOfElementsToMint}")
    ;`
  )

  const rewards = Object.entries(input).map(
    ([index, { userId, energyCards, elementsAmount, numberOfGiftBoxes }]) => {
      const buckets: string[] = []

      const createBucket = (name: string) => {
        const bucketName = `${name}_${userId}_bucket_${buckets.length + 1}_${index}`
        buckets.push(bucketName)
        return bucketName
      }

      const mintCardInput = energyCards.map(
        ({
          key_image_url,
          description,
          name,
          energy_type,
          rarity,
          quality,
          limited_edition,
          energy_description
        }) =>
          `Tuple(
            "${userId}",
            Tuple(
              "${key_image_url}",
              "${name}",
              "${description}",
              "${energy_type}",
              "${energy_description}",
              "${rarity}",
              Decimal("${quality}"),
              ${limited_edition},
            )
          )`
      )

      addToManifest(
        `CALL_METHOD
          Address("${config.radQuest.components.cardForgeV2}")
          "mint_cards"
          Array<Tuple>(${mintCardInput})
        ;`,

        `TAKE_ALL_FROM_WORKTOP
          Address("${morphEnergyCardAddress}")
          Bucket("${createBucket('card')}")
        ;`
      )

      addToManifest(
        `TAKE_FROM_WORKTOP
          Address("${elementAddress}")
          Decimal("${elementsAmount}")
          Bucket("${createBucket('elements')}")
        ;`
      )

      const rewardBuckets = buckets.map((name) => `Bucket("${name}")`)

      return {
        userId,
        rewardBuckets,
        numberOfGiftBoxes
      }
    }
  )

  const manifestInput = rewards.map(({ userId, rewardBuckets, numberOfGiftBoxes }) => {
    return `Tuple(
      "${userId}",
      Decimal("${numberOfGiftBoxes}"),
      Array<Bucket>(
        ${rewardBuckets.join(', ')}
      ),
    )`
  })

  addToManifest(
    `CALL_METHOD
      Address("${system.address}")
      "create_proof_of_amount"
      Address("${adminBadgeAddress}")
      Decimal("1")
    ;`,

    `CALL_METHOD
      Address("${giftBoxOpenerV2}")
      "deposit_gift_box_rewards"
      Array<Tuple>(
        ${manifestInput.join(', ')}
      )
    ;`
  )

  return manifest.map((line) => line.trim()).join('\n')
}
