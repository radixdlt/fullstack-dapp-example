use crate::element_price_oracle::element_price_oracle::ElementPriceOracle;
use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct QuestId(pub String);

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
        elements_manager: ResourceManager,
        collected_clams: FungibleVault,
        element_price_oracle: Global<ElementPriceOracle>,
    }
                

    impl ClamDex {
        pub fn new(
            name: String,
            description: String,
            owner_role: OwnerRole,
            admin_badge_bucket: Bucket,
            clams_address: ResourceAddress,
            elements_address: ResourceAddress,
            element_price_per_clam: Option<Decimal>,
        ) -> Global<ClamDex> {
            assert!(
                admin_badge_bucket.amount() == dec!(1),
                "Admin badge must be a single token"
            );

            let elements_manager = ResourceManager::from_address(elements_address);

            let element_price_oracle = ElementPriceOracle::new(element_price_per_clam);

            Self {
                admin_badge: FungibleVault::with_bucket(admin_badge_bucket.as_fungible()),
                clams_address,
                elements_manager,
                collected_clams: FungibleVault::new(clams_address),
                element_price_oracle,
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
            self.element_price_oracle.get_price()
        }

        pub fn swap(&mut self, mut clams: Bucket) -> (Bucket, Bucket) {
            let price = self.get_price();
            let element_amount = clams
                .amount()
                .checked_div(price)
                .unwrap()
                .checked_floor()
                .unwrap();

            let clams_amount = element_amount.checked_mul(price).unwrap();

            self.collected_clams
                .put(clams.take(clams_amount).as_fungible());

            let elements = self
                .admin_badge
                .authorize_with_amount(1, || self.elements_manager.mint(element_amount));

            Runtime::emit_event(JettySwapEvent {});

            (elements, clams)
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct JettySwapEvent {}
