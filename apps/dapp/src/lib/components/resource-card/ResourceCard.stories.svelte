<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import ResourceCard from './ResourceCard.svelte'
  import BackgroundImage from '@images/transform-card-background.svg'

  export const meta = {
    tags: ['autodocs']
  }
</script>

<Template let:args>
  <ResourceCard {...args}>
    <svelte:fragment slot="text">
      <div class="text">This is a text</div>
    </svelte:fragment>
  </ResourceCard>
</Template>

<Story
  name="Primary"
  args={{
    image: BackgroundImage
  }}
/>

<style>
  .text {
    color: var(--color-dark);
  }
</style>
