import fs from 'fs'
import path from 'path'
import { GiftBoxMetadata } from 'common'
import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'
import { fileURLToPath } from 'url'

// Define __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    signers: []
  })

  return transaction
    .submit()
    .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
    .map((createdEntities): string => {
      const address = createdEntities[0].entity_address!

      const type = metadata.name.toLowerCase().includes('starter')
        ? 'Starter'
        : metadata.name.toLowerCase().includes('simple')
          ? 'Simple'
          : metadata.name.toLowerCase().includes('fancy')
            ? 'Fancy'
            : metadata.name.toLowerCase().includes('elite')
              ? 'Elite'
              : 'Starter'

      const envFilePath = path.resolve(__dirname, '../../../../../packages/common/src/constants.ts')
      const constantsFileContent = fs.readFileSync(envFilePath, 'utf8')
      const updatedConstantsFileContent = constantsFileContent.replace(
        new RegExp(`${type}:\\s*'resource_tdx_2_[^']*'`),
        `${type}: '${address}'`
      )
      fs.writeFileSync(envFilePath, updatedConstantsFileContent)

      return address
    })
}
