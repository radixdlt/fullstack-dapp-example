import { radixEngineClient } from '../../config'

export const createHeroBadgeResource = (adminBadge: string) => {
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
                                Address("${adminBadge}")
                            )
                        )
                    )
                )
            )
            Enum<0u8>()
            true
            Enum<0u8>(
                Enum<0u8>(
                    Tuple(
                        Array<Enum>(
                            Enum<14u8>(
                                Array<Enum>(
                                    Enum<0u8>(
                                        198u8
                                    ),
                                    Enum<1u8>(
                                        1u64
                                    ),
                                    Enum<0u8>(
                                        9u8
                                    )
                                )
                            ),
                            Enum<13u8>(
                                Enum<0u8>(
                                    12u8
                                )
                            )
                        ),
                        Array<Tuple>(
                            Tuple(
                                Enum<1u8>(
                                    "HeroBadgeData"
                                ),
                                Enum<1u8>(
                                    Enum<0u8>(
                                        Array<String>(
                                            "key_image_url",
                                            "quests_completed",
                                            "quest_counter"
                                        )
                                    )
                                )
                            ),
                            Tuple(
                                Enum<0u8>(),
                                Enum<0u8>()
                            )
                        ),
                        Array<Enum>(
                            Enum<0u8>(),
                            Enum<0u8>()
                        )
                    )
                ),
                Enum<1u8>(
                    0u64
                ),
                Array<String>(
                    "key_image_url",
                    "quests_completed",
                    "quest_counter"
                )
            )
            Tuple(
                Enum<1u8>(
                    Tuple(
                        Enum<0u8>(),
                        Enum<1u8>(
                            Enum<1u8>()
                        )
                    )
                ),
                Enum<0u8>(),
                Enum<0u8>(),
                Enum<0u8>(),
                Enum<0u8>(),
                Enum<0u8>(),
                Enum<0u8>()
            )
            Tuple(
                Map<String, Tuple>(
                    "name" => Tuple(
                        Enum<1u8>(
                            Enum<0u8>(
                                "Hero Badges"
                            )
                        ),
                        true
                    ),
                    "description" => Tuple(
                        Enum<1u8>(
                            Enum<0u8>(
                                "Hero Badges are handed to each nobel RadQuest champion as they set forth."
                            )
                        ),
                        true
                    ),
                    "icon_url" => Tuple(
                        Enum<1u8>(
                            Enum<13u8>(
                                "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"
                            )
                        ),
                        true
                    )
                ),
                Map<String, Enum>()
            )
            Enum<0u8>()
        ;
        `)
        .andThen((transactionManifest) =>
          submitTransaction({ transactionManifest, signers: ['systemAccount'] })
        )
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map((details): string => details.createdEntities[0].entity_address!)
    )
}
