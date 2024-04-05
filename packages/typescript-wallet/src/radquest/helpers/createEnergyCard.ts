import { config, radixEngineClient } from '../../config'

export const createEnergyCard = () => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`
            CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.payerAccount}")
            "lock_fee"
            Decimal("5000")
        ;
        
        CREATE_NON_FUNGIBLE_RESOURCE
            Enum<0u8>()
            Enum<3u8>()
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
                                    Enum<0u8>(
                                        12u8
                                    ),
                                    Enum<0u8>(
                                        12u8
                                    ),
                                    Enum<0u8>(
                                        12u8
                                    ),
                                    Enum<0u8>(
                                        12u8
                                    )
                                )
                            )
                        ),
                        Array<Tuple>(
                            Tuple(
                                Enum<1u8>(
                                    "MorphEnergyCardData"
                                ),
                                Enum<1u8>(
                                    Enum<0u8>(
                                        Array<String>(
                                            "key_image_url",
                                            "name",
                                            "rarity",
                                            "energy",
                                            "availability"
                                        )
                                    )
                                )
                            )
                        ),
                        Array<Enum>(
                            Enum<0u8>()
                        )
                    )
                ),
                Enum<1u8>(
                    0u64
                ),
                Array<String>(
                    "key_image_url"
                )
            )
            Tuple(
                Enum<1u8>(
                    Tuple(
                        Enum<1u8>(
                            Enum<2u8>(
                                Enum<0u8>(
                                    Enum<0u8>(
                                        Enum<1u8>(
                                            Address("${config.radQuest.badges.adminBadgeAddress}")
                                        )
                                    )
                                )
                            )
                        ),
                        Enum<1u8>(
                            Enum<1u8>()
                        )
                    )
                ),
                Enum<1u8>(
                    Tuple(
                        Enum<1u8>(
                            Enum<2u8>(
                                Enum<0u8>(
                                    Enum<0u8>(
                                        Enum<1u8>(
                                            Address("${config.radQuest.badges.adminBadgeAddress}")
                                        )
                                    )
                                )
                            )
                        ),
                        Enum<1u8>(
                            Enum<1u8>()
                        )
                    )
                ),
                Enum<0u8>(),
                Enum<0u8>(),
                Enum<1u8>(
                    Tuple(
                        Enum<1u8>(
                            Enum<0u8>()
                        ),
                        Enum<1u8>(
                            Enum<1u8>()
                        )
                    )
                ),
                Enum<1u8>(
                    Tuple(
                        Enum<1u8>(
                            Enum<0u8>()
                        ),
                        Enum<1u8>(
                            Enum<1u8>()
                        )
                    )
                ),
                Enum<1u8>(
                    Tuple(
                        Enum<1u8>(
                            Enum<2u8>(
                                Enum<0u8>(
                                    Enum<0u8>(
                                        Enum<1u8>(
                                            Address("${config.radQuest.badges.adminBadgeAddress}")
                                        )
                                    )
                                )
                            )
                        ),
                        Enum<1u8>(
                            Enum<1u8>()
                        )
                    )
                )
            )
            Tuple(
                Map<String, Tuple>(
                    "name" => Tuple(
                        Enum<1u8>(
                            Enum<0u8>(
                                "Morph Energy Cards"
                            )
                        ),
                        true
                    ),
                    "description" => Tuple(
                        Enum<1u8>(
                            Enum<0u8>(
                                "These cards allow RadQuest’s Jetty to harness the primordial energies of the RadQuest realm to fuse Radgems into intricate and beautiful collectible Radmorphs."
                            )
                        ),
                        true
                    ),
                    "icon_url" => Tuple(
                        Enum<1u8>(
                            Enum<0u8>(
                                "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"
                            )
                        ),
                        true
                    )
                ),
                Map<String, Enum>()
            )
            Enum<0u8>()
        ;`)
        .andThen((value) => submitTransaction(value, ['systemAccount']))
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map((details): string => details.createdEntities[0].entity_address!)
    )
}
