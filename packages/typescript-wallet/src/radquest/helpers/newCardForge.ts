import { config, radixEngineClient } from '../../config'

export const newCardForge = () => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`
            CALL_METHOD
                Address("${wellKnownAddresses.accountAddress.payerAccount}")
                "lock_fee"
                Decimal("5000")
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
            signers: ['systemAccount', 'dAppDefinitionAccount']
          })
        )
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map((details): string => details.createdEntities[0].entity_address!)
        .andThen((cardForgeAddress) => {
          return convertStringManifest(`
                    CALL_METHOD
                        Address("${wellKnownAddresses.accountAddress.payerAccount}")
                        "lock_fee"
                        Decimal("5000")
                    ;
                    
                    CALL_METHOD
                        Address("${wellKnownAddresses.accountAddress.dAppDefinitionAccount}")
                        "create_proof_of_amount"
                        Address("${config.radQuest.badges.superAdminBadgeAddress}") 
                        Decimal("1")
                    ;  
                    
                    CALL_METHOD
                    Address("${cardForgeAddress}")
                    "set_random_cards"
                    Array<Tuple>(
                      Tuple(
                        "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg",
                        "Molten Lava Morph Card",
                        "Common",
                        "Molten Lava",
                      ),
                      Tuple(
                        "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg",
                        "Solar Flare Morph Card",
                        "Uncommon",
                        "Solar Flare",
                      ),
                      Tuple(
                        "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg",
                        "Black Hole Morph Card",
                        "Rare",
                        "Black Hole",
                      ),
                    )
                    ;
                    `)
            .andThen((value) =>
              submitTransaction({
                transactionManifest: value,
                signers: ['systemAccount', 'dAppDefinitionAccount']
              })
            )
            .andThen(({ txId }) =>
              radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
            )
            .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        })
    )
}
