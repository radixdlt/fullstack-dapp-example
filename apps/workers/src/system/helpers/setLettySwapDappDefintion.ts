import { config } from '../../config'

const lettySwapDappDefinition = config.radQuest.accounts.lettySwapDappDefinition.address
export const lettySwapDappDefinitionTransactionManifest = `
CALL_METHOD 
  Address("${config.radQuest.accounts.payer.accessController}") 
  "create_proof"
;

CALL_METHOD 
  Address("${config.radQuest.accounts.payer.address}") 
  "lock_fee"
  Decimal("10")
;

CALL_METHOD 
  Address("${config.radQuest.accounts.lettySwapDappDefinition.accessController}") 
  "create_proof"
;

SET_METADATA
  Address("${lettySwapDappDefinition}")
  "account_type"
  Enum<Metadata::String>(
      "dapp definition"
  )
;
SET_METADATA
  Address("${lettySwapDappDefinition}")
  "name"
  Enum<Metadata::String>(
      "LettySwap"
  )
;
SET_METADATA
  Address("${lettySwapDappDefinition}")
  "description"
  Enum<Metadata::String>(
      "A just-for-fun DEX for those learning to use Radix – and lovers of Clams. LettySwap provides a… not-so-stable swapping price."
  )
;
SET_METADATA
  Address("${lettySwapDappDefinition}")
  "icon_url"
  Enum<Metadata::Url>(
      "https://assets.radixdlt.com/icons/LettySwap.webp"
  )
;
SET_METADATA
  Address("${lettySwapDappDefinition}")
  "claimed_websites"
  Enum<Metadata::OriginArray>(
      Array<String>(
          "${config.radQuest.dapps.lettySwap.url}"
      )
  )
;
SET_METADATA
  Address("${lettySwapDappDefinition}")
  "claimed_entities"
  Enum<Metadata::AddressArray>(
      Array<Address>(
          Address("${config.radQuest.resources.clamAddress}"),
          Address("${config.radQuest.resources.ottercoinAddress}"),
          Address("${config.radQuest.components.lettySwap}"),
          Address("${config.radQuest.components.lettySwapPriceOracle}"),
      )
  )
;
SET_METADATA
  Address("${lettySwapDappDefinition}")
  "dapp_definitions"
  Enum<Metadata::AddressArray>(
      Array<Address>(
          Address("${config.radQuest.accounts.dAppDefinition.address}"),
          Address("${config.radQuest.accounts.jettySwapDappDefinition.address}"),
      )
  )
;`
