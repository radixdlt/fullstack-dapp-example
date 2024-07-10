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
            Address("${wellKnownAddresses.accountAddress.ownerAccount}")
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
            Address("${config.radQuest.radQuestPackage}")
            "Refinery"
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
            Address("${config.radQuest.accounts.dAppDefinition.address}")
            Bucket("admin_badges")
            Address("${config.radQuest.badges.heroBadgeAddress}")
            Address("${config.radQuest.resources.elementAddress}")
            Address("${config.radQuest.resources.morphEnergyCardAddress}")
            Address("${config.radQuest.resources.radgemAddress}")
            Address("${config.radQuest.resources.radmorphAddress}")
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
            radgemForgeAddress: details.createdEntities[0].entity_address,
            radmorphForgeAddress: details.createdEntities[1].entity_address,
            imageOracleAddress: details.createdEntities[2].entity_address,
            refineryAddress: details.createdEntities[3].entity_address
          })
        )
    )
}
