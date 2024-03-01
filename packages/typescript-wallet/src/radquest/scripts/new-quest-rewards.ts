import { radixEngineClient } from '../..'
import { config } from '../../config'

radixEngineClient
  .getManifestBuilder()
  .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
    convertStringManifest(
      `     
        CALL_METHOD
          Address("${wellKnownAddresses.accountAddress.payerAccount}")
          "lock_fee"
          Decimal("100")
        ;
        CALL_FUNCTION
          Address("${config.radQuest.package}")
          "QuestRewards"
          "new"
          Address("${config.radQuest.badges.superAdminBadgeAddress}")
          Address("${config.radQuest.badges.adminBadgeAddress}")
          Address("${config.radQuest.badges.userBadgeAddress}")
          Address("${config.radQuest.badges.userBadgeAddress}"); 
       ` // TODO: change KYC badge resource address
    )
      .andThen((value) => submitTransaction(value, ['systemAccount']))
      .andThen(({ txId }) =>
        radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
      )
      .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
      .map((details): string => details.createdEntities[0].entity_address!)
      .map((componentAddress) => console.log(`Component deployed at: ${componentAddress}`))
  )
