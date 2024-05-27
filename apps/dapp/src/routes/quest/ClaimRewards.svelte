<script lang="ts">
  import { publicConfig } from '$lib/public-config'
  import { rdt } from '$lib/rdt'

  import { onMount } from 'svelte'
  import { QuestDefinitions, type Quests } from 'content'
  import { questApi } from '$lib/api/quest-api'
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import { user } from '../../stores'
  import { userApi } from '$lib/api/user-api'
  import { i18n } from '$lib/i18n/i18n'

  export let questId: keyof Quests
  export let onNext: () => void
  export let onBack: () => void
  export let text: string

  const questDefinition = QuestDefinitions()[questId]

  onMount(async () => {
    const result = await questApi.getQuestInformation(questId)

    if (result.isOk()) {
      const { status } = result.value

      if (status === 'REWARDS_CLAIMED' || status === 'COMPLETED') {
        onNext()
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
          onNext()
        })
        .mapErr(() => {
          loading = false
        })
    })
  }

  let loading = false
</script>

<ClaimRewards
  rewards={questDefinition.rewards}
  {text}
  {loading}
  nextButtonText={$i18n.t('quests:claimButton')}
  {onBack}
  onNext={handleClaimRewards}
/>
