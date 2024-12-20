import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const mintClams = (amount: number, accountAddress: string) => {
  const transactionManifest = `
CALL_METHOD
  Address("${config.radQuest.accounts.system.address}")
  "create_proof_of_amount"
  Address("${config.radQuest.badges.adminBadgeAddress}")
  Decimal("1")
;
  
MINT_FUNGIBLE
  Address("${config.radQuest.resources.clamAddress}")
  Decimal("${amount}")
;

CALL_METHOD
  Address("${accountAddress}")
  "try_deposit_batch_or_abort"
  Expression("ENTIRE_WORKTOP")
  None
;`

  return transactionBuilder({ transactionManifest, signers: ['system'] }).submit()
}
