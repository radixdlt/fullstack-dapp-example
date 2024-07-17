import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'
import { ResultAsync } from 'neverthrow'
import { typedError } from 'common'

export const createSuperAdminBadge = () => {
  return ResultAsync.fromPromise(
    RadixEngineToolkit.Utils.knownAddresses(config.network.networkId),
    typedError
  ).andThen((knownAddresses) => {
    const transactionManifest = `
ALLOCATE_GLOBAL_ADDRESS
    Address("${knownAddresses.packageAddresses.resourcePackage}")
    "FungibleResourceManager"
    AddressReservation("super_admin_badge")
    NamedAddress("super_admin_badge")
;          

CREATE_FUNGIBLE_RESOURCE_WITH_INITIAL_SUPPLY
  Enum<OwnerRole::Fixed>(
      Enum<AccessRule::Protected>(
          Enum<AccessRuleNode::ProofRule>(
              Enum<ProofRule::Require>(
                  Enum<ResourceOrNonFungible::Resource>(
                      NamedAddress("super_admin_badge")
                  )
              )
          )
      )
  )
  true
  0u8
  Decimal("2")
  Tuple(
    None,
    None,
    None,
    None,
    None,
    None
  )
  Tuple(
    Map<String, Tuple>(
      "name" => Tuple(
        Some(
          Enum<Metadata::String>(
            "RadQuest Super Admin Badge"
          )
        ),
        false
      ),
      "tags" => Tuple(
        Some(
          Enum<Metadata::StringArray>(
            Array<String>(
              "radquest",
              "badge"
            )
          )
        ),
        false
      ),
      "dapp_definitions" => Tuple(
        Enum<1u8>(
          Enum<128u8>(
            Array<String>(
              "${config.radQuest.accounts.dAppDefinition.address}"
            )
          )
        ),
        false
      )
    ),
    Map<String, Enum>()
  )
  Some(
      AddressReservation("super_admin_badge")
  )
;

CALL_METHOD
  Address("${config.radQuest.accounts.owner.address}")
  "try_deposit_batch_or_abort"
  Expression("ENTIRE_WORKTOP")
  Enum<0u8>()
;`

    const transaction = transactionBuilder({ transactionManifest, signers: ['owner'] })
    return transaction
      .submit()
      .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
      .map((createdEntities): string => createdEntities[0].entity_address!)
  })
}
