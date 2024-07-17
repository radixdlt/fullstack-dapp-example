import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const mintGiftBox = (
  giftBoxKind: keyof typeof config.radQuest.resources.giftBox,
  accountAddress: string
) => {
  const transactionManifest = `
CALL_METHOD
  Address("${config.radQuest.accounts.system.address}")
  "create_proof_of_amount"
  Address("${config.radQuest.badges.adminBadgeAddress}")
  Decimal("1")
;
  
MINT_FUNGIBLE
  Address("${config.radQuest.resources.giftBox[giftBoxKind]}")
  Decimal("1")
;

CALL_METHOD
  Address("${accountAddress}")
  "try_deposit_batch_or_abort"
  Expression("ENTIRE_WORKTOP")
  None
;`
  return transactionBuilder({ transactionManifest, signers: ['system'] })
    .submit()
    .map(({ transactionId }) => transactionId)
}
