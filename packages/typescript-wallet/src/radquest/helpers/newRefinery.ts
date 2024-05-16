import { config, radixEngineClient } from '../../config'

export const newRefinery = () => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`
        CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.payerAccount}")
            "lock_fee"
            Decimal("500")
        ;
        CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.dAppDefinitionAccount}")
            "create_proof_of_amount"
            Address("${config.radQuest.badges.superAdminBadgeAddress}") 
            Decimal("1")
        ; 
        CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.systemAccount}")
            "withdraw"
            Address("${config.radQuest.badges.adminBadgeAddress}")
            Decimal("3")
        ;
        TAKE_ALL_FROM_WORKTOP
            Address("${config.radQuest.badges.adminBadgeAddress}")
            Bucket("admin_badges")
        ;
        CALL_FUNCTION
            Address("${config.radQuest.package}")
            "Refinery"
            "new"
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
            Address("${config.radQuest.resources.elementAddress}")
            Address("${config.radQuest.resources.morphEnergyCards}")
            Address("${config.radQuest.resources.radgemAddress}")
            Address("${config.radQuest.resources.radmorphAddress}")
        ;
        `)
        .andThen((value) => submitTransaction(value, ['systemAccount', 'dAppDefinitionAccount']))
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map((details): string => details.createdEntities[0].entity_address!)
    )
}
