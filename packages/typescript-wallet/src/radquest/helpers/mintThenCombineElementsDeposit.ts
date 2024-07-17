import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const mintThenCombineElementsDeposit = ({ userId }: { userId: string }) => {
  const transactionManifest = `
CALL_METHOD
  Address("${config.radQuest.accounts.system.address}")
  "create_proof_of_amount"
  Address("${config.radQuest.badges.adminBadgeAddress}")
  Decimal("1")
;
  
MINT_FUNGIBLE
  Address("${config.radQuest.resources.elementAddress}")
  Decimal("10")
;

CALL_METHOD
  Address("${config.radQuest.accounts.system.address}")
  "create_proof_of_non_fungibles"
  Address("${config.radQuest.badges.heroBadgeAddress}")
  Array<NonFungibleLocalId>(NonFungibleLocalId("<${userId}">))
;

POP_FROM_AUTH_ZONE
  Proof("badge")
;

TAKE_ALL_FROM_WORKTOP 
  Address("${config.radQuest.resources.elementAddress}") 
  Bucket("elements")
;

CALL_METHOD
  Address("${config.radQuest.components.refinery}")
  "combine_elements_deposit"
  Proof("badge")
  Bucket("elements")
;
`
  return transactionBuilder({ transactionManifest, signers: ['system'] })
    .submit()
    .map(({ transactionId }) => transactionId)
}
