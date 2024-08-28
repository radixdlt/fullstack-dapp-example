<script context="module">
  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import RadioOptions, { type LabelledRadioButtonArgs } from './RadioOptions.svelte'

  let options: LabelledRadioButtonArgs[] = [
    {
      value: 'card',
      title: 'Credit or debit card',
      description: 'Buy XRD securely online using your credit or debit card.',
      available: true
    },
    {
      value: 'exchange',
      title: 'Exchanges',
      description: 'Use a partner exchange to buy XRD direct.',
      available: false
    }
  ]
</script>

<Template>
  <div class="container">
    <RadioOptions
      {options}
      name="getXrdOptions"
      availableText={{
        available: 'May be available in your country',
        notAvailable: 'Not available in your country'
      }}
    />
  </div>
</Template>

<Story name="Primary" />

<style>
  .container {
    max-width: 400px;
    margin: 0 1rem;
  }
</style>
