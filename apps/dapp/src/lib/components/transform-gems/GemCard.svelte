<script lang="ts">
  import Card from './Card.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import Item from './Item.svelte'

  export let gemstone: string
  export let image: string
  export let quality: number = 10
  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let selectable = true
  export let selected = false
</script>

<Item>
  <Card slot="card" on:selected on:deselected {selectable} bind:selected>
    <div class="container" style:--background-image={`url(${image})`}>
      <div class="gemstone" class:selected />
    </div>
  </Card>

  <svelte:fragment slot="text">
    {gemstone}
    <div>
      {$i18n.t('jetty:create-radmorphs.gem-quality', { quality })}
    </div>
  </svelte:fragment>
</Item>

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
</style>
