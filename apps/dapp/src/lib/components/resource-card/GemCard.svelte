<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import ResourceCard from '../resource-card/ResourceCard.svelte'

  export let gem: {
    id: string
    material: string
    color: string
    quality: string
    imageUrl: string
  }
  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let disabled = false
  export let selected = false

  let title = `${gem.material} ${gem.color}`
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
</script>

<ResourceCard on:selected on:deselected {disabled} bind:selected>
  <div class="container" style:--background-image={`url(${gem.imageUrl})`}>
    <div class="gemstone" class:selected />
  </div>

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
    background-size: 80%;
    height: 100%;
    width: 100%;
  }

  .gemstone {
    position: relative;
    height: 80%;
    width: 80%;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
</style>
