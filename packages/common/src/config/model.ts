import { PrismaClient } from 'database'
import { type AppLogger, createApiError } from '../helpers'
import { ResultAsync } from 'neverthrow'

export type ConfigModel = ReturnType<typeof ConfigModel>
export const ConfigModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const isRadGemMintingEnabled = () => {
    return ResultAsync.fromPromise(
      db.config.count({ where: { key: 'radGemMintingEnabled' } }),
      (error) => {
        logger?.error({ error, method: 'isRadGemMintingEnabled', model: 'ConfigModel' })
        return createApiError('failed to get transaction', 400)()
      }
    ).map((count) => count > 0)
  }

  return {
    isRadGemMintingEnabled
  }
}
