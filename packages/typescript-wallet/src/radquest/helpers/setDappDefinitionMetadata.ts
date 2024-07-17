import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const setDappDefinitionMetadata = (dAppDefinition: string) => {
  const transactionManifest = `
CALL_METHOD
    Address("${config.radQuest.accounts.payer.address}")
    "lock_fee"
    Decimal("50")
;
SET_METADATA
    Address("${dAppDefinition}")
    "account_type"
    Enum<Metadata::String>(
        "dapp definition"
    )
;
SET_METADATA
    Address("${dAppDefinition}")
    "name"
    Enum<Metadata::String>(
        "RadQuest"
    )
;
SET_METADATA
    Address("${dAppDefinition}")
    "description"
    Enum<Metadata::String>(
        "RadQuest is a dApp created by the creators of the Radix Network and Radix Wallet to help people get started on Radix and learn about web3, while having a little fun and earning some rewards."
    )
;
SET_METADATA
    Address("${dAppDefinition}")
    "icon_url"
    Enum<Metadata::Url>(
        "https://placeholder.icon.address"
    )
;
SET_METADATA
    Address("${dAppDefinition}")
    "claimed_websites"
    Enum<Metadata::OriginArray>(
        Array<String>(
            "${config.radQuest.dapps.radquest.url}"
        )
    )
;
SET_METADATA
    Address("${dAppDefinition}")
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
            Address("${config.radQuest.components.refinery}")
        )
    )
;
SET_METADATA
    Address("${dAppDefinition}")
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
  return transactionBuilder({ transactionManifest, signers: ['payer', 'dAppDefinition'] })
    .submit()
    .map(({ transactionId }) => transactionId)
}
