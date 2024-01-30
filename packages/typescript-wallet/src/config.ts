import { RadixEngineClient } from './clients'
import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

if (!process.env.MNEMONIC) throw new Error('MNEMONIC env var not set')
if (!process.env.PUBLIC_NETWORK_ID) throw new Error('PUBLIC_NETWORK_ID env var not set')

const networkId = parseInt(process.env.PUBLIC_NETWORK_ID)
const networkName = RadixNetworkConfigById[networkId]?.networkName

if (!networkName) throw new Error('PUBLIC_NETWORK_ID env var not set to a valid network')

export const radixEngineClient = RadixEngineClient({
	accounts: { payerAccount: 1, systemAccount: 2, dAppDefinitionAccount: 3 },
	networkName,
	mnemonic: process.env.MNEMONIC!
})

const entities = {
	Stokenet: {
		badges: {
			adminBadgeAddress: 'resource_tdx_2_1t5nfy52latlarrukrdhyl7p9nevvt0z496e9neg3zj7pr39uasfzqu',
			superAdminBadgeAddress:
				'resource_tdx_2_1t4ntu44ndy3w9pw4z6wmlaa8cdu5tccda2twryz4av5w4693z37kyn',
			userBadgeAddress: 'resource_tdx_2_1nfusnklkkgt4yrj5gw3vkdqaqkjmm46nyslkqcqm3zwypds4xtjae9'
		}
	}
}[networkName]

export const config = {
	mnemonic: process.env.MNEMONIC,
	networkName,
	network: radixEngineClient.gatewayClient.networkConfig,
	radQuest: {
		badges: entities!.badges
	}
}
