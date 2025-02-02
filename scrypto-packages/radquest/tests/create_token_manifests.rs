use scrypto::prelude::*;
use scrypto_test::prelude::*;
use scrypto_test::sdk::DIVISIBILITY_NONE;
use scrypto_test::utils::dump_manifest_to_file_system;

#[test]
fn create_a_super_admin_badge() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        true,
        DIVISIBILITY_NONE,
        FungibleResourceRoles::default(),
        metadata!(
            init {
              "name" => "RadQuest Super Admin Badge", updatable;
              "tags" => vec!["radquest", "badge"], updatable;
              "dapp_definitions" => ["${dapp_definition}"], updatable;
            }
        ),
        Some(dec!(2)),
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
            freeze_roles: freeze_roles! {
                freezer => OWNER;
                freezer_updater => OWNER;
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
          "dapp_definitions" => ["${dapp_definition}"], updatable;
        }),
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
    #[mutable]
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
                minter => rule!(require(XRD));
                minter_updater => OWNER;
            },
            burn_roles: burn_roles!(
                burner => OWNER;
                burner_updater => OWNER;
            ),
            withdraw_roles: withdraw_roles! {
                withdrawer => rule!(deny_all);
                withdrawer_updater => OWNER;
            },
            recall_roles: recall_roles!(
                recaller => OWNER;
                recaller_updater => OWNER;
            ),
            non_fungible_data_update_roles: non_fungible_data_update_roles!(
                non_fungible_data_updater => rule!(require(XRD));
                non_fungible_data_updater_updater => OWNER;
            ),
            ..Default::default()
        },
        metadata!(
            init {
              "name" => "Full Stack Example Hero Badges", updatable;
              "description" =>"A unique Hero Badge NFT is given to every RadQuest quester. It is presented whenever interacting with RadQuest, like claiming rewards or crafting RadMorphs.", updatable;
              "tags" => vec!["radquest", "badge"], updatable;
              "icon_url" => Url::of("https://arweave.net/TkgiEdjcsfohra5z1lRojXbujnLfHXqUticbAhr7yVw"), updatable;
              "dapp_definitions" => ["${dapp_definition}"], updatable;
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

struct GiftBox {
    name: String,
    manifest_name: String,
    description: String,
    icon_url: Url,
}

#[test]
fn create_gift_box() {
    let gift_boxes = [GiftBox {
        name: "Starter Gift Boxes".into(),
        manifest_name: "create_gift_box_starter".into(),
        description: "This Gift Box from the Full Stack Example will get you started with a common Morph Energy Card and enough Elements to create a couple of RadGems. Ask Jetty to open it!".into(),
        icon_url: Url::of("https://arweave.net/ykgYDzucDR-laXkFu-Mtb00sb_6jNq-VMKebHMAv32k"),
    },
    GiftBox {
        name: "Simple Gift Boxes".into(),
        manifest_name: "create_gift_box_simple".into(),
        description: "This simple Gift Box from the Full Stack Example contains a common or rare Morph Energy Card and a handful of Elements. Ask Jetty to open it!".into(),
        icon_url: Url::of("https://arweave.net/dh4CsYX8ZXBCZboy03TwvYdEdOk8D9iNHmIxMpM0UjM"),
    },
    GiftBox {
        name: "Fancy Gift Boxes".into(),
        manifest_name: "create_gift_box_fancy".into(),
        description: "This fancy Gift Box from the Full Stack Example contains a common, rare, or sometimes even ultra-rare Morph Energy Card and a goodly quantity of Elements. Ask Jetty to open it!".into(),
        icon_url: Url::of("https://arweave.net/Ba8bp5mqJYicUGvyEznwA63HF7DZevO_LyZEwAw9GWs"),
    },
    GiftBox {
        name: "Elite Gift Boxes".into(),
        manifest_name: "create_gift_box_elite".into(),
        description: "This truly elite Gift Box from the Full Stack Example, reserved for only the most committed, contains only a rare or ultra-rare Morph Energy Card and a substantial quantity of Elements. Ask Jetty to open it!".into(),
        icon_url: Url::of("https://arweave.net/vdrkR2hi0dII5R_GEWsshock2ER8EKLs93Qb_L___gA"),
    }];

    for gift_box in gift_boxes {
        let network = NetworkDefinition::mainnet();

        let manifest_builder = ManifestBuilder::new().create_fungible_resource(
            OwnerRole::Fixed(rule!(require(XRD))),
            true,
            DIVISIBILITY_NONE,
            FungibleResourceRoles {
                mint_roles: mint_roles! {
                    minter => rule!(require(XRD));
                    minter_updater => OWNER;
                },
                burn_roles: burn_roles! {
                    burner => rule!(require(XRD));
                    burner_updater => OWNER;
                },
                ..Default::default()
            },
            metadata!(
                init {
                  "name" => gift_box.name, updatable;
                  "description" => gift_box.description, updatable;
                  "tags" => vec!["radquest"], updatable;
                  "icon_url" => gift_box.icon_url, updatable;
                  "dapp_definitions" => ["${dapp_definition}"], updatable;
                }
            ),
            None,
        );

        dump_manifest_to_file_system(
            manifest_builder.object_names(),
            &manifest_builder.build(),
            "./manifests/test-generated",
            Some(&gift_box.manifest_name),
            &network,
        )
        .err();
    }
}

#[test]
fn create_element() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        true,
        DIVISIBILITY_NONE,
        FungibleResourceRoles {
            mint_roles: mint_roles!(
                minter => rule!(require(XRD));
                minter_updater => OWNER;
            ),
            burn_roles: burn_roles!(
                burner => rule!(require(XRD));
                burner_updater => OWNER;
            ),
            ..Default::default()
        },
        metadata!(
            init {
                "name" => "Elements", updatable;
                "description" => "Elements are the common token of the RadQuest realm. They can be fused by the Full Stack Example to produce RadGems that can be used for much more…", updatable;
                "tags" => vec!["radquest"], updatable;
                "icon_url" => Url::of("https://arweave.net/vZ1h_-irsZf675M4b-FIAUnrsiPqzObbNzedxfbLh94"), updatable;
                "dapp_definitions" => vec!["${dapp_definition}"], updatable;
            }
        ),
        None,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_element"),
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
                minter_updater => OWNER;
            },
            burn_roles: burn_roles! {
                burner => rule!(require(XRD));
                burner_updater => OWNER;
            },
            non_fungible_data_update_roles: non_fungible_data_update_roles! {
                non_fungible_data_updater => rule!(require(XRD));
                non_fungible_data_updater_updater => OWNER;
            },
            ..Default::default()
        },
        metadata!(
            init {
              "name" => "RadGems", updatable;
              "description" => "Two RadGems can be combined with a Morph Energy Card by the Full Stack Example to produce a beautiful RadMorph NFT. Higher quality RadGems will contribute to a higher quality RadMorph.", updatable;
              "tags" => vec!["radquest"], updatable;
              "icon_url" => Url::of("https://arweave.net/FpzB4sovchNHrLw8tv87HYcIm89RXuwH0BS5uyypPCM"), updatable;
              "dapp_definitions" => ["${dapp_definition}"], updatable;
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
                minter_updater => OWNER;
            },
            burn_roles: burn_roles! {
                burner => rule!(require(XRD));
                burner_updater => OWNER;
            },
            ..Default::default()
        },
        metadata!(
          init {
            "name" => "Morph Energy Cards", updatable;
            "description" => 
"A Morph Energy Card can be combined with 2 RadGems by the Full Stack Example to produce a beautiful RadMorph NFT. Higher quality Energy Cards will contribute to a higher quality RadMorph.

Morph Energy Cards allow the Full Stack Example to harness the primordial energies of the universe to morph two RadGems into different shapes to create intricate, beautiful, and collectible RadMorphs.", updatable;
            "tags" => vec!["radquest"], updatable;
            "icon_url" => Url::of("https://arweave.net/7y9rpsafHpVU2sFE-VbtU5FE2UTjynRW7acTI7T1Dr8"), updatable;
            "dapp_definitions" => ["${dapp_definition}"], updatable;
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
    card_limited_edition: bool,
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
                minter_updater => OWNER;
            },
            burn_roles: burn_roles! {
                burner => rule!(require(XRD));
                burner_updater => OWNER;
            },
            ..Default::default()
        },
        metadata!(
          init {
            "name" => "RadMorphs", updatable;
            "description" => "Fused in the boundless energies of the RadQuest realm, RadMorphs are treasured by the dedicated and true of the Radix community.", updatable;
            "tags" => vec!["radquest"], updatable;
            "icon_url" => Url::of("https://arweave.net/8-9CpBahyQm6IbNC6u4jb6TKyfEjaLIclc9FOcaVLII"), updatable;
            "dapp_definitions" => ["${dapp_definition}"], updatable;
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
fn create_clam() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        true,
        scrypto::prelude::DIVISIBILITY_NONE,
        FungibleResourceRoles {
            mint_roles: mint_roles! {
                minter => rule!(require(XRD));
                minter_updater => OWNER;
            },
            burn_roles: burn_roles! {
                burner => OWNER;
                burner_updater => OWNER;
            },
            ..Default::default()
        },
        metadata!(
          init {
            "name" => "Clams", updatable;
            "description" => 
"Clams are a token that is fungible and non-divisible. That means every clam is worth just the same as another, and you can’t have a fractional clam!

Clams are a beloved currency of otters.", updatable;
            "tags" => vec!["radquest"], updatable;
            "icon_url" => Url::of("https://arweave.net/29jZfSeFeAZET3XfwNHDXycPskCpuyb5T40Ns-DKkXE"), updatable;
            "dapp_definitions" => ["${dapp_definition}"], updatable;
          }
        ),
        None
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_clam"),
        &network,
    )
    .err();
}

#[test]
fn create_ottercoin() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_fungible_resource(
        OwnerRole::Fixed(rule!(require(XRD))),
        true,
        scrypto::prelude::DIVISIBILITY_MAXIMUM,
        FungibleResourceRoles {
            mint_roles: mint_roles! {
                minter => rule!(require(XRD));
                minter_updater => OWNER;
            },
            burn_roles: burn_roles! {
                burner => OWNER;
                burner_updater => OWNER;
            },
            ..Default::default()
        },
        metadata!(
          init {
            "name" => "Ottercoin", updatable;
            "description" => 
"Ottercoin was created by RadQuest’s guide otter, Jetty. Maybe you can buy some with a few Clams?

Clams are a token that is fungible and highly divisible. That means every clam is worth just the same as another, and you can send and hold even tiny fractions of an ottercoin!", updatable;
            "tags" => vec!["radquest"], updatable;
            "icon_url" => Url::of("https://arweave.net/ySt0lTb_mH2nH38nyqI7iiUQXfNgph4v3lEMBYKCPKs"), updatable;
            "dapp_definitions" => ["${dapp_definition}"], updatable;
          }
        ),
        None
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-generated",
        Some("create_ottercoin"),
        &network,
    )
    .err();
}
