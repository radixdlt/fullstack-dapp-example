<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { gemImageMapping, type ColorCodeDescription, type ShaderCodeDescription } from 'common'
  import ResourceCard from '../resource-card/ResourceCard.svelte'

  export let gem: {
    material: ShaderCodeDescription
    color: ColorCodeDescription
    quality: number
  }
  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let disabled = false
  export let selected = false
  export let selectable = true

  let title = `${gem.material} ${gem.color}`
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
</script>

<ResourceCard on:selected on:deselected {disabled} bind:selected {selectable}>
  <div
    class="container"
    style:--background-image={`url(${gemImageMapping(gem.color, gem.material)})`}
  />

  <svelte:fragment slot="text">
    <div class="text">
      <div>
        {title}
      </div>
      <div>
        {$i18n.t('jetty:create-radmorphs.gem-quality', { quality: gem.quality })}
      </div>
    </div>
  </svelte:fragment>
</ResourceCard>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--background-image) no-repeat center;
    background-size: 99%;
    height: 12rem;
    aspect-ratio: 1/1.66;
    @include short {
      height: 10rem;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
</style>
