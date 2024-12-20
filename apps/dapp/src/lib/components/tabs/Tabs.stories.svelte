<script lang="ts" context="module">
  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Tabs from './Tabs.svelte'

  let activeTab: string
</script>

<Template let:args>
  <Tabs {...args} bind:activeTab />

  {#if activeTab === 'basics'}
    <div>Tab 1</div>
  {/if}

  {#if activeTab === 'advanced'}
    <div>Tab 2</div>
  {/if}

  {#if activeTab === 'pro'}
    <div>Tab 3</div>
  {/if}
</Template>

<Story
  name="Primary"
  args={{
    tabs: [
      {
        name: 'Basics',
        id: 'basics'
      },
      {
        name: 'Advanced',
        id: 'advanced'
      },
      {
        name: 'Pro',
        id: 'pro'
      }
    ]
  }}
/>
