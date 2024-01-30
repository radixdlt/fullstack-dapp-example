import { radixEngineClient } from '../../config'

export const createUserBadgeResource = (adminBadge: string) => {
	return radixEngineClient
		.getManifestBuilder()
		.andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
			convertStringManifest(`
      CALL_METHOD
        Address("${wellKnownAddresses.accountAddress.payerAccount}")
        "lock_fee"
        Decimal("10")
      ;

      CREATE_NON_FUNGIBLE_RESOURCE
        Enum<1u8>(
          Enum<2u8>(
              Enum<0u8>(
                  Enum<0u8>(
                      Enum<1u8>(
                          Address("${adminBadge}"),
                      )
                  )
              )
          )
        )
        Enum<NonFungibleIdType::String>()
        true
        Enum<0u8>(Enum<0u8>(Tuple(Array<Enum>(), Array<Tuple>(), Array<Enum>())), Enum<0u8>(66u8), Array<String>())
        Tuple(
          # Mint Roles (if None: defaults to DenyAll, DenyAll)
          Some(Tuple(
            # Minter (if None: defaults to Owner)
            None, 

            # Minter Updater (if None: defaults to Owner)
            Some(Enum<AccessRule::DenyAll>()) 
          )),
          # Burn Roles (if None: defaults to DenyAll, DenyAll)
          None,
          # Freeze Roles (if None: defaults to DenyAll, DenyAll)
          None,
          # Recall Roles (if None: defaults to DenyAll, DenyAll)
          None,
          # Withdraw Roles (if None: defaults to AllowAll, DenyAll)
          Some(Tuple(
            Some(Enum<AccessRule::DenyAll>()),  
            Some(Enum<AccessRule::DenyAll>())
          )),
          # Deposit Roles (if None: defaults to AllowAll, DenyAll)
          None,
          # Non Fungible Data Update Roles (if None: defaults to DenyAll, DenyAll)
          None
        )
        Tuple(
          Map<String, Tuple>(
            "name" => Tuple(Some(Enum<Metadata::String>("RadQuest User Badge")),                  
            false                                                         
          ),
          "tags" => Tuple(
            Some(Enum<Metadata::StringArray>(Array<String>("badge"))),                  
            false                                                         
          )
        ),
        Map<String, Enum>(
          "metadata_setter" => None,          # None defaults to OWNER
          "metadata_setter_updater" => None,  # None defaults to OWNER
          "metadata_locker" => None,          # None defaults to OWNER        
          "metadata_locker_updater" => None   # None defaults to OWNER
        )
      )
      None
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
}
