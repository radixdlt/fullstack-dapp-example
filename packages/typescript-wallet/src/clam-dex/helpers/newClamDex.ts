import { config, radixEngineClient } from '../../config'

export const newClamDex = (name: string, description: string, price?: number) => {
  const optionalPrice = price ? `Some(Decimal("${price}"))` : 'None'

  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`
    CALL_METHOD
    Address("${wellKnownAddresses.accountAddress.payerAccount}")
    "lock_fee"
    Decimal("500")
;
CALL_METHOD
    Address("${wellKnownAddresses.accountAddress.dAppDefinitionAccount}")
    "create_proof_of_amount"
    Address("${config.radQuest.badges.superAdminBadgeAddress}") 
    Decimal("1")
; 
CALL_METHOD
    Address("${wellKnownAddresses.accountAddress.systemAccount}")
    "withdraw"
    Address("${config.radQuest.badges.adminBadgeAddress}")
    Decimal("1")
;
TAKE_FROM_WORKTOP
    Address("${config.radQuest.badges.adminBadgeAddress}")
    Decimal("1")
    Bucket("bucket1")
;
CALL_FUNCTION
    Address("${config.radQuest.clamDexPackage}")
    "ClamDex"
    "new"
    "${name}"
    "${description}"
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
    Bucket("bucket1")
    Address("${config.radQuest.resources.clamAddress}")
    Address("${config.radQuest.resources.elementAddress}")
    ${optionalPrice}
;
CALL_METHOD
    Address("${wellKnownAddresses.accountAddress.systemAccount}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP")
;
`)
        .andThen((value) => submitTransaction(value, ['systemAccount', 'dAppDefinitionAccount']))
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map((details): string => details.createdEntities[0].entity_address!)
    )
}
