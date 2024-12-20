<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import CopyTextBox from './CopyTextBox.svelte'

  export const meta = {
    tags: ['autodocs']
  }
</script>

<Template>
  <CopyTextBox text="Hello, World!" value="Hello, this is the copied value" />
</Template>

<Story name="Primary" />
