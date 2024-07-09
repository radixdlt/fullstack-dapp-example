import { config, radixEngineClient } from '../../config'

export const createEnergyCard = () => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`
            CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.payerAccount}")
            "lock_fee"
            Decimal("500")
        ;
        
        CREATE_NON_FUNGIBLE_RESOURCE
            Enum<1u8>(
                Enum<2u8>(
                    Enum<0u8>(
                        Enum<0u8>(
                            Enum<1u8>(
                                Address("${config.radQuest.badges.superAdminBadgeAddress}")
                            )
                        )
                    )
                )
            )
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
                                    ),
                                    Enum<0u8>(
                                        192u8
                                    ),
                                    Enum<0u8>(
                                        1u8
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
                                            "description",
                                            "energy_type",
                                            "rarity",
                                            "quality",
                                            "limited_edition"
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
                Array<String>()
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
                Enum<0u8>(),
                Enum<0u8>(),
                Enum<0u8>()
            )
            Tuple(
                Map<String, Tuple>(
                    "name" => Tuple(
                        Enum<1u8>(
                            Enum<0u8>(
                                "Morph Energy Cards"
                            )
                        ),
                        false
                    ),
                    "description" => Tuple(
                        Enum<1u8>(
                            Enum<0u8>(
                                "A Morph Energy Card can be combined with 2 RadGems by RadQuest’s Jetty to produce a beautiful RadMorph NFT. Higher quality Energy Cards will contribute to a higher quality RadMorph.\n\nMorph Energy Cards allow RadQuest’s Jetty to harness the primordial energies of the universe to morph two RadGems into different shapes to create intricate, beautiful, and collectible RadMorphs."
                            )
                        ),
                        false
                    ),
                    "icon_url" => Tuple(
                        Enum<1u8>(
                            Enum<13u8>(
                                "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"
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
                Map<String, Enum>()
            )
            Enum<0u8>()
        ;
        `)
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
