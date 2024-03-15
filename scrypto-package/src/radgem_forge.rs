use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Color {
    Forest,
    Send,
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
    Common,
    Rare,
    UltraRare,
}

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub struct Radgem {
    name: String,
    color: Color,
    material: Material,
    rarity: Rarity,
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
        pub fn new(owner_role: OwnerRole, admin_badge: Bucket) -> Global<RadgemForge> {
            let admin_badge_address = admin_badge.resource_address();
            // TODO: Make the radgem resource manager an argument to new
            let radgem_resource_manager =
                ResourceBuilder::new_ruid_non_fungible::<Radgem>(OwnerRole::None)
                    .metadata(metadata!(
                        init {
                            "name" => "RadGem", locked;
                            "description" => "Two Radgems can be combined with a Morph Energy Card by RadQuest's Jetty to produce a beautiful Radmorph NFT.", locked;
                        }
                    ))
                    .mint_roles(mint_roles!(
                        minter => rule!(require(admin_badge_address));
                        minter_updater => rule!(deny_all);
                    ))
                    .burn_roles(burn_roles!(
                        burner => rule!(require(admin_badge_address));
                        burner_updater => rule!(deny_all);
                    ))
                    .create_with_no_initial_supply();
            Self {
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                radgem_resource_manager,
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

        // TODO: Make minting produce a **Random** Radgem
        pub fn mint_radgem(&mut self, rand_num: Decimal) -> Bucket {
            let radgem = Radgem {
                name: "Metallic Coral RadGem".to_string(),
                color: Color::Coral,
                material: Material::Metallic,
                rarity: Rarity::Common,
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
    }
}
