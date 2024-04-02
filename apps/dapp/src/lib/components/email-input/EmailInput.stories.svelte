<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import EmailInput from './EmailInput.svelte'

  export const meta = {
    tags: ['autodocs']
  }

  let email: string
</script>

<Template>
  <EmailInput bind:email />
</Template>

<Story name="Primary" />
