import { RadixEngineClient } from '../../clients'
import { config } from '../../config'

export const combineElementsDeposit = ({
  accountAddress,
  badgeAddress,
  badgeLocalId,
  radixEngineClient
}: {
  accountAddress: string
  badgeAddress: string
  badgeLocalId: string
  radixEngineClient: ReturnType<typeof RadixEngineClient>
}) => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) => {
      const transactionManifest = `
        CALL_METHOD 
          Address("${wellKnownAddresses.accountAddress.testAccount}") 
          "lock_fee"
          Decimal("10")
        ;
        
        CALL_METHOD
          Address("${accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${badgeAddress}")
          Array<NonFungibleLocalId>(NonFungibleLocalId("${badgeLocalId}"))
        ;

        POP_FROM_AUTH_ZONE
          Proof("badge")
        ;

        CALL_METHOD
          Address("${accountAddress}")
          "withdraw" 
          Address("${config.radQuest.resources.elementAddress}")
          Decimal("10") 
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
        .andThen((transactionManifest) => submitTransaction({ transactionManifest, signers: [] }))
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
    })
}
