use radix_engine_interface::prelude::*;
use scrypto::prelude::*;
use scrypto_test::prelude::*;
use scrypto_unit::*;

#[derive(ScryptoSbor, ManifestSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Color {
    Blood,
    Coral,
    Dusk,
    Flame,
    Forest,
    Glacier,
    Ocean,
    Sand,
    Sky,
    Smoke,
}

#[derive(ScryptoSbor, ManifestSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Material {
    Crystalline,
    Metallic,
    Radiant,
}

#[derive(ScryptoSbor, ManifestSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Rarity {
    Common = 0,
    Rare = 1,
    UltraRare = 2,
}

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
struct RadgemData {
    #[mutable]
    key_image_url: Url,
    name: String,
    material: Material,
    color: Color,
    rarity: Rarity,
}

#[test]
fn create_radgem() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_non_fungible_resource(
        OwnerRole::None,
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
            freeze_roles: None,
            recall_roles: None,
            withdraw_roles: withdraw_roles! {
                withdrawer => rule!(allow_all);
                withdrawer_updater => rule!(deny_all);
            },
            deposit_roles: deposit_roles! {
                depositor => rule!(allow_all);
                depositor_updater => rule!(deny_all);
            },
            non_fungible_data_update_roles: non_fungible_data_update_roles! {
                non_fungible_data_updater => rule!(require(XRD));
                non_fungible_data_updater_updater => rule!(deny_all);
            },
        },
        metadata!(
            init {
              "name" => "RadGems", locked;
              "description" => "Two Radgems can be combined with a Morph Energy Card by RadQuest's Jetty to produce a beautiful Radmorph.", locked;
              "icon_url" => "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg", locked;
            }
        ),
        None::<IndexMap<NonFungibleLocalId, RadgemData>>,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-gened",
        Some("create_radgem"),
        &network,
    )
    .err();
}

#[derive(ScryptoSbor, ManifestSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Energy {
    MoltenLava,
    PyroclasticFlow,
    VolcanicLightning,
    TropicalCyclone,
    PolarBlizzard,
    Earthquake,
    FireTornado,
    TidalWave,
    HydrothermalVent,
    RainbowPower,
    StormCell,
    SolarFlare,
    NuclearFusion,
    AuroraBorealis,
    GravityForce,
    MagneticField,
    GammaRays,
    BlackHole,
    Supernova,
    Whirlpool,
}

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
struct MorphEnergyCardData {
    name: String,
    key_image_url: Url,
    rarity: Rarity,
    energy: Energy,
}

#[test]
fn create_morph_card() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_non_fungible_resource(
        OwnerRole::None,
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
            freeze_roles: None,
            recall_roles: None,
            withdraw_roles: withdraw_roles! {
                withdrawer => rule!(allow_all);
                withdrawer_updater => rule!(deny_all);
            },
            deposit_roles: deposit_roles! {
                depositor => rule!(allow_all);
                depositor_updater => rule!(deny_all);
            },
            non_fungible_data_update_roles: None,
        },
        metadata!(
          init {
            "name" => "Morph Energy Cards", locked;
            "description" => "These cards allow RadQuest’s Jetty to harness the primordial energies of the RadQuest realm to fuse Radgems into intricate and beautiful collectible Radmorphs.", locked;
            "icon_url" => "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg", locked;
          }
        ),
        None::<IndexMap<NonFungibleLocalId, MorphEnergyCardData>>,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-gened",
        Some("create_morph_card"),
        &network,
    )
    .err();
}

#[derive(ScryptoSbor, ManifestSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum RadmorphRarity {
    Fine,
    Precious,
    Superb,
    Magnificent,
}
#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
struct RadmorphData {
    name: String,
    key_image_url: Url,
    rarity: RadmorphRarity,
    material: Material,
    energy: Energy,
    color_1: Color,
    color_2: Color,
}

#[test]
fn create_radmorph() {
    let network = NetworkDefinition::mainnet();

    let manifest_builder = ManifestBuilder::new().create_non_fungible_resource(
        OwnerRole::None,
        NonFungibleIdType::RUID,
        true,
        NonFungibleResourceRoles {
            mint_roles: mint_roles! {
                minter => rule!(require(XRD));
                minter_updater => rule!(deny_all);
            },
            burn_roles: None,
            freeze_roles: None,
            recall_roles: None,
            withdraw_roles: withdraw_roles! {
                withdrawer => rule!(allow_all);
                withdrawer_updater => rule!(deny_all);
            },
            deposit_roles: deposit_roles! {
                depositor => rule!(allow_all);
                depositor_updater => rule!(deny_all);
            },
            non_fungible_data_update_roles: None,
        },
        metadata!(
          init {
            "name" => "RadMorphs", locked;
            "description" => "Fused in the boundless energies of the RadQuest realm, RadMorphs are treasured by the dedicated and true of Radix.", locked;
            "icon_url" => "https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg", locked;
          }
        ),
        None::<IndexMap<NonFungibleLocalId, RadmorphData>>,
    );

    dump_manifest_to_file_system(
        manifest_builder.object_names(),
        &manifest_builder.build(),
        "./manifests/test-gened",
        Some("create_radmorph"),
        &network,
    )
    .err();
}
