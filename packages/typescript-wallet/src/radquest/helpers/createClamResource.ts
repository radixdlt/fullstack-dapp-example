import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const createClamResource = ({
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
                  Enum<1u8>(
                      Enum<1u8>()
                  )
              )
          ),
            # Burn Roles (if None: defaults to DenyAll, DenyAll)
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
                            "https://arweave.net/29jZfSeFeAZET3XfwNHDXycPskCpuyb5T40Ns-DKkXE"
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
                "metadata_setter" => Enum<1u8>(
                  Enum<2u8>(
                      Enum<0u8>(
                          Enum<0u8>(
                              Enum<1u8>(
                                  Address("${superAdminBadgeAddress}"),
                              )
                          )
                      )
                  )
              ),
                "metadata_setter_updater" => None,
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
