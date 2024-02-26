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
  import DefQuest from './DefQuest.svelte'
  import type { LoadedQuest } from 'content'

  const rewards = [
    {
      name: 'xrd',
      amount: 5
    },
    {
      name: 'element',
      amount: 10
    }
  ] as const

  const getRewardData = (count: number) =>
    Array(count)
      .fill(undefined)
      .map((_, i) => rewards[i % rewards.length])

  const getQuest = (args: any) => {
    return {
      id: 'ConnectQuest',
      title: args.title,
      description: args.description,
      minutesToComplete: args.minutesToComplete,
      rewards: getRewardData(args.rewards),
      splashImage: '',
      preRequisites: [],
      category: 'Basic',
      requirements: {},
      pages: [
        {
          type: 'QuestPage',
          content: [
            {
              type: 'html',
              value:
                '<h1>What can the Radar wallet do?</h1><p>The Radar Wallet is a mobile app that securely holds your web3 assets and identities on the Radar Network (but not other networks e.g. Ethereum). You can use your wallet to log into dApps on the Radar Network and approve web3 transactions using your digital assets.</p>'
            },
            {
              type: 'html',
              value:
                "<strong>Use your wallet to log in to any web3 apps on the Radar network</strong><p>Let's make it web3 official! It's time to use your wallet to formally log in to RadQuest.Did you know? We call web3 apps like RadQuest, dApps.</p>"
            }
          ],
          actions: {
            next: 'Coolio!'
          }
        },
        {
          type: 'JettyPage',
          jetty: { emotion: 'Excited' },
          content: [
            {
              type: 'html',
              value: 'Hello I am Jetty'
            },
            {
              type: 'html',
              value: "I'm here to help you get started with the Radar network."
            }
          ],
          actions: {
            previous: 'Back',
            next: 'Coolio!'
          }
        },
        {
          type: 'QuestPage',
          content: [
            {
              type: 'html',
              value: '<h1>Some more cool info.</p>'
            },
            {
              type: 'html',
              value: '<strong>Nice job on the quest so far.</p>'
            }
          ],
          actions: {
            next: 'Coolio!'
          }
        },
        {
          type: 'JettyPage',
          jetty: { emotion: 'Excited' },
          content: [
            {
              type: 'html',
              value: 'Congrats on completing the quest!'
            }
          ],
          actions: {
            previous: 'Back'
          }
        }
      ]
    } satisfies LoadedQuest
  }
</script>

<Template let:args>
  <div class="container">
    <DefQuest quest={getQuest(args)} />
  </div>
</Template>

<Story
  name="Primary"
  args={{
    title: 'Your first transaction on Radar',
    description: 'Get familiar with Radar, the radically better Web3 network.',
    minutesToComplete: 5
  }}
/>

<style>
  .container {
    height: 50vh;
    width: 50vw;
  }
</style>
