import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const createOttercoin = ({
  superAdminBadgeAddress,
  adminBadgeAddress
}: {
  superAdminBadgeAddress: string
  adminBadgeAddress: string
}) => {
  const transactionManifest = `
CALL_METHOD
    Address("${config.radQuest.accounts.payer.address}")
    "lock_fee"
    Decimal("50")
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
    18u8
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
        Enum<0u8>()
    )
    Tuple(
        Map<String, Tuple>(
            "name" => Tuple(
                Enum<1u8>(
                    Enum<0u8>(
                        "Ottercoin"
                    )
                ),
                true
            ),
            "description" => Tuple(
                Enum<1u8>(
                    Enum<0u8>(
                        "Ottercoin was created by RadQuest’s guide otter, Jetty. Maybe you can buy some with a few Clams?\n\nClams are a token that is fungible and highly divisible. That means every clam is worth just the same as another, and you can send and hold even tiny fractions of an ottercoin!"
                    )
                ),
                true
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
                true
            ),
            "dapp_definitions" => Tuple(
                Enum<1u8>(
                    Enum<128u8>(
                        Array<String>(
                            "${config.radQuest.accounts.jetty.address}"
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
    signers: ['payer', 'system']
  })
  return transaction
    .submit()
    .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
    .map((createdEntities): string => createdEntities[0].entity_address!)
    .mapErr((err) => {
      console.error(err)
    })
}
