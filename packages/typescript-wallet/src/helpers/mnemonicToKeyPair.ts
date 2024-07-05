import bip39 from 'bip39'
import { ok } from 'neverthrow'
import { derivePath, getPublicKey } from 'ed25519-hd-key'
import { secureRandom } from './secure-random'
import { PrivateKey, PublicKey } from '@radixdlt/radix-engine-toolkit'

export const generateMnemonic = () => bip39.entropyToMnemonic(secureRandom(32))

const mnemonicToSeed = (mnemonic: string) => ok(bip39.mnemonicToSeedSync(mnemonic).toString('hex'))

const deriveChildKey = (derivationPath: string, seedHex: string) =>
  ok(derivePath(derivationPath, seedHex))

export const mnemonicToKeyPair = (mnemonic: string, derivationPath: string) =>
  mnemonicToSeed(mnemonic)
    .andThen((seedHex: string) => deriveChildKey(derivationPath, seedHex))
    .map(({ key }) => ({
      privateKey: key.toString('hex'),
      publicKey: getPublicKey(key, false).toString('hex')
    }))
    .map((value) => {
      const privateKey = new PrivateKey.Ed25519(value.privateKey)
      const publicKey = new PublicKey.Ed25519(privateKey.publicKeyHex())

      return {
        privateKey,
        publicKey,
        publicKeyHex: Buffer.from(publicKey.publicKey).toString('hex')
      }
    })

export const KEY_TYPE = {
  TRANSACTION_SIGNING: 1460,
  AUTHENTICATION_SIGNING: 1678,
  MESSAGE_ENCRYPTION: 1391
} as const

export const ENTITY_TYPE = {
  ACCOUNT: 525,
  IDENTITY: 618
} as const

export const getDerivationPath = (
  networkId: number,
  keyType: keyof typeof KEY_TYPE = 'TRANSACTION_SIGNING',
  entityType: keyof typeof ENTITY_TYPE = 'ACCOUNT',
  index = 0
) => `m/44'/1022'/${networkId}'/${ENTITY_TYPE[entityType]}'/${KEY_TYPE[keyType]}'/${index}'`
