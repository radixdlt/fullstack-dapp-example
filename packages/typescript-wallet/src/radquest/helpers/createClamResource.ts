import { config, radixEngineClient } from '../../config'

export const createClamResource = () => {
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
                              Address("${config.radQuest.badges.adminBadgeAddress}"),
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
            None,
            # Recall Roles (if None: defaults to DenyAll, DenyAll)
            None,
            # Withdraw Roles (if None: defaults to AllowAll, DenyAll)
            None,
            # Deposit Roles (if None: defaults to AllowAll, DenyAll)
            None
          )
          Tuple(
              Map<String, Tuple>(
                "name" => Tuple(
                  Some(Enum<Metadata::String>("Clam")),                  
                  false                                                         
                ),
                "symbol" => Tuple(
                  Some(Enum<Metadata::String>("CLAM")),                  
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
        .andThen((value) => submitTransaction(value, ['systemAccount']))
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map((details): string => details.createdEntities[0].entity_address!)
    )
}
