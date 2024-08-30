<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import RadioOptions from '$lib/components/radio-options/RadioOptions.svelte'

  export let selectedOption: 'card' | 'exchange' | 'thorswap'
</script>

<RadioOptions
  name="getXrdOptions"
  bind:selectedOption
  options={[
    {
      value: 'card',
      title: $i18n.t('quests:GetStuff.GetXrdMethodOptions.card.title'),
      description: $i18n.t('quests:GetStuff.GetXrdMethodOptions.card.description'),
      default: true
    },
    {
      value: 'exchange',
      title: $i18n.t('quests:GetStuff.GetXrdMethodOptions.exchange.title'),
      description: $i18n.t('quests:GetStuff.GetXrdMethodOptions.exchange.description'),
      default: false
    },
    {
      value: 'thorswap',
      title: $i18n.t('quests:GetStuff.GetXrdMethodOptions.thorSwap.title'),
      description: $i18n.t('quests:GetStuff.GetXrdMethodOptions.thorSwap.description'),
      default: false
    }
  ]}
/>
