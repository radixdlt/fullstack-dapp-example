<script lang="ts" context="module">
  export const meta = {
    component: SwapResult,
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import SwapResult from '$lib/components/swapResult/SwapResult.svelte'
  import Element from '@images/fragment.png'
  import { i18n } from '$lib/i18n/i18n'
</script>

<Template let:args>
  <Backdrop>
    <SwapResult {...args} />
  </Backdrop>
</Template>

<Story
  name="Swap Success"
  args={{
    title: $i18n.t('main:swap-modal.success-title'),
    subtitle: $i18n.t('main:swap-modal.success-desc', { amount: 2, resource: 'Element' }),
    rewards: [{ url: Element }, { url: Element }]
  }}
/>
<Story
  name="Swap Failure"
  args={{
    title: $i18n.t('main:swap-modal.failure-title'),
    subtitle: $i18n.t('main:swap-modal.failure-desc')
  }}
/>
