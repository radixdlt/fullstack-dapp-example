import { config } from '../../config'
import { radixEngineClient } from '../../config'

export const mintThenCombineElementsDeposit = ({ userId }: { userId: string }) => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) => {
      const transactionManifest = `
        CALL_METHOD 
          Address("${wellKnownAddresses.accountAddress.payerAccount}") 
          "lock_fee"
          Decimal("10")
        ;

        CALL_METHOD
          Address("${wellKnownAddresses.accountAddress.systemAccount}")
          "create_proof_of_amount"
          Address("${config.radQuest.badges.adminBadgeAddress}")
          Decimal("1")
        ;
          
        MINT_FUNGIBLE
          Address("${config.radQuest.resources.elementAddress}")
          Decimal("10")
        ;
        
        CALL_METHOD
          Address("${wellKnownAddresses.accountAddress.systemAccount}")
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
      console.log(transactionManifest)
      return convertStringManifest(transactionManifest)
        .andThen((transactionManifest) =>
          submitTransaction({ transactionManifest, signers: ['systemAccount'] })
        )
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
    })
}
