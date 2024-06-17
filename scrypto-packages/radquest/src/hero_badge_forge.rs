use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[blueprint]
#[events(AccountAddedEvent, BadgeClaimedEvent)]
mod hero_badge_forge {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
        super_admin => updatable_by: [OWNER];
      },
      methods {
        disable => restrict_to: [super_admin];
        add_user_account => restrict_to: [admin];
        claim_badge=> PUBLIC;
      }
    }

    struct HeroBadgeForge {
        enabled: bool,
        admin_badge: Vault,
        hero_badge_manager: ResourceManager,
        user_accounts: KeyValueStore<Global<Account>, ()>,
    }

    impl HeroBadgeForge {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            admin_badge: Bucket,
            hero_badge_address: ResourceAddress,
        ) -> Global<HeroBadgeForge> {
            let admin_badge_address = admin_badge.resource_address();
            let hero_badge_manager = ResourceManager::from_address(hero_badge_address);

            Self {
                enabled: true,
                admin_badge: Vault::with_bucket(admin_badge),
                hero_badge_manager,
                user_accounts: KeyValueStore::new(),
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles! {
                admin => rule!(require(admin_badge_address));
                super_admin => rule!(require(super_admin_badge_address));
            })
            .globalize()
        }

        pub fn disable(&mut self) {
            assert!(self.enabled, "HeroBadgeForge already disabled");

            self.enabled = false;
        }

        pub fn add_user_account(&mut self, account: Global<Account>) {
            assert!(self.enabled, "HeroBadgeForge disabled");

            self.user_accounts.insert(account, ());

            Runtime::emit_event(AccountAddedEvent { account })
        }

        pub fn claim_badge(&mut self, claimant: Global<Account>, user_id: UserId) -> Bucket {
            assert!(self.enabled, "HeroBadgeForge disabled");

            // Getting the owner role of the account.
            let owner_role = claimant.get_owner_role();
            // Assert against it to make sure the clamant account matches the method caller.
            Runtime::assert_access_rule(owner_role.rule);

            self.user_accounts
                .remove(&claimant)
                .expect("This account is not listed");

            Runtime::emit_event(BadgeClaimedEvent {
                user_id: user_id.clone(),
            });

            self.admin_badge.as_fungible().authorize_with_amount(1, || {
                self.hero_badge_manager
                    .mint_non_fungible(&NonFungibleLocalId::string(user_id.0).unwrap(), ())
            })
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent, Debug, Clone, PartialEq, Eq)]
struct AccountAddedEvent {
    account: Global<Account>,
}

#[derive(ScryptoSbor, ScryptoEvent, Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
struct BadgeClaimedEvent {
    user_id: UserId,
}
