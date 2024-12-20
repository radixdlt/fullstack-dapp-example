<script context="module">
  export const meta = {
    tags: ['autodocs'],
    component: VerificationCodeInput
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import VerificationCodeInput from './VerificationCodeInput.svelte'
</script>

<Template let:args>
  <VerificationCodeInput {...args} />
</Template>

<Story name="Primary" />
