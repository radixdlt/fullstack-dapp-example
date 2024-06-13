<script lang="ts">
  import QuestRewards from '../quest-rewards/QuestRewards.svelte'
  import QuestOverviewText from './quest-overview-text/QuestOverviewText.svelte'
  import Button from '../button/Button.svelte'
  import PadlockIcon from '@images/padlock.svg'
  import CheckmarkIcon from '@images/checkmark.svg'
  import LockIcon from '@images/padlock.svg'
  import Hourglass from '@images/hourglass.svg'
  import type { QuestId, QuestReward } from 'content'
  import type { QuestStatus } from '../../../types'

  export let title: string
  export let description: string
  export let minutesToComplete: number
  export let state: QuestStatus = 'locked'
  export let backgroundImage: string | undefined = undefined
  export let rewards: Readonly<QuestReward[]> = []
  export let link: string | undefined = undefined
  export let questId: QuestId
</script>

<div
  role="button"
  tabindex="0"
  class="card quest-card"
  class:border={state === 'in-progress' || state === 'unlocked'}
  class:hover-shadow={state !== 'locked'}
  style:--background-image={backgroundImage ? `url(${backgroundImage})` : ''}
>
  {#if state === 'completed' || state === 'locked' || state === 'in-progress'}
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

      {#if state === 'completed'}
        <img src={CheckmarkIcon} class="icon" alt="Checkmark" />
      {/if}
    </div>
  {/if}

  <div class="content">
    <QuestOverviewText reduceDescriptionOpacity {title} {description} {minutesToComplete} />

    <div class="start-button">
      <Button {link} disabled={state === 'locked'}>
        <div class="button-content">
          {#if state === 'unlocked'}
            Start
          {:else if state === 'in-progress' && questId === 'ReferralQuest'}
            Check Status
          {:else if state === 'in-progress'}
            Continue
          {:else if state === 'locked'}
            <img src={PadlockIcon} alt="Padlock icon" />
          {:else if state === 'claim-rewards'}
            Claim Rewards
          {:else}
            Recap
          {/if}
        </div>
      </Button>
    </div>
  </div>

  {#if rewards}
    <div class="rewards">
      <QuestRewards {rewards} />
    </div>
  {/if}
</div>

<style lang="scss">
  .quest-card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 21.5rem;
    height: 92%;
    max-height: 35.3rem;
    justify-content: flex-end;
    background: var(--color-light);
    background-size: contain;
    background-image: linear-gradient(transparent 30%, var(--color-light) 50%),
      var(--background-image), var(--gradient-5);
    background-position-y: 2.5rem;

    @media (max-width: 25rem) {
      width: 84vw;
    }

    margin: 0 0.5rem;
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
  }

  .status-icon-in-progress {
    top: 1.3rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .start-button {
    margin-top: var(--spacing-lg);
  }

  .in-progress-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .rewards {
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
