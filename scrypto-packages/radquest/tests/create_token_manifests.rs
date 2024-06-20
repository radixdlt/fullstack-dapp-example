use scrypto::prelude::*;
use scrypto_test::prelude::*;
use scrypto_test::sdk::DIVISIBILITY_NONE;
use scrypto_test::utils::dump_manifest_to_file_system;

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
struct HeroBadgeData {
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
                minter_updater => rule!(deny_all);
            },
            ..Default::default()
        },
        metadata!(
            init {
              "name" => "Hero Badges", locked;
              "description" => "Hero Badges are handed to each nobel RadQuest champion as they set forth.", locked;
              "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), locked;
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
              "name" => "Gift Box", locked;
              "symbol" => "GBX", locked;
              "description" => "Gift Boxes are filled with treasures and surprises, waiting to be opened.", locked;
              "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), locked;
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
    material: String,
    color: String,
    rarity: String,
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
              "name" => "RadGems", locked;
              "description" => "Two Radgems can be combined with a Morph Energy Card by RadQuest's Jetty to produce a beautiful Radmorph.", locked;
              "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), locked;
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
    #[mutable]
    key_image_url: Url,
    name: String,
    rarity: String,
    energy: String,
    availability: String,
}

#[test]
fn create_morph_card() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_non_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        NonFungibleIdType::RUID,
        true,
        NonFungibleResourceRoles {
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
            "name" => "Morph Energy Cards", locked;
            "description" => "These cards allow RadQuest’s Jetty to harness the primordial energies of the RadQuest realm to fuse Radgems into intricate and beautiful collectible Radmorphs.", locked;
            "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), locked;
          }
        ),
        None::<IndexMap<NonFungibleLocalId, MorphEnergyCardData>>,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_morph_card"),
        &network,
    )
    .err();
}

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
struct RadmorphData {
    key_image_url: Url,
    name: String,
    rarity: String,
    material: String,
    energy: String,
    color_1: String,
    color_2: String,
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
                minter => OWNER;
                minter_updater => rule!(deny_all);
            },
            ..Default::default()
        },
        metadata!(
          init {
            "name" => "RadMorphs", locked;
            "description" => "Fused in the boundless energies of the RadQuest realm, RadMorphs are treasured by the dedicated and true of Radix.", locked;
            "icon_url" => Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"), locked;
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
