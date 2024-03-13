import { Job, TransactionJob, TransactionQueue } from 'queues'
import type { AppLogger } from 'common'
import { radixEngineClient } from 'typescript-wallet'
import { createRewardsDepositManifest } from '../helpers/createRewardsDepositManifest'

export type TransactionWorkerController = ReturnType<typeof TransactionWorkerController>
export const TransactionWorkerController = ({ logger }: { logger: AppLogger }) => {
  const handler = (job: Job<TransactionJob>) => {
    const { type, traceId } = job.data

    const childLogger = logger.child({ traceId, type })

    switch (type) {
      case 'DepositReward':
        const { questId, userId } = job.data

        radixEngineClient
          .getManifestBuilder()
          .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) => {
            const manifest = createRewardsDepositManifest({ wellKnownAddresses, questId, userId })

            return convertStringManifest(manifest)
              .andThen((value) => {
                childLogger.debug({
                  method: 'transactionWorker.submitTransaction',
                  id: job.id,
                  data: job.data
                })
                return submitTransaction(value, ['systemAccount'])
              })
              .andThen(({ txId }) =>
                radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
              )
          })
        break

      default:
        childLogger.warn({
          method: 'eventWorker.handler',
          message: 'Unhandled Event'
        })
        break
    }
  }

  return { handler }
}
