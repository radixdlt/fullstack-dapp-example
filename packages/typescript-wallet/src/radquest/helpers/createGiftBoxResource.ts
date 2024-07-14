import { GiftBoxMetadata } from 'common'
import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const createGiftBoxResource = ({
  superAdminBadgeAddress,
  adminBadgeAddress,
  metadata
}: {
  superAdminBadgeAddress: string
  adminBadgeAddress: string
  metadata: GiftBoxMetadata
}) => {
  const transactionManifest = `
CALL_METHOD
    Address("${config.radQuest.accounts.payer.address}")
    "lock_fee"
    Decimal("30")
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
                Enum<0u8>()
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
                Enum<0u8>()
            )
        ),
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
                        "${metadata.name}"
                    )
                ),
                false
            ),
            "description" => Tuple(
                Enum<1u8>(
                    Enum<0u8>(
                        "${metadata.description}"
                    )
                ),
                false
            ),
            "tags" => Tuple(
                Enum<1u8>(
                    Enum<128u8>(
                        Array<String>(
                            ${metadata.tags.map((tag) => `"${tag}"`).join(', ')}
                        )
                    )
                ),
                false
            ),
            "icon_url" => Tuple(
                Enum<1u8>(
                    Enum<13u8>(
                        "${metadata.iconUrl}"
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
`

  const transaction = transactionBuilder({
    transactionManifest,
    signers: ['payer']
  })

  return transaction
    .submit()
    .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
    .map((createdEntities): string => createdEntities[0].entity_address!)
}
