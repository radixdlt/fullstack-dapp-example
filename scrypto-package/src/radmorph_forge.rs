use scrypto::prelude::*;

use crate::{
    morph_card_forge::{Energy, MorphCard},
    radgem_forge::{Color, Material, Radgem},
};

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Rarity {
    Fine,
    Precious,
    Superb,
    Magnificent,
}

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct Radmorph {
    name: String,
    key_image_url: Url,
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
            radgem1_data: Radgem,
            radgem2_data: Radgem,
            morph_card_data: MorphCard,
            key_image_url: Url,
        ) -> Bucket {
            let material = if &radgem1_data.rarity >= &radgem2_data.rarity {
                radgem1_data.material
            } else {
                radgem2_data.material
            };

            let total_rarity = radgem1_data.rarity as u8
                + radgem2_data.rarity as u8
                + morph_card_data.rarity as u8;
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
        ) -> Radmorph {
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

            Radmorph {
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
