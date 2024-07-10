import { config, radixEngineClient } from '../../config'

export const createRadgem = ({
  superAdminBadgeAddress,
  adminBadgeAddress
}: {
  superAdminBadgeAddress: string
  adminBadgeAddress: string
}) => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`
        CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.payerAccount}")
            "lock_fee"
            Decimal("50")
        ;

        CREATE_NON_FUNGIBLE_RESOURCE
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
                                        12u8
                                    ),
                                    Enum<0u8>(
                                        192u8
                                    )
                                )
                            )
                        ),
                        Array<Tuple>(
                            Tuple(
                                Enum<1u8>(
                                    "RadgemData"
                                ),
                                Enum<1u8>(
                                    Enum<0u8>(
                                        Array<String>(
                                            "key_image_url",
                                            "name",
                                            "description",
                                            "material",
                                            "color",
                                            "rarity",
                                            "quality"
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
                                            Address("${adminBadgeAddress}")
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
                                            Address("${adminBadgeAddress}")
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
                Enum<1u8>(
                    Tuple(
                        Enum<1u8>(
                            Enum<2u8>(
                                Enum<0u8>(
                                    Enum<0u8>(
                                        Enum<1u8>(
                                            Address("${adminBadgeAddress}")
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
                                "RadGems"
                            )
                        ),
                        false
                    ),
                    "description" => Tuple(
                        Enum<1u8>(
                            Enum<0u8>(
                                "Two RadGems can be combined with a Morph Energy Card by RadQuest’s Jetty to produce a beautiful RadMorph NFT. Higher quality RadGems will contribute to a higher quality RadMorph."
                            )
                        ),
                        false
                    ),
                    "tags" => Tuple(
                        Enum<1u8>(
                            Enum<128u8>(
                                Array<String>(
                                    "radquest"
                                )
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
