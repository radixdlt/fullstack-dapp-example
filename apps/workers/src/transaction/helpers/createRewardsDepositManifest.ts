import { Addresses } from 'common'
import { QuestReward } from 'content'
import { config } from '../../config'
import { randomFloat } from '../../helpers/randomFloat'

export const createRewardsDepositManifest = ({
  wellKnownAddresses,
  questId,
  userId,
  rewards,
  includeKycOracleUpdate = false
}: {
  rewards: readonly QuestReward[]
  questId: string
  userId: string
  includeKycOracleUpdate?: boolean
  wellKnownAddresses: {
    accountAddress: {
      payerAccount: string
      systemAccount: string
    }
  }
}) => {
  const addresses = Addresses(config.networkId)
  const { payerAccount, systemAccount } = wellKnownAddresses.accountAddress
  const { adminBadgeAddress } = addresses.badges
  const { elementAddress, clamAddress, giftBox } = addresses.resources

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

    // CALL_METHOD
    //   Address("${addresses.accounts.system.address}")
    //   "create_proof_of_amount"
    //   Address("${addresses.badges.adminBadgeAddress}")
    //   Decimal("1")
    // ;

    // MINT_FUNGIBLE
    //   Address("${addresses.resources.giftBox[kind]}")
    //   Decimal("1")
    // ;

    switch (reward.name) {
      case 'starterGiftBox': {
        addToManifest(
          `MINT_FUNGIBLE
            Address("${giftBox.starter}")
            Decimal("${reward.amount}")
          ;`,
          `TAKE_FROM_WORKTOP
            Address("${giftBox.starter}")
            Decimal("${reward.amount}")
            Bucket("${createBucket('gift_box')}")
          ;`
        )
        break
      }
      case 'simpleGiftBox': {
        addToManifest(
          `MINT_FUNGIBLE
            Address("${giftBox.simple}")
            Decimal("${reward.amount}")
          ;`,
          `TAKE_FROM_WORKTOP
            Address("${giftBox.simple}")
            Decimal("${reward.amount}")
            Bucket("${createBucket('gift_box')}")
          ;`
        )
        break
      }

      case 'fancyGiftBox': {
        addToManifest(
          `MINT_FUNGIBLE
            Address("${giftBox.fancy}")
            Decimal("${reward.amount}")
          ;`,
          `TAKE_FROM_WORKTOP
            Address("${giftBox.fancy}")
            Decimal("${reward.amount}")
            Bucket("${createBucket('gift_box')}")
          ;`
        )
        break
      }

      case 'eliteGiftBox': {
        addToManifest(
          `MINT_FUNGIBLE
            Address("${giftBox.elite}")
            Decimal("${reward.amount}")
          ;`,
          `TAKE_FROM_WORKTOP
            Address("${giftBox.elite}")
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

      default:
        break
    }
  }

  const rewardBuckets = buckets.map((name) => `Bucket("${name}")`)

  // Deposit the rewards to Quest Rewards component
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
