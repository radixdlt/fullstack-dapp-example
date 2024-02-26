use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(String);

#[blueprint]
#[events(
    ElementsCombineDepositedEvent,
    ElementsCombineProccessedEvent,
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
        admin_badge_address: ResourceAddress,
        user_badge_address: ResourceAddress,
    }

    impl Refinery {
        // Instantiate the Refinery
        pub fn new_refinery(
            owner_badge_address: ResourceAddress,
            admin_badge_address: ResourceAddress,
            user_badge_address: ResourceAddress,
        ) -> Global<Refinery> {
            Self {
                admin_badge_address,
                user_badge_address,
            }
            .instantiate()
            .prepare_to_globalize(OwnerRole::Fixed(rule!(require(owner_badge_address))))
            .globalize()
        }

        // combine_elements_deposit create a function that takes a Bucket of elemtents and burns them
        // emit elements_combine_deposited event
        pub fn combine_elements_deposit(&self, elements: Bucket, user_badge: Proof) -> () {
            let user_badge = user_badge.check(self.user_badge_address);
            let user_id = UserId(
                user_badge
                    .as_non_fungible()
                    .non_fungible_local_id()
                    .to_string(),
            );
            // burn the elements
            elements.burn();
            Runtime::emit_event(ElementsCombineDepositedEvent {
                event: "elements_combine_deposited".to_string(),
                user_id,
            });
        }

        // combine_elements_process Mint a Random RadGem NFT
        // emit elements_combine_proccessed event
        pub fn combine_elements_process(&mut self, user_id: UserId) -> () {
            // TODO Store the User ID and the RadGem ID in a KeyValueStore
            // TODO Mint a RadGem

            // Emit the event
            Runtime::emit_event(ElementsCombineProccessedEvent {
                event: "elements_combine_proccessed".to_string(),
                user_id,
            });
        }
        // combine_elements_claim create a function to claim the RadGem
        // emit elements_combine_claimed event
        pub fn combine_elements_claim(&mut self, user_badge: Proof) -> () {
            // TODO Get the RadGem from the Vault
            // TODO Transfer the RadGem to the User
            // TODO Remove the User ID and the RadGem ID from the KeyValueStore or mark it as claimed
            let user_badge = user_badge.check(self.user_badge_address);
            let user_id = UserId(
                user_badge
                    .as_non_fungible()
                    .non_fungible_local_id()
                    .to_string(),
            );
            Runtime::emit_event(ElementsCombineClaimedEvent {
                event: "elements_combine_claimed".to_string(),
                user_id,
            });
        }

        // transform_radgems create a function to transform RadGems & Morph Card into a new RadMorph NFT
        // emit radgems_transformed event
        pub fn transform_radgems(
            &mut self,
            radgems: Bucket,
            morph_card: Bucket,
            user_badge: Proof,
        ) -> () {
            let user_badge = user_badge.check(self.user_badge_address);
            let user_id = UserId(
                user_badge
                    .as_non_fungible()
                    .non_fungible_local_id()
                    .to_string(),
            );
            // Burn the RadGems
            radgems.burn();
            // Burn the Morph Card
            morph_card.burn();
            // Mint a RadMorph
            // TODO
            // Emit the event
            Runtime::emit_event(RadgemsTransformedEvent {
                event: "radgems_transformed".to_string(),
                user_id,
            });
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineDepositedEvent {
    event: String,
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineProccessedEvent {
    event: String,
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineClaimedEvent {
    event: String,
    user_id: UserId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RadgemsTransformedEvent {
    event: String,
    user_id: UserId,
}
