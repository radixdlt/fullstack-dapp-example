import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const createElementResource = ({
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
          Decimal("10")
        ;

        CREATE_FUNGIBLE_RESOURCE
          Enum<1u8>(
              Enum<2u8>(
                  Enum<0u8>(
                      Enum<0u8>(
                          Enum<1u8>(
                              Address("${superAdminBadgeAddress}"),
                          )
                      )
                  )
              )
          )
          true
          0u8
          Tuple(
            # Mint Roles (if None: defaults to DenyAll, DenyAll)
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
                Some(Enum<AccessRule::DenyAll>())
              )
            ),
            # Burn Roles (if None: defaults to DenyAll, DenyAll)
            Some(         
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
                  Some(Enum<Metadata::String>("Element")),                  
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
