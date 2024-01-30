import { radixEngineClient } from '../../config'

export const createAdminBadgeResource = (superAdminBadgeAddress: string) => {
	return radixEngineClient
		.getManifestBuilder()
		.andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
			convertStringManifest(`     
        CALL_METHOD
          Address("${wellKnownAddresses.accountAddress.payerAccount}")
          "lock_fee"
          Decimal("10")
        ;

        CREATE_FUNGIBLE_RESOURCE
          Enum<1u8>(
              Enum<2u8>(
                  Enum<0u8>(
                      Enum<0u8>(
                          Enum<1u8>(
                              Address("${superAdminBadgeAddress}"),
                          )
                      )
                  )
              )
          )
          true
          0u8
          Tuple(
            # Mint Roles (if None: defaults to DenyAll, DenyAll)
            Some(         
              Tuple(
                None, # Minter (if None: defaults to Owner)
                Some(Enum<AccessRule::DenyAll>()) # Minter Updater (if None: defaults to Owner)
              )
            ),
            # Burn Roles (if None: defaults to DenyAll, DenyAll)
            Some(         
              Tuple(
                None,  
                Some(Enum<AccessRule::DenyAll>())
              )
            ),
            # Freeze Roles (if None: defaults to DenyAll, DenyAll)
            Some(         
              Tuple(
                Some(Enum<AccessRule::DenyAll>()),  
                Some(Enum<AccessRule::DenyAll>())
              )
            ),
            # Recall Roles (if None: defaults to DenyAll, DenyAll)
            Some(         
              Tuple(
                None,  
                Some(Enum<AccessRule::DenyAll>())
              )
            ),
            # Withdraw Roles (if None: defaults to AllowAll, DenyAll)
            Some(         
              Tuple(
                None,  
                Some(Enum<AccessRule::DenyAll>())
              )
            ),
            # Deposit Roles (if None: defaults to AllowAll, DenyAll)
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
                  Some(Enum<Metadata::String>("Admin Badge")),                  
                  false                                                         
                )
              ),
              Map<String, Enum>(
                # Metadata roles
                "metadata_setter" => None,
                # Metadata setter role
                "metadata_setter_updater" => None,
                # Metadata locker role
                "metadata_locker" => None,          
                "metadata_locker_updater" => None
              )
          )
          None
        ;`)
				.andThen((value) => submitTransaction(value, ['dAppDefinitionAccount']))
				.andThen(({ txId }) =>
					radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
				)
				.andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
				.map((details): string => details.createdEntities[0].entity_address!)
		)
}
