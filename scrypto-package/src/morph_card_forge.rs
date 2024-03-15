use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
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

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Rarity {
    Common,
    Rare,
    UltraRare,
}

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub struct MorphCard {
    pub name: String,
    pub rarity: Rarity,
    pub energy: Energy,
}

#[blueprint]
mod morph_card_forge {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        mint_morph_card => restrict_to: [admin];
      }
    }

    struct MorphCardForge {
        admin_badge: FungibleVault,
        morph_card_resource_manager: ResourceManager,
    }

    impl MorphCardForge {
        pub fn new(owner_role: OwnerRole, admin_badge: Bucket) -> Global<MorphCardForge> {
            let admin_badge_address = admin_badge.resource_address();
            // TODO: Make morph_card_resource_manager an argument to new
            let morph_card_resource_manager =
                ResourceBuilder::new_ruid_non_fungible::<MorphCard>(OwnerRole::None)
                    .metadata(metadata!(
                        init {
                            "name" => "MorphEnergyCard", locked;
                            "description" => "These cards allow RadQuest’s Jetty to harness the primordial energies of the RadQuest realm to fuse Radgems into intricate and beautiful collectible Radmorphs.", locked;
                        }
                    ))
                    .mint_roles(mint_roles!(
                        minter => rule!(require(admin_badge_address));
                        minter_updater => rule!(deny_all);
                    ))
                    .burn_roles(burn_roles!(
                        burner => rule!(require(admin_badge_address));
                        burner_updater => rule!(deny_all);
                    ))
                    .create_with_no_initial_supply();
            Self {
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                morph_card_resource_manager,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
            ))
            .globalize()
        }

        pub fn mint_morph_card(&mut self) -> Bucket {
            let morph_card = MorphCard {
                name: "MoltenLava Morph Card".to_string(),
                rarity: Rarity::Rare,
                energy: Energy::MoltenLava,
            };

            self.admin_badge.authorize_with_amount(1, || {
                self.morph_card_resource_manager
                    .mint_ruid_non_fungible(morph_card)
            })
        }
    }
}
