<script lang="ts" context="module">
  export const meta = {
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      text: {
        control: 'text',
        description: 'The text to display on the button'
      }
    }
  }
</script>

<script lang="ts">
  import Button from './Button.svelte'
  import { Story, Template } from '@storybook/addon-svelte-csf'
</script>

<Template let:args>
  <Button on:click {...args}>{args.text || 'Test'}</Button>
</Template>

<Story name="Primary" />
