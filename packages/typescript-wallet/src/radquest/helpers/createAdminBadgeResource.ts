import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const createAdminBadgeResource = (superAdminBadgeAddress: string) => {
  const transactionManifest = `     
        CALL_METHOD
            Address("${config.radQuest.accounts.payer.address}")
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
        ;`

  const transaction = transactionBuilder({
    transactionManifest,
    signers: ['payer']
  })

  return transaction
    .submit()
    .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
    .map((createdEntities): string => createdEntities[0].entity_address!)
}
