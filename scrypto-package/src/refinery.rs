use crate::{
    morph_card_forge::MorphCardData,
    radgem_forge::{radgem_forge::RadgemForge, RadgemData},
    radmorph_forge::{radmorph_forge::RadmorphForge, RadmorphData},
};
use scrypto::prelude::*;
#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
enum RadgemDeposit {
    Unclaimed(Vec<NonFungibleLocalId>),
    Claimed,
}

#[blueprint]
#[events(
    ElementsCombineDepositedEvent,
    ElementsCombineProcessed1Event,
    ElementsCombineClaimedEvent,
    RadmorphCreatedEvent
)]
mod refinery {

    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
        },
        methods {
            combine_elements_deposit => PUBLIC;
            combine_elements_process_1 => restrict_to: [admin];
            combine_elements_process_2 => restrict_to: [admin];
            combine_elements_claim => PUBLIC;
            create_radmorph => PUBLIC;
        }
    }

    struct Refinery {
        admin_badge: FungibleVault,
        radgem_records: KeyValueStore<UserId, RadgemDeposit>,
        radgem_vault: NonFungibleVault,
        element_address: ResourceAddress,
        radgem_address: ResourceAddress,
        morph_card_address: ResourceAddress,
        user_badge_address: ResourceAddress,
        radgem_forge: Global<RadgemForge>,
        radmorph_forge: Global<RadmorphForge>,
    }

    impl Refinery {
        // Instantiate the Refinery
        pub fn new(
            owner_role: OwnerRole,
            mut admin_badge: Bucket,
            element_address: ResourceAddress,
            morph_card_address: ResourceAddress,
            user_badge_address: ResourceAddress,
            radgem_address: ResourceAddress,
            radmorph_address: ResourceAddress,
        ) -> Global<Refinery> {
            let radgem_forge =
                RadgemForge::new(owner_role.clone(), admin_badge.take(1), radgem_address);
            let radmorph_forge =
                RadmorphForge::new(owner_role.clone(), admin_badge.take(1), radmorph_address);

            let admin_badge_address = admin_badge.resource_address();

            Self {
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                radgem_records: KeyValueStore::new(),
                radgem_vault: NonFungibleVault::new(radgem_address),
                element_address,
                radgem_address,
                morph_card_address,
                user_badge_address,
                radgem_forge,
                radmorph_forge,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
            ))
            .globalize()
        }

        // User deposits Elements to be turned into a RadGem
        pub fn combine_elements_deposit(&self, user_badge: Proof, elements: Bucket) -> () {
            assert_eq!(elements.resource_address(), self.element_address);
            assert_eq!(elements.amount(), dec!(10));
            let user_id = UserId(
                user_badge
                    .check(self.user_badge_address)
                    .as_non_fungible()
                    .non_fungible_local_id()
                    .to_string(),
            );

            LocalAuthZone::push(self.admin_badge.create_proof_of_amount(1));
            elements.burn();

            Runtime::emit_event(ElementsCombineDepositedEvent { user_id });
        }

        // Mint a random RadGem
        pub fn combine_elements_process_1(
            &mut self,
            user_id: UserId,
            rand_num_1: Decimal,
            rand_num_2: Decimal,
        ) -> () {
            LocalAuthZone::push(self.admin_badge.create_proof_of_amount(1));
            let radgem_bucket = self.radgem_forge.mint_radgem(rand_num_1, rand_num_2);

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

            Runtime::emit_event(ElementsCombineProcessed1Event {
                user_id,
                radgem_local_id,
                radgem_data,
            });
        }

        pub fn combine_elements_process_2(
            &mut self,
            radgem_local_id: NonFungibleLocalId,
            key_image_url: Url,
        ) {
            LocalAuthZone::push(self.admin_badge.create_proof_of_amount(1));
            self.radgem_forge
                .update_key_image(radgem_local_id, key_image_url);
        }

        // User claims RadGem by presenting user badge
        pub fn combine_elements_claim(&mut self, user_badge: Proof) -> Bucket {
            let user_id = UserId(
                user_badge
                    .check(self.user_badge_address)
                    .as_non_fungible()
                    .non_fungible_local_id()
                    .to_string(),
            );

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

            Runtime::emit_event(ElementsCombineClaimedEvent { user_id });

            radgems.into()
        }

        // transforms RadGems and RadCard into a RadMorph
        pub fn create_radmorph(
            &mut self,
            radgem_1: Bucket,
            radgem_2: Bucket,
            morph_card: Bucket,
            key_image_url: Url,
            user_badge: Option<Proof>,
        ) -> Bucket {
            // Confirm the resources
            assert_eq!(radgem_1.resource_address(), self.radgem_address);
            assert_eq!(radgem_2.resource_address(), self.radgem_address);
            assert_eq!(morph_card.resource_address(), self.morph_card_address);

            for bucket in [&radgem_1, &radgem_2, &morph_card] {
                assert_eq!(bucket.amount(), dec!(1));
            }

            // Get the RadGem and MorphCard data
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
                .non_fungible::<MorphCardData>()
                .data();

            LocalAuthZone::push(self.admin_badge.create_proof_of_amount(1));

            // Burn resources
            radgem_1.burn();
            radgem_2.burn();
            morph_card.burn();

            //TODO: check key_image_url with Image Oracle

            // Mint a RadMorph
            let radmorph = self.radmorph_forge.mint_radmorph(
                radgem_1_data,
                radgem_2_data,
                morph_card_data,
                key_image_url,
            );

            let user_id = match user_badge {
                Some(badge_proof) => Some(UserId(
                    badge_proof
                        .check(self.user_badge_address)
                        .as_non_fungible()
                        .non_fungible_local_id()
                        .to_string(),
                )),
                None => None,
            };

            // Emit the event
            Runtime::emit_event(RadmorphCreatedEvent {
                user_id,
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
pub struct ElementsCombineDepositedEvent {
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineProcessed1Event {
    user_id: UserId,
    radgem_local_id: NonFungibleLocalId,
    radgem_data: RadgemData,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineClaimedEvent {
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RadmorphCreatedEvent {
    user_id: Option<UserId>,
    radmorph_local_id: NonFungibleLocalId,
    radmorph_data: RadmorphData,
}
