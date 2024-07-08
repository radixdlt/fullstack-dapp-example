use crate::{morph_card_forge::MorphCardData, radgem_forge::RadgemData, refinery::RARITY};
use scrypto::prelude::*;

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct RadmorphData {
    pub key_image_url: Url,
    pub name: String,
    rarity: String,
    material: String,
    energy: String,
    color_1: String,
    color_2: String,
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
            morph_card_data: MorphCardData,
            radgem1_data: RadgemData,
            radgem2_data: RadgemData,
            key_image_url: Url,
        ) -> Bucket {
            assert!(self.enabled, "RadmorphForge component disabled");
            let morph_card_rarity_weight = RARITY
                .iter()
                .position(|&r| r == &morph_card_data.rarity)
                .unwrap();
            let radgem1_rarity_weight = RARITY
                .iter()
                .position(|&r| r == &radgem1_data.rarity)
                .unwrap();
            let radgem2_rarity_weight = RARITY
                .iter()
                .position(|&r| r == &radgem2_data.rarity)
                .unwrap();

            let material = if &radgem1_rarity_weight >= &radgem2_rarity_weight {
                radgem1_data.material
            } else {
                radgem2_data.material
            };

            let total_rarity =
                morph_card_rarity_weight + radgem1_rarity_weight + radgem2_rarity_weight;
            let rarity = if total_rarity < 2 {
                RARITY[3].to_string() // Fine
            } else if total_rarity < 4 {
                RARITY[4].to_string() // Precious
            } else if total_rarity < 6 {
                RARITY[5].to_string() // Superb
            } else {
                RARITY[6].to_string() // Magnificent
            };

            let radmorph = self.get_radmorph_data(
                key_image_url,
                rarity,
                material,
                morph_card_data.energy_type,
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
            rarity: String,
            material: String,
            energy: String,
            color_1: String,
            color_2: String,
        ) -> RadmorphData {
            RadmorphData {
                name: format!("{} {} {} RadMorph", rarity, material, energy),
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
