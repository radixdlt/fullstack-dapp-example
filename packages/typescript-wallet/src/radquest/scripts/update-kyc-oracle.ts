import { Addresses } from 'common'
import { radixEngineClient } from '../../config'

const addresses = Addresses(2)
const userId = process.argv[2]

radixEngineClient
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
          Address("${addresses.badges.adminBadgeAddress}")
          Decimal("1")
        ;

        CALL_METHOD
          Address("${addresses.components.kycOracle}")
          "update_user_kyc_requirement"
          "${userId}"
          true
        ;`
    console.log(transactionManifest)
    return convertStringManifest(transactionManifest)
      .andThen((transactionManifest) =>
        submitTransaction({ transactionManifest, signers: ['systemAccount'] })
      )
      .andThen(({ txId }) =>
        radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
      )
      .mapErr((e) => console.log(e))
  })
