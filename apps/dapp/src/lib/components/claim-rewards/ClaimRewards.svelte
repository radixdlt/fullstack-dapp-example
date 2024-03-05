<script lang="ts">
  import ClaimRewardsUI from './ClaimRewardsUI.svelte'
  import { publicConfig } from '$lib/public-config'
  import { QuestDefinitions } from 'content'
  import { rdt } from '$lib/rdt'
  import { user } from '../../../stores'
  import { createEventDispatcher } from 'svelte'

  export let questId: string

  const questDefinition = QuestDefinitions(publicConfig.networkId)[questId]
  const dispatch = createEventDispatcher()

  const handleClaimRewards = () => {
    rdt.then((rdt): void => {
      const accountAddress = rdt.walletApi.getWalletData().accounts[0].address
      rdt.walletApi
        .sendTransaction({
          transactionManifest: `
          CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${publicConfig.badges.userBadgeAddress}")
            Array<NonFungibleLocalId>(NonFungibleLocalId("<${$user?.id}>"));

          POP_FROM_AUTH_ZONE
            Proof("user_badge_proof");

          CALL_METHOD
            Address("${publicConfig.components.questRewards}")
            "claim_reward"
            "${questId}"
            Proof("user_badge_proof")
            None;

          CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP");
        `
        })
        .map(() => dispatch('next'))
    })
  }
</script>

<ClaimRewardsUI rewards={questDefinition.rewards} on:click={handleClaimRewards} />
