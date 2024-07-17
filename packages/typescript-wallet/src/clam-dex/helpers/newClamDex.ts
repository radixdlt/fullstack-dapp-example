import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const newClamDex = (name: string, dappDefinition: string, stablePrice: boolean) => {
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
    Address("${config.radQuest.clamDexPackage}")
    "ClamDex"
    "new"
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
    Address("${dappDefinition}")
    "${name}"
    Bucket("admin_badge")
    Address("${config.radQuest.resources.clamAddress}")
    Address("${config.radQuest.resources.ottercoinAddress}")
    ${stablePrice}
;
`
  const transaction = transactionBuilder({
    transactionManifest,
    signers: ['owner', 'system']
  })
  return transaction
    .submit()
    .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
    .map((createdEntities): string => createdEntities[0].entity_address!)
}
