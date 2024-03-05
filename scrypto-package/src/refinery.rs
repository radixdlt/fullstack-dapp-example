use scrypto::prelude::*;

#[derive(ScryptoSbor, NonFungibleData)]
struct RadGem {
    name: String,
    color: String,
    material: String,
    rarity: String,
}

#[derive(ScryptoSbor, ScryptoEvent)]
struct RegisteredEvent {
    event: String,
}

#[blueprint]
#[events(
    ElementsCombineDepositedEvent,
    ElementsCombineProcessedEvent,
    ElementsCombineClaimedEvent,
    RadgemsTransformedEvent
)]
mod refinery {
    struct Refinery {
        radgem_resource_manager: ResourceManager,
        // radgem_deposit: KeyValueStore<ClaimTicketNftId, Vault>,
        radgem_vault: Vault,
        admin_badge: ResourceAddress,
    }

    impl Refinery {
        // Instantiate the Refinery
        pub fn new_refinery(
            owner_badge_address: ResourceAddress,
            admin_badge_address: ResourceAddress,
            user_badge_address: ResourceAddress,
        ) -> Global<Refinery> {
            // Create RadGem NFT
            let radgem_resource_manager =
                ResourceBuilder::new_ruid_non_fungible::<RadGem>(OwnerRole::None)
                    .mint_roles(mint_roles!(
                        minter => rule!(require(admin_badge_address));
                        minter_updater => rule!(deny_all);
                    ))
                    .create_with_no_initial_supply();

            Self {
                radgem_resource_manager: radgem_resource_manager,
                radgem_vault: Vault::new(radgem_resource_manager.address()),
                // radgem_deposit: KeyValueStore::new(),
                admin_badge: admin_badge_address,
            }
            .instantiate()
            .prepare_to_globalize(OwnerRole::None)
            .globalize()
        }

        // combine_elements_deposit create a function that takes a Bucket of elements and burns them
        // emit elements_combine_deposited event
        fn combine_elements_deposit(&self, elements: Bucket) -> () {
            // burn the elements
            elements.burn();
            Runtime::emit_event(ElementsCombineDepositedEvent {
                event: "elements_combine_deposited".to_string(),
            });
        }

        // combine_elements_process Mint a Random RadGem NFT
        // emit elements_combine_processed event
        pub fn combine_elements_process(&mut self, elements: Bucket) -> () {
            // Burn the elements
            self.combine_elements_deposit(elements);
            // Mint a RadGem
            let radgem_bucket = self.radgem_resource_manager.mint_ruid_non_fungible(RadGem {
                name: "RadGem".to_string(),
                color: "Red".to_string(),
                material: "radiant".to_string(),
                rarity: "common".to_string(),
            });
            self.radgem_vault.put(radgem_bucket);
            // TODO Store the User ID and the RadGem ID in a KeyValueStore

            // Emit the event
            Runtime::emit_event(ElementsCombineProcessedEvent {
                event: "elements_combine_proccessed".to_string(),
            });
        }
        // combine_elements_claim create a function to claim the RadGem
        // emit elements_combine_claimed event
        pub fn combine_elements_claim(&mut self, user_id: String, radgem_id: String) -> () {
            // TODO Get the RadGem from the Vault
            // TODO Transfer the RadGem to the User
            // TODO Remove the User ID and the RadGem ID from the KeyValueStore or mark it as claimed
            Runtime::emit_event(ElementsCombineClaimedEvent {
                event: "elements_combine_claimed".to_string(),
            });
        }

        // transform_radgems create a function to transform RadGems & Morph Card into a new RadMorph NFT
        // emit radgems_transformed event
        pub fn transform_radgems(&mut self, radgems: Bucket, morph_card: Bucket) -> () {
            // Burn the RadGems
            radgems.burn();
            // Burn the Morph Card
            morph_card.burn();
            // Mint a RadMorph
            // TODO
            // Emit the event
            Runtime::emit_event(RadgemsTransformedEvent {
                event: "radgems_transformed".to_string(),
            });
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineDepositedEvent {
    event: String,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineProcessedEvent {
    event: String,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineClaimedEvent {
    event: String,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RadgemsTransformedEvent {
    event: String,
}
