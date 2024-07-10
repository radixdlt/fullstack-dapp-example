import { config, radixEngineClient } from '../../config'

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
                                Address("${superAdminBadgeAddress}")
                            )
                        )
                    )
                )
            )
            true
            0u8
            # Behaviour roles
            Tuple(
                Enum<1u8>(
                    Tuple(
                        Enum<0u8>(),
                        Enum<0u8>()
                    )
                ),
                Enum<1u8>(
                    Tuple(
                        Enum<0u8>(),
                        Enum<0u8>()
                    )
                ),
                Enum<0u8>(),
                Enum<1u8>(
                    Tuple(
                        Enum<0u8>(),
                        Enum<0u8>()
                    )
                ),
                Enum<1u8>(
                    Tuple(
                        Enum<0u8>(),
                        Enum<0u8>()
                    )
                ),
                Enum<0u8>()
            )
            # Metadata
            Tuple(
                Map<String, Tuple>(
                    "name" => Tuple(
                        Enum<1u8>(
                            Enum<0u8>(
                                "RadQuest Admin Badge"
                            )
                        ),
                        false
                    ),
                    "tags" => Tuple(
                        Enum<1u8>(
                            Enum<128u8>(
                                Array<String>(
                                    "radquest",
                                    "badge"
                                )
                            )
                        ),
                        false
                    ),
                    "dapp_definitions" => Tuple(
                        Enum<1u8>(
                            Enum<128u8>(
                                Array<String>(
                                    "${config.radQuest.accounts.dAppDefinition.address}"
                                )
                            )
                        ),
                        false
                    )
                ),
                # Metadata roles (Defaults)
                Map<String, Enum>()
            )
            None
        ;`)
        .andThen((value) =>
          submitTransaction({ transactionManifest: value, signers: ['systemAccount'] })
        )
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map((details): string => details.createdEntities[0].entity_address!)
    )
}
