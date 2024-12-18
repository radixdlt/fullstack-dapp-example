import * as fs from 'fs'
import * as path from 'path'
import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'
import { fileURLToPath } from 'url'

// Define __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const createClamResource = ({
  superAdminBadgeAddress,
  adminBadgeAddress
}: {
  superAdminBadgeAddress: string
  adminBadgeAddress: string
}) => {
  const transactionManifest = `     
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
                  Some(Enum<Metadata::String>("Clams")),                  
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
                            "https://assets.radixdlt.com/icons/full-stack-example/clem.jpg"
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
    signers: []
  })

  return transaction
    .submit()
    .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
    .map((createdEntities): string => {
      const address = createdEntities[0].entity_address!

      const envFilePath = path.resolve(__dirname, '../../../../../packages/common/src/constants.ts')
      const constantsFileContent = fs.readFileSync(envFilePath, 'utf8')
      const updatedConstantsFileContent = constantsFileContent.replace(
        /clamAddress:\s*'resource_tdx_2_[^']*'/,
        `clamAddress: '${address}'`
      )
      fs.writeFileSync(envFilePath, updatedConstantsFileContent)

      return address
    })
}
