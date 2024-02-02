<script lang="ts">
  import QuestOverviewText from '../quest-overview/quest-overview-text/QuestOverviewText.svelte'
  import QuestRewards from '../quest-rewards/QuestRewards.svelte'
  import { i18n } from '$lib/i18n'
  import type { QuestRewardType } from 'virtual:quests'

  export let title: string
  export let description: string
  export let minutesToComplete: number
  export let rewards: {
    type: QuestRewardType
    amount: number
  }[] = []
</script>

<div class="content">
  <div class="overview-text">
    <QuestOverviewText {title} {description} {minutesToComplete} />
  </div>
  {#if rewards.length > 0}
    <div class="rewards">
      <div class="title">{$i18n.t('quest_rewards')}</div>
      <QuestRewards {rewards} />
    </div>
  {/if}
</div>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
    padding: var(--spacing-2xl);
  }

  .overview-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
  }

  .rewards {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    gap: var(--spacing-lg);
    overflow: hidden;

    .title {
      font-weight: var(--font-weight-bold);
    }
  }
</style>
