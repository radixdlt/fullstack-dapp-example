<script lang="ts" context="module">
  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Quest from './Quest.svelte'

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

  let quest: Quest
</script>

<Template>
  <div class="container">
    <Quest
      bind:this={quest}
      title="First Quest"
      description="This is your introduction to Radix"
      minutesToComplete={3}
      {rewards}
      steps={[
        {
          id: 'text1',
          type: 'regular'
        },
        {
          id: 'text2',
          type: 'regular'
        },
        {
          id: 'text3',
          type: 'regular',
          footer: {
            next: {
              text: 'Start Over',
              onClick: () => quest.setProgress(0)
            }
          }
        }
      ]}
      let:render
    >
      {#if render('text1')}
        <p>
          It's time that the Elements you've earned aren't just things that I'm holding for you on
          RadQuest. They're real things and you should hold them in your own wallet!
        </p>
        <p>
          To do that, you're going to do a transaction with the Radix Network to claim them, moving
          them from RadQuest to your own account.
        </p>
      {/if}

      {#if render('text2')}
        <p><strong> Web3 networks </strong></p>
        <p>There are many Web3 networks (blockchains) such as Ethereum.</p>
        <p>Each network has its own ecosystem (cryptocurrencies, NFTs, wallets, dApps, etc).</p>
        <p>And the Radar network is not just one of them but much better than others!</p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."
        </p>
      {/if}

      {#if render('text3')}
        <p>
          You've completed your first transaction on the Radix Network! You've claimed your rewards
          and they're now in your wallet.
        </p>
      {/if}
    </Quest>
  </div>
</Template>

<Story name="Primary" />

<style>
  .container {
    height: 50vh;
    width: 50vw;
  }
</style>
