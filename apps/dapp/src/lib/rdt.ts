import type { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import { andThen, pipe } from 'ramda'

export let resolveRDT: (rdt: RadixDappToolkit) => void

export const rdt = new Promise<RadixDappToolkit>((resolve) => (resolveRDT = resolve))

export const sendTransaction = (
  input: Parameters<RadixDappToolkit['walletApi']['sendTransaction']>[0]
) =>
  pipe(
    () => rdt,
    andThen((rdt) => rdt.walletApi.sendTransaction(input))
  )()
