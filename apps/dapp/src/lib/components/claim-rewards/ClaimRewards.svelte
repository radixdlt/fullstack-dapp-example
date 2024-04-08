<script lang="ts">
  import ClaimRewardsUI from './ClaimRewardsUI.svelte'
  import { publicConfig } from '$lib/public-config'
  import { rdt } from '$lib/rdt'
  import { user } from '../../../stores'
  import { createEventDispatcher, onMount } from 'svelte'
  import { QuestDefinitions, type Quests } from 'content'
  import { questApi } from '$lib/api/quest-api'

  export let questId: keyof Quests

  const questDefinition = QuestDefinitions(publicConfig.networkId)[questId]
  const dispatch = createEventDispatcher<{
    next: undefined
  }>()

  onMount(async () => {
    const result = await questApi.getQuestInformation(questId)

    if (result.isOk()) {
      const { status } = result.value

      if (status === 'REWARDS_CLAIMED') {
        dispatch('next')
      }
    }
  })

  const handleClaimRewards = () => {
    loading = true

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

<ClaimRewardsUI {loading} rewards={questDefinition.rewards} on:click={handleClaimRewards} />
