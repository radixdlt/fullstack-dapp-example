import * as fs from 'fs'
import * as path from 'path'
import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'
import { fileURLToPath } from 'url'

// Define __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const createEnergyCard = ({
  superAdminBadgeAddress,
  adminBadgeAddress
}: {
  superAdminBadgeAddress: string
  adminBadgeAddress: string
}) => {
  const transactionManifest = `
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
                                    "energy_description",
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
                        "https://arweave.net/7y9rpsafHpVU2sFE-VbtU5FE2UTjynRW7acTI7T1Dr8"
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

      const envFilePath = path.resolve(__dirname, '../../../../../packages/common/src/constants.ts')
      const constantsFileContent = fs.readFileSync(envFilePath, 'utf8')
      const updatedConstantsFileContent = constantsFileContent.replace(
        /morphEnergyCardAddress:\s*'resource_tdx_2_[^']*'/,
        `morphEnergyCardAddress: '${address}'`
      )
      fs.writeFileSync(envFilePath, updatedConstantsFileContent)

      return address
    })
}
