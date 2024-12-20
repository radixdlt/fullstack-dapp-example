<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import ResourceCard from './ResourceCard.svelte'

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

<Story name="Primary" args={{}} />

<style>
  .text {
    color: var(--color-dark);
  }
</style>
