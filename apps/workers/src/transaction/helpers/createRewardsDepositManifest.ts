import { Addresses, EnergyCardNfData } from 'common'
import { QuestReward } from 'content'
import { config } from '../../config'

export const createRewardsDepositManifest = ({
  wellKnownAddresses,
  questId,
  userId,
  rewards,
  includeKycOracleUpdate = false,
  depositRewardsTo
}: {
  rewards: (
    | QuestReward
    | { name: 'energyCard'; card: EnergyCardNfData }
    | { name: 'elements'; amount: number }
  )[]
  questId?: string
  userId: string
  includeKycOracleUpdate?: boolean
  wellKnownAddresses: {
    accountAddress: {
      payerAccount: string
      systemAccount: string
    }
  }
  depositRewardsTo: 'questRewards' | 'giftBoxOpener'
}) => {
  const addresses = Addresses(config.networkId)
  const { payerAccount, systemAccount } = wellKnownAddresses.accountAddress
  const { adminBadgeAddress } = addresses.badges
  const { elementAddress, morphEnergyCards, clamAddress, giftBox } = addresses.resources

  const buckets: string[] = []
  const manifest: string[] = []

  const addToManifest = (...parts: string[]) => manifest.push(...parts)

  addToManifest(
    `CALL_METHOD
      Address("${payerAccount}")
      "lock_fee"
      Decimal("50")
    ;`,
    `CALL_METHOD
      Address("${systemAccount}")
      "create_proof_of_amount"
      Address("${adminBadgeAddress}") 
      Decimal("1")
    ;`
  )

  for (const reward of rewards) {
    const createBucket = (name: string) => {
      const bucketName = `${name}_bucket_${buckets.length + 1}`
      buckets.push(bucketName)
      return bucketName
    }

    switch (reward.name) {
      case 'starterGiftBox': {
        addToManifest(
          `MINT_FUNGIBLE
            Address("${giftBox.Starter}")
            Decimal("${reward.amount}")
          ;`,
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
          `MINT_FUNGIBLE
            Address("${giftBox.Simple}")
            Decimal("${reward.amount}")
          ;`,
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
          `MINT_FUNGIBLE
            Address("${giftBox.Fancy}")
            Decimal("${reward.amount}")
          ;`,
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
          `MINT_FUNGIBLE
            Address("${giftBox.Elite}")
            Decimal("${reward.amount}")
          ;`,
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
          `MINT_FUNGIBLE
              Address("${clamAddress}")
              Decimal("${reward.amount}")
            ;`,
          `TAKE_FROM_WORKTOP
              Address("${clamAddress}")
              Decimal("${reward.amount}")
              Bucket("${createBucket('clam')}")
            ;`
        )
        break
      }

      case 'elements': {
        addToManifest(
          `MINT_FUNGIBLE
              Address("${elementAddress}")
              Decimal("${reward.amount}")
            ;`,
          `TAKE_FROM_WORKTOP
              Address("${elementAddress}")
              Decimal("${reward.amount}")
              Bucket("${createBucket('elements')}")
            ;`
        )
        break
      }

      case 'xrd': {
        addToManifest(
          `CALL_METHOD
            Address("${payerAccount}")
            "withdraw"
            Address("${addresses.xrd}")
            Decimal("${reward.amount}")
          ;`,
          `TAKE_ALL_FROM_WORKTOP
            Address("${addresses.xrd}")
            Bucket("${createBucket('xrd')}")
          ;`
        )
        break
      }

      case 'energyCard': {
        const { key_image_url, description, name, energy_type, rarity, quality, limited_edition } =
          reward.card

        addToManifest(
          `CALL_METHOD
              Address("${config.radQuest.components.cardForge}")
              "mint_card"
              "${userId}"
              "${key_image_url}"
              "${name}"
              "${description}"
              "${energy_type}"
              "${rarity}"
              Decimal("${quality}")
              ${limited_edition}
          ;`,

          `TAKE_ALL_FROM_WORKTOP
            Address("${morphEnergyCards}")
            Bucket("${createBucket('card')}")
        ;`
        )
        break
      }

      default:
        break
    }
  }

  const rewardBuckets = buckets.map((name) => `Bucket("${name}")`)

  // Deposit the rewards to Quest Rewards component
  if (depositRewardsTo === 'questRewards')
    addToManifest(
      `CALL_METHOD
      Address("${systemAccount}")
      "create_proof_of_amount"
      Address("${adminBadgeAddress}")
      Decimal("1")
    ;`,
      `CALL_METHOD
      Address("${addresses.components.questRewards}")
      "deposit_reward"
      "${userId}"
      "${questId}"
      # Array of Buckets to deposit
      Array<Bucket>(${rewardBuckets.join(',')})
    ;`
    )

  if (depositRewardsTo === 'giftBoxOpener')
    addToManifest(
      `CALL_METHOD
        Address("${systemAccount}")
        "create_proof_of_amount"
        Address("${adminBadgeAddress}")
        Decimal("1")
      ;`,

      `CALL_METHOD
        Address("${addresses.components.giftBoxOpener}")
        "deposit_gift_box_rewards"
        "${userId}"
        # Array of Buckets to deposit
        Array<Bucket>(${rewardBuckets.join(',')})
      ;`
    )

  if (includeKycOracleUpdate)
    addToManifest(
      `CALL_METHOD
        Address("${systemAccount}")
        "create_proof_of_amount"
        Address("${adminBadgeAddress}")
        Decimal("1")
      ;`,

      `CALL_METHOD
        Address("${addresses.components.kycOracle}")
        "update_user_kyc_requirement"
        "${userId}"
        true
      ;`
    )

  return manifest.map((line) => line.trim()).join('\n')
}
