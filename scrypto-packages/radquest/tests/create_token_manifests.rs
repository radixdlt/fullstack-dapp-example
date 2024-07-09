use scrypto::prelude::*;
use scrypto_test::prelude::*;
use scrypto_test::sdk::DIVISIBILITY_NONE;
use scrypto_test::utils::dump_manifest_to_file_system;

#[test]
fn create_a_super_admin_badge() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_fungible_resource(
        OwnerRole::Updatable(rule!(require(XRD))),
        true,
        DIVISIBILITY_NONE,
        FungibleResourceRoles::default(),
        metadata!(
            init {
              "name" => "RadQuest Super Admin Badge", updatable;
              "tags" => vec!["radquest", "badge"], updatable;
              "dapp_definitions" => vec!["dapp_definition_account_address"], updatable;
            }
        ),
        Some(dec!(1)),
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_a_super_admin_badge"),
        &network,
    )
    .err();
}

#[test]
fn create_admin_badge() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        true,
        DIVISIBILITY_NONE,
        FungibleResourceRoles {
            mint_roles: mint_roles! {
                minter => OWNER;
                minter_updater => OWNER;
            },
            burn_roles: burn_roles! {
                burner => OWNER;
                burner_updater => OWNER;
            },
            recall_roles: recall_roles! {
                recaller => OWNER;
                recaller_updater => OWNER;
            },
            withdraw_roles: withdraw_roles! {
                withdrawer => OWNER;
                withdrawer_updater => OWNER;
            },
            ..Default::default()
        },
        metadata!(
            init {
              "name" => "RadQuest Admin Badge", updatable;
              "tags" => vec!["radquest", "badge"], updatable;
              "dapp_definitions" => vec!["dapp_definition_account_address"], updatable;
            }
        ),
        None,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_admin_badge"),
        &network,
    )
    .err();
}

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
struct HeroBadgeData {
    name: String,
    description: String,
    #[mutable]
    key_image_url: Url,
    #[mutable]
    quests_completed: Vec<String>,
    #[mutable]
    quest_counter: u32,
}

#[test]
fn create_hero_badge() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_non_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        NonFungibleIdType::String,
        true,
        NonFungibleResourceRoles {
            mint_roles: mint_roles! {
                minter => OWNER;
                minter_updater => OWNER;
            },
            withdraw_roles: withdraw_roles! {
                withdrawer => rule!(deny_all);
                withdrawer_updater => OWNER;
            },
            ..Default::default()
        },
        metadata!(
            init {
              "name" => "RadQuest Hero Badges", updatable;
              "description" =>"A unique Hero Badge NFT is given to every RadQuest quester. It is presented whenever interacting with RadQuest, like claiming rewards or crafting RadMorphs.", updatable;
              "tags" => vec!["radquest", "badge"], updatable;
              "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), updatable;
              "dapp_definitions" => vec!["dapp_definition_account_address"], updatable;
            }
        ),
        None::<IndexMap<NonFungibleLocalId, HeroBadgeData>>,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_hero_badge"),
        &network,
    )
    .err();
}

#[test]
fn create_gift_box() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        true,
        DIVISIBILITY_NONE,
        FungibleResourceRoles {
            mint_roles: mint_roles! {
                minter => OWNER;
                minter_updater => rule!(deny_all);
            },
            burn_roles: burn_roles! {
                burner => OWNER;
                burner_updater => rule!(deny_all);
            },
            ..Default::default()
        },
        metadata!(
            init {
              "name" => "Gift Box", updatable;
              "description" => "Gift Boxes are filled with treasures and surprises, waiting to be opened.", updatable;
              "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), updatable;
              "dapp_definitions" => vec!["dapp_definition_account_address"], updatable;
            }
        ),
        None,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_gift_box"),
        &network,
    )
    .err();
}

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
struct RadgemData {
    #[mutable]
    key_image_url: Url,
    name: String,
    description: String,
    material: String,
    color: String,
    rarity: String,
    quality: Decimal,
}

#[test]
fn create_radgem() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_non_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        NonFungibleIdType::RUID,
        true,
        NonFungibleResourceRoles {
            mint_roles: mint_roles! {
                minter => rule!(require(XRD));
                minter_updater => rule!(deny_all);
            },
            burn_roles: burn_roles! {
                burner => rule!(require(XRD));
                burner_updater => rule!(deny_all);
            },
            ..Default::default()
        },
        metadata!(
            init {
              "name" => "RadGems", updatable;
              "description" => "Two RadGems can be combined with a Morph Energy Card by RadQuest’s Jetty to produce a beautiful RadMorph NFT. Higher quality RadGems will contribute to a higher quality RadMorph.", updatable;
              "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), updatable;
              "dapp_definitions" => vec!["dapp_definition_account_address"], updatable;
            }
        ),
        None::<IndexMap<NonFungibleLocalId, RadgemData>>,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_radgem"),
        &network,
    )
    .err();
}

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
struct MorphEnergyCardData {
    key_image_url: Url,
    name: String,
    description: String,
    energy_type: String,
    energy_description: String,
    rarity: String,
    quality: Decimal,
    limited_edition: bool,
}

#[test]
fn create_morph_energy_card() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_non_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        NonFungibleIdType::RUID,
        true,
        NonFungibleResourceRoles {
            mint_roles: mint_roles! {
                minter => rule!(require(XRD));
                minter_updater => rule!(deny_all);
            },
            burn_roles: burn_roles! {
                burner => rule!(require(XRD));
                burner_updater => rule!(deny_all);
            },
            ..Default::default()
        },
        metadata!(
          init {
            "name" => "Morph Energy Cards", updatable;
            "description" => "A Morph Energy Card can be combined with 2 RadGems by RadQuest’s Jetty to produce a beautiful RadMorph NFT. Higher quality Energy Cards will contribute to a higher quality RadMorph.

Morph Energy Cards allow RadQuest’s Jetty to harness the primordial energies of the universe to morph two RadGems into different shapes to create intricate, beautiful, and collectible RadMorphs.", updatable;
            "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), updatable;
            "dapp_definitions" => vec!["dapp_definition_account_address"], updatable;
          }
        ),
        None::<IndexMap<NonFungibleLocalId, MorphEnergyCardData>>,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_morph_energy_card"),
        &network,
    )
    .err();
}

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
struct RadmorphData {
    key_image_url: Url,
    name: String,
    description: String,
    quality: Decimal,
    material: String,
    card_type: String,
    card_rarity: String,
    card_quality: Decimal,
    radgem_1_color: String,
    radgem_1_material: String,
    radgem_1_rarity: String,
    radgem_1_quality: Decimal,
    radgem_2_color: String,
    radgem_2_material: String,
    radgem_2_rarity: String,
    radgem_2_quality: Decimal,
}

#[test]
fn create_radmorph() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_non_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        NonFungibleIdType::RUID,
        true,
        NonFungibleResourceRoles {
            mint_roles: mint_roles! {
                minter => rule!(require(XRD));
                minter_updater => rule!(deny_all);
            },
            burn_roles: burn_roles! {
                burner => rule!(require(XRD));
                burner_updater => rule!(deny_all);
            },
            ..Default::default()
        },
        metadata!(
          init {
            "name" => "RadMorphs", updatable;
            "description" => "Fused in the boundless energies of the RadQuest realm, RadMorphs are treasured by the dedicated and true of the Radix community.", updatable;
            "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), updatable;
            "dapp_definitions" => vec!["dapp_definition_account_address"], updatable;
          }
        ),
        None::<IndexMap<NonFungibleLocalId, RadmorphData>>,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_radmorph"),
        &network,
    )
    .err();
}

#[test]
pub fn create_otter_coin() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        true,
        scrypto::prelude::DIVISIBILITY_MAXIMUM,
        FungibleResourceRoles {
            mint_roles: mint_roles! {
                minter => OWNER;
                minter_updater => rule!(deny_all);
            },
            burn_roles: burn_roles! {
                burner => OWNER;
                burner_updater => rule!(deny_all);
            },
            ..Default::default()
        },
        metadata!(
          init {
            "name" => "Otter Coin", locked;
            "symbol" => "OTT", locked;
            "description" => "The official currency of RadQuest otters, Otter Coins are used to purchase delicious clams, and may one day have other value besides.", locked;
            "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), locked;
            "dapp_definitions" => vec!["dapp_definition_account_address"], updatable;
          }
        ),
        None
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_otter_coin"),
        &network,
    )
    .err();
}
