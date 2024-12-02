import * as fs from 'fs'
import * as path from 'path'
import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const newRefinery = () => {
  const transactionManifest = `
CALL_METHOD
    Address("${config.radQuest.accounts.owner.address}")
    "create_proof_of_amount"
    Address("${config.radQuest.badges.superAdminBadgeAddress}") 
    Decimal("1")
; 
CALL_METHOD
    Address("${config.radQuest.accounts.system.address}")
    "withdraw"
    Address("${config.radQuest.badges.adminBadgeAddress}")
    Decimal("3")
;
TAKE_ALL_FROM_WORKTOP
    Address("${config.radQuest.badges.adminBadgeAddress}")
    Bucket("admin_badges")
;
CALL_FUNCTION
    Address("${config.radQuest.radQuestPackage}")
    "Refinery"
    "new"
    Address("${config.radQuest.badges.superAdminBadgeAddress}")
    Enum<OwnerRole::Fixed>(
        Enum<AccessRule::Protected>(
            Enum<AccessRuleNode::ProofRule>(
                Enum<ProofRule::Require>(
                    Enum<ResourceOrNonFungible::Resource>(
                        Address("${config.radQuest.badges.superAdminBadgeAddress}")
                    )
                )
            )
        )
    )
    Address("${config.radQuest.accounts.jetty.address}")
    Bucket("admin_badges")
    Address("${config.radQuest.badges.heroBadgeAddress}")
    Address("${config.radQuest.resources.elementAddress}")
    Address("${config.radQuest.resources.morphEnergyCardAddress}")
    Address("${config.radQuest.resources.radgemAddress}")
    Address("${config.radQuest.resources.radmorphAddress}")
;
`
  const transaction = transactionBuilder({
    transactionManifest,
    signers: ['owner', 'system']
  })
  return transaction
    .submit()
    .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
    .map((createdEntities): Record<string, string> => {
      const radgemForgeAddress = createdEntities[0].entity_address
      const radmorphForgeAddress = createdEntities[1].entity_address
      const imageOracleAddress = createdEntities[2].entity_address
      const refineryAddress = createdEntities[3].entity_address

      const envFilePath = path.resolve(__dirname, '../../../../../packages/common/src/constants.ts')
      const constantsFileContent = fs.readFileSync(envFilePath, 'utf8')

      const updatedConstantsFileContent = constantsFileContent
        .replace(
          /radgemForgeV2:\s*'component_tdx_2_[^']*'/,
          `radgemForgeV2: '${radgemForgeAddress}'`
        )
        .replace(
          /radmorphForge:\s*'component_tdx_2_[^']*'/,
          `radmorphForge: '${radmorphForgeAddress}'`
        )
        .replace(/imageOracle:\s*'component_tdx_2_[^']*'/, `imageOracle: '${imageOracleAddress}'`)
        .replace(/refinery:\s*'component_tdx_2_[^']*'/, `refinery: '${refineryAddress}'`)

      fs.writeFileSync(envFilePath, updatedConstantsFileContent)

      return {
        radgemForgeAddress,
        radmorphForgeAddress,
        imageOracleAddress,
        refineryAddress
      }
    })
}
