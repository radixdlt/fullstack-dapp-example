<script lang="ts">
  import SelectedIcon from '@images/selected.svg'
  import Card from './Card.svelte'
  import { i18n } from '$lib/i18n'

  export let gemstone: string
  export let rarity: string
  export let image: string
  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let selectable = true
  export let selected = false
</script>

<Card on:selected on:deselected {selectable} bind:selected>
  <div class="container" style:--background-image={`url(${image})`}>
    <div class="gemstone" class:selected>
      {#if selected}
        <img class="selected-icon" src={SelectedIcon} alt="Selected" />
      {/if}
      <div class="description">
        <div class="text">
          <div>{$i18n.t('transformGems_gemcard_gemstone')}:</div>
          <div class="bold">{gemstone}</div>
        </div>
        <div class="text">
          <div>{$i18n.t('transformGems_gemcard_rarity')}:</div>
          <div class="bold">{rarity}</div>
        </div>
      </div>
    </div>
  </div>
</Card>

<style lang="scss">
  .selected-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--background-image) no-repeat center;
    height: 100%;
    width: 100%;
  }

  .gemstone {
    position: relative;
    border-radius: var(--border-radius-3xl);
    border: 1px solid #bbbbbb;
    height: 80%;
    width: 80%;
  }

  .description {
    position: absolute;
    bottom: -5rem;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .selected {
    border: 1px solid var(--color-primary);
  }

  .text {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: 0;
    opacity: 0.5;

    * {
      white-space: nowrap;
    }
  }

  .bold {
    font-weight: var(--font-weight-bold);
  }
</style>
