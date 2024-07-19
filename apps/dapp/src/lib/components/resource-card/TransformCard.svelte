<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { energyCardMap, shapeCodeDescription } from 'common'
  import ResourceCard from '../resource-card/ResourceCard.svelte'

  export let card: {
    id: string
    energy: string
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

  //@ts-ignore
  $: image = energyCardMap[shapeCodeDescription[card.energy.toLowerCase()]].keyImageUrl
</script>

<ResourceCard on:selected on:deselected {selectable} {disabled} bind:selected>
  <div class="transform-card" style:--background-image={`url(${image})`} class:selected />

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
    height: 12rem;
    aspect-ratio: 1/1.66;
  }

  .quality {
    color: var(--color-light);
    font-size: var(--text-xs);
    text-align: center;
    margin: 0;
  }
</style>
