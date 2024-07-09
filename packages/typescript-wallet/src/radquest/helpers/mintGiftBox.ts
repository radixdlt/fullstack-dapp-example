import { config } from '../../config'
import { radixEngineClient } from '../../config'

export const mintGiftBox = (
  giftBoxKind: keyof typeof config.radQuest.resources.giftBox,
  accountAddress: string
) => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`
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
          Address("${config.radQuest.resources.giftBox[giftBoxKind]}")
          Decimal("1")
        ;

        CALL_METHOD
          Address("${accountAddress}")
          "try_deposit_batch_or_abort"
          Expression("ENTIRE_WORKTOP")
          None
        ;`)
        .andThen((transactionManifest) =>
          submitTransaction({ transactionManifest, signers: ['systemAccount'] })
        )
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
    )
}
