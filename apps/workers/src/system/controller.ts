import { ok } from 'neverthrow'
import { Job, SystemJob, SystemJobType } from 'queues'
import { AppLogger } from 'common'
import { radixEngineClient } from 'typescript-wallet'
import { getImageOracleManifest } from './helpers/getImageOracleManifest'

export type SystemWorkerController = ReturnType<typeof SystemWorkerController>
export const SystemWorkerController = ({ logger }: { logger: AppLogger }) => {
  const handler = (job: Job<SystemJob>) => {
    const { traceId, type } = job.data

    const childLogger = logger.child({
      traceId,
      type,
      method: 'systemWorkerController.handler'
    })

    switch (type) {
      case SystemJobType.PopulateRadmorphs:
        return radixEngineClient
          .getManifestBuilder()
          .andThen(({ convertStringManifest, submitTransaction, wellKnownAddresses }) =>
            convertStringManifest(
              getImageOracleManifest(wellKnownAddresses, job.data.data)
            ).andThen((transactionManifest) =>
              submitTransaction({
                transactionManifest,
                signers: ['systemAccount'],
                logger
              }).andThen(({ txId }) => radixEngineClient.gatewayClient.pollTransactionStatus(txId))
            )
          )

      default:
        childLogger.error({
          message: 'Unhandled Event'
        })
        return ok({})
    }
  }

  return { handler }
}
