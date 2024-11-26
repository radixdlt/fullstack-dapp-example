<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import ResourceCard from './ResourceCard.svelte'

  export let quantity: number
</script>

<ResourceCard selectable={false}>

  <svelte:fragment slot="text">
    <div class="text">
      <div>
        {$i18n.t('jetty:elements')}
      </div>
      <div>
        {$i18n.t('jetty:open-gift-box.quantity', { count: quantity })}
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
    background-size: 65%;
    height: 100%;
    width: 100%;
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
