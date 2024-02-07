<script lang="ts" context="module">
  export const meta = {
    tags: ['autodocs'],
    argTypes: {
      title: {
        control: 'text',
        description: 'The title of the quest'
      },
      description: {
        control: 'text',
        description: 'The description of the quest'
      },
      rewards: {
        control: 'number',
        description: 'Amount of rewards to be displayed'
      }
    }
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Quest from './Quest.svelte'
  import type { QuestDefinition } from 'virtual:quests'

  const rewards = [
    {
      type: 'XRD',
      amount: 10
    },
    {
      type: 'Fragment',
      amount: 100
    },
    {
      type: 'Purple Card',
      amount: 1
    }
  ] as const

  const getRewardData = (count: number) =>
    Array(count)
      .fill(undefined)
      .map((_, i) => {
        return rewards[i % rewards.length]
      })

  const getQuest = (args: any): QuestDefinition => {
    return {
      id: 'storybook',
      title: args.title,
      description: args.description,
      keyImage: '/quests-images/key/ConnectQuest.webp',
      splashImage: '/quests-images/splash/ConnectQuest.webp',
      rewards: getRewardData(args.rewards),
      minutesToComplete: args.minutesToComplete,
      pages: [
        {
          content: [
            {
              type: 'html',
              html: '<h1>What can the Radar wallet do?</h1><p>The Radar Wallet is a mobile app that securely holds your web3 assets and identities on the Radar Network (but not other networks e.g. Ethereum). You can use your wallet to log into dApps on the Radar Network and approve web3 transactions using your digital assets.</p>'
            },
            {
              type: 'html',
              html: "<strong>Use your wallet to log in to any web3 apps on the Radar network</strong><p>Let's make it web3 official! It's time to use your wallet to formally log in to RadQuest.Did you know? We call web3 apps like RadQuest, dApps.</p>"
            }
          ],
          actions: {
            next: 'Coolio!'
          }
        }
      ]
    }
  }
</script>

<Template let:args>
  <div class="container">
    <Quest quest={getQuest(args)} />
  </div>
</Template>

<Story
  name="Primary"
  args={{
    title: 'Your first transaction on Radar',
    description: 'Get familiar with Radar, the radically better Web3 network.'
  }}
/>

<style>
  .container {
    height: 50vh;
    width: 50vw;
  }
</style>
