import { GatewayApiClient } from '@radixdlt/babylon-gateway-api-sdk'
import { config } from './config'
import { logger } from './helpers/logger'
import { Queue, ConnectionOptions } from 'bullmq'

const connection: ConnectionOptions = config.redis

const myQueue = new Queue('foo', {
	connection
})

const { stream } = GatewayApiClient.initialize({
	applicationName: 'RadQuest Transaction Stream',
	basePath: config.gateway.baseUrl
})

const getTransactionsList = () => {
	stream
		.getTransactionsList()
		.then((transactions) => {
			// test implementation of message queue
			const transaction = transactions.items[0]
			return myQueue.add('transaction', transaction, {
				jobId: transaction.intent_hash
			})
		})
		.catch((err) => {
			logger.error('Error getting transaction stream', err)
		})
}

getTransactionsList()

// to be removed, just to keep application alive
setInterval(() => {
	getTransactionsList()
}, 1000 * 10)
