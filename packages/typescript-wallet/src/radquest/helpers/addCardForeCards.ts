import { config, radixEngineClient } from '../../config'

export const addCardForgeCards = (cardForgeAddress: string) => {
  return radixEngineClient
    .getManifestBuilder()
    .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) => {
      return convertStringManifest(`
                    CALL_METHOD
                        Address("${wellKnownAddresses.accountAddress.payerAccount}")
                        "lock_fee"
                        Decimal("50")
                    ;
                    
                    CALL_METHOD
                        Address("${wellKnownAddresses.accountAddress.ownerAccount}")
                        "create_proof_of_amount"
                        Address("${config.radQuest.badges.superAdminBadgeAddress}") 
                        Decimal("1")
                    ;  
                    
                    CALL_METHOD
                    Address("${cardForgeAddress}")
                    "set_random_cards"
                    Array<Tuple>(
                      Tuple(
                        "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg",
                        "Molten Lava Morph Card",
                        "Common",
                        "Molten Lava",
                      ),
                      Tuple(
                        "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg",
                        "Solar Flare Morph Card",
                        "Uncommon",
                        "Solar Flare",
                      ),
                      Tuple(
                        "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg",
                        "Black Hole Morph Card",
                        "Rare",
                        "Black Hole",
                      ),
                    )
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
    })
}
