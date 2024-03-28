use scrypto::prelude::*;

use crate::{
    morph_card_forge::{Energy, MorphCardData},
    radgem_forge::{Color, Material, RadgemData},
};

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Rarity {
    Fine,
    Precious,
    Superb,
    Magnificent,
}

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct RadmorphData {
    pub key_image_url: Url,
    pub name: String,
    rarity: Rarity,
    material: Material,
    energy: Energy,
    color_1: Color,
    color_2: Color,
}

#[blueprint]
mod radmorph_forge {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        mint_radmorph => restrict_to: [admin];
      }
    }

    struct RadmorphForge {
        admin_badge: FungibleVault,
        radmorph_resource_manager: ResourceManager,
    }

    impl RadmorphForge {
        pub fn new(
            owner_role: OwnerRole,
            admin_badge: Bucket,
            radmorph_address: ResourceAddress,
        ) -> Global<RadmorphForge> {
            let admin_badge_address = admin_badge.resource_address();

            Self {
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                radmorph_resource_manager: ResourceManager::from(radmorph_address),
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
            ))
            .globalize()
        }

        pub fn mint_radmorph(
            &mut self,
            morph_card_data: MorphCardData,
            radgem1_data: RadgemData,
            radgem2_data: RadgemData,
            key_image_url: Url,
        ) -> Bucket {
            let material = if &radgem1_data.rarity >= &radgem2_data.rarity {
                radgem1_data.material
            } else {
                radgem2_data.material
            };

            let total_rarity = morph_card_data.rarity as u8
                + radgem1_data.rarity as u8
                + radgem2_data.rarity as u8;
            // 3 Common                 = 0 (Fine)
            // 2 Common + 1 Rare        = 1 (Fine)
            // 1 Common + 2 Rare        = 2 (Precious)
            // 2 Common + 1 UltraRare   = 2 (Precious)
            // 3 Rare                   = 3 (Precious)
            // 1 Common + 2 UltraRare   = 4 (Superb)
            // 2 Rare + 1 UltraRare     = 4 (Superb)
            // 1 Rare + 2 UltraRare     = 5 (Superb)
            // 3 UltraRare              = 6 (Magnificent)
            let rarity = if total_rarity >= 6 {
                Rarity::Magnificent
            } else if total_rarity >= 4 {
                Rarity::Superb
            } else if total_rarity >= 2 {
                Rarity::Precious
            } else {
                Rarity::Fine
            };

            let radmorph = self.get_radmorph_data(
                key_image_url,
                rarity,
                material,
                morph_card_data.energy,
                radgem1_data.color,
                radgem2_data.color,
            );
            self.admin_badge.authorize_with_amount(1, || {
                self.radmorph_resource_manager
                    .mint_ruid_non_fungible(radmorph)
            })
        }

        fn get_radmorph_data(
            &self,
            key_image_url: Url,
            rarity: Rarity,
            material: Material,
            energy: Energy,
            color_1: Color,
            color_2: Color,
        ) -> RadmorphData {
            let rarity_name = match rarity {
                Rarity::Fine => "Fine",
                Rarity::Precious => "Precious",
                Rarity::Superb => "Superb",
                Rarity::Magnificent => "Magnificent",
            };
            let material_name = match material {
                Material::Crystalline => "Crystalline",
                Material::Metallic => "Metallic",
                Material::Radiant => "Radiant",
            };
            let energy_name = match energy {
                Energy::MoltenLava => "MoltenLava",
                Energy::PyroclasticFlow => "PyroclasticFlow",
                Energy::VolcanicLightning => "VolcanicLightning",
                Energy::TropicalCyclone => "TropicalCyclone",
                Energy::PolarBlizzard => "PolarBlizzard",
                Energy::Earthquake => "Earthquake",
                Energy::FireTornado => "FireTornado",
                Energy::TidalWave => "TidalWave",
                Energy::HydrothermalVent => "HydrothermalVent",
                Energy::RainbowPower => "RainbowPower",
                Energy::StormCell => "StormCell",
                Energy::SolarFlare => "SolarFlare",
                Energy::NuclearFusion => "NuclearFusion",
                Energy::AuroraBorealis => "AuroraBorealis",
                Energy::GravityForce => "GravityForce",
                Energy::MagneticField => "MagneticField",
                Energy::GammaRays => "GammaRays",
                Energy::BlackHole => "BlackHole",
                Energy::Supernova => "Supernova",
                Energy::Whirlpool => "Whirlpool",
            };

            RadmorphData {
                name: format!("{} {} {} RadMorph", rarity_name, material_name, energy_name),
                key_image_url,
                rarity,
                material,
                energy,
                color_1,
                color_2,
            }
        }
    }
}
