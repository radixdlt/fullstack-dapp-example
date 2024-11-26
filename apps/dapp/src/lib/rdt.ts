import type { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import { ResultAsync } from 'neverthrow'

export let resolveRDT: (rdt: RadixDappToolkit) => void

export const rdt = new Promise<RadixDappToolkit>((resolve) => (resolveRDT = resolve))

export const rdtResult = () => ResultAsync.fromPromise(rdt, (error) => error as Error)

export const sendTransaction = (
  input: Parameters<RadixDappToolkit['walletApi']['sendTransaction']>[0]
) => rdtResult().andThen((rdt) => {
  console.log(input.transactionManifest)
  return rdt.walletApi.sendTransaction(input)
})
