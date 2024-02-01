import { config } from './config'
import { GatewayApi } from './gateway'
import { TransactionStream } from './transaction-stream/transaction-stream'

const stream = TransactionStream({
  fromStateVersion: config.ledger.fromStateVersion,
  dependencies: { gatewayApi: GatewayApi({}) }
})

stream.transactions$.subscribe((value) => {
  // TODO: filter out transactions that are not from the RadQuest app and add them to a queue
})

stream.error$.subscribe((error) => {
  // TODO: implement handler of different errors types
  // NotSynced - error might need to wait for a while before restarting the stream
  // InternalError, InvalidRequest, UnknownError  - might need to alert the team

  // errors cause the stream to stop, so we need to restart it depending on the error type
  stream.setStatus('run')
})
