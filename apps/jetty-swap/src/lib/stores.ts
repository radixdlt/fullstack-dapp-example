import type { RadixDappToolkit, WalletDataState } from '@radixdlt/radix-dapp-toolkit'
import type { GatewayApi } from 'common'
import { writable } from 'svelte/store'

// As the Gateway API and Radix Dapp Toolkit each produce a value that you only wait for once these stores
// could alternatively be a promise. walletData can update continuously so it should alway be a store.
export const gatewayApi = writable<null | GatewayApi>(null)
export const rdt = writable<null | RadixDappToolkit>(null)

export const walletData = writable<null | WalletDataState>(null)
