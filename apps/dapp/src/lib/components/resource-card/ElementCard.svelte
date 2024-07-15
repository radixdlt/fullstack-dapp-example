<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import ResourceCard from './ResourceCard.svelte'
  import ElementImage from '@images/rewards/Element.webp'

  export let quantity: number
</script>

<ResourceCard selectable={false}>
  <div class="container" style:--background-image={`url(${ElementImage})`} />

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
    background-size: 80%;
    height: 100%;
    width: 100%;
  }
  .text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
</style>
