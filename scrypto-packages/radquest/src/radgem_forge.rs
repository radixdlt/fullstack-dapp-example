use crate::refinery::RARITY;
use scrypto::prelude::*;

pub const COMMON_COLOR: [&str; 5] = ["Blood", "Forest", "Ocean", "Sand", "Sky"];
pub const RARE_COLOR: [&str; 5] = ["Coral", "Dusk", "Flame", "Glacier", "Smoke"];
pub const MATERIAL: [&str; 3] = ["Crystalline", "Metallic", "Radiant"];

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct RadgemData {
    #[mutable]
    pub key_image_url: Url,
    pub name: String,
    pub material: String,
    pub color: String,
    pub rarity: String,
}

#[blueprint]
mod radgem_forge {

    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        mint_radgem => restrict_to: [admin];
        update_key_image => restrict_to: [admin];
      }
    }

    struct RadgemForge {
        admin_badge: FungibleVault,
        radgem_resource_manager: ResourceManager,
    }

    impl RadgemForge {
        pub fn new(
            owner_role: OwnerRole,
            admin_badge: Bucket,
            radgem_address: ResourceAddress,
        ) -> Global<RadgemForge> {
            let admin_badge_address = admin_badge.resource_address();
            Self {
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                radgem_resource_manager: ResourceManager::from(radgem_address),
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
            ))
            .globalize()
        }

        pub fn mint_radgem(&mut self, rand_num_1: Decimal, rand_num_2: Decimal) -> Bucket {
            let material = self.assign_material(rand_num_2);
            let color = self.assign_color(rand_num_1);
            let rarity = self.assign_rarity(&material, &color);

            let radgem = RadgemData {
                key_image_url: Url::of(""),
                name: format!("{} {} RadGem", material, color),
                material,
                color,
                rarity,
            };

            let admin_proof = self.admin_badge.create_proof_of_amount(1);
            LocalAuthZone::push(admin_proof);

            self.radgem_resource_manager.mint_ruid_non_fungible(radgem)
        }

        pub fn update_key_image(&mut self, radgem_id: NonFungibleLocalId, key_image_url: Url) {
            let admin_proof = self.admin_badge.create_proof_of_amount(1);
            LocalAuthZone::push(admin_proof);

            self.radgem_resource_manager.update_non_fungible_data(
                &radgem_id,
                "key_image_url",
                key_image_url,
            )
        }

        fn assign_material(&self, n: Decimal) -> String {
            assert!(
                n >= dec!(0) && n <= dec!(1),
                "rand_num must be between 0 and 1 inclusive"
            );

            let relative_n = n * 3;
            match relative_n {
                n if n < dec!(1) => MATERIAL[0].to_string(),
                n if n < dec!(2) => MATERIAL[1].to_string(),
                _ => MATERIAL[2].to_string(),
            }
        }

        fn assign_color(&self, n: Decimal) -> String {
            assert!(
                n >= dec!(0) && n <= dec!(1),
                "rand_num must be between 0 and 1 inclusive"
            );

            let common_prob = dec!(2) / 3;
            let rare_prob = 1 - common_prob;

            return if n <= common_prob {
                let relative_n = n * (1 / common_prob) * 5;
                match relative_n {
                    rn if rn < dec!(1) => COMMON_COLOR[0].to_string(),
                    rn if rn < dec!(2) => COMMON_COLOR[1].to_string(),
                    rn if rn < dec!(3) => COMMON_COLOR[2].to_string(),
                    rn if rn < dec!(4) => COMMON_COLOR[3].to_string(),
                    _ => COMMON_COLOR[4].to_string(),
                }
            } else {
                let relative_n = (n - common_prob) * (1 / rare_prob) * 5;
                match relative_n {
                    rn if rn < dec!(1) => RARE_COLOR[0].to_string(),
                    rn if rn < dec!(2) => RARE_COLOR[1].to_string(),
                    rn if rn < dec!(3) => RARE_COLOR[2].to_string(),
                    rn if rn < dec!(4) => RARE_COLOR[3].to_string(),
                    _ => RARE_COLOR[4].to_string(),
                }
            };
        }

        fn assign_rarity(&self, material: &String, color: &String) -> String {
            let color_rarity = if COMMON_COLOR.contains(&color.as_str()) {
                RARITY[0]
            } else {
                RARITY[1]
            };

            let material_rarity = match material.as_str() {
                m if m == MATERIAL[0] => RARITY[0],
                m if m == MATERIAL[1] => RARITY[0],
                m if m == MATERIAL[2] => RARITY[1],
                _ => panic!("Invalid material"),
            };

            return match (color_rarity, material_rarity) {
                rr if rr == (RARITY[0], RARITY[0]) => RARITY[0].to_string(),
                rr if rr == (RARITY[1], RARITY[0]) => RARITY[1].to_string(),
                rr if rr == (RARITY[0], RARITY[1]) => RARITY[1].to_string(),
                rr if rr == (RARITY[1], RARITY[1]) => RARITY[2].to_string(),
                _ => panic!("Invalid rarity combination"),
            };
        }
    }
}
