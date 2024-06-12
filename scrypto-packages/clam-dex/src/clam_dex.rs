use crate::clam_oracle::clam_oracle::ClamOracle;
use scrypto::prelude::*;

#[blueprint]
#[events(JettySwapEvent)]
mod clam_dex {

    enable_method_auth! {
        roles {
            member => updatable_by: [SELF, OWNER];
        },
        methods {
            swap => PUBLIC;
            get_price => PUBLIC;
       }
    }

    struct ClamDex {
        admin_badge: FungibleVault,
        clams_address: ResourceAddress,
        otter_coin_manager: ResourceManager,
        collected_clams: FungibleVault,
        clam_oracle: Global<ClamOracle>,
    }

    impl ClamDex {
        pub fn new(
            name: String,
            description: String,
            owner_role: OwnerRole,
            admin_badge_bucket: Bucket,
            clams_address: ResourceAddress,
            otter_coin_address: ResourceAddress,
            clam_price: Option<Decimal>,
        ) -> Global<ClamDex> {
            assert!(
                admin_badge_bucket.amount() == dec!(1),
                "Admin badge must be a single token"
            );

            let otter_coin_manager = ResourceManager::from_address(otter_coin_address);

            let clam_oracle = ClamOracle::new(clam_price);

            Self {
                admin_badge: FungibleVault::with_bucket(admin_badge_bucket.as_fungible()),
                clams_address,
                otter_coin_manager,
                collected_clams: FungibleVault::new(clams_address),
                clam_oracle,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .metadata(metadata! (
                init {
                    "name" => name, locked;
                    "description" => description, locked;
                }
            ))
            .globalize()
        }

        pub fn get_price(&self) -> Decimal {
            self.clam_oracle.get_price()
        }

        pub fn swap(&mut self, clams: Bucket) -> Bucket {
            let price = self.get_price();
            let otter_coin_amount = clams.amount().checked_mul(price).unwrap();

            self.collected_clams.put(clams.as_fungible());

            let otter_coins = self
                .admin_badge
                .authorize_with_amount(1, || self.otter_coin_manager.mint(otter_coin_amount));

            Runtime::emit_event(JettySwapEvent {});

            otter_coins
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct JettySwapEvent {}
