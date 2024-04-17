<script lang="ts">
  import { publicConfig } from '$lib/public-config'
  import { rdt } from '$lib/rdt'

  import { createEventDispatcher, onMount } from 'svelte'
  import { QuestDefinitions, type Quests } from 'content'
  import { questApi } from '$lib/api/quest-api'
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import { user } from '../../stores'
  import { userApi } from '$lib/api/user-api'

  export let questId: keyof Quests

  const questDefinition = QuestDefinitions(publicConfig.networkId)[questId]
  const dispatch = createEventDispatcher<{
    next: undefined
  }>()

  onMount(async () => {
    const result = await questApi.getQuestInformation(questId)

    if (result.isOk()) {
      const { status } = result.value

      if (status === 'REWARDS_CLAIMED' || status === 'COMPLETED') {
        dispatch('next')
      }
    }
  })

  const handleClaimRewards = () => {
    loading = true

    rdt.then(async (rdt) => {
      const accountAddress = (await userApi.me())._unsafeUnwrap().accountAddress!

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
        .map(() => {
          loading = false
          dispatch('next')
        })
        .mapErr(() => {
          loading = false
        })
    })
  }

  let loading = false
</script>

<ClaimRewards {loading} rewards={questDefinition.rewards} on:click={handleClaimRewards}>
  <slot />
</ClaimRewards>
