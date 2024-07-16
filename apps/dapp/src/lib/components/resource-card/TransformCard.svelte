<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import ResourceCard from '../resource-card/ResourceCard.svelte'

  export let card: {
    id: string
    energy: string
    imageUrl: string
    rarity: string
    quality: number
    limitedEdition: boolean
  }
  export let showClassName = false
  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let selected = false
  export let disabled = false
  export let selectable = true
</script>

<ResourceCard on:selected on:deselected {selectable} {disabled} bind:selected>
  <div class="transform-card" style:--background-image={`url(${card.imageUrl})`} class:selected>
    <div class="rarity-container">
      {#if card.rarity === 'rare'}
        <div class="rarity rare" class:rarity-selected={selected}>
          {card.rarity.toUpperCase()}
        </div>
      {/if}
      {#if card.rarity === 'ultra-rare'}
        <div class="rarity ultra-rare" class:rarity-selected={selected}>
          {card.rarity.toUpperCase()}
        </div>
      {/if}
    </div>

    <div class="energy">
      {card.energy
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}
    </div>
  </div>

  <p slot="text" class="quality">
    {#if showClassName}
      {$i18n.t('jetty:morph-energy-card')}<br />
    {/if}
    {$i18n.t('jetty:create-radmorphs.card-quality', { quality: card.quality })}
    {#if card.limitedEdition}
      <br /><i>{$i18n.t('jetty:create-radmorphs.limited-edition')}</i>
    {/if}
  </p>
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
    color: $text-color;
    padding: 0.2rem;
    border-radius: var(--border-radius-xl);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    align-self: end;
    font-size: var(--text-xxs);
    font-weight: var(--font-weight-bold);
    width: fit-content;
    padding: 0 1rem;
  }

  .rare {
    background: var(--gradient-6);
  }

  .ultra-rare {
    background: var(--gradient-4);
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

  .quality {
    color: var(--color-light);
    font-size: var(--text-xs);
    font-family: var(--font-headers);
    text-align: center;
    margin: 0;
  }
</style>
