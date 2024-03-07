use scrypto::prelude::*;

#[derive(ScryptoSbor)]
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

#[derive(ScryptoSbor)]
pub enum Material {
    Crystalline,
    Metallic,
    Radiant,
}

#[derive(ScryptoSbor)]
pub enum Rarity {
    Common,
    Rare,
    UltraRare,
}

#[derive(ScryptoSbor, NonFungibleData)]
pub struct Radgem {
    name: String,
    color: Color,
    material: Material,
    rarity: Rarity,
}

#[blueprint]
mod radgem_factory {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        get_radgem_address => PUBLIC;
        mint_radgem => restrict_to: [admin];
      }
    }

    struct RadgemFactory {
        radgem_resource_manager: ResourceManager,
    }

    impl RadgemFactory {
        pub fn new(
            owner_role: OwnerRole,
            admin_badge_address: ResourceAddress,
        ) -> Global<RadgemFactory> {
            let radgem_resource_manager =
                ResourceBuilder::new_ruid_non_fungible::<Radgem>(OwnerRole::None)
                    .mint_roles(mint_roles!(
                        minter => rule!(require(admin_badge_address));
                        minter_updater => rule!(deny_all);
                    ))
                    .metadata(metadata!(
                        init {
                            "name" => "RadGem", locked;
                            "description" => "Two Radgems can be combined with a Morph Energy Card by RadQuest's Jetty to produce a beautiful Radmorph NFT.", locked;
                        }
                    ))
                    .create_with_no_initial_supply();
            Self {
                radgem_resource_manager,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
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
            self.radgem_resource_manager.mint_ruid_non_fungible(radgem)
        }
    }
}
