import GlossaryIndex from './glossary-index.json'

export type GlossaryId = keyof typeof GlossaryIndex

type Language = string

export type GlossaryDefinition = Record<Language, { title: string }>

export type GlossaryDefinitions = Record<GlossaryId, GlossaryDefinition>

export const GlossaryDefinitions: GlossaryDefinitions = {
  radixnetwork: {
    en: { title: 'Radix Network' }
  },
  radquest: {
    en: { title: 'RadQuest' }
  },
  tokens: {
    en: { title: 'Tokens' }
  },
  nfts: {
    en: { title: 'Non-fungible Tokens (NFTs)' }
  },
  radmorphs: {
    en: { title: 'RadMorphs' }
  },
  radgems: {
    en: { title: 'RadGems' }
  },
  cards: {
    en: { title: 'Morph Energy Cards' }
  },
  elements: {
    en: { title: 'Elements' }
  },
  giftboxes: {
    en: { title: 'Gift Boxes' }
  },
  web3: {
    en: { title: 'Web3' }
  },
  accounts: {
    en: { title: 'Radix Accounts' }
  },
  personas: {
    en: { title: 'Radix Personas' }
  },
  radixwallet: {
    en: { title: 'Radix Wallet' }
  },
  dapps: {
    en: { title: 'dApps' }
  },
  transactions: {
    en: { title: 'Transactions' }
  },
  transactionfee: {
    en: { title: 'Transaction Fee' }
  },
  xrd: {
    en: { title: 'XRD Token' }
  },
  herobadge: {
    en: { title: "RadQuest Hero's Badge" }
  },
  badges: {
    en: { title: 'Badges' }
  },
  transfers: {
    en: { title: 'Asset Transfers' }
  },
  dex: {
    en: { title: 'Decentralized Exchange (DEX)' }
  },
  guarantees: {
    en: { title: 'Deposit Guarantees' }
  },
  networkstaking: {
    en: { title: 'Radix Network Staking' }
  },
  validators: {
    en: { title: 'Radix Network Validators' }
  },
  radixconnector: {
    en: { title: 'Radix Connector Browser Extension' }
  },
  connectbutton: {
    en: { title: '√ Connect Button' }
  },
  dashboard: {
    en: { title: 'Radix Dashboard' }
  },
  bridging: {
    en: { title: 'Bridging' }
  }
}

export const glossaryKeys = Object.keys(GlossaryDefinitions) as GlossaryId[]
