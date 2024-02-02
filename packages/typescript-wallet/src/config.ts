import { RadixEngineClient } from './clients'
import { Addresses, networkConfig } from 'common'

if (!process.env.MNEMONIC) throw new Error('MNEMONIC env var not set')
if (!process.env.PUBLIC_NETWORK_ID) throw new Error('PUBLIC_NETWORK_ID env var not set')

const networkName = networkConfig.networkName

if (!networkName) throw new Error('PUBLIC_NETWORK_ID env var not set to a valid network')

export const radixEngineClient = RadixEngineClient({
  accounts: { payerAccount: 1, systemAccount: 2, dAppDefinitionAccount: 3 },
  networkName,
  mnemonic: process.env.MNEMONIC!
})

export const config = {
  networkName,
  network: radixEngineClient.gatewayClient.networkConfig,
  radQuest: {
    badges: Addresses.badges
  }
}
