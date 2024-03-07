use scrypto::prelude::*;

use crate::{morph_card_factory::Energy, radgem_factory::Material};

#[derive(ScryptoSbor)]
pub enum Rarity {
    Fine,
    Precious,
    Superb,
    Magnificent,
}

#[derive(ScryptoSbor, NonFungibleData)]
pub struct Radmorph {
    name: String,
    rarity: Rarity,
    material: Material,
    energy: Energy,
}

#[blueprint]
mod radmorph_factory {
    use crate::{morph_card_factory::MorphCard, radgem_factory::Radgem};

    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        mint_radmorph => restrict_to: [admin];
      }
    }

    struct RadmorphFactory {
        radmorph_resource_manager: ResourceManager,
    }

    impl RadmorphFactory {
        pub fn new(
            owner_role: OwnerRole,
            admin_badge_address: ResourceAddress,
        ) -> Global<RadmorphFactory> {
            let radmorph_resource_manager =
                ResourceBuilder::new_ruid_non_fungible::<Radmorph>(OwnerRole::None)
                    .mint_roles(mint_roles!(
                        minter => rule!(require(admin_badge_address));
                        minter_updater => rule!(deny_all);
                    ))
                    .metadata(metadata!(
                        init {
                            "name" => "RadMorphs", locked;
                            "description" => "Fused in the boundless energies of the RadQuest realm, RadMorphs are treasured by the dedicated and true of Radix.", locked;
                        }
                    ))
                    .create_with_no_initial_supply();
            Self {
                radmorph_resource_manager,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .globalize()
        }

        pub fn mint_radmorph(
            &mut self,
            radgem2_data: Radgem,
            radgem1_data: Radgem,
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
