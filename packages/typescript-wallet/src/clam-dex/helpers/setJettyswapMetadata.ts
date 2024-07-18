import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const setJettyswapMetadata = () => {
  const jettySwapDappDefinition = config.radQuest.accounts.jettySwapDappDefinition.address
  const transactionManifest = `
SET_METADATA
    Address("${jettySwapDappDefinition}")
    "account_type"
    Enum<Metadata::String>(
        "dapp definition"
    )
;
SET_METADATA
    Address("${jettySwapDappDefinition}")
    "name"
    Enum<Metadata::String>(
        "JettySwap"
    )
;
SET_METADATA
    Address("${jettySwapDappDefinition}")
    "description"
    Enum<Metadata::String>(
        "A just-for-fun DEX for those learning to use Radix – and lovers of Clams. JettySwap provides a stable swapping price."
    )
;
SET_METADATA
    Address("${jettySwapDappDefinition}")
    "icon_url"
    Enum<Metadata::Url>(
        "https://assets.radixdlt.com/icons/JettySwap.webp"
    )
;
SET_METADATA
    Address("${jettySwapDappDefinition}")
    "claimed_websites"
    Enum<Metadata::OriginArray>(
        Array<String>(
            "${config.radQuest.dapps.jettySwap.url}"
        )
    )
;
SET_METADATA
    Address("${jettySwapDappDefinition}")
    "claimed_entities"
    Enum<Metadata::AddressArray>(
        Array<Address>(
            Address("${config.radQuest.resources.clamAddress}"),
            Address("${config.radQuest.resources.ottercoinAddress}"),
            Address("${config.radQuest.components.jettySwap}"),
        )
    )
;
SET_METADATA
    Address("${jettySwapDappDefinition}")
    "dapp_definitions"
    Enum<Metadata::AddressArray>(
        Array<Address>(
            Address("${config.radQuest.accounts.dAppDefinition.address}"),
            Address("${config.radQuest.accounts.jettySwapDappDefinition.address}"),
        )
    )
;
`
  return transactionBuilder({ transactionManifest, signers: [] })
    .submit()
    .map(({ transactionId }) => transactionId)
}
