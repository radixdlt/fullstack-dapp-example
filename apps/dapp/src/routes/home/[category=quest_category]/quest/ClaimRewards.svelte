<script lang="ts">
  import { publicConfig } from '$lib/public-config'
  import { sendTransaction } from '$lib/rdt'
  import { createEventDispatcher, onMount } from 'svelte'
  import { QuestDefinitions, type Quests } from 'content'
  import { questApi } from '$lib/api/quest-api'
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import { user } from '../../../../stores'

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

  export const claim = () =>
    sendTransaction({
      transactionManifest: `
        CALL_METHOD
          Address("${$user?.accountAddress!}")
          "create_proof_of_non_fungibles"
          Address("${publicConfig.badges.heroBadgeAddress}")
          Array<NonFungibleLocalId>(NonFungibleLocalId("<${$user?.id}>"))
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
          Address("${$user?.accountAddress}")
          "deposit_batch"
          Expression("ENTIRE_WORKTOP")
        ;
      `
    })
</script>

<ClaimRewards rewards={questDefinition.rewards} {text} />
