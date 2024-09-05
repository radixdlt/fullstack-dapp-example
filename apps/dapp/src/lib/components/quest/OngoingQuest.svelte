<script lang="ts">
  import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte'
  import { backOut } from 'svelte/easing'
  import { fly, scale } from 'svelte/transition'
  import Icon from '../icon/Icon.svelte'
  import CrossIcon from '@images/cross.svg'
  import ChevronLeft from '@images/chevron-left.svg'
  import { goto } from '$app/navigation'
  import { writable } from 'svelte/store'
  import { get } from 'svelte/store'
  import { page } from '$app/stores'

  export let title: string
  export let steps: { hasFooter?: boolean }[] = []
  let progress: number = 0
  let width: number
  let direction = writable<'right' | 'left'>()
  let lastProgress = progress

  const flyOut = (el: any) => {
    const duration = 800

    return fly(el, { x: ($direction === 'right' ? -width : width) * 2, duration, opacity: 1 })
  }

  const closeQuest = () => {
    goto(`/home/${get(page).params.category}`)
  }

  $: {
    $direction = progress > lastProgress ? 'right' : 'left'
    lastProgress = progress
  }

  const next = () => {
    progress++
  }

  const back = () => {
    progress--
  }
</script>

<div
  transition:scale|local={{ easing: backOut }}
  bind:clientWidth={width}
  class="card progress-card"
>
  <div class="header">
    {#if progress > 0}
      <button class="icon" on:click={() => back()}>
        <Icon url={ChevronLeft} />
      </button>
    {:else}
      <div></div>
    {/if}
    <header class="title">
      {title}
    </header>
    <button
      class="icon"
      on:click={() => {
        closeQuest()
      }}
    >
      <Icon url={CrossIcon} />
    </button>
  </div>

  <ProgressBar totalSteps={1} progress={0} />

  {#key progress}
    <div
      class="content"
      in:fly|local={{
        x: ($direction === 'right' ? width : -width) * 2,
        opacity: 1,
        duration: 800
      }}
      out:flyOut|local
    >
      <slot name="content" {progress} {next} {back} />
    </div>
  {/key}

  {#if $$slots.footer && steps?.[progress]?.hasFooter}
    <div
      class="footer"
      in:fly|local={{ x: -width, opacity: 1, duration: 650, delay: 150 }}
      out:fly|local={{ x: -width, opacity: 1, duration: 250 }}
    >
      <slot name="footer" {progress} {next} {back} />
    </div>
  {/if}
</div>

<style lang="scss">
  .progress-card {
    padding: 0;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto auto 1fr;
    min-height: 28rem;
    width: 25rem;
    overflow-y: hidden;
    overflow-x: hidden;

    @include smallMobile {
      min-height: 0rem;
    }
  }
  .title {
    font-size: var(--text-xs);
    font-weight: var(--font-weight-bold);
    color: var(--color-background-dark);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-2xl);
    border-bottom: 1px solid var(--color-light);
    > *:first-child {
      width: 1.5rem;
    }
    > *:last-child {
      width: 1.5rem;
    }
    @include smallMobile {
      padding: 0.9rem 1.5rem;
    }
  }

  .footer {
    padding: var(--spacing-xl) var(--spacing-2xl);
    display: flex;
    justify-content: center;
    @include smallMobile {
      padding: var(--spacing-lg) var(--spacing-2xl) calc(var(--spacing-lg) + var(--spacing-xs));
    }
  }

  .content {
    grid-area: 3/1;
    padding: var(--spacing-2xl);
    overflow-y: auto;
  }
</style>
