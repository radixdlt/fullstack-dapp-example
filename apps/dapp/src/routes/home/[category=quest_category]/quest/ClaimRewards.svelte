<script lang="ts">
  import { sendTransaction } from '$lib/rdt'
  import { createEventDispatcher, onMount } from 'svelte'
  import { QuestDefinitions, type Quests } from 'content'
  import { questApi } from '$lib/api/quest-api'
  import Icon from '$lib/components/icon/Icon.svelte'
  import { typeToIcon } from '$lib/utils/type-to-icon'
  import { i18n } from '$lib/i18n/i18n'
  import { user } from '../../../../stores'
  import {
    createClaimRewardsTransaction,
    handleKycBadge
  } from '$lib/helpers/create-claim-rewards-transaction'
  import Button from '$lib/components/button/Button.svelte'
  import { writable } from 'svelte/store'

  export let questId: keyof Quests
  export let text: string

  const loading = writable<boolean>(false)
  const rewards = QuestDefinitions()[questId].rewards
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

    loading.set(true)

    return handleKycBadge($user?.id!, $user?.accountAddress!, sendTx)
      .map(() => {
        loading.set(false)
        dispatch('claimed')
      })
      .mapErr(() => {
        loading.set(false)
      })
  }
</script>

<div class="rewards">
  <div class="description">{@html text}</div>
  <div class="rewards-list">
    {#each rewards as { name, amount }}
      <div class="row">
        <Icon url={typeToIcon[name]} size="large" />
        <div class="reward-text">
          {amount}
          {$i18n.t(`rewards:${name}`, { count: amount })}
        </div>
      </div>
    {/each}
  </div>
  <Button on:click={claim} loading={$loading} --min-width="9rem">
    {$i18n.t('quests:claimButton')}
  </Button>
</div>

<style lang="scss">
  .rewards {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-2xl);
  }

  .rewards-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .reward-text {
    text-transform: capitalize;
    font-weight: var(--font-weight-bold);
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
  }

  .description {
    width: 100%;
    text-align: left;
  }
</style>
