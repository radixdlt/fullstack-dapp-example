<script lang="ts" context="module">
  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import GlossaryUI from './Glossary.svelte'

  const glossary = [
    {
      id: 'account-addresses',
      title: 'Account addresses',
      html: 'Account addresses are used to identify accounts on the blockchain. They are derived from the public key of the account.'
    },
    {
      id: 'accounts',
      title: 'Accounts',
      html: 'Accounts are used to interact with the blockchain. They can be used to send transactions, deploy contracts, and more.'
    },
    {
      id: 'asset-addresses',
      title: 'Asset addresses',
      html: 'Asset addresses are used to identify assets on the blockchain. They are derived from the public key of the asset.'
    },
    {
      id: 'bridging',
      title: 'Bridging',
      html: 'Bridging is the process of transferring assets from one blockchain to another. This can be done using a bridge, which is a smart contract that locks assets on one blockchain and mints equivalent assets on another blockchain.'
    },
    {
      id: 'dapps',
      title: 'dApps',
      html: 'dApps, or decentralized applications, are applications that run on a blockchain. They are typically open source, and their data is stored on a blockchain.'
    },
    {
      id: 'dexes',
      title: 'DEXes',
      html: 'DEXes, or decentralized exchanges, are exchanges that run on a blockchain. They allow users to trade assets directly with each other, without the need for a centralized intitleediary.'
    },
    {
      id: 'estimates',
      title: 'Estimates',
      html: 'Estimates are used to predict the amount of gas that will be used by a transaction. They are based on the current state of the blockchain, and can be used to optimize transaction fees.Estimates are used to predict the amount of gas that will be used by a transaction. They are based on the current state of the blockchain, and can be used to optimize transaction fees.Estimates are used to predict the amount of gas that will be used by a transaction. They are based on the current state of the blockchain, and can be used to optimize transaction fees.Estimates are used to predict the amount of gas that will be used by a transaction. They are based on the current state of the blockchain, and can be used to optimize transaction fees.Estimates are used to predict the amount of gas that will be used by a transaction. They are based on the current state of the blockchain, and can be used to optimize transaction fees.'
    }
  ]
</script>

<Template let:args>
  <GlossaryUI {...args} />
</Template>

<Story
  name="Primary"
  args={{
    glossary
  }}
/>

<Story name="Definition">
  <GlossaryUI {glossary} />
</Story>
