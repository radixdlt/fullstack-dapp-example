import { publicConfig } from '../public-config'

export const GiftBoxManifests = (userId: string, userAccuntAddress: string) => {
  return {
    /* @deprecated */
    openGiftBoxV1: (giftBoxAddress: string) => `
        CALL_METHOD
        Address("${userAccuntAddress}")
        "create_proof_of_non_fungibles"
        Address("${publicConfig.badges.heroBadgeAddress}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("<${userId}>")
        );

        POP_FROM_AUTH_ZONE
            Proof("hero_badge_proof");

        CALL_METHOD
            Address("${userAccuntAddress}")
            "withdraw"
            Address("${giftBoxAddress}")
            Decimal("1");

        TAKE_ALL_FROM_WORKTOP
            Address("${giftBoxAddress}")
            Bucket("gift_box");

        CALL_METHOD
            Address("${publicConfig.components.giftBoxOpener}")
            "open_gift_box"
            Proof("hero_badge_proof")
            Bucket("gift_box");
    `,
    claimItemsV1: (amountOfElements: number = 0) => `
        CALL_METHOD
        Address("${userAccuntAddress}")
        "create_proof_of_non_fungibles"
        Address("${publicConfig.badges.heroBadgeAddress}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("<${userId}>")
        );

        POP_FROM_AUTH_ZONE
            Proof("hero_badge_proof");

        CALL_METHOD
            Address("${publicConfig.components.giftBoxOpener}")
            "claim_gift_box_rewards"
            Proof("hero_badge_proof");
        
        TAKE_FROM_WORKTOP
            Address("${publicConfig.resources.elementAddress}")
            Decimal("${amountOfElements}")
            Bucket("bucket1");
      
        CALL_METHOD
            Address("${userAccuntAddress}")
            "try_deposit_or_abort"
            Bucket("bucket1")
            Enum<0u8>();

        CALL_METHOD
            Address("${userAccuntAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
    `,
    openGiftBoxV2: (giftBoxAddress: string, amount = 1) => `
        CALL_METHOD
            Address("${userAccuntAddress}")
            "create_proof_of_non_fungibles"
            Address("${publicConfig.badges.heroBadgeAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("<${userId}>")
            );

        POP_FROM_AUTH_ZONE
            Proof("hero_badge_proof");

        CALL_METHOD
            Address("${userAccuntAddress}")
            "withdraw"
            Address("${giftBoxAddress}")
            Decimal("${amount}");

        TAKE_ALL_FROM_WORKTOP
            Address("${giftBoxAddress}")
            Bucket("gift_box_simple");

        CALL_METHOD
            Address("${publicConfig.components.giftBoxOpenerV2}")
            "open_gift_boxes"
            Proof("hero_badge_proof")
            Bucket("gift_box_simple");
    `,
    claimItemsV2: (amountOfElements: number = 0) => `
        CALL_METHOD
            Address("${userAccuntAddress}")
            "create_proof_of_non_fungibles"
            Address("${publicConfig.badges.heroBadgeAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("<${userId}>")
            );

        POP_FROM_AUTH_ZONE
            Proof("hero_badge_proof");

        CALL_METHOD
            Address("${publicConfig.components.giftBoxOpenerV2}")
            "claim_gift_box_rewards"
            Proof("hero_badge_proof")
            1u64; # max number of gift box contents to claim

        TAKE_FROM_WORKTOP
            Address("${publicConfig.resources.elementAddress}")
            Decimal("${amountOfElements}")
            Bucket("bucket1");
      
        CALL_METHOD
            Address("${userAccuntAddress}")
            "try_deposit_or_abort"
            Bucket("bucket1")
            Enum<0u8>();

        CALL_METHOD
            Address("${userAccuntAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP");

    `,
    previewNextClaimV2: () => `
        CALL_METHOD
            Address("${publicConfig.components.giftBoxOpenerV2}")
            "get_user_reward_records"
            "${userId}";
    `
  }
}
