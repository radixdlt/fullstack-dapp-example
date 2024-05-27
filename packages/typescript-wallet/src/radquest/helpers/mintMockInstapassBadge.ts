import { config } from '../../config'
import { radixEngineClient } from '../../config'

export const mintMockInstapassBadge = (accountAddress: string) => {
  const adminBadgeAddress = config.radQuest.badges.adminBadgeAddress

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
          Address("${adminBadgeAddress}")
          Decimal("1")
        ;
          
        MINT_NON_FUNGIBLE
          Address("${config.radQuest.resources.instapassBadgeAddress}")
          Map<NonFungibleLocalId, Tuple>(NonFungibleLocalId("<${crypto.randomUUID().replace(/-/g, '')}>") => Tuple(Tuple()))
        ;

        CALL_METHOD
          Address("${accountAddress}")
          "try_deposit_batch_or_abort"
          Expression("ENTIRE_WORKTOP")
          Enum<0u8>()
        ;`
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
