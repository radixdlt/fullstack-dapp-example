<script lang="ts" context="module">
  export const meta = {
    component: TokenSwapInput,
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import TokenSwapInput from './TokenSwapInput.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import ClamIcon from '../../../images/clam.png'
  import ElementIcon from '../../../images/fragment.png'
  import { allowOnlyPositiveNumberInString } from '$lib/tools'

  let value = ''

  const ClamResource = {
    name: 'Clams',
    icon: ClamIcon
  }
  const ElementResource = {
    name: 'Elements',
    icon: ElementIcon
  }

  $: value = allowOnlyPositiveNumberInString(value)
</script>

<Template let:args>
  {#if args.name === 'clams'}
    <TokenSwapInput {value} {...args}>
      <span>{@html $i18n.t('main:balance-amount', { count: 10, resource: 'Clam' })}</span>
    </TokenSwapInput>
  {/if}
  {#if args.name === 'elements'}
    <TokenSwapInput {value} {...args}>
      <span>{@html $i18n.t('main:estimated-amount')}</span>
    </TokenSwapInput>
  {/if}
  {#if args.name === 'error'}
    <TokenSwapInput state="error" {value} {...args}>
      <span>{@html $i18n.t('main:not-enough-resource', { resource: 'Clam' })}</span>
    </TokenSwapInput>
  {/if}
</Template>

<Story
  name="Clams"
  args={{
    name: 'clams',
    resource: ClamResource,
    cardTitle: 'FROM'
  }}
/>
<Story
  name="Elements"
  args={{
    resource: ElementResource,
    cardTitle: 'TO',
    name: 'elements'
  }}
/>
<Story
  name="Elements no text"
  args={{
    resource: ElementResource,
    cardTitle: 'TO',
    name: 'no text'
  }}
/>

<Story
  name="Not enough clams"
  args={{
    resource: ClamResource,
    cardTitle: 'From',
    name: 'error'
  }}
/>
