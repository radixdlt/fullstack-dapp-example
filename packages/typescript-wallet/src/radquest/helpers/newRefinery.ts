import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const newRefinery = () => {
  const transactionManifest = `
        CALL_METHOD
            Address("${config.radQuest.accounts.payer.address}")
            "lock_fee"
            Decimal("500")
        ;
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
            Address("${config.radQuest.accounts.dAppDefinition.address}")
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
    signers: ['payer', 'owner', 'system']
  })
  return transaction
    .submit()
    .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
    .map(
      (createdEntities): Record<string, string> => ({
        radgemForgeAddress: createdEntities[0].entity_address,
        radmorphForgeAddress: createdEntities[1].entity_address,
        imageOracleAddress: createdEntities[2].entity_address,
        refineryAddress: createdEntities[3].entity_address
      })
    )
}
