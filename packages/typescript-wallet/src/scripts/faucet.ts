import { config } from '../config'
import { logger } from '../helpers/logger'
import { withSigners } from '../signers/signers'
import { TransactionHelper } from '../transaction'

const transactionHelper = TransactionHelper({
  networkId: config.network.networkId,
  onSignature: withSigners(config.network.networkId, 'payer')
})

transactionHelper
  .getXrdFromFaucet(config.radQuest.accounts.payer)
  .map((res) => logger.debug(res))
  .mapErr((err) => logger.error(err))
