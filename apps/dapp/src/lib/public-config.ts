import { Addresses } from 'common'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import { RadixNetwork } from '@radixdlt/radix-dapp-toolkit'

const NETWORK_CONFIG = {
  [RadixNetwork.Hammunet]: {
    networkId: RadixNetwork.Hammunet,
    dAppDefinitionAddress: undefined,
    ...Addresses(RadixNetwork.Hammunet)
  },
  [RadixNetwork.Enkinet]: {
    networkId: RadixNetwork.Enkinet,
    dAppDefinitionAddress: undefined,
    ...Addresses(RadixNetwork.Enkinet)
  },
  [RadixNetwork.Gilganet]: {
    networkId: RadixNetwork.Gilganet,
    dAppDefinitionAddress: undefined,
    ...Addresses(RadixNetwork.Gilganet)
  },
  [RadixNetwork.Mardunet]: {
    networkId: RadixNetwork.Mardunet,
    dAppDefinitionAddress: undefined,
    ...Addresses(RadixNetwork.Mardunet)
  },
  [RadixNetwork.Stokenet]: {
    networkId: RadixNetwork.Stokenet,
    dAppDefinitionAddress: 'account_tdx_2_12ypap8t44k4pw9p0p56aqdp0ewexjcszzsj5suxduvsfnnmxpcj5qk',
    ...Addresses(RadixNetwork.Stokenet)
  },
  [RadixNetwork.Mainnet]: {
    networkId: RadixNetwork.Mainnet,
    dAppDefinitionAddress: 'account_rdx12xkqkcxqzkuc0xnsme9etvttmwfz8aqnhpwc0ygv8tnnpdw2v5cfzd',
    ...Addresses(RadixNetwork.Mainnet)
  },
  [RadixNetwork.Dumunet]: {
    networkId: RadixNetwork.Dumunet,
    dAppDefinitionAddress: undefined,
    ...Addresses(RadixNetwork.Dumunet)
  }
} as const

export const publicConfig =
  NETWORK_CONFIG[parseInt(PUBLIC_NETWORK_ID) as keyof typeof NETWORK_CONFIG]
