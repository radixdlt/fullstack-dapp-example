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

          CREATE_FUNGIBLE_RESOURCE_WITH_INITIAL_SUPPLY
            None
            true
            0u8
            Decimal("1")
            Tuple(
              Some(         
                Tuple(
                  Some(Enum<AccessRule::DenyAll>()),  
                  Some(Enum<AccessRule::DenyAll>())
                )
              ),
              Some(         
                Tuple(
                  Some(Enum<AccessRule::DenyAll>()),  
                  Some(Enum<AccessRule::DenyAll>())
                )
              ),
              Some(         
                Tuple(
                  Some(Enum<AccessRule::DenyAll>()),  
                  Some(Enum<AccessRule::DenyAll>())
                )
              ),
              Some(         
                Tuple(
                  Some(Enum<AccessRule::DenyAll>()),  
                  Some(Enum<AccessRule::DenyAll>())
                )
              ),
              Some(         
                Tuple(
                  Some(Enum<AccessRule::AllowAll>()),  
                  Some(Enum<AccessRule::DenyAll>())
                )
              ),
              Some(         
                Tuple(
                  Some(Enum<AccessRule::AllowAll>()),  
                  Some(Enum<AccessRule::DenyAll>())
                )
              )
            )
            Tuple(
              Map<String, Tuple>(
                "name" => Tuple(
                  Some(Enum<Metadata::String>("Super Admin Badge")),                  
                  false                                                         
                ),
                "tags" => Tuple(
                  Some(Enum<Metadata::StringArray>(Array<String>("badge"))),                  
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
            None
          ;

          CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.dAppDefinitionAccount}")
            "try_deposit_batch_or_abort"
            Expression("ENTIRE_WORKTOP")
            Enum<0u8>()
          ;`)
				.andThen((transactionManifest) =>
					submitTransaction(transactionManifest, ['dAppDefinitionAccount'])
				)
				.andThen(({ txId }) =>
					radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
				)
				.andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
				.map((details): string => details.createdEntities[0].entity_address!)
		)
