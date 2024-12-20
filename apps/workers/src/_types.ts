import { WorkerError } from 'common'
import { TransactionHelperError } from 'typescript-wallet'

export { WorkerError }

export type WorkerOutputError = { reason: WorkerError | TransactionHelperError; jsError?: unknown }
