use crate::{
    morph_card_factory::MorphCard, radgem_factory::radgem_factory::RadgemFactory,
    radgem_factory::Radgem, radmorph_factory::radmorph_factory::RadmorphFactory,
};
use scrypto::prelude::*;
#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[blueprint]
#[events(
    ElementsCombineDepositedEvent,
    ElementsCombineProcessedEvent,
    ElementsCombineClaimedEvent,
    RadgemsTransformedEvent
)]
mod refinery {

    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
        },
        methods {
            combine_elements_deposit => PUBLIC;
            combine_elements_process => restrict_to: [admin];
            combine_elements_claim => PUBLIC;
            transform_radgems => PUBLIC;
        }
    }

    struct Refinery {
        radgem_records: KeyValueStore<UserId, Vec<NonFungibleLocalId>>,
        radgem_vault: Vault,
        element_address: ResourceAddress,
        morph_card_address: ResourceAddress,
        admin_badge_address: ResourceAddress,
        user_badge_address: ResourceAddress,
        radgem_factory: Global<RadgemFactory>,
        radmorph_factory: Global<RadmorphFactory>,
    }

    impl Refinery {
        // Instantiate the Refinery
        pub fn new(
            owner_role: OwnerRole,
            element_address: ResourceAddress,
            morph_card_address: ResourceAddress,
            admin_badge_address: ResourceAddress,
            user_badge_address: ResourceAddress,
        ) -> Global<Refinery> {
            let radgem_factory =
                RadgemFactory::new(owner_role.clone(), admin_badge_address.clone());
            let radmorph_factory =
                RadmorphFactory::new(owner_role.clone(), admin_badge_address.clone());

            Self {
                radgem_records: KeyValueStore::new(),
                radgem_vault: Vault::new(radgem_factory.get_radgem_address()),
                element_address,
                morph_card_address,
                admin_badge_address,
                user_badge_address,
                radgem_factory,
                radmorph_factory,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .globalize()
        }

        // User deposits Elements to be turned into a RadGem
        pub fn combine_elements_deposit(&self, user_badge: Proof, elements: Bucket) -> UserId {
            assert_eq!(elements.resource_address(), self.element_address);
            assert_eq!(elements.amount(), dec!(3));
            let user_id = UserId(
                user_badge
                    .check(self.user_badge_address)
                    .as_non_fungible()
                    .non_fungible_local_id()
                    .to_string(),
            );

            elements.burn();

            Runtime::emit_event(ElementsCombineDepositedEvent {
                user_id: user_id.clone(),
            });

            user_id
        }

        // Mint a random RadGem
        pub fn combine_elements_process(&mut self, user_id: UserId, rand_num: Decimal) -> () {
            let radgem_bucket = self.radgem_factory.mint_radgem(rand_num);

            // Update the user's RadGem record
            if self.radgem_records.get(&user_id).is_none() {
                self.radgem_records.insert(
                    user_id.clone(),
                    vec![radgem_bucket.as_non_fungible().non_fungible_local_id()],
                );
            } else {
                self.radgem_records
                    .get_mut(&user_id)
                    .unwrap()
                    .push(radgem_bucket.as_non_fungible().non_fungible_local_id());
            }

            // Deposit the RadGem into the vault for the user to claim later
            self.radgem_vault.put(radgem_bucket);

            Runtime::emit_event(ElementsCombineProcessedEvent { user_id });
        }

        // User claims RadGem by presenting user badge
        pub fn combine_elements_claim(&mut self, user_badge: Proof) -> NonFungibleBucket {
            let user_id = UserId(
                user_badge
                    .check(self.user_badge_address)
                    .as_non_fungible()
                    .non_fungible_local_id()
                    .to_string(),
            );

            // Get the user's RadGem IDs from the record
            let radgem_ids = self.radgem_records.get(&user_id).unwrap();
            // Take the RadGems from the vault using the IDs
            let radgems = self
                .radgem_vault
                .as_non_fungible()
                .take_non_fungibles(&radgem_ids.iter().cloned().collect());
            // Remove the RadGem IDs from the user's record
            self.radgem_records.remove(&user_id);

            Runtime::emit_event(ElementsCombineClaimedEvent { user_id });

            radgems
        }

        // transforms RadGems and RadCard into a RadMorph
        pub fn transform_radgems(&mut self, radgems: Bucket, morph_card: Bucket) -> Bucket {
            // Confirm the resources
            assert_eq!(
                radgems.resource_address(),
                self.radgem_factory.get_radgem_address()
            );
            assert_eq!(morph_card.resource_address(), self.morph_card_address);
            assert_eq!(radgems.amount(), dec!(2));
            assert_eq!(morph_card.amount(), dec!(1));

            // Get the RadGem and MorphCard data
            let mut radgems_data: Vec<Radgem> = radgems
                .as_non_fungible()
                .non_fungibles::<Radgem>()
                .iter()
                .map(|gem| gem.data())
                .collect();
            let morph_card_data = morph_card
                .as_non_fungible()
                .non_fungible::<MorphCard>()
                .data();

            // Burn resources
            radgems.burn();
            morph_card.burn();

            // Mint a RadMorph
            let radmorph = self.radmorph_factory.mint_radmorph(
                radgems_data.pop().unwrap(),
                radgems_data.pop().unwrap(),
                morph_card_data,
            );

            // Emit the event
            Runtime::emit_event(RadgemsTransformedEvent {});

            radmorph
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineDepositedEvent {
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineProcessedEvent {
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineClaimedEvent {
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RadgemsTransformedEvent {}
