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
    Common = 0,
    Rare = 1,
    UltraRare = 2,
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
        pub fn new(
            owner_role: OwnerRole,
            admin_badge: Bucket,
            morph_card_address: ResourceAddress,
        ) -> Global<MorphCardForge> {
            let admin_badge_address = admin_badge.resource_address();

            Self {
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                morph_card_resource_manager: ResourceManager::from(morph_card_address),
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
