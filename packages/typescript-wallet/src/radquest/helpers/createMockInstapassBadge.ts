import { transactionBuilder } from '../../transaction/transactionBuilder'

export const createMockInstapassBadge = (adminBadge: string) => {
  const transactionManifest = `
CREATE_NON_FUNGIBLE_RESOURCE
  Enum<1u8>(
    Enum<2u8>(
        Enum<0u8>(
            Enum<0u8>(
                Enum<1u8>(
                    Address("${adminBadge}"),
                )
            )
        )
    )
  )
  Enum<NonFungibleIdType::String>()
  true
  Enum<0u8>(Enum<0u8>(Tuple(Array<Enum>(), Array<Tuple>(), Array<Enum>())), Enum<0u8>(66u8), Array<String>())
  Tuple(
    # Mint Roles (if None: defaults to DenyAll, DenyAll)
    Some(Tuple(
      # Minter (if None: defaults to Owner)
      None, 
      # Minter Updater (if None: defaults to Owner)
      Some(Enum<AccessRule::DenyAll>()) 
    )),
    # Burn Roles (if None: defaults to DenyAll, DenyAll)
    None,
    # Freeze Roles (if None: defaults to DenyAll, DenyAll)
    None,
    # Recall Roles (if None: defaults to DenyAll, DenyAll)
    None,
    # Withdraw Roles (if None: defaults to AllowAll, DenyAll)
    Some(Tuple(
      Some(Enum<AccessRule::DenyAll>()),
      Some(Enum<AccessRule::DenyAll>())
    )),
    # Deposit Roles (if None: defaults to AllowAll, DenyAll)
    None,
    # Non Fungible Data Update Roles (if None: defaults to DenyAll, DenyAll)
    None
  )
  Tuple(
    Map<String, Tuple>(
      "name" => Tuple(Some(Enum<Metadata::String>("Instapass Mock Badge")),
      false
    ),
    "tags" => Tuple(
      Some(Enum<Metadata::StringArray>(Array<String>("badge"))),
      false
    ),
    "icon_url" => Tuple(
      Some(Enum<Metadata::Url>("https://app.instapass.io/icons/nft_kyc.png")),
      false
    )
  ),
  Map<String, Enum>(
    "metadata_setter" => None,          # None defaults to OWNER
    "metadata_setter_updater" => None,  # None defaults to OWNER
    "metadata_locker" => None,          # None defaults to OWNER
    "metadata_locker_updater" => None   # None defaults to OWNER
  )
)
None
;
`

  const transaction = transactionBuilder({
    transactionManifest,
    signers: []
  })

  return transaction
    .submit()
    .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
    .map((createdEntities): string => createdEntities[0].entity_address!)
}
