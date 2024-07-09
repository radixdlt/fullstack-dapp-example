use scrypto::prelude::*;

use crate::{morph_card_forge::MorphEnergyCardData, radgem_forge::RadgemData};

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct RadmorphData {
    pub key_image_url: Url,
    pub name: String,
    pub description: String,
    pub quality: Decimal,
    pub material: String,
    pub card_type: String,
    pub card_rarity: String,
    pub card_quality: Decimal,
    pub radgem_1_color: String,
    pub radgem_1_material: String,
    pub radgem_1_rarity: String,
    pub radgem_1_quality: Decimal,
    pub radgem_2_color: String,
    pub radgem_2_material: String,
    pub radgem_2_rarity: String,
    pub radgem_2_quality: Decimal,
}

#[blueprint]
mod radmorph_forge {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
        super_admin => updatable_by: [OWNER];
      },
      methods {
        disable => restrict_to: [super_admin];
        mint_radmorph => restrict_to: [admin];
      }
    }

    struct RadmorphForge {
        enabled: bool,
        admin_badge: FungibleVault,
        radmorph_resource_manager: ResourceManager,
    }

    impl RadmorphForge {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            admin_badge: Bucket,
            radmorph_address: ResourceAddress,
        ) -> Global<RadmorphForge> {
            let admin_badge_address = admin_badge.resource_address();

            Self {
                enabled: true,
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                radmorph_resource_manager: ResourceManager::from(radmorph_address),
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
                super_admin => rule!(require(super_admin_badge_address));
            ))
            .globalize()
        }

        pub fn disable(&mut self) {
            assert!(self.enabled, "RadmorphForge component already disabled");
            self.enabled = false;
        }

        pub fn mint_radmorph(
            &mut self,
            key_image_url: Url,
            card_data: MorphEnergyCardData,
            radgem_1_data: RadgemData,
            radgem_2_data: RadgemData,
        ) -> Bucket {
            assert!(self.enabled, "RadmorphForge component disabled");

            let quality = card_data.quality + radgem_1_data.quality + radgem_2_data.quality;
            let quality_text = self.get_quality_descriptor(quality);
            let material_text =
                self.get_rarer_material(&radgem_1_data.material, &radgem_2_data.material);
            let limited_text = match card_data.limited_edition {
                true => " Limited",
                false => "",
            };
            let color_1_text = self.to_title_case(radgem_1_data.color.clone());
            let color_2_text = self.to_title_case(radgem_2_data.color.clone());
            let energy_type_text = self.to_title_case(card_data.energy_type.clone());
            let radgem_1_material_text = self.to_title_case(radgem_1_data.material.clone());
            let radgem_2_material_text = self.to_title_case(radgem_2_data.material.clone());

            let name = format!(
                "{} {} {} and {} {} RadMorph {{{}/100}}{}",
                quality_text,
                material_text,
                color_1_text,
                color_2_text,
                energy_type_text,
                quality,
                limited_text
            );
            let description = format!("A {} {} RadGem and {} {} RadGem were fused in {} to produce this {} {} RadMorph. Its overall quality is rated as {} – {} out of a possible 100.", radgem_1_material_text, color_1_text, radgem_2_material_text, color_2_text, card_data.energy_description, material_text, energy_type_text, quality_text, quality);

            let radmorph_data = RadmorphData {
                key_image_url,
                name,
                description,
                quality,
                material: material_text.to_lowercase(),
                card_type: card_data.energy_type,
                card_rarity: card_data.rarity,
                card_quality: card_data.quality,
                radgem_1_color: radgem_1_data.color,
                radgem_1_material: radgem_1_data.material,
                radgem_1_rarity: radgem_1_data.rarity,
                radgem_1_quality: radgem_1_data.quality,
                radgem_2_color: radgem_2_data.color,
                radgem_2_material: radgem_2_data.material,
                radgem_2_rarity: radgem_2_data.rarity,
                radgem_2_quality: radgem_2_data.quality,
            };

            self.admin_badge.authorize_with_amount(1, || {
                self.radmorph_resource_manager
                    .mint_ruid_non_fungible(radmorph_data)
            })
        }

        fn get_quality_descriptor(&self, quality: Decimal) -> &str {
            match quality {
                quality if quality < dec!(21) => "Basic",
                quality if quality < dec!(41) => "Fine",
                quality if quality < dec!(61) => "Excellent",
                quality if quality < dec!(81) => "Superb",
                _ => "Exquisite",
            }
        }

        fn get_rarer_material(&self, material_1: &str, material_2: &str) -> &str {
            if material_1 == "radiant" || material_2 == "radiant" {
                "Radiant"
            } else if material_1 == "metallic" || material_2 == "metallic" {
                "Metallic"
            } else {
                "Crystalline"
            }
        }

        fn to_title_case(&self, s: String) -> String {
            s.split_whitespace()
                .map(|word| {
                    let mut c = word.chars();
                    match c.next() {
                        None => String::new(),
                        Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
                    }
                })
                .collect::<Vec<_>>()
                .join(" ")
        }
    }
}
