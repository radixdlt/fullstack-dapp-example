use scrypto::prelude::*;

pub const COLOR: [&str; 10] = [
    "Blood", "Forest", "Ocean", "Sand", "Sky", "Coral", "Dusk", "Flame", "Glacier", "Smoke",
];

pub struct MaterialRarity {
    pub name: &'static str,
    occurrence: Decimal,
    min_quality: u8,
    max_quality: u8,
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
            min_quality: 1,
            max_quality: 5,
        },
    },
    Material {
        name: "Metallic",
        rarity: MaterialRarity {
            name: "Rare",
            occurrence: dec!(0.20),
            min_quality: 6,
            max_quality: 15,
        },
    },
    Material {
        name: "Radiant",
        rarity: MaterialRarity {
            name: "Ultra-Rare",
            occurrence: dec!(0.05),
            min_quality: 16,
            max_quality: 25,
        },
    },
];

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct RadgemData {
    #[mutable]
    pub key_image_url: Url,
    pub name: String,
    pub description: String,
    pub material: String,
    pub color: String,
    pub rarity: String,
    pub quality: Decimal,
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
        enable => restrict_to: [super_admin];
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
            dapp_definition: ComponentAddress,
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
            .metadata(metadata!(
                init {
                    "dapp_definition" => dapp_definition, updatable;
                }
            ))
            .globalize()
        }

        pub fn disable(&mut self) {
            assert!(self.enabled, "RadgemForge component already disabled");
            self.enabled = false;
        }
        pub fn enable(&mut self) {
            assert!(!self.enabled, "RadgemForge already enabled");
            self.enabled = true;
        }

        pub fn mint_radgem(
            &mut self,
            color_num: Decimal,
            material_num: Decimal,
            quality_num: Decimal,
        ) -> Bucket {
            assert!(self.enabled, "RadgemForge component disabled");
            let (material, rarity, quality) =
                self.assign_material_rarity_and_quality(material_num, quality_num);
            let color = self.assign_color(color_num);

            let radgem = RadgemData {
                key_image_url: Url::of(""),
                name: format!(
                    "{} {} RadGem {{{}}}",
                    material,
                    color,
                    quality.to_string()
                ),
                description: format!("The {} {} material of this {} RadGem is graded at a quality of {} out of a possible 25.", rarity, material, color, quality.to_string()),
                material: material.to_lowercase(),
                color: color.to_lowercase(),
                rarity: rarity.to_lowercase(),
                quality,
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

        fn assign_material_rarity_and_quality(
            &self,
            material_num: Decimal,
            quality_num: Decimal,
        ) -> (&str, &str, Decimal) {
            assert!(
                material_num >= dec!(0) && material_num <= dec!(1),
                "rand_num must be between 0 and 1 inclusive"
            );

            let material = match material_num {
                n if n < MATERIAL[0].rarity.occurrence => &MATERIAL[0],
                n if n < (MATERIAL[0].rarity.occurrence + MATERIAL[1].rarity.occurrence) => {
                    &MATERIAL[1]
                }
                _ => &MATERIAL[2],
            };

            let quality = (quality_num
                * (material.rarity.max_quality - material.rarity.min_quality))
                .checked_ceiling()
                .unwrap()
                + material.rarity.min_quality;

            (material.name, material.rarity.name, quality)
        }

        fn assign_color(&self, color_num: Decimal) -> &str {
            assert!(
                color_num >= dec!(0) && color_num <= dec!(1),
                "rand_num must be between 0 and 1 inclusive"
            );

            let n = color_num * COLOR.len();
            match n {
                n if n < dec!(1) => COLOR[0],
                n if n < dec!(2) => COLOR[1],
                n if n < dec!(3) => COLOR[2],
                n if n < dec!(4) => COLOR[3],
                n if n < dec!(5) => COLOR[4],
                n if n < dec!(6) => COLOR[5],
                n if n < dec!(7) => COLOR[6],
                n if n < dec!(8) => COLOR[7],
                n if n < dec!(9) => COLOR[8],
                _ => COLOR[9],
            }
        }
    }
}
