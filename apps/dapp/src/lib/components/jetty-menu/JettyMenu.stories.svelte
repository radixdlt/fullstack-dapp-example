<script lang="ts" context="module">
  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import JettyMenu from './JettyMenu.svelte'
  import FuseIcon from '@images/lightning-icon.svg'
  import Glossary from '../glossary/Glossary.svelte'
  import { writable, type Writable } from 'svelte/store'
  import type { JettyNotification } from '../../../stores'

  const notifications: Writable<JettyNotification[]> = writable([
    {
      id: 'test',
      title: 'title',
      text: 'Some notification text',
      action: () => {}
    }
  ])
</script>

<Template let:args>
  <div class="container">
    <div class="menu">
      <JettyMenu
        expanded={args.expanded}
        poppedUp={args.poppedUp}
        hideJetty={args.hideJetty}
        notifications={args.notifications ? notifications : writable([])}
        menuItems={[
          {
            id: 'glossary',
            text: 'Glossary',
            icon: FuseIcon
          }
        ]}
        on:notification-opened={() => {
          notifications.update((notifications) => {
            notifications.pop()
            return notifications
          })
        }}
        let:currentMenuItem
      >
        {#if currentMenuItem.id === 'glossary'}
          <Glossary
            glossary={[
              {
                id: 'dapp',
                title: 'dApp',
                html: '<p>Some glossary content</p>'
              },
              {
                id: 'blockchain',
                title: 'Blockchain',
                html: '<p>Some glossary content</p>'
              },
              {
                id: 'nft',
                title: 'NFT',
                html: '<p>Some glossary content</p>'
              }
            ]}
          />
        {/if}
      </JettyMenu>
    </div>
  </div>
</Template>

<Story
  name="Primary"
  args={{
    expanded: true,
    poppedUp: true,
    notifications,
    hideJetty: false
  }}
  argTypes={{
    notifications: {
      control: {
        type: 'boolean'
      }
    }
  }}
/>

<style>
  .container {
    position: relative;
    height: 50rem;
    overflow: hidden;
  }
</style>
