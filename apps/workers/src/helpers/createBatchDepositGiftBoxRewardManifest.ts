import { Addresses, EnergyCardNfData } from 'common'
import { config } from '../config'

export type CreateBatchDepositGiftBoxRewardManifest = {
  userId: string
  energyCard: EnergyCardNfData
  elementsAmount: number
}

export const createBatchDepositGiftBoxRewardManifest = (
  input: CreateBatchDepositGiftBoxRewardManifest[]
) => {
  const addresses = Addresses(config.networkId)
  const { payer, system } = addresses.accounts
  const { adminBadgeAddress } = addresses.badges
  const { elementAddress, morphEnergyCardAddress } = addresses.resources

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

  const numberOfElementsToMint = input.reduce((acc, { elementsAmount }) => acc + elementsAmount, 0)

  addToManifest(
    `MINT_FUNGIBLE
      Address("${elementAddress}")
      Decimal("${numberOfElementsToMint}")
    ;`
  )

  for (const [index, { userId, energyCard, elementsAmount }] of Object.entries(input)) {
    const buckets: string[] = []

    const createBucket = (name: string) => {
      const bucketName = `${name}_${userId}_bucket_${buckets.length + 1}_${index}`
      buckets.push(bucketName)
      return bucketName
    }

    const {
      key_image_url,
      description,
      name,
      energy_type,
      rarity,
      quality,
      limited_edition,
      energy_description
    } = energyCard

    addToManifest(
      `CALL_METHOD
        Address("${config.radQuest.components.cardForge}")
        "mint_card"
        "${userId}"
        "${key_image_url}"
        "${name}"
        "${description}"
        "${energy_type}"
        "${energy_description}"
        "${rarity}"
        Decimal("${quality}")
        ${limited_edition}
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

    addToManifest(
      `CALL_METHOD
        Address("${system.address}")
        "create_proof_of_amount"
        Address("${adminBadgeAddress}")
        Decimal("1")
      ;`,

      `CALL_METHOD
        Address("${addresses.components.giftBoxOpener}")
        "deposit_gift_box_rewards"
        "${userId}"
        # Array of Buckets to deposit
        Array<Bucket>(${rewardBuckets.join(', ')})
      ;`
    )
  }

  return manifest.map((line) => line.trim()).join('\n')
}
