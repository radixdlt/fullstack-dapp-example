use scrypto::prelude::*;

use crate::quest_rewards::UserId;

#[blueprint]
mod kyc_oracle {

    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        get_user_kyc_requirement => restrict_to: [admin];
        update_user_kyc_requirement => restrict_to: [admin];
      }
    }

    struct KycOracle {
        user_kyc_required: KeyValueStore<UserId, ()>,
    }

    impl KycOracle {
        pub fn new(
            owner_role: OwnerRole,
            dapp_definition: ComponentAddress,
            admin_badge_address: ResourceAddress,
        ) -> Global<KycOracle> {
            Self {
                user_kyc_required: KeyValueStore::new(),
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
            ))
            .metadata(metadata!(
                init {
                    "dapp_definition" => dapp_definition, updatable;
                }
            ))
            .globalize()
        }

        pub fn get_user_kyc_requirement(&self, user_id: UserId) -> bool {
            self.user_kyc_required.get(&user_id).is_some()
        }

        pub fn update_user_kyc_requirement(&mut self, user_id: UserId, require_kyc: bool) {
            if require_kyc {
                self.user_kyc_required.insert(user_id, ());
            } else {
                self.user_kyc_required.remove(&user_id);
            }
        }
    }
}
