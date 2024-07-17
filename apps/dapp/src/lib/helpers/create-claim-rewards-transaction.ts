import { publicConfig } from '$lib/public-config'
import type { sendTransaction } from '$lib/rdt'
import { GatewayApi } from 'common'
import type { ResultAsync } from 'neverthrow'

const gatewayApi = GatewayApi(publicConfig.networkId)

export const handleKycBadge = (
  account: string,
  sendTx: (instapassBadgeLocalId?: string) => ReturnType<typeof sendTransaction>,
  showWarning: () => ResultAsync<undefined, never>
) => {
  return gatewayApi
    .hasKycEntry(account)
    .andThen((hasKycEntry) =>
      hasKycEntry
        ? gatewayApi
            .getInstapassBadges(account)
            .andThen((localIds) => (localIds.length ? sendTx(localIds[0]) : showWarning()))
        : sendTx()
    )
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

export const createClaimRewardsTransaction = (
  accountAddress: string,
  userId: string,
  questId: string,
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

        CALL_METHOD
          Address("${accountAddress}")
          "deposit_batch"
          Expression("ENTIRE_WORKTOP")
        ;
      `
}
