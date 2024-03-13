import { appLogger, createApiError } from 'common'
import { ResultAsync } from 'neverthrow'

export const importTypescriptWallet = () =>
  ResultAsync.fromPromise(import('typescript-wallet'), (error) => {
    appLogger.error({ error, method: 'importWallet', event: 'error' })
    return createApiError('failed to import typescript wallet', 500)()
  })
