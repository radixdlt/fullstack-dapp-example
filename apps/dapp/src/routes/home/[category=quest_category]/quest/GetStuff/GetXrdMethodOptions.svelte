<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import CountrySelect from '$lib/components/country-select/CountrySelect.svelte'
  import RadioOptions from '$lib/components/radio-options/RadioOptions.svelte'
  import { user } from '../../../../../stores'

  let selectedOption: string | undefined = undefined
  let country = $user?.country
</script>

<div class="country-select-container">
  <CountrySelect {country} />
</div>

<RadioOptions
  name="getXrdOptions"
  bind:selectedOption
  options={[
    {
      value: 'card',
      title: $i18n.t('quests:GetStuff.GetXrdMethodOptions.card.title'),
      description: $i18n.t('quests:GetStuff.GetXrdMethodOptions.card.description'),
      // TODO: update depending on user's country
      available: true
    },
    {
      value: 'exchange',
      title: $i18n.t('quests:GetStuff.GetXrdMethodOptions.exchange.title'),
      description: $i18n.t('quests:GetStuff.GetXrdMethodOptions.exchange.description'),
      // TODO: update depending on user's country
      available: false
    },
    {
      value: 'thorSwap',
      title: $i18n.t('quests:GetStuff.GetXrdMethodOptions.thorSwap.title'),
      description: $i18n.t('quests:GetStuff.GetXrdMethodOptions.thorSwap.description'),
      available: true
    }
  ]}
  availableText={{
    available: $i18n.t('quests:GetStuff.GetXrdMethodOptions.available'),
    notAvailable: $i18n.t('quests:GetStuff.GetXrdMethodOptions.notAvailable')
  }}
/>

<style lang="scss">
  .country-select-container {
    margin: 1.5rem 0;
  }
</style>
