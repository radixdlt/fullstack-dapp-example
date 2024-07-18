use crate::clam_oracle::clam_oracle::ClamOracle;
use scrypto::prelude::*;

#[blueprint]
#[events(ClamSwapEvent)]
mod clam_dex {

    enable_method_auth! {
        methods {
            swap => PUBLIC;
            get_price => PUBLIC;
       }
    }

    struct ClamDex {
        admin_badge: FungibleVault,
        ottercoin_manager: ResourceManager,
        collected_clams: FungibleVault,
        clam_oracle: Global<ClamOracle>,
    }

    impl ClamDex {
        pub fn new(
            owner_role: OwnerRole,
            dapp_definition: ComponentAddress,
            name: String,
            admin_badge_bucket: Bucket,
            clams_address: ResourceAddress,
            ottercoin_address: ResourceAddress,
            stable_price: bool,
        ) -> Global<ClamDex> {
            assert!(
                admin_badge_bucket.amount() == dec!(1),
                "Admin badge must be a single token"
            );

            let ottercoin_manager = ResourceManager::from_address(ottercoin_address);
            let clam_oracle = ClamOracle::new(owner_role.clone(), dapp_definition, stable_price);

            Self {
                admin_badge: FungibleVault::with_bucket(admin_badge_bucket.as_fungible()),
                ottercoin_manager,
                collected_clams: FungibleVault::new(clams_address),
                clam_oracle,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .metadata(metadata! (
                init {
                    "dapp_definition" => dapp_definition, updatable;
                    "name" => name, updatable;
                }
            ))
            .globalize()
        }

        pub fn get_price(&self) -> Decimal {
            self.clam_oracle.get_price()
        }

        pub fn swap(&mut self, clams: Bucket) -> Bucket {
            let price = self.get_price();
            let clams_amount = clams.amount();
            let ottercoin_amount = clams_amount.checked_mul(price).unwrap();

            self.collected_clams.put(clams.as_fungible());

            let ottercoins = self
                .admin_badge
                .authorize_with_amount(1, || self.ottercoin_manager.mint(ottercoin_amount));

            Runtime::emit_event(ClamSwapEvent {
                input: (self.collected_clams.resource_address(), clams_amount),
                output: (self.ottercoin_manager.address(), ottercoin_amount),
            });

            ottercoins
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ClamSwapEvent {
    input: (ResourceAddress, Decimal),
    output: (ResourceAddress, Decimal),
}
