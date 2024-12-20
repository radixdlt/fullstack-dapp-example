<script lang="ts">
  import QuestOverviewText from '../quest-overview/quest-overview-text/QuestOverviewText.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import type { QuestReward } from 'content'
  import QuestRewards from '../quest-rewards/QuestRewards.svelte'
  import Requirements from './Requirements.svelte'

  export let title: string
  export let description: string
  export let minutesToComplete: number
  export let requirements: {
    text: string
    complete: boolean
  }[] = []
  export let rewards: Readonly<QuestReward[]> = []
</script>

<div class="content">
  <div class="overview-text">
    <QuestOverviewText {title} {description} {minutesToComplete} />
  </div>
</div>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
    align-items: center;

    @include desktop {
      padding: var(--spacing-xl);
    }
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
