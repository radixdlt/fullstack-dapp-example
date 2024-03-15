use scrypto::prelude::*;

use crate::{morph_card_forge::Energy, radgem_forge::Material};

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Rarity {
    Fine,
    Precious,
    Superb,
    Magnificent,
}

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub struct Radmorph {
    name: String,
    rarity: Rarity,
    material: Material,
    energy: Energy,
}

#[blueprint]
mod radmorph_forge {
    use crate::{morph_card_forge::MorphCard, radgem_forge::Radgem};

    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        mint_radmorph => restrict_to: [admin];
      }
    }

    struct RadmorphForge {
        radmorph_resource_manager: ResourceManager,
    }

    impl RadmorphForge {
        pub fn new(
            owner_role: OwnerRole,
            admin_badge_address: ResourceAddress,
        ) -> Global<RadmorphForge> {
            let (address_reservation, component_address) =
                Runtime::allocate_component_address(RadmorphForge::blueprint_id());

            let radmorph_resource_manager =
                ResourceBuilder::new_ruid_non_fungible::<Radmorph>(OwnerRole::None)
                    .metadata(metadata!(
                        init {
                            "name" => "RadMorphs", locked;
                            "description" => "Fused in the boundless energies of the RadQuest realm, RadMorphs are treasured by the dedicated and true of Radix.", locked;
                        }
                    ))
                    .mint_roles(mint_roles!(
                        minter => rule!(require(global_caller(component_address)));
                        minter_updater => rule!(deny_all);
                    ))
                    .create_with_no_initial_supply();
            Self {
                radmorph_resource_manager,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
            ))
            .with_address(address_reservation)
            .globalize()
        }

        pub fn mint_radmorph(
            &mut self,
            radgem1_data: Radgem,
            radgem2_data: Radgem,
            morph_card_data: MorphCard,
        ) -> Bucket {
            let radmorph = Radmorph {
                name: "Fine Metallic MoltenLava RadMorph".to_string(),
                rarity: Rarity::Fine,
                material: Material::Metallic,
                energy: Energy::MoltenLava,
            };
            self.radmorph_resource_manager
                .mint_ruid_non_fungible(radmorph)
        }
    }
}
