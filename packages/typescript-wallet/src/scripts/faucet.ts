import { config } from '../config'
import { logger } from '../helpers/logger'
import { withSigners } from '../signers/signers'
import { TransactionHelper } from '../transaction'

const transactionHelper = TransactionHelper({
  networkId: config.network.networkId,
  onSignature: withSigners(config.network.networkId, 'system')
})

transactionHelper
  .getXrdFromFaucet(config.radQuest.accounts.system)
  .map((res) => logger.debug(res))
  .mapErr((err) => logger.error(err))
