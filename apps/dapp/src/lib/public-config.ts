import { PUBLIC_NETWORK_ID } from '$env/static/public'
import { RadixNetwork } from '@radixdlt/radix-dapp-toolkit'

const NETWORK_CONFIG = {
  [RadixNetwork.Hammunet]: {
    networkId: RadixNetwork.Hammunet,
    dAppDefinitionAddress: undefined
  },
  [RadixNetwork.Enkinet]: {
    networkId: RadixNetwork.Enkinet,
    dAppDefinitionAddress: undefined
  },
  [RadixNetwork.Gilganet]: {
    networkId: RadixNetwork.Gilganet,
    dAppDefinitionAddress: undefined
  },
  [RadixNetwork.Mardunet]: {
    networkId: RadixNetwork.Mardunet,
    dAppDefinitionAddress: undefined
  },
  [RadixNetwork.Stokenet]: {
    networkId: RadixNetwork.Stokenet,
    dAppDefinitionAddress: 'account_tdx_2_12x3rn7tqqqm3wguz6kmg5fy7saf8v92lt5xuwgn6kgh8zaejlf80ce'
  },
  [RadixNetwork.Mainnet]: {
    networkId: RadixNetwork.Mainnet,
    dAppDefinitionAddress: undefined
  },
  [RadixNetwork.Dumunet]: {
    networkId: RadixNetwork.Dumunet,
    dAppDefinitionAddress: undefined
  }
} as const

export const publicConfig =
  NETWORK_CONFIG[parseInt(PUBLIC_NETWORK_ID) as keyof typeof NETWORK_CONFIG]
