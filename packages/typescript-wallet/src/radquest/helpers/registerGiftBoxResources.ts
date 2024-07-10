import { config } from '../../config'
import { radixEngineClient } from '../../config'

export const registerGiftBoxResources = (giftBoxOpener: string) => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) => {
      const giftBoxResourcesAddresses = Object.values(config.radQuest.resources.giftBox)
        .map((item) => `Address("${item}")`)
        .join(', ')

      return convertStringManifest(`
        CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.payerAccount}")
            "lock_fee"
            Decimal("50")
        ;
        CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.systemAccount}")
            "create_proof_of_amount"
            Address("${config.radQuest.badges.adminBadgeAddress}")
            Decimal("1")
        ;
        CALL_METHOD
            Address("${giftBoxOpener}")
            "add_gift_box_resources"
            Array<Address>(${giftBoxResourcesAddresses})
        ;

        `)
        .andThen((transactionManifest) =>
          submitTransaction({ transactionManifest, signers: ['systemAccount'] })
        )
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
    })
}
