import { fileURLToPath } from 'url'
import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const newHeroBadgeForge = () => {
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
    Decimal("1")
;
TAKE_ALL_FROM_WORKTOP
    Address("${config.radQuest.badges.adminBadgeAddress}")
    Bucket("admin_badge")
;
CALL_FUNCTION
    Address("${config.radQuest.radQuestPackage}")
    "HeroBadgeForge"
    "new"
    Address("${config.radQuest.badges.superAdminBadgeAddress}")
    Enum<1u8>(
        Enum<2u8>(
            Enum<0u8>(
                Enum<0u8>(
                    Enum<1u8>(
                        Address("${config.radQuest.badges.superAdminBadgeAddress}")
                    )
                )
            )
        )
    )
    Address("${config.radQuest.accounts.dAppDefinition.address}")
    Bucket("admin_badge")
    Address("${config.radQuest.badges.heroBadgeAddress}")
;
`
  const transaction = transactionBuilder({
    transactionManifest,
    signers: ['owner', 'system']
  })
  return transaction
    .submit()
    .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
    .map((createdEntities) => {
      const address = createdEntities[0].entity_address!

      const envFilePath = path.resolve(__dirname, '../../../../../packages/common/src/constants.ts')
      const constantsFileContent = fs.readFileSync(envFilePath, 'utf8')
      const updatedConstantsFileContent = constantsFileContent.replace(
        /heroBadgeForgeV2:\s*'component_tdx_2_[^']*'/,
        `heroBadgeForgeV2: '${address}'`
      )
      fs.writeFileSync(envFilePath, updatedConstantsFileContent)

      return address
    })
}
