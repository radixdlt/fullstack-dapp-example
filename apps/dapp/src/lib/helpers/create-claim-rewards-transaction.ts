import { ErrorPopupId, errorPopupStore } from '../../stores'
import { gatewayApi, publicConfig } from '$lib/public-config'
import { okAsync, ResultAsync } from 'neverthrow'

export const handleKycBadge = (
  userId: string,
  userAccountAddress: string,
  sendTx: (instapassBadgeLocalId?: string) => ResultAsync<unknown, unknown>
) => {
  const showWarning = () => {
    errorPopupStore.set({ id: ErrorPopupId.XrdRewardLimit })
    return okAsync(undefined)
  }

  return gatewayApi.hasKycEntry(userId).andThen((hasKycEntry) => sendTx())
}

export const createClaimXRDRewardsTransaction = (
  accountAddress: string,
  userId: string,
  questId: string,
  amount: number,
  instapassBadge?: string
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

         ${
           instapassBadge
             ? `CALL_METHOD
                  Address("${accountAddress}")
                  "create_proof_of_non_fungibles"
                  Address("${publicConfig.badges.instapassBadgeAddress}")
                  Array<NonFungibleLocalId>(NonFungibleLocalId("${instapassBadge}"));

              POP_FROM_AUTH_ZONE
                  Proof("kyc_badge_proof");`
             : ''
         }

        CALL_METHOD
          Address("${publicConfig.components.questRewards}")
          "claim_reward"
          "${questId}"
          Proof("hero_badge_proof")
          ${instapassBadge ? `Some(Proof("kyc_badge_proof"))` : 'None'}
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

export const createClaimRewardsV2Transaction = (
  accountAddress: string,
  userId: string,
  questId: string,
  rewards: { amount: string; resourceAddress: string }[]
) => `
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
      Address("${publicConfig.components.questRewardsV2}")
      "claim_reward"
      "${questId}"
      Proof("hero_badge_proof")
    ;

  ${rewards
    .map(
      (reward, index) =>
        `
    TAKE_FROM_WORKTOP
      Address("${reward.resourceAddress}")
      Decimal("${reward.amount}")
      Bucket("bucket${index}")
    ;

    CALL_METHOD
      Address("${accountAddress}")
      "try_deposit_or_abort"
      Bucket("bucket${index}")
      Enum<0u8>()
    ;`
    )
    .join('')}   

`

export const createClaimRewardsTransaction = (
  accountAddress: string,
  userId: string,
  questId: string,
  rewards: { amount: string; resourceAddress: string }[],
  instapassBadge?: string
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

        ${
          instapassBadge
            ? `CALL_METHOD
                  Address("${accountAddress}")
                  "create_proof_of_non_fungibles"
                  Address("${publicConfig.badges.instapassBadgeAddress}")
                  Array<NonFungibleLocalId>(NonFungibleLocalId("${instapassBadge}"));

              POP_FROM_AUTH_ZONE
                  Proof("kyc_badge_proof");`
            : ''
        }

        CALL_METHOD
          Address("${publicConfig.components.questRewards}")
          "claim_reward"
          "${questId}"
          Proof("hero_badge_proof")
          ${instapassBadge ? `Some(Proof("kyc_badge_proof"))` : 'None'};

         ${rewards
           .map(
             (reward, index) =>
               `
             TAKE_FROM_WORKTOP
              Address("${reward.resourceAddress}")
              Decimal("${reward.amount}")
              Bucket("bucket${index}");

            CALL_METHOD
              Address("${accountAddress}")
              "try_deposit_or_abort"
              Bucket("bucket${index}")
              Enum<0u8>();`
           )
           .join('')}            
        
      `
}
