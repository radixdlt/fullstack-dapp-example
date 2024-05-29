import type { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import pipe from 'ramda/src/pipe'
import andThen from 'ramda/src/andThen'

export let resolveRDT: (rdt: RadixDappToolkit) => void

export const rdt = new Promise<RadixDappToolkit>((resolve) => (resolveRDT = resolve))

export const sendTransaction = (
  input: Parameters<RadixDappToolkit['walletApi']['sendTransaction']>[0]
) =>
  pipe(
    () => rdt,
    andThen((rdt) => rdt.walletApi.sendTransaction(input))
  )()
