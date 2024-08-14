import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const newCardForgeV2 = (cardForgeV2Package?: string) => {
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
    Address("${cardForgeV2Package ?? config.radQuest.cardForgeV2Package}")
    "CardForgeV2"
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
    Bucket("admin_badge")
    Address("${config.radQuest.resources.morphEnergyCardAddress}");
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
        cardForgeV2: createdEntities[0].entity_address!
      })
    )
}
