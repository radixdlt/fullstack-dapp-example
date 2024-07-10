import { ok } from 'neverthrow'
import { Job, SystemJob, SystemJobType } from 'queues'
import { AppLogger } from 'common'
import { getImageOracleManifest } from './helpers/getImageOracleManifest'
import { config } from '../config'
import { TransactionHelper, withSigners } from 'typescript-wallet'

export type SystemWorkerController = ReturnType<typeof SystemWorkerController>
export const SystemWorkerController = ({ logger }: { logger: AppLogger }) => {
  const handler = (job: Job<SystemJob>) => {
    const { traceId, type } = job.data

    const childLogger = logger.child({
      traceId,
      type,
      method: 'systemWorkerController.handler'
    })

    const transactionHelper = TransactionHelper({
      networkId: config.networkId,
      onSignature: withSigners(config.networkId, 'system', 'payer'),
      logger
    })

    switch (type) {
      case SystemJobType.PopulateRadmorphs:
        return transactionHelper
          .submitTransaction(getImageOracleManifest(job.data.data))
          .map(() => undefined)

      default:
        childLogger.error({
          message: 'Unhandled Event'
        })
        return ok({})
    }
  }

  return { handler }
}
