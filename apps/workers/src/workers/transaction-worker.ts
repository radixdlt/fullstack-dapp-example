import { radixEngineClient } from 'typescript-wallet'
import { logger } from '../helpers/logger'
import { Worker, ConnectionOptions, Queues } from 'queues'
import { QuestDefinitions } from 'content'
import { dbClient } from '../db-client'
import { Addresses, NotificationApi } from 'common'
import { Logger } from 'pino'
import { config } from '../config'

export const TransactionWorker = (
  connection: ConnectionOptions,
  dependencies: {
    notificationApi: NotificationApi
    logger: Logger<never>
  }
) => {
  const { notificationApi, logger } = dependencies
  const worker = new Worker<{
    questId: string
    userId: string
    traceId: string
  }>(
    Queues.TransactionQueue,
    async (job) => {
      logger.debug({ method: 'transactionWorker.process', id: job.id, data: job.data })

      const { questId, userId } = job.data
      const questDefinition = QuestDefinitions(config.networkId)[questId]
      const rewards = questDefinition.rewards

      const addresses = Addresses(config.networkId)

      radixEngineClient
        .getManifestBuilder()
        .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) => {
          const buckets: string[] = []
          const manifest = [
            `
              CALL_METHOD
                Address("${wellKnownAddresses.accountAddress.payerAccount}")
                "lock_fee"
                Decimal("100")
              ;

            `,
            rewards.map((reward) => {
              if (reward.name === 'element') {
                const bucketName = `bucket${buckets.length + 1}`
                buckets.push(bucketName)
                return `
                   CALL_METHOD
                    Address("${wellKnownAddresses.accountAddress.systemAccount}")
                    "create_proof_of_amount"
                    Address("${addresses.badges.adminBadgeAddress}")
                    Decimal("1");          
                    
                  MINT_FUNGIBLE
                    Address("${addresses.resources.elementAddress}")
                    Decimal("${reward.amount}");
                    
                  TAKE_FROM_WORKTOP
                    Address("${addresses.resources.elementAddress}")
                    Decimal("${reward.amount}")
                    Bucket("${bucketName}")
                  ;`
              }

              // TODO: handle other type of rewards
              return undefined
            }),
            `
              CALL_METHOD
                Address("${wellKnownAddresses.accountAddress.systemAccount}")
                "create_proof_of_amount"
                Address("${addresses.badges.adminBadgeAddress}")
                Decimal("1");          

              CALL_METHOD
                Address("${addresses.components.questRewards}")
                "deposit_reward"
                "<${userId}>"
                "${questId}"
                # Array of Buckets to deposit
                Array<Bucket>(${buckets.map((bucket) => `Bucket("${bucket}")`).join(',')})
            ;
            `
          ]
            .filter(Boolean)
            .join('\n')

          return convertStringManifest(manifest)
            .andThen((value) => {
              logger.debug({
                method: 'transactionWorker.submitTransaction',
                id: job.id,
                data: job.data
              })
              return submitTransaction(value, ['systemAccount'])
            })
            .andThen(({ txId }) =>
              radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
            )
            .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
            .map((details) => {
              logger.debug({
                method: 'transactionWorker.getCommittedDetails',
                id: job.id,
                data: job.data
              })
            })
        })
    },
    { connection }
  )

  worker.on('completed', (job) => {
    logger.debug({ method: 'transactionQueue.completed', id: job.id, data: job.data })
  })

  return worker
}
