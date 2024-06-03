import { RadixDappToolkit } from 'common/rdt'

export let resolveRDT: (rdt: RadixDappToolkit) => void

export const rdt = new Promise<RadixDappToolkit>((resolve) => (resolveRDT = resolve))
