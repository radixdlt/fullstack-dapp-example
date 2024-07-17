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
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Loading" args={{ loading: true }} />

<Story name="Secondary" args={{ theme: 'secondary' }} />
<Story name="Secondary Disabled" args={{ theme: 'secondary', disabled: true }} />
<Story name="Secondary Loading" args={{ theme: 'secondary', loading: true }} />

<Story name="Light" args={{ theme: 'light' }} />
<Story name="Light Disabled" args={{ theme: 'light', disabled: true }} />
<Story name="Light Loading" args={{ theme: 'light', loading: true }} />

<Story name="Dark" args={{ theme: 'dark' }} parameters={{ backgrounds: { default: 'dark' } }} />
<Story
  name="Dark Disabled"
  args={{ theme: 'dark', disabled: true }}
  parameters={{ backgrounds: { default: 'dark' } }}
/>
<Story
  name="Dark Loading"
  args={{ theme: 'dark', loading: true }}
  parameters={{ backgrounds: { default: 'dark' } }}
/>
