import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const setJettyMetadata = () => {
  const jettyDppDefinition = config.radQuest.accounts.jetty.address
  const transactionManifest = `
SET_METADATA
    Address("${jettyDppDefinition}")
    "account_type"
    Enum<Metadata::String>(
        "dapp definition"
    )
;
SET_METADATA
    Address("${jettyDppDefinition}")
    "name"
    Enum<Metadata::String>(
        "Jetty"
    )
;
SET_METADATA
    Address("${jettyDppDefinition}")
    "description"
    Enum<Metadata::String>(
        "Jetty isn’t just a cute otter graphic on RadQuest; he also has a set of smart contracts running on the Radix Network, written in Radix’s own Scrypto smart contract language! That’s where Jetty gets his web3 powers to help you collect and combine various assets into RadMorph NFTs and more."
    )
;
SET_METADATA
    Address("${jettyDppDefinition}")
    "icon_url"
    Enum<Metadata::Url>(
        "https://assets.radixdlt.com/icons/Jetty.webp"
    )
;
SET_METADATA
    Address("${jettyDppDefinition}")
    "claimed_websites"
    Enum<Metadata::OriginArray>(
        Array<String>(
            "${config.radQuest.dapps.radquest.url}"
        )
    )
;
SET_METADATA
    Address("${jettyDppDefinition}")
    "claimed_entities"
    Enum<Metadata::AddressArray>(
        Array<Address>(
            Address("${config.radQuest.badges.heroBadgeAddress}"),
            Address("${config.radQuest.resources.clamAddress}"),
            Address("${config.radQuest.resources.elementAddress}"),
            Address("${config.radQuest.resources.giftBox.Starter}"),
            Address("${config.radQuest.resources.giftBox.Simple}"),
            Address("${config.radQuest.resources.giftBox.Fancy}"),
            Address("${config.radQuest.resources.giftBox.Elite}"),
            Address("${config.radQuest.resources.morphEnergyCardAddress}"),
            Address("${config.radQuest.resources.ottercoinAddress}"),
            Address("${config.radQuest.resources.radgemAddress}"),
            Address("${config.radQuest.resources.radmorphAddress}"),
            Address("${config.radQuest.components.giftBoxOpener}"),
            Address("${config.radQuest.components.questRewards}"),
            Address("${config.radQuest.components.refinery}"),
            Address("${config.radQuest.components.radgemForgeV2}")
        )
    )
;
SET_METADATA
    Address("${jettyDppDefinition}")
    "dapp_definitions"
    Enum<Metadata::AddressArray>(
        Array<Address>(
            Address("${config.radQuest.accounts.dAppDefinition.address}"),
            Address("${config.radQuest.accounts.jettySwapDappDefinition.address}"),
            Address("${config.radQuest.accounts.lettySwapDappDefinition.address}")
        )
    )
;
`
  return transactionBuilder({ transactionManifest, signers: ['jetty'] })
    .submit()
    .map(({ transactionId }) => transactionId)
}
