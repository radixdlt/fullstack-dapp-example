<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import TransformCard from './TransformCard.svelte'
  import BackgroundImage from '@images/transform-card-background.svg'

  export const meta = {
    tags: ['autodocs']
  }
</script>

<Template let:args>
  <TransformCard {...args} />
</Template>

<Story
  name="Primary"
  args={{
    energy: 'Molten Banana',
    image: BackgroundImage,
    rarity: 'common',
    quality: 10
  }}
/>
