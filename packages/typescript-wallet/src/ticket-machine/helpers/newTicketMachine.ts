import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const newTicketMachine = (ticketPrice: number, ticketMachinePackage?: string) => {
  const transactionManifest = `
CALL_FUNCTION
    Address("${ticketMachinePackage ?? config.radQuest.ticketMachinePackage}")
    "TicketMachine"
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
    Decimal("${ticketPrice}")
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
    .map((createdEntities): Record<string, string> => {
      const address = createdEntities[0].entity_address!

      const envFilePath = path.resolve(__dirname, '../../../../../packages/common/src/constants.ts')
      const constantsFileContent = fs.readFileSync(envFilePath, 'utf8')
      const updatedConstantsFileContent = constantsFileContent.replace(
        /ticketMachine:\s*'component_tdx_2_[^']*'/,
        `ticketMachine: '${address}'`
      )
      fs.writeFileSync(envFilePath, updatedConstantsFileContent)

      return {
        ticketMachine: address
      }
    })
}
