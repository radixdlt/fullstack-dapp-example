import { publicConfig } from '$lib/public-config'

export const createClaimRewardsTransaction = (
  accountAddress?: string | null,
  userId?: string,
  questId?: string
) => {
  if (!accountAddress || !userId || !questId) {
    throw new Error('Missing required parameters')
  }
  return `
        CALL_METHOD
          Address("${accountAddress!}")
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
