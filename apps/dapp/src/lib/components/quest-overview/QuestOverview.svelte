<script lang="ts">
  import QuestRewards from '../quest-rewards/QuestRewards.svelte'
  import QuestOverviewText from './quest-overview-text/QuestOverviewText.svelte'
  import Button from '../button/Button.svelte'
  import CheckmarkIcon from '@images/checkmark.svg'
  import LockIcon from '@images/padlock.svg'
  import Hourglass from '@images/hourglass.svg'
  import type { QuestReward } from 'content'
  import type { QuestStatus } from '../../../types'
  import PadlockIcon from '@images/padlock.svg'
  import { i18n } from '$lib/i18n/i18n'
  import { isUserBlocked } from '../../../stores'
  import { onNavigate } from '$app/navigation'

  export let title: string
  export let description: string
  export let minutesToComplete: number
  export let state: QuestStatus = 'locked'
  export let backgroundImage: string | undefined = undefined
  export let rewards: Readonly<QuestReward[]> = []
  export let link: string | undefined = undefined
  export let questId: string | undefined = undefined

  $: hovering = false
  $: greyOut = !hovering && (state === 'completed' || state === 'partially_completed')

  let openingQuest = false

  $: onNavigate(() => {
    if (openingQuest) {
      openingQuest = false
    }
  })
</script>

<div
  role="button"
  tabindex="0"
  class="quest-card"
  class:hover-shadow={state !== 'locked'}
  on:mouseenter={() => (hovering = true)}
  on:mouseleave={() => (hovering = false)}
>
  <div
    class="card-background"
    class:border={state === 'in-progress' || state === 'unlocked'}
    style:--background-image={backgroundImage ? `url(${backgroundImage})` : ''}
    class:grey-out={greyOut}
  >
    {#if rewards}
      <div class="rewards">
        <QuestRewards {rewards} />
      </div>
    {/if}
  </div>
  {#if state === 'completed' || state === 'locked' || state === 'in-progress' || state === 'partially_completed'}
    <div
      class="status-icon"
      class:status-icon-with-background={state !== 'in-progress'}
      class:disabled={state === 'locked'}
      class:status-icon-in-progress={state === 'in-progress'}
    >
      {#if state === 'locked'}
        <img src={LockIcon} class="icon disabled" alt="Padlock" />
      {/if}

      {#if state === 'in-progress'}
        <img src={Hourglass} class="icon in-progress-icon" alt="Hourglass" />
      {/if}

      {#if state === 'completed' || state === 'partially_completed'}
        <img src={CheckmarkIcon} class="icon" alt="Checkmark" />
      {/if}
    </div>
  {/if}

  <div class="content">
    <QuestOverviewText {greyOut} {title} {description} {minutesToComplete} />

    <div class="start-button">
      <Button
        {link}
        disabled={state === 'locked'}
        on:click={() => {
          openingQuest = true
        }}
        loading={openingQuest}
      >
        <div class="button-content">
          {#if state === 'unlocked'}
            {$i18n.t('quests:QuestOverviewButton.unlocked')}
          {:else if state === 'in-progress' && questId === 'QuestTogether'}
            {$i18n.t('quests:QuestOverviewButton.referralInProgress')}
          {:else if state === 'in-progress'}
            {$i18n.t('quests:QuestOverviewButton.inProgress')}
          {:else if state === 'locked'}
            <img src={PadlockIcon} alt="Padlock icon" />
          {:else if state === 'claim-rewards'}
            {$i18n.t('quests:QuestOverviewButton.claimRewards')}
          {:else if state === 'partially_completed' && !$isUserBlocked}
            {$i18n.t('quests:QuestOverviewButton.inProgress')}
          {:else}
            {$i18n.t('quests:QuestOverviewButton.complete')}
          {/if}
        </div>
      </Button>
    </div>
  </div>
</div>

<style lang="scss">
  .grey-out {
    opacity: 0.5;
    transition: opacity 0.15s ease-in-out;
  }
  .card-background {
    background: var(--gradient-5);
    background-size: contain;
    background-image: linear-gradient(transparent 30%, var(--color-light) 50%),
      var(--background-image), var(--gradient-5);
    background-position-y: 2.5rem;
    height: 100%;
    width: 21.5rem;
    max-height: 35.3rem;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: var(--border-radius-3xl);

    @media (max-width: 25rem) {
      width: 84vw;
      background-image: linear-gradient(transparent 10%, var(--color-light) 40%),
        var(--background-image), var(--gradient-5);
    }
  }
  .quest-card {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 21.5rem;
    height: 100%;
    justify-content: flex-end;
    margin: 0 0.5rem;
    max-height: 35.3rem;

    border-radius: var(--border-radius-3xl);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.2);
    // transition: all 0.5s ease;
    // TODO: Add selective transaition back if you know it's needed (no "all")
    padding: var(--spacing-2xl);

    @media (max-width: 25rem) {
      width: 84vw;
    }
    @include shortMobile {
      padding: var(--spacing-xl);
    }
  }

  .border {
    border: var(--border-xl) var(--color-primary);
    border-radius: var(--border-radius-3xl);
  }

  .hover-shadow {
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
      box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.36);
    }
  }

  .icon {
    width: 0.8rem;
    height: 0.8rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .status-icon {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    border-radius: 50%;
    width: 1.563rem;
    height: 1.563rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .status-icon-with-background {
    background: var(--gradient-6);
    &.disabled {
      background: var(--color-primary);
    }
  }

  .status-icon-in-progress {
    top: 1.3rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .start-button {
    margin-top: var(--spacing-lg);
  }

  .in-progress-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .rewards {
    z-index: 0;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }

  .button-content {
    display: flex;
    justify-content: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .start-button {
    margin-top: var(--spacing-lg);
  }
</style>
