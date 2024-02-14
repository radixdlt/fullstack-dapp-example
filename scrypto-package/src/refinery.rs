use scrypto::prelude::*;

#[derive(ScryptoSbor, NonFungibleData)]
struct RadGem {
    name: String,
    color: String,
    material: String,
    rarity: String,
}
// type ClaimTicketNftId = String;
#[derive(ScryptoSbor, NonFungibleData)]
struct ClaimTicketNftId {
    name: String,
}

#[derive(ScryptoSbor, ScryptoEvent)]
struct RegisteredEvent {
    event: String,
}

#[blueprint]
#[events(RegisteredEvent)]
mod refinery {
    struct Refinery {
        radgem_resource_manager: ResourceManager,
        claim_ticket_nft_resource_manager: ResourceManager,
        // radgem_deposit: KeyValueStore<ClaimTicketNftId, Vault>,
        radgem_vault: Vault,
        admin_badge: Vault,
    }

    impl Refinery {
        // Instantiate the Refinery
        pub fn new_refinery() -> Global<Refinery> {
            // Create Admin Badge
            let admin_badge: Bucket = ResourceBuilder::new_fungible(OwnerRole::None)
                .divisibility(DIVISIBILITY_NONE)
                .metadata(metadata! {
                    init {
                          "name" => "Admin Badge", locked;
                     }
                })
                .mint_initial_supply(1)
                .into();

            // Create RadGem NFT
            let radgem_resource_manager =
                ResourceBuilder::new_ruid_non_fungible::<RadGem>(OwnerRole::None)
                    .mint_roles(mint_roles!(
                        minter => rule!(require(admin_badge.resource_address()));
                        minter_updater => rule!(deny_all);
                    ))
                    .create_with_no_initial_supply();
            // Create Claim Ticket NFT
            let claim_ticket_nft_resource_manager =
                ResourceBuilder::new_ruid_non_fungible::<RadGem>(OwnerRole::None)
                    .mint_roles(mint_roles!(
                        minter => rule!(require(admin_badge.resource_address()));
                        minter_updater => rule!(deny_all);
                    ))
                    .create_with_no_initial_supply();

            Self {
                radgem_resource_manager: radgem_resource_manager,
                radgem_vault: Vault::new(radgem_resource_manager.address()),
                claim_ticket_nft_resource_manager: claim_ticket_nft_resource_manager,
                // radgem_deposit: KeyValueStore::new(),
                admin_badge: Vault::with_bucket(admin_badge),
            }
            .instantiate()
            .prepare_to_globalize(OwnerRole::None)
            .globalize()
        }

        // combine_elements_deposit create a function that takes a Bucket of elemtents and burns them
        // emit elements_combine_deposited event
        fn combine_elements_deposit(&self, elements: Bucket) -> () {
            // burn the elements
            elements.burn();
            Runtime::emit_event(RegisteredEvent {
                event: "elements_combine_deposited".to_string(),
            });
        }

        // combine_elements_process Mint a Random RadGem NFT
        // emit elements_combine_proccessed event
        pub fn combine_elements_process(&mut self, elements: Bucket) -> Bucket {
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
            // mint a claim ticket
            let claim_ticket_nft = self
                .claim_ticket_nft_resource_manager
                .mint_ruid_non_fungible(ClaimTicketNftId {
                    name: "Claim Ticket".to_string(),
                });
            // Emit the event
            Runtime::emit_event(RegisteredEvent {
                event: "elements_combine_proccessed".to_string(),
            });
            // Return the claim ticket
            claim_ticket_nft
        }
    }
}
