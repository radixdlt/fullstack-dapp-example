import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

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
    .map((createdEntities) => createdEntities[0].entity_address!)
}
