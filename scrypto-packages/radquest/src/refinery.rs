use scrypto::prelude::*;

use crate::{
    image_oracle::image_oracle::ImageOracle,
    morph_card_forge::MorphEnergyCardData,
    quest_rewards::UserId,
    radgem_forge::{radgem_forge::RadgemForge, RadgemData},
    radmorph_forge::{radmorph_forge::RadmorphForge, RadmorphData},
};

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
enum RadgemDeposit {
    Unclaimed(Vec<NonFungibleLocalId>),
    Claimed,
}

#[blueprint]
#[events(
    CombineElementsDepositedEvent,
    CombineElementsMintedRadgemEvent,
    CombineElementsAddedRadgemImageEvent,
    CombineElementsClaimedEvent,
    RadmorphCreatedEvent
)]
mod refinery {

    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
            super_admin => updatable_by: [OWNER];
        },
        methods {
            disable => restrict_to: [super_admin];
            enable => restrict_to: [super_admin];
            combine_elements_deposit => PUBLIC;
            combine_elements_mint_radgem => restrict_to: [admin];
            combine_elements_add_radgem_image => restrict_to: [admin];
            combine_elements_claim => PUBLIC;
            create_radmorph => PUBLIC;
        }
    }

    struct Refinery {
        enabled: bool,
        admin_badge: FungibleVault,
        radgem_records: KeyValueStore<UserId, RadgemDeposit>,
        radgem_vault: NonFungibleVault,
        hero_badge_address: ResourceAddress,
        element_address: ResourceAddress,
        radgem_address: ResourceAddress,
        morph_card_address: ResourceAddress,
        radgem_forge: Global<RadgemForge>,
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
            let radgem_forge = RadgemForge::new(
                super_admin_badge_address,
                owner_role.clone(),
                dapp_definition,
                admin_badge.take(1),
                radgem_address,
            );
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
                radgem_records: KeyValueStore::new(),
                radgem_vault: NonFungibleVault::new(radgem_address),
                hero_badge_address,
                element_address,
                radgem_address,
                morph_card_address,
                radgem_forge,
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

        fn get_user_id_from_badge_proof(&self, hero_badge: Proof) -> UserId {
            let local_id_string = match hero_badge
                .check(self.hero_badge_address)
                .as_non_fungible()
                .non_fungible_local_id()
            {
                NonFungibleLocalId::String(local_id) => local_id.value().to_owned(),
                _ => unreachable!("All hero badges have String local IDs"),
            };

            UserId(local_id_string)
        }

        // User deposits Elements to be turned into a RadGem
        pub fn combine_elements_deposit(&self, hero_badge_proof: Proof, elements: Bucket) -> () {
            assert!(self.enabled, "Refinery component disabled");
            assert_eq!(elements.resource_address(), self.element_address);
            assert_eq!(elements.amount(), dec!(5));
            let user_id = self.get_user_id_from_badge_proof(hero_badge_proof);

            self.admin_badge
                .authorize_with_amount(1, || elements.burn());

            Runtime::emit_event(CombineElementsDepositedEvent { user_id });
        }

        // Mint a random RadGem
        pub fn combine_elements_mint_radgem(
            &mut self,
            user_id: UserId,
            color_seed: Decimal,
            material_seed: Decimal,
            quality_seed: Decimal,
        ) -> () {
            assert!(self.enabled, "Refinery component disabled");

            let radgem_bucket = self.admin_badge.authorize_with_amount(1, || {
                self.radgem_forge
                    .mint_radgem(color_seed, material_seed, quality_seed)
            });

            // Update the user's RadGem record
            if self.radgem_records.get(&user_id).is_none() {
                self.radgem_records.insert(
                    user_id.clone(),
                    RadgemDeposit::Unclaimed(vec![radgem_bucket
                        .as_non_fungible()
                        .non_fungible_local_id()]),
                );
            } else {
                let radgem_id = radgem_bucket.as_non_fungible().non_fungible_local_id();
                let mut radgem_record = self.radgem_records.get_mut(&user_id).unwrap();

                match *radgem_record {
                    RadgemDeposit::Unclaimed(ref mut radgem_ids) => radgem_ids.push(radgem_id),
                    RadgemDeposit::Claimed => {
                        *radgem_record = RadgemDeposit::Unclaimed(vec![radgem_id])
                    }
                }
            }

            let radgem_local_id = radgem_bucket.as_non_fungible().non_fungible_local_id();
            let radgem_data = radgem_bucket
                .as_non_fungible()
                .non_fungible::<RadgemData>()
                .data();

            // Deposit the RadGem into the vault for the user to claim later
            self.radgem_vault.put(radgem_bucket.as_non_fungible());

            Runtime::emit_event(CombineElementsMintedRadgemEvent {
                user_id,
                radgem_local_id,
                radgem_data,
            });
        }

        pub fn combine_elements_add_radgem_image(
            &mut self,
            user_id: UserId,
            radgem_local_id: NonFungibleLocalId,
            key_image_url: Url,
        ) {
            assert!(self.enabled, "Refinery component disabled");

            self.admin_badge.authorize_with_amount(1, || {
                self.radgem_forge
                    .update_key_image(radgem_local_id, key_image_url)
            });

            Runtime::emit_event(CombineElementsAddedRadgemImageEvent { user_id });
        }

        // User claims RadGem by presenting hero badge
        pub fn combine_elements_claim(&mut self, hero_badge_proof: Proof) -> Bucket {
            let user_id = self.get_user_id_from_badge_proof(hero_badge_proof);

            // Get the user's RadGem IDs from the record
            let mut radgem_record = self.radgem_records.get_mut(&user_id).unwrap();

            let radgems = match *radgem_record {
                RadgemDeposit::Claimed => panic!("RadGems already claimed"),
                RadgemDeposit::Unclaimed(ref mut radgem_ids) => {
                    // Take the RadGems from the vault using the IDs
                    let radgems = self
                        .radgem_vault
                        .take_non_fungibles(&radgem_ids.iter().cloned().collect());
                    *radgem_record = RadgemDeposit::Claimed;
                    radgems
                }
            };

            Runtime::emit_event(CombineElementsClaimedEvent { user_id });

            radgems.into()
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
pub struct CombineElementsDepositedEvent {
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct CombineElementsMintedRadgemEvent {
    user_id: UserId,
    radgem_local_id: NonFungibleLocalId,
    radgem_data: RadgemData,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct CombineElementsAddedRadgemImageEvent {
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct CombineElementsClaimedEvent {
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RadmorphCreatedEvent {
    radmorph_local_id: NonFungibleLocalId,
    radmorph_data: RadmorphData,
}
