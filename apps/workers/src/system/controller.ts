import { ok } from 'neverthrow'
import { Job, SystemJob, SystemJobType, TransactionQueue } from 'queues'
import { AppLogger, RadMorphModel } from 'common'
import { radixEngineClient } from 'typescript-wallet'
import { getImageOracleManifest } from './helpers/getImageOracleManifest'

export type SystemWorkerController = ReturnType<typeof SystemWorkerController>
export const SystemWorkerController = ({
  logger,
  radMorphModel
}: {
  logger: AppLogger
  radMorphModel: RadMorphModel
}) => {
  const handler = (job: Job<SystemJob>) => {
    const { traceId, type } = job.data

    const childLogger = logger.child({
      traceId,
      type,
      method: 'systemWorkerController.handler'
    })

    switch (type) {
      case SystemJobType.PopulateRadmorphs:
        return radMorphModel(logger)
          .addMany(job.data.data)
          .andThen(() => radixEngineClient.getManifestBuilder())
          .andThen(({ convertStringManifest, submitTransaction, wellKnownAddresses }) =>
            convertStringManifest(
              getImageOracleManifest(wellKnownAddresses, job.data.data)
            ).andThen((transactionManifest) =>
              submitTransaction({
                transactionManifest,
                signers: ['systemAccount'],
                logger
              })
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
