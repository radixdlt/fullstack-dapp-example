import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const newQuestRewards = () => {
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
    Bucket("admin_badges")
;
CALL_FUNCTION
  Address("${config.radQuest.radQuestPackage}")
  "QuestRewards"
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
  Address("${config.radQuest.badges.kycBadgeAddress}")
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
        kycOracleAddress: createdEntities[0].entity_address,
        questRewardsAddress: createdEntities[1].entity_address
      })
    )
}
