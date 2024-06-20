import { config, radixEngineClient } from '../../config'

export const newHeroBadgeForge = () => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
      convertStringManifest(`
        CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.payerAccount}")
            "lock_fee"
            Decimal("50")
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
        TAKE_ALL_FROM_WORKTOP
            Address("${config.radQuest.badges.adminBadgeAddress}")
            Bucket("admin_badge")
        ;
        CALL_FUNCTION
            Address("${config.radQuest.package}")
            "HeroBadgeForge"
            "new"
            Address("${config.radQuest.badges.superAdminBadgeAddress}")
            Enum<1u8>(
                Enum<2u8>(
                    Enum<0u8>(
                        Enum<0u8>(
                            Enum<1u8>(
                                Address("${config.radQuest.badges.adminBadgeAddress}")
                            )
                        )
                    )
                )
            )
            Bucket("admin_badge")
            Address("${config.radQuest.badges.heroBadgeAddress}")
        ;
        `)
        .andThen((value) =>
          submitTransaction({
            transactionManifest: value,
            signers: ['systemAccount', 'dAppDefinitionAccount']
          })
        )
        .andThen(({ txId }) =>
          radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
        )
        .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
        .map(
          (details): Record<string, string> =>
            ({
              heroBadgeForgeAddress: details.createdEntities[0].entity_address
            })!
        )
    )
}
