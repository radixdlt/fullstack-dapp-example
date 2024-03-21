import { RadixEngineClient } from './clients'
import { Addresses, GatewayApi } from 'common'

if (!process.env.MNEMONIC) throw new Error('MNEMONIC env var not set')
if (!process.env.PUBLIC_NETWORK_ID) throw new Error('PUBLIC_NETWORK_ID env var not set')

const networkId = parseInt(process.env.PUBLIC_NETWORK_ID)
const gatewayApi = GatewayApi(networkId)
const radQuestEntityAddresses = Addresses(parseInt(process.env.PUBLIC_NETWORK_ID))

const networkName = gatewayApi.networkConfig.networkName

if (!networkName) throw new Error('PUBLIC_NETWORK_ID env var not set to a valid network')

export const radixEngineClient = RadixEngineClient({
  accounts: { payerAccount: 1, systemAccount: 2, dAppDefinitionAccount: 3 },
  gatewayApi,
  mnemonic: process.env.MNEMONIC!
})

export const config = {
  networkName,
  network: radixEngineClient.gatewayClient.networkConfig,
  radQuest: radQuestEntityAddresses,
  directXrdDepositAmount: 10
}
