<script lang="ts" context="module">
  export const meta = {
    component: Input,
    tags: ['autodocs'],
    argTypes: {
      value: {
        control: '0',
        description: 'The value to display in input'
      }
    }
  }
</script>

<script lang="ts">
  import { allowOnlyPositiveNumberInString } from '$lib/tools'

  import Input from './Input.svelte'
  import { Story, Template } from '@storybook/addon-svelte-csf'

  let value = '0'
  $: value = allowOnlyPositiveNumberInString(value)
</script>

<Template let:args>
  <Input bind:value placeholder="0" />
</Template>

<Story name="Primary" />
