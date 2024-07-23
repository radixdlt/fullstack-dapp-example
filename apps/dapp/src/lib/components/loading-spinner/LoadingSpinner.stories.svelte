<script lang="ts" context="module">
  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import LoadingSpinner from './LoadingSpinner.svelte'
</script>

<Template let:args>
  <LoadingSpinner dark={args.dark} />
</Template>

<Story name="Primary" args={{}} />
<Story
  name="Dark"
  args={{ dark: true }}
  parameters={{
    backgrounds: { default: 'dark' }
  }}
/>
