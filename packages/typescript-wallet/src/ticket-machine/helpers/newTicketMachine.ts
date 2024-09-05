import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

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
    .map(
      (createdEntities): Record<string, string> => ({
        ticketMachine: createdEntities[0].entity_address!
      })
    )
}
