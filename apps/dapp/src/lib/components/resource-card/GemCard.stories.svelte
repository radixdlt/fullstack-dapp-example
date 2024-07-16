<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import GemCard from './GemCard.svelte'

  export const meta = {
    tags: ['autodocs']
  }
</script>

<Template let:args>
  <GemCard {...args} />
</Template>

<Story
  name="Primary"
  args={{
    gem: {
      imageUrl: 'https://via.placeholder.com/150',
      material: 'Crystalline',
      color: 'Glacier',
      quality: '3'
    }
  }}
/>
