use scrypto::prelude::*;

pub const COLOR: [&str; 10] = [
    "Blood", "Forest", "Ocean", "Sand", "Sky", "Coral", "Dusk", "Flame", "Glacier", "Smoke",
];

pub struct MaterialRarity {
    pub name: &'static str,
    occurrence: Decimal,
}

pub struct Material {
    pub name: &'static str,
    pub rarity: MaterialRarity,
}
pub const MATERIAL: [Material; 3] = [
    Material {
        name: "Crystalline",
        rarity: MaterialRarity {
            name: "Common",
            occurrence: dec!(0.75),
        },
    },
    Material {
        name: "Metallic",
        rarity: MaterialRarity {
            name: "Rare",
            occurrence: dec!(0.20),
        },
    },
    Material {
        name: "Radiant",
        rarity: MaterialRarity {
            name: "Ultra Rare",
            occurrence: dec!(0.05),
        },
    },
];

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
        super_admin => updatable_by: [OWNER];
      },
      methods {
        disable => restrict_to: [super_admin];
        mint_radgem => restrict_to: [admin];
        update_key_image => restrict_to: [admin];
      }
    }

    struct RadgemForge {
        enabled: bool,
        admin_badge: FungibleVault,
        radgem_resource_manager: ResourceManager,
    }

    impl RadgemForge {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            admin_badge: Bucket,
            radgem_address: ResourceAddress,
        ) -> Global<RadgemForge> {
            let admin_badge_address = admin_badge.resource_address();
            Self {
                enabled: true,
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                radgem_resource_manager: ResourceManager::from(radgem_address),
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
            assert!(self.enabled, "RadgemForge component already disabled");
            self.enabled = false;
        }

        pub fn mint_radgem(&mut self, color_num: Decimal, material_num: Decimal) -> Bucket {
            assert!(self.enabled, "RadgemForge component disabled");
            let (material, rarity) = self.assign_material_and_rarity(material_num);
            let color = self.assign_color(color_num);

            let radgem = RadgemData {
                key_image_url: Url::of(""),
                name: format!("{} {} RadGem", material, color),
                material,
                color,
                rarity,
            };

            self.admin_badge.authorize_with_amount(1, || {
                self.radgem_resource_manager.mint_ruid_non_fungible(radgem)
            })
        }

        pub fn update_key_image(&mut self, radgem_id: NonFungibleLocalId, key_image_url: Url) {
            assert!(self.enabled, "RadgemForge component disabled");
            self.admin_badge.authorize_with_amount(1, || {
                self.radgem_resource_manager.update_non_fungible_data(
                    &radgem_id,
                    "key_image_url",
                    key_image_url,
                )
            });
        }

        fn assign_material_and_rarity(&self, n: Decimal) -> (String, String) {
            assert!(
                n >= dec!(0) && n <= dec!(1),
                "rand_num must be between 0 and 1 inclusive"
            );

            match n {
                n if n < MATERIAL[0].rarity.occurrence => (
                    MATERIAL[0].name.to_string(),
                    MATERIAL[0].rarity.name.to_string(),
                ),
                n if n < (MATERIAL[0].rarity.occurrence + MATERIAL[1].rarity.occurrence) => (
                    MATERIAL[1].name.to_string(),
                    MATERIAL[1].rarity.name.to_string(),
                ),
                _ => (
                    MATERIAL[2].name.to_string(),
                    MATERIAL[2].rarity.name.to_string(),
                ),
            }
        }

        fn assign_color(&self, n: Decimal) -> String {
            assert!(
                n >= dec!(0) && n <= dec!(1),
                "rand_num must be between 0 and 1 inclusive"
            );

            let relative_n = n * COLOR.len();
            match relative_n {
                rn if rn < dec!(1) => COLOR[0].to_string(),
                rn if rn < dec!(2) => COLOR[1].to_string(),
                rn if rn < dec!(3) => COLOR[2].to_string(),
                rn if rn < dec!(4) => COLOR[3].to_string(),
                rn if rn < dec!(5) => COLOR[4].to_string(),
                rn if rn < dec!(6) => COLOR[5].to_string(),
                rn if rn < dec!(7) => COLOR[6].to_string(),
                rn if rn < dec!(8) => COLOR[7].to_string(),
                rn if rn < dec!(9) => COLOR[8].to_string(),
                _ => COLOR[9].to_string(),
            }
        }
    }
}
