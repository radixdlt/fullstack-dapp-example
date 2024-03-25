use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Color {
    Blood,
    Coral,
    Dusk,
    Flame,
    Forest,
    Glacier,
    Ocean,
    Sand,
    Sky,
    Smoke,
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
pub struct RadgemData {
    pub key_image_url: Url,
    pub name: String,
    pub material: Material,
    pub color: Color,
    pub rarity: Rarity,
}

#[blueprint]
mod radgem_forge {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        mint_radgem => restrict_to: [admin];
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
            let (material, material_name) = self.assign_material(rand_num_2);
            let (color, color_name) = self.assign_color(rand_num_1);
            let rarity = self.assign_rarity(&material, &color);

            let radgem = RadgemData {
                key_image_url: Url::of(""),
                name: format!("{} {} RadGem", material_name, color_name),
                material,
                color,
                rarity,
            };

            self.admin_badge.authorize_with_amount(1, || {
                self.radgem_resource_manager.mint_ruid_non_fungible(radgem)
            })
        }

        fn assign_material(&self, n: Decimal) -> (Material, &'static str) {
            if n < 0.into() || n > 1.into() {
                panic!("n must be between 0 and 1 inclusive")
            }

            let relative_n = n * 3;
            match relative_n {
                n if n < dec!(1) => (Material::Crystalline, "Crystalline"),
                n if n < dec!(2) => (Material::Metallic, "Metallic"),
                _ => (Material::Radiant, "Radiant"),
            }
        }

        fn assign_color(&self, n: Decimal) -> (Color, &'static str) {
            if n < 0.into() || n > 1.into() {
                panic!("n must be between 0 and 1 inclusive")
            }

            let common_fraction = dec!(2) / 3;
            let rare_fraction = 1 - common_fraction;

            let color = if n <= common_fraction {
                let relative_n = n * (1 / common_fraction) * 5;
                match relative_n {
                    rn if rn < dec!(1) => Color::Blood,
                    rn if rn < dec!(2) => Color::Forest,
                    rn if rn < dec!(3) => Color::Sand,
                    rn if rn < dec!(4) => Color::Sky,
                    _ => Color::Ocean,
                }
            } else {
                let relative_n = (n - common_fraction) * (1 / rare_fraction) * 5;
                match relative_n {
                    rn if rn < dec!(1) => Color::Coral,
                    rn if rn < dec!(2) => Color::Flame,
                    rn if rn < dec!(3) => Color::Glacier,
                    rn if rn < dec!(4) => Color::Smoke,
                    _ => Color::Dusk,
                }
            };

            match color {
                Color::Blood => (Color::Blood, "Blood"),
                Color::Coral => (Color::Coral, "Coral"),
                Color::Dusk => (Color::Dusk, "Dusk"),
                Color::Flame => (Color::Flame, "Flame"),
                Color::Forest => (Color::Forest, "Forest"),
                Color::Glacier => (Color::Glacier, "Glacier"),
                Color::Ocean => (Color::Ocean, "Ocean"),
                Color::Sand => (Color::Sand, "Sand"),
                Color::Sky => (Color::Sky, "Sky"),
                Color::Smoke => (Color::Smoke, "Smoke"),
            }
        }

        fn assign_rarity(&self, material: &Material, color: &Color) -> Rarity {
            let color_rarity = match *color {
                Color::Blood => Rarity::Common,
                Color::Coral => Rarity::Rare,
                Color::Dusk => Rarity::Rare,
                Color::Flame => Rarity::Rare,
                Color::Forest => Rarity::Common,
                Color::Glacier => Rarity::Rare,
                Color::Ocean => Rarity::Common,
                Color::Sand => Rarity::Common,
                Color::Sky => Rarity::Common,
                Color::Smoke => Rarity::Rare,
            };

            let material_rarity = match *material {
                Material::Crystalline => Rarity::Common,
                Material::Metallic => Rarity::Common,
                Material::Radiant => Rarity::Rare,
            };

            return match (color_rarity, material_rarity) {
                (Rarity::Common, Rarity::Common) => Rarity::Common,
                (Rarity::Rare, Rarity::Common) => Rarity::Rare,
                (Rarity::Common, Rarity::Rare) => Rarity::Rare,
                (Rarity::Rare, Rarity::Rare) => Rarity::UltraRare,
                _ => panic!("Invalid rarity combination"),
            };
        }
    }
}
