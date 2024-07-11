<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import ResourceCard from '../resource-card/ResourceCard.svelte'

  export let energy: string
  export let image: string
  export let rarity: string
  export let quality: number
  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let selected = false
  export let disabled = false
  export let selectable = true
</script>

<ResourceCard on:selected on:deselected {selectable} {disabled} bind:selected>
  <div class="transform-card" style:--background-image={`url(${image})`} class:selected>
    <div class="rarity-container">
      {#if rarity === 'rare'}
        <div class="rarity" class:rarity-selected={selected}>
          {rarity.toUpperCase()}
        </div>
      {/if}
    </div>

    <div class="energy">
      {energy}
    </div>
  </div>

  <div slot="text" class="quality">
    {$i18n.t('jetty:create-radmorphs.card-quality', { quality })}
  </div>
</ResourceCard>

<style lang="scss">
  $text-color: var(--color-light);

  .transform-card {
    display: grid;
    grid-template-rows: 60% auto;
    background: var(--background-image) no-repeat center;
    background-size: cover;
    height: 100%;
    width: 100%;
    border-radius: var(--border-radius-xl);
  }

  .rarity-selected {
    border: var(--border) var(--color-light);
  }

  .rarity {
    background: var(--gradient-6);
    color: $text-color;
    padding: 0.2rem;
    border-radius: var(--border-radius-xl);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 5rem;
    align-self: end;
    font-size: var(--text-xxs);
    font-weight: var(--font-weight-bold);
  }

  .rarity-container {
    display: flex;
    justify-content: center;
  }

  .energy {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-light);
    font-family: var(--font-headers);
    text-align: center;
    margin: 0 var(--spacing-md);
  }
</style>
