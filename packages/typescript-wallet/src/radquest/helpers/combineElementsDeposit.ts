import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const combineElementsDeposit = ({
  accountAddress,
  userId
}: {
  accountAddress: string
  userId: string
}) => {
  const transactionManifest = `
        CALL_METHOD 
          Address("${config.radQuest.accounts.payer.address}") 
          "lock_fee"
          Decimal("10")
        ;
        
        CALL_METHOD
          Address("${accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${config.radQuest.badges.heroBadgeAddress}")
          Array<NonFungibleLocalId>(NonFungibleLocalId("<${userId}>"))
        ;

        POP_FROM_AUTH_ZONE
          Proof("badge")
        ;

        CALL_METHOD
          Address("${accountAddress}")
          "withdraw" 
          Address("${config.radQuest.resources.elementAddress}")
          Decimal("5") 
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
  const transaction = transactionBuilder({ transactionManifest, signers: ['payer'] })
  return transaction.submit()
}
