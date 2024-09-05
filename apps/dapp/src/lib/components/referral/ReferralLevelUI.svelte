<script lang="ts">
  import Chevron from '@images/chevron.svg'
  import { scale, slide } from 'svelte/transition'
  import ProgressBar from '../progress-bar/ProgressBar.svelte'

  export let title: string
  export let icon: string
  export let progress: number
  export let totalSteps: number

  $: isOpened = false

  const toggle = () => {
    isOpened = !isOpened
  }
</script>

<div class="referral-level">
  <button class="referral-level__header" on:click={toggle}>
    <h3>{title}</h3>

    <img src={icon} alt="" />

    <span class="referrals">
      <slot name="referrals" />
    </span>

    <div class="icon" style:transform={`rotate(${isOpened ? '180deg' : 0})`}>
      <img src={Chevron} alt="" />
    </div>
  </button>

  {#if isOpened}
    <div class="progress-bar" in:scale out:slide>
      <ProgressBar {totalSteps} {progress} --color-background-dark="var(--color-primary)" />
    </div>
    <div class="referral-level__content" transition:slide>
      <slot name="content" />

      <div class="action-button">
        <slot name="action-button" />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .referrals {
    font-size: var(--text-xs);
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
    @include smallMobile {
      padding: 1rem 0.5rem;
    }

    h3 {
      line-height: var(--text-md3);
      font-size: var(--text-md3);
      font-weight: 300;
      margin: 0;
      margin-right: auto;
      @include smallMobile {
        line-height: var(--text-md2);
        font-size: var(--text-md2);
      }
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
