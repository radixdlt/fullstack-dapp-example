import { radixEngineClient } from '../../config'

export const createSuperAdminBadge = () =>
  radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`
          CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.payerAccount}")
            "lock_fee"
            Decimal("10")
          ;

          ALLOCATE_GLOBAL_ADDRESS
              Address("${wellKnownAddresses.packageAddresses.resourcePackage}")
              "FungibleResourceManager"
              AddressReservation("super_admin_badge")
              NamedAddress("super_admin_badge")
          ;          

          CREATE_FUNGIBLE_RESOURCE_WITH_INITIAL_SUPPLY
            Enum<OwnerRole::Fixed>(
                Enum<AccessRule::Protected>(
                    Enum<AccessRuleNode::ProofRule>(
                        Enum<ProofRule::Require>(
                            Enum<ResourceOrNonFungible::Resource>(
                                NamedAddress("super_admin_badge")
                            )
                        )
                    )
                )
            )
            true
            0u8
            Decimal("1")
            Tuple(
              None,
              None,
              None,
              None,
              None,
              None
            )
            Tuple(
              Map<String, Tuple>(
                "name" => Tuple(
                  Some(Enum<Metadata::String>("RadQuest Super Admin Badge")),                  
                  false                                                         
                ),
                "tags" => Tuple(
                  Some(Enum<Metadata::StringArray>(Array<String>("badge", "radquest"))),                  
                  false                                                         
                )
              ),
              Map<String, Enum>(
                "metadata_setter" => None,
                "metadata_setter_updater" => None,
                "metadata_locker" => None,          
                "metadata_locker_updater" => None
              )
            )
            Some(
                AddressReservation("super_admin_badge")
            )
          ;

          CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.ownerAccount}")
            "try_deposit_batch_or_abort"
            Expression("ENTIRE_WORKTOP")
            Enum<0u8>()
          ;`)
        .andThen((transactionManifest) =>
          submitTransaction({ transactionManifest, signers: ['ownerAccount'] })
        )
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map((details): string => details.createdEntities[0].entity_address!)
    )
