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
  name="Common"
  args={{
    card: {
      id: '1',
      energy: 'Tidal Wave',
      imageUrl: BackgroundImage,
      rarity: 'common',
      quality: 10,
      limitedEdition: true
    }
  }}
/>

<Story
  name="Rare"
  args={{
    card: {
      id: '1',
      energy: 'Tidal Wave',
      imageUrl: BackgroundImage,
      rarity: 'rare',
      quality: 10,
      limitedEdition: true
    }
  }}
/>

<Story
  name="UltraRare"
  args={{
    card: {
      id: '1',
      energy: 'Tidal Wave',
      imageUrl: BackgroundImage,
      rarity: 'ultra-rare',
      quality: 10,
      limitedEdition: true
    }
  }}
/>
