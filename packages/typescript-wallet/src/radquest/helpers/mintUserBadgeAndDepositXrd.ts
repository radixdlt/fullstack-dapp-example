import { config } from '../../config'
import { radixEngineClient } from '../../config'

export const mintUserBadgeAndDepositXrd = (
  userId: string,
  accountAddress: string,
  badgeAddresses?: Partial<{
    userBadgeAddress: string
    adminBadgeAddress: string
  }>
) => {
  const {
    userBadgeAddress = config.radQuest.badges.userBadgeAddress,
    adminBadgeAddress = config.radQuest.badges.adminBadgeAddress
  } = badgeAddresses ?? {}
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
          Address("${userBadgeAddress}")
          Map<NonFungibleLocalId, Tuple>(NonFungibleLocalId("<${userId}>") => Tuple(Tuple()))
        ;

        CALL_METHOD
          Address("${wellKnownAddresses.accountAddress.payerAccount}")
          "withdraw"
          Address("${wellKnownAddresses.resourceAddresses.xrd}")
          Decimal("${config.directXrdDepositAmount}");

        CALL_METHOD
          Address("${accountAddress}")
          "try_deposit_batch_or_abort"
          Expression("ENTIRE_WORKTOP")
          Enum<0u8>()
        ;`
      console.log(transactionManifest)
      return convertStringManifest(transactionManifest)
        .andThen((transactionManifest) => submitTransaction(transactionManifest, ['systemAccount']))
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
    })
}
