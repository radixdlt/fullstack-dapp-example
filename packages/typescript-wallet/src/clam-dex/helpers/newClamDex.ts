import { config, radixEngineClient } from '../../config'

export const newClamDex = (name: string, dappDefinition: string, stablePrice: boolean) => {
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
    Address("${wellKnownAddresses.accountAddress.ownerAccount}")
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
`)
        .andThen((value) =>
          submitTransaction({
            transactionManifest: value,
            signers: ['systemAccount', 'ownerAccount']
          })
        )
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map((details): string => details.createdEntities[0].entity_address!)
    )
}
