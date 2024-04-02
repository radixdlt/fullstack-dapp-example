<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Checkbox from './Checkbox.svelte'

  export const meta = {
    tags: ['autodocs']
  }
</script>

<Template>
  <Checkbox />
</Template>

<Story name="Primary" />
