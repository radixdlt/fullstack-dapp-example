import { Buffer } from 'buffer'
import blake from 'blakejs'
import { bufferToUint8Array } from './blake2b'

export function hash(input: Buffer): Buffer {
  return Buffer.from(blake.blake2bHex(bufferToUint8Array(input), undefined, 32).toString(), 'hex')
}
