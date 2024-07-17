<script lang="ts">
  import { sendTransaction } from '$lib/rdt'
  import { createEventDispatcher, onMount } from 'svelte'
  import { QuestDefinitions, type Quests } from 'content'
  import { questApi } from '$lib/api/quest-api'
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import { user } from '../../../../stores'
  import {
    createClaimRewardsTransaction,
    handleKycBadge
  } from '$lib/helpers/create-claim-rewards-transaction'

  export let questId: keyof Quests
  export let text: string

  const questDefinition = QuestDefinitions()[questId]
  const dispatch = createEventDispatcher<{ claimed: undefined }>()

  onMount(async () => {
    const result = await questApi.getQuestInformation(questId)

    if (result.isOk()) {
      const { status } = result.value

      if (status === 'REWARDS_CLAIMED' || status === 'COMPLETED') {
        dispatch('claimed')
      }
    }
  })

  export const claim = () => {
    const sendTx = (instapassBadge?: string) =>
      sendTransaction({
        transactionManifest: createClaimRewardsTransaction(
          $user?.accountAddress!,
          $user?.id!,
          questId,
          instapassBadge
        )
      })

    return handleKycBadge($user?.id!, $user?.accountAddress!, sendTx)
  }
</script>

<ClaimRewards rewards={questDefinition.rewards} {text} />
