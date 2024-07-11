use scrypto::prelude::*;

#[blueprint]
mod clam_oracle {

    struct ClamOracle {
        starting_time: Instant,
        stable_price: bool,
    }
    impl ClamOracle {
        pub fn new(
            owner_role: OwnerRole,
            dapp_definition: ComponentAddress,
            stable_price: bool,
        ) -> Global<ClamOracle> {
            Self {
                starting_time: Clock::current_time_rounded_to_seconds(),
                stable_price,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .metadata(metadata!(
                init {
                    "dapp_definition" => dapp_definition, updatable;
                }
            ))
            .globalize()
        }

        pub fn get_price(&self) -> Decimal {
            if self.stable_price {
                return dec!(10);
            }

            let t = Clock::current_time_rounded_to_seconds().seconds_since_unix_epoch;

            let fluctuation = (dec!(0.258) * (t % 2))
                + (dec!(0.11) * (t % 3))
                + (dec!(0.095) * (t % 5))
                + (dec!(0.022) * (t % 7))
                + (dec!(0.001) * (t % 11));

            dec!(10)
                .checked_mul(fluctuation)
                .unwrap()
                .checked_add(5)
                .unwrap()
        }
    }
}
