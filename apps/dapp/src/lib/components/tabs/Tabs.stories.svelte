<script lang="ts" context="module">
  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Tabs from './Tabs.svelte'
</script>

<Template let:args>
  <Tabs {...args} let:activeTab>
    {#if activeTab === 'basics'}
      <div>Tab 1</div>
    {/if}

    {#if activeTab === 'advanced'}
      <div>Tab 2</div>
    {/if}

    {#if activeTab === 'pro'}
      <div>Tab 3</div>
    {/if}
  </Tabs>
</Template>

<Story
  name="Primary"
  args={{
    tabs: ['Basics', 'Advanced', 'Pro']
  }}
/>
