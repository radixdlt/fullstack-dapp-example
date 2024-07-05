import { config, radixEngineClient } from '../../config'

export const newCardForge = () => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`
            CALL_METHOD
                Address("${wellKnownAddresses.accountAddress.payerAccount}")
                "lock_fee"
                Decimal("50")
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
                Bucket("admin_badge")
            ;
            CALL_FUNCTION
                Address("${config.radQuest.package}")
                "MorphCardForge"
                "new"
                Address("${config.radQuest.badges.superAdminBadgeAddress}")
                Enum<OwnerRole::Fixed>(
                    Enum<AccessRule::Protected>(
                        Enum<AccessRuleNode::ProofRule>(
                            Enum<ProofRule::Require>(
                                Enum<ResourceOrNonFungible::Resource>(
                                    Address("${config.radQuest.badges.adminBadgeAddress}")
                                )
                            )
                        )
                    )
                )
                # admin_badge should be super_admin_badge
                Bucket("admin_badge")
                Address("${config.radQuest.resources.morphEnergyCards}");
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
            cardForgeAddress: details.createdEntities[0].entity_address
          })
        )
    )
}
