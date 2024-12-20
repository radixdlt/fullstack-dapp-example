import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

// Define __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const newGiftBoxOpenerV2 = (giftBoxOpenerV2Package?: string) => {
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
TAKE_FROM_WORKTOP
    Address("${config.radQuest.badges.adminBadgeAddress}")
    Decimal("1")
    Bucket("admin_badge")
;
CALL_FUNCTION
    Address("${giftBoxOpenerV2Package ?? 'config.radQuest.giftBoxOpenerV2Package'}")
    "GiftBoxOpenerV2"
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
    Address("${config.radQuest.accounts.dAppDefinition.address}")
    Address("${config.radQuest.badges.heroBadgeAddress}")
    Bucket("admin_badge")
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
      const address = createdEntities[0].entity_address!

      const envFilePath = path.resolve(__dirname, '../../../../../packages/common/src/constants.ts')
      const constantsFileContent = fs.readFileSync(envFilePath, 'utf8')
      const updatedConstantsFileContent = constantsFileContent.replace(
        /giftBoxOpenerV2:\s*'component_tdx_2_[^']*'/,
        `giftBoxOpenerV2: '${address}'`
      )
      fs.writeFileSync(envFilePath, updatedConstantsFileContent)

      return {
        giftBoxOpenerV2: address
      }
    })
}
