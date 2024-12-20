import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const setRadquestMetadata = () => {
  const radquestDappDefinition = config.radQuest.accounts.dAppDefinition.address
  const transactionManifest = `
SET_METADATA
    Address("${radquestDappDefinition}")
    "account_type"
    Enum<Metadata::String>(
        "dapp definition"
    )
;
SET_METADATA
    Address("${radquestDappDefinition}")
    "name"
    Enum<Metadata::String>(
        "Full Stack Example"
    )
;
SET_METADATA
    Address("${radquestDappDefinition}")
    "description"
    Enum<Metadata::String>(
        "The Full Stack Example demonstrates how to build a full stack application on Radix."
    )
;
SET_METADATA
    Address("${radquestDappDefinition}")
    "icon_url"
    Enum<Metadata::Url>(
        "https://assets.radixdlt.com/icons/full-stack-example/otta_coin.webp"
    )
;
SET_METADATA
    Address("${radquestDappDefinition}")
    "claimed_websites"
    Enum<Metadata::OriginArray>(
        Array<String>(
            "${config.radQuest.dapps.radquest.url}"
        )
    )
;
SET_METADATA
    Address("${radquestDappDefinition}")
    "claimed_entities"
    Enum<Metadata::AddressArray>(
        Array<Address>(
            Address("${config.radQuest.badges.superAdminBadgeAddress}"),
            Address("${config.radQuest.badges.adminBadgeAddress}"),
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
            Address("${config.radQuest.components.imageOracle}"),
            Address("${config.radQuest.components.refinery}"),
            Address("${config.radQuest.components.heroBadgeForgeV2}"),
            Address("${config.radQuest.components.giftBoxOpenerV2}"),
            Address("${config.radQuest.components.cardForgeV2}"),
            Address("${config.radQuest.components.radgemForgeV2}"),
            Address("${config.radQuest.components.questRewardsV2}"),
        )
    )
;
`
  return transactionBuilder({ transactionManifest, signers: ['dAppDefinition'] })
    .submit()
    .map(({ transactionId }) => transactionId)
}
