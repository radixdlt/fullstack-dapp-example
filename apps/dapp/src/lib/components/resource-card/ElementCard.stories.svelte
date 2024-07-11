<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import ElementCard from './ElementCard.svelte'

  export const meta = {
    tags: ['autodocs']
  }
</script>

<Template let:args>
  <ElementCard {...args} />
</Template>

<Story
  name="Primary"
  args={{
    quantity: 10
  }}
/>
