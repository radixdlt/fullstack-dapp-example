import { radixEngineClient } from '../..'
import { config } from '../../config'

export const newQuestRewards = () =>
  radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`     
        CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.payerAccount}")
            "lock_fee"
            Decimal("100")
        ;
        CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.ownerAccount}")
            "create_proof_of_amount"
            Address("${config.radQuest.badges.superAdminBadgeAddress}") 
            Decimal("1")
        ;  
        CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.systemAccount}")
            "withdraw"
            Address("${config.radQuest.badges.adminBadgeAddress}")
            Decimal("1")
        ;
        TAKE_ALL_FROM_WORKTOP
            Address("${config.radQuest.badges.adminBadgeAddress}")
            Bucket("admin_badges")
        ;
        CALL_FUNCTION
          Address("${config.radQuest.package}")
          "QuestRewards"
          "new"
          Address("${config.radQuest.badges.superAdminBadgeAddress}")
          Enum<OwnerRole::Fixed>(
              Enum<AccessRule::Protected>(
                  Enum<AccessRuleNode::ProofRule>(
                      Enum<ProofRule::Require>(
                          Enum<ResourceOrNonFungible::Resource>(
                              Address("${config.radQuest.badges.superAdminBadgeAddress}")
                          )
                      )
                  )
              )
          )
          Bucket("admin_badges")
          Address("${config.radQuest.badges.heroBadgeAddress}")
          # TODO: change to KYC badge resource address
          Address("${config.radQuest.badges.heroBadgeAddress}")
        ; 
       `)
        .andThen((value) =>
          submitTransaction({
            transactionManifest: value,
            signers: ['systemAccount', 'ownerAccount']
          })
        )
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map(
          (details): Record<string, string> => ({
            kycOracleAddress: details.createdEntities[0].entity_address,
            questRewardsAddress: details.createdEntities[1].entity_address
          })
        )
    )
