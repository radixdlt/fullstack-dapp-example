<script lang="ts" context="module">
  import { Story } from '@storybook/addon-svelte-csf'
  import Jetty from './Jetty.svelte'
  import { writable } from 'svelte/store'

  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Template } from '@storybook/addon-svelte-csf'

  const notifications = writable([
    {
      type: 'text',
      text: 'This is another notification'
    },
    {
      type: 'text',
      text: 'This is a notification'
    }
  ])
  const glossary = [
    {
      title: 'Glossary',
      html: 'This is the glossary'
    }
  ]
</script>

<Template let:args>
  <Jetty
    {glossary}
    {...args}
    on:notification-opened={() => {
      notifications.update((n) => n.slice(0, -1))
    }}
  />
</Template>

<Story name="Primary" />

<Story name="With Notifications" args={{ notifications }} />
