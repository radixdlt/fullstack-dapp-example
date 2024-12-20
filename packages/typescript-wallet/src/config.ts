import { RadixEngineClient } from './clients'
import { Addresses, GatewayApi } from 'common'

if (!process.env.PUBLIC_NETWORK_ID) throw new Error('PUBLIC_NETWORK_ID env var not set')

const networkId = parseInt(process.env.PUBLIC_NETWORK_ID)
const gatewayApi = GatewayApi(networkId, process.env.GATEWAY_URL)
export const radquestEntityAddresses = Addresses(parseInt(process.env.PUBLIC_NETWORK_ID))

const networkName = gatewayApi.networkConfig.networkName

if (!networkName) throw new Error('PUBLIC_NETWORK_ID env var not set to a valid network')

export const radixEngineClient = RadixEngineClient({
  accounts: {
    payerAccount: 1,
    ownerAccount: 2,
    systemAccount: 3,
    dAppDefinitionAccount: 4,
    jetty: 5
  },
  gatewayApi,
  mnemonic: process.env.MNEMONIC!
})

export const config = {
  networkName,
  network: radixEngineClient.gatewayClient.networkConfig,
  radQuest: radquestEntityAddresses,
  directXrdDepositAmount: 10
}
