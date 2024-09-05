import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const setRadquestMetadata = () => {
  const radquestDppDefinition = config.radQuest.accounts.dAppDefinition.address
  const transactionManifest = `
SET_METADATA
    Address("${radquestDppDefinition}")
    "account_type"
    Enum<Metadata::String>(
        "dapp definition"
    )
;
SET_METADATA
    Address("${radquestDppDefinition}")
    "name"
    Enum<Metadata::String>(
        "RadQuest"
    )
;
SET_METADATA
    Address("${radquestDppDefinition}")
    "description"
    Enum<Metadata::String>(
        "RadQuest is a dApp created by the creators of the Radix Network and Radix Wallet to help people get started on Radix and learn about web3, while having a little fun and earning some rewards."
    )
;
SET_METADATA
    Address("${radquestDppDefinition}")
    "icon_url"
    Enum<Metadata::Url>(
        "https://assets.radixdlt.com/icons/RadQuest.webp"
    )
;
SET_METADATA
    Address("${radquestDppDefinition}")
    "claimed_websites"
    Enum<Metadata::OriginArray>(
        Array<String>(
            "${config.radQuest.dapps.radquest.url}"
        )
    )
;
SET_METADATA
    Address("${radquestDppDefinition}")
    "claimed_entities"
    Enum<Metadata::AddressArray>(
        Array<Address>(
            Address("${config.radQuest.badges.superAdminBadgeAddress}"),
            Address("${config.radQuest.badges.adminBadgeAddress}"),
            Address("${config.radQuest.badges.heroBadgeAddress}"),
            Address("${config.radQuest.badges.kycBadgeAddress}"),
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
            Address("${config.radQuest.components.cardForge}"),
            Address("${config.radQuest.components.giftBoxOpener}"),
            Address("${config.radQuest.components.heroBadgeForge}"),
            Address("${config.radQuest.components.imageOracle}"),
            Address("${config.radQuest.components.kycOracle}"),
            Address("${config.radQuest.components.questRewards}"),
            Address("${config.radQuest.components.radgemForge}"),
            Address("${config.radQuest.components.refinery}"),
            Address("${config.radQuest.components.heroBadgeForgeV2}"),
            Address("${config.radQuest.components.giftBoxOpenerV2}"),
            Address("${config.radQuest.components.cardForgeV2}"),
            Address("${config.radQuest.components.radgemForgeV2}"),
            Address("${config.radQuest.components.questRewardsV2}"),
        )
    )
;
SET_METADATA
    Address("${radquestDppDefinition}")
    "dapp_definitions"
    Enum<Metadata::AddressArray>(
        Array<Address>(
            Address("${config.radQuest.accounts.jetty.address}"),
            Address("${config.radQuest.accounts.jettySwapDappDefinition.address}"),
            Address("${config.radQuest.accounts.lettySwapDappDefinition.address}")
        )
    )
;
`
  return transactionBuilder({ transactionManifest, signers: ['dAppDefinition'] })
    .submit()
    .map(({ transactionId }) => transactionId)
}
