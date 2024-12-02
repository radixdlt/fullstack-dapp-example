import * as fs from 'fs'
import * as path from 'path'
import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'
import { fileURLToPath } from 'url'

// Define __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const createAdminBadgeResource = (superAdminBadgeAddress: string) => {
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
        Enum<1u8>(
            Tuple(
                Enum<0u8>(),
                Enum<0u8>()
            )
        ),
        Enum<0u8>()
    )
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
        Map<String, Enum>()
    )
    Enum<0u8>()
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
        /adminBadgeAddress:\s*'resource_tdx_2_[^']*'/,
        `adminBadgeAddress: '${address}'`
      )
      fs.writeFileSync(envFilePath, updatedConstantsFileContent)

      return address
    })
}
