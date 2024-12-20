<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import ProgressBar from './ProgressBar.svelte'

  export const meta = {
    tags: ['autodocs']
  }
</script>

<Template let:args>
  <ProgressBar totalSteps={5} progress={args.progress} />
</Template>

<Story
  name="Primary"
  args={{
    progress: 1
  }}
/>
