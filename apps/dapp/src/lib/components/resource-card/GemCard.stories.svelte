<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import GemCard from './GemCard.svelte'
  import BackgroundImage from '@images/transform-card-background.svg'

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
      imageUrl: BackgroundImage,
      material: 'Crystalline',
      color: 'Glacier',
      quality: '3'
    }
  }}
/>
