use scrypto::prelude::*;

#[derive(ScryptoSbor)]
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

#[derive(ScryptoSbor)]
pub enum Rarity {
    Common,
    Rare,
    UltraRare,
}

#[derive(ScryptoSbor, NonFungibleData)]
pub struct MorphCard {
    name: String,
    rarity: Rarity,
    energy: Energy,
}

#[blueprint]
mod morph_card_factory {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        mint_morph_card => restrict_to: [admin];
      }
    }

    struct MorphCardFactory {
        morph_card_resource_manager: ResourceManager,
    }

    impl MorphCardFactory {
        pub fn new(
            owner_role: OwnerRole,
            admin_badge_address: ResourceAddress,
        ) -> Global<MorphCardFactory> {
            let morph_card_resource_manager =
                ResourceBuilder::new_ruid_non_fungible::<MorphCard>(OwnerRole::None)
                    .mint_roles(mint_roles!(
                        minter => rule!(require(admin_badge_address));
                        minter_updater => rule!(deny_all);
                    ))
                    .metadata(metadata!(
                        init {
                            "name" => "MorphEnergyCard", locked;
                            "description" => "These cards allow RadQuest’s Jetty to harness the primordial energies of the RadQuest realm to fuse Radgems into intricate and beautiful collectible Radmorphs.", locked;
                        }
                    ))
                    .create_with_no_initial_supply();
            Self {
                morph_card_resource_manager,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .globalize()
        }

        pub fn mint_morph_card(&mut self) -> Bucket {
            let morph_card = MorphCard {
                name: "MoltenLava Morph Card".to_string(),
                rarity: Rarity::Rare,
                energy: Energy::MoltenLava,
            };
            self.morph_card_resource_manager
                .mint_ruid_non_fungible(morph_card)
        }
    }
}
