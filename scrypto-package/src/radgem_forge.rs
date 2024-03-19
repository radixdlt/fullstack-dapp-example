use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Color {
    Forest,
    Sand,
    Sky,
    Coral,
    Blood,
    Smoke,
    Ocean,
    Flame,
    Glacier,
    Dusk,
}

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Material {
    Crystalline,
    Metallic,
    Radiant,
}

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Rarity {
    Common = 0,
    Rare = 1,
    UltraRare = 2,
}

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct Radgem {
    pub name: String,
    pub key_image_url: Url,
    pub color: Color,
    pub material: Material,
    pub rarity: Rarity,
}

#[blueprint]
mod radgem_forge {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        get_radgem_address => PUBLIC;
        mint_radgem => restrict_to: [admin];
        burn_radgem => restrict_to: [admin];
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

        pub fn get_radgem_address(&self) -> ResourceAddress {
            self.radgem_resource_manager.address()
        }

        pub fn mint_radgem(&mut self, rand_num_1: Decimal, rand_num_2: Decimal) -> Bucket {
            let (color, color_name) = self.assign_color(rand_num_1);
            let (material, material_name) = self.assign_material(rand_num_2);

            let radgem = Radgem {
                name: format!("{} {} RadGem", color_name, material_name),
                // TODO: Replace with actual image URL
                key_image_url: Url::of("https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg"),
                color,
                material,
                // TODO: Make rarity derived from material and color
                rarity: Rarity::Rare,
            };
            self.admin_badge.authorize_with_amount(1, || {
                self.radgem_resource_manager.mint_ruid_non_fungible(radgem)
            })
        }

        pub fn burn_radgem(&mut self, radgems: Bucket) -> () {
            self.admin_badge.authorize_with_amount(1, || {
                radgems.burn();
            });
        }

        fn assign_color(&self, n: Decimal) -> (Color, &'static str) {
            let relative_n = n * dec!(10);
            if relative_n < dec!(1) {
                (Color::Forest, "Forest")
            } else if relative_n < dec!(2) {
                (Color::Sand, "Sand")
            } else if relative_n < dec!(3) {
                (Color::Sky, "Sky")
            } else if relative_n < dec!(4) {
                (Color::Coral, "Coral")
            } else if relative_n < dec!(5) {
                (Color::Blood, "Blood")
            } else if relative_n < dec!(6) {
                (Color::Smoke, "Smoke")
            } else if relative_n < dec!(7) {
                (Color::Ocean, "Ocean")
            } else if relative_n < dec!(8) {
                (Color::Flame, "Flame")
            } else if relative_n < dec!(9) {
                (Color::Glacier, "Glacier")
            } else {
                (Color::Dusk, "Dusk")
            }
        }

        fn assign_material(&self, n: Decimal) -> (Material, &'static str) {
            let relative_n = n * dec!(3);
            if relative_n < dec!(1) {
                (Material::Crystalline, "Crystalline")
            } else if relative_n < dec!(2) {
                (Material::Metallic, "Metallic")
            } else {
                (Material::Radiant, "Radiant")
            }
        }
    }
}
