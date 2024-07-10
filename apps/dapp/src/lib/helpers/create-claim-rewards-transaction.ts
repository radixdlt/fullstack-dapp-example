import { publicConfig } from '$lib/public-config'

export const createClaimXRDRewardsTransaction = (
  accountAddress: string,
  userId: string,
  questId: string,
  amount: number
) => {
  return `
        CALL_METHOD
          Address("${accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${publicConfig.badges.heroBadgeAddress}")
          Array<NonFungibleLocalId>(NonFungibleLocalId("<${userId}>"))
        ;

        POP_FROM_AUTH_ZONE
          Proof("hero_badge_proof")
        ;

        CALL_METHOD
          Address("${publicConfig.components.questRewards}")
          "claim_reward"
          "${questId}"
          Proof("hero_badge_proof")
          None
        ;

        TAKE_FROM_WORKTOP
              Address("${publicConfig.xrd}")
              Decimal("${amount}")
              Bucket("bucket");

        CALL_METHOD
          Address("${accountAddress}")
          "try_deposit_or_abort"
          Bucket("bucket")
          Enum<0u8>();
      `
}


export const createClaimRewardsTransaction = (
  accountAddress: string,
  userId: string,
  questId: string
) => {
  return `
        CALL_METHOD
          Address("${accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${publicConfig.badges.heroBadgeAddress}")
          Array<NonFungibleLocalId>(NonFungibleLocalId("<${userId}>"))
        ;

        POP_FROM_AUTH_ZONE
          Proof("hero_badge_proof")
        ;

        CALL_METHOD
          Address("${publicConfig.components.questRewards}")
          "claim_reward"
          "${questId}"
          Proof("hero_badge_proof")
          None
        ;

        CALL_METHOD
          Address("${accountAddress}")
          "deposit_batch"
          Expression("ENTIRE_WORKTOP")
        ;
      `
}
