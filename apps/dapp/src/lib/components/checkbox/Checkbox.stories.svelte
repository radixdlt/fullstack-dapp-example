<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Checkbox from './Checkbox.svelte'

  export const meta = {
    tags: ['autodocs']
  }
</script>

<Template let:args>
  <Checkbox {...args}>{args.text || ''}</Checkbox>
</Template>

<Story name="Primary" />

<Story name="WithText" args={{ text: 'Example text' }} />

<Story name="Disabled" args={{ disabled: true }} />

<Story name="DisabledWithText" args={{ disabled: true, text: 'Example text' }} />
