use scrypto::prelude::*;

use crate::{
    image_oracle::image_oracle::ImageOracle,
    radmorph_forge::{
        radmorph_forge::RadmorphForge, MorphEnergyCardData, RadgemData, RadmorphData,
    },
};

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
enum RadgemDeposit {
    Unclaimed(Vec<NonFungibleLocalId>),
    Claimed,
}

#[blueprint]
#[events(RadmorphCreatedEvent)]
mod refinery {

    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
            super_admin => updatable_by: [OWNER];
        },
        methods {
            disable => restrict_to: [super_admin];
            enable => restrict_to: [super_admin];
            create_radmorph => PUBLIC;
        }
    }

    struct Refinery {
        enabled: bool,
        admin_badge: FungibleVault,
        hero_badge_address: ResourceAddress,
        element_address: ResourceAddress,
        radgem_address: ResourceAddress,
        morph_card_address: ResourceAddress,
        radmorph_forge: Global<RadmorphForge>,
        image_oracle: Global<ImageOracle>,
    }

    impl Refinery {
        // Instantiate the Refinery
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            dapp_definition: ComponentAddress,
            mut admin_badge: Bucket,
            hero_badge_address: ResourceAddress,
            element_address: ResourceAddress,
            morph_card_address: ResourceAddress,
            radgem_address: ResourceAddress,
            radmorph_address: ResourceAddress,
        ) -> Global<Refinery> {
            let radmorph_forge = RadmorphForge::new(
                super_admin_badge_address,
                owner_role.clone(),
                dapp_definition,
                admin_badge.take(1),
                radmorph_address,
            );

            let admin_badge_address = admin_badge.resource_address();

            let image_oracle =
                ImageOracle::new(owner_role.clone(), dapp_definition, admin_badge_address);
            Self {
                enabled: true,
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                hero_badge_address,
                element_address,
                radgem_address,
                morph_card_address,
                radmorph_forge,
                image_oracle,
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
            assert!(self.enabled, "Refinery component already disabled");
            self.enabled = false;
        }
        pub fn enable(&mut self) {
            assert!(!self.enabled, "Refinery  already enabled");
            self.enabled = true;
        }

        // transforms RadGems and RadCard into a RadMorph
        pub fn create_radmorph(
            &mut self,
            mut radgems: Bucket,
            morph_card: Bucket,
            key_image_url: Url,
        ) -> Bucket {
            assert!(self.enabled, "Refinery component disabled");
            // Confirm the resources
            assert_eq!(radgems.resource_address(), self.radgem_address);
            assert_eq!(morph_card.resource_address(), self.morph_card_address);

            assert_eq!(radgems.amount(), dec!(2));
            assert_eq!(morph_card.amount(), dec!(1));

            // Get the RadGem and MorphCard data
            let radgem_1 = radgems.take(1);
            let radgem_2 = radgems;

            let radgem_1_data: RadgemData = radgem_1
                .as_non_fungible()
                .non_fungible::<RadgemData>()
                .data();
            let radgem_2_data: RadgemData = radgem_2
                .as_non_fungible()
                .non_fungible::<RadgemData>()
                .data();
            let morph_card_data = morph_card
                .as_non_fungible()
                .non_fungible::<MorphEnergyCardData>()
                .data();

            let radmorph = self.admin_badge.authorize_with_amount(1, || {
                // Burn resources
                radgem_1.burn();
                radgem_2.burn();
                morph_card.burn();

                let material =
                    if radgem_1_data.material == "radiant" || radgem_2_data.material == "radiant" {
                        "radiant"
                    } else if radgem_1_data.material == "metallic"
                        || radgem_2_data.material == "metallic"
                    {
                        "metallic"
                    } else {
                        "crystalline"
                    };

                let pre_hash_string = format!(
                    "{}{}{}{}",
                    morph_card_data.energy_type, material, radgem_1_data.color, radgem_2_data.color,
                );

                let result = self
                    .image_oracle
                    .get_key_image_url_hash(CryptoUtils::keccak256_hash(
                        pre_hash_string.as_bytes().to_vec(),
                    ))
                    .unwrap();

                assert_eq!(
                    result,
                    CryptoUtils::keccak256_hash(key_image_url.as_str().as_bytes().to_vec())
                );

                // Mint a RadMorph
                self.radmorph_forge.mint_radmorph(
                    key_image_url,
                    morph_card_data,
                    radgem_1_data,
                    radgem_2_data,
                )
            });

            // Emit the event
            Runtime::emit_event(RadmorphCreatedEvent {
                radmorph_local_id: radmorph.as_non_fungible().non_fungible_local_id(),
                radmorph_data: radmorph
                    .as_non_fungible()
                    .non_fungible::<RadmorphData>()
                    .data()
                    .clone(),
            });

            radmorph
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RadmorphCreatedEvent {
    radmorph_local_id: NonFungibleLocalId,
    radmorph_data: RadmorphData,
}
