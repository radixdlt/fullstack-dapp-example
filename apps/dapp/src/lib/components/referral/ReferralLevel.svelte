<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import type { QuestReward } from 'content'
  import QuestRewards from '../quest-rewards/QuestRewards.svelte'
  import HourGlassIcon from '@images/hourglass.svg'
  import LockedLevelIcon from '@images/locked-level.svg'
  import CompletedGradientIcon from '@images/completed-gradient.svg'
  import PadlockIcon from '@images/padlock.svg'
  import Chevron from '@images/chevron.svg'
  import { scale, slide } from 'svelte/transition'
  import ProgressBar from '../progress-bar/ProgressBar.svelte'
  import Button from '../button/Button.svelte'

  export let name: string
  export let maximum: number
  export let referred: number
  export let rewards: QuestReward[]

  $: isOpened = false

  const toggle = () => {
    if (referred === 0) return
    isOpened = !isOpened
  }
</script>

<div class="referral-level">
  <button class="referral-level__header" on:click={toggle}>
    <h3>{name}</h3>

    {#if referred === 0}
      <img src={LockedLevelIcon} alt="" />
    {:else if referred === maximum}
      <img src={CompletedGradientIcon} alt="" />
    {:else if referred > 0}
      <img src={HourGlassIcon} alt="" />
    {/if}

    <span class="referrals">{$i18n.t('quests:referralsProgress', { referred, maximum })}</span>

    <div class="icon" style:transform={`rotate(${isOpened ? '180deg' : 0})`}>
      <img src={Chevron} alt="" />
    </div>
  </button>

  {#if isOpened}
    <div class="progress-bar" in:scale out:slide>
      <ProgressBar
        totalSteps={maximum}
        progress={referred}
        --color-background-dark="var(--color-primary)"
      />
    </div>
    <div class="referral-level__content" transition:slide>
      <div class="rewards">{$i18n.t('quests:rewards')}:</div>
      <QuestRewards {rewards} displayName vertical --rewards-gap="0.5rem" />

      <div class="action-button">
        {#if referred === maximum}
          <Button>{$i18n.t('quests:claimButton')}</Button>
        {:else if referred > 0}
          <Button disabled>
            <div class="button-content">
              <img src={PadlockIcon} alt="Padlock icon" />
              {$i18n.t('quests:inProgress')}
            </div>
          </Button>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .button-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .referrals {
    font-size: var(--text-xs);
  }

  .rewards {
    text-transform: uppercase;
    font-weight: var(--font-weight-bold);
    text-align: left;
  }
  .action-button {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
  }
  .icon {
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }
  .referral-level__header {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    width: 100%;

    h3 {
      line-height: 24px;
      font-size: 24px;
      font-weight: 300;
      margin: 0;
      margin-right: auto;
    }
  }

  .referral-level__content {
    padding: 1rem 1.5rem;
  }

  .referral-level {
    border-radius: 15px;
    border: 1px solid;
    border-color: linear-gradient(4.06deg, #0e2130 5.91%, #091a26 91.69%);
  }
</style>
