import { Addresses } from 'common'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import { RadixNetwork } from '@radixdlt/radix-dapp-toolkit'

const NETWORK_CONFIG = {
  [RadixNetwork.Hammunet]: {
    networkId: RadixNetwork.Hammunet,
    ...Addresses(RadixNetwork.Hammunet)
  },
  [RadixNetwork.Enkinet]: {
    networkId: RadixNetwork.Enkinet,
    ...Addresses(RadixNetwork.Enkinet)
  },
  [RadixNetwork.Gilganet]: {
    networkId: RadixNetwork.Gilganet,
    ...Addresses(RadixNetwork.Gilganet)
  },
  [RadixNetwork.Mardunet]: {
    networkId: RadixNetwork.Mardunet,
    ...Addresses(RadixNetwork.Mardunet)
  },
  [RadixNetwork.Stokenet]: {
    networkId: RadixNetwork.Stokenet,
    ...Addresses(RadixNetwork.Stokenet)
  },
  [RadixNetwork.Mainnet]: {
    networkId: RadixNetwork.Mainnet,
    ...Addresses(RadixNetwork.Mainnet)
  },
  [RadixNetwork.Dumunet]: {
    networkId: RadixNetwork.Dumunet,
    ...Addresses(RadixNetwork.Dumunet)
  }
} as const

export const publicConfig =
  NETWORK_CONFIG[parseInt(PUBLIC_NETWORK_ID) as keyof typeof NETWORK_CONFIG]
