<script lang="ts">
  import { scale, slide } from 'svelte/transition'
  import ProgressBar from '../progress-bar/ProgressBar.svelte'
  import type { QuestDefinitions } from 'content'
  import { i18n } from '$lib/i18n/i18n'
  import Accordion from '../accordion/Accordion.svelte'

  type Level = keyof ReturnType<typeof QuestDefinitions>['QuestTogether']['partialRewards']

  export let level: Level | 'SuperLevel'
  export let icon: string
  export let progress: number
  export let totalSteps: number
  export let isOpened: boolean = false
</script>

<Accordion bind:isOpened>
  <svelte:fragment slot="header">
    <h3>{$i18n.t(`quests:QuestTogether.levelHeader.${level}`)}</h3>

    <img src={icon} alt="" />

    <span class="referrals">
      <slot name="referrals" />
    </span>
  </svelte:fragment>

  <svelte:fragment slot="content">
    <div class="progress-bar" in:scale out:slide>
      <ProgressBar {totalSteps} {progress} --color-background-dark="var(--color-primary)" />
    </div>
    <div class="referral-level__content">
      <slot name="content" />

      <div class="action-button">
        <slot name="action-button" />
      </div>
    </div>
  </svelte:fragment>
</Accordion>

<style lang="scss">
  h3 {
    line-height: var(--text-md2);
    font-size: var(--text-md2);
    font-weight: 300;
    margin: 0;

    @include shortMobile {
      line-height: var(--text-md1);
      font-size: var(--text-md1);
    }
  }

  .referrals {
    font-size: var(--text-xs);
  }

  .action-button {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
  }

  .referral-level__content {
    padding: 1rem 1.5rem;
  }
</style>
