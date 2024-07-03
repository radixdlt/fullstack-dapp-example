use scrypto::prelude::*;

use crate::quest_rewards::UserId;

#[derive(ScryptoSbor, Debug, Clone, PartialEq, Eq, Hash)]
enum RewardAmount {
    FungibleAmount(Decimal),
    NonFungibleAmount(Vec<NonFungibleLocalId>),
}

#[blueprint]
#[events(GiftBoxOpenedEvent, GiftBoxRewardsClaimedEvent, GiftBoxDepositedEvent)]
mod gift_box_opener {
    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
            super_admin => updatable_by: [OWNER];
        },
        methods {
            disable => restrict_to: [super_admin];
            open_gift_box => PUBLIC;
            claim_gift_box_rewards => PUBLIC;
            deposit_gift_box_rewards => restrict_to: [admin];
            add_gift_box_resources => restrict_to: [admin];
            remove_gift_box_resources => restrict_to: [admin];
        }
    }

    struct GiftBoxOpener {
        enabled: bool,
        admin_badge: Vault,
        hero_badge_address: ResourceAddress,
        gift_box_managers: KeyValueStore<ResourceManager, ()>,
        rewards: KeyValueStore<ResourceAddress, Vault>,
        rewards_record: KeyValueStore<UserId, Vec<HashMap<ResourceAddress, RewardAmount>>>,
    }

    impl GiftBoxOpener {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            hero_badge_address: ResourceAddress,
            admin_badge: Bucket,
        ) -> Global<GiftBoxOpener> {
            let admin_badge_address = admin_badge.resource_address();
            Self {
                enabled: true,
                admin_badge: Vault::with_bucket(admin_badge),
                hero_badge_address,
                gift_box_managers: KeyValueStore::new(),
                rewards: KeyValueStore::new(),
                rewards_record: KeyValueStore::new(),
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
            assert!(self.enabled, "GiftBoxOpener already disabled");

            self.enabled = false;
        }

        fn get_user_id_from_badge_proof(&self, hero_badge: Proof) -> UserId {
            let local_id_string = match hero_badge
                .check(self.hero_badge_address)
                .as_non_fungible()
                .non_fungible_local_id()
            {
                NonFungibleLocalId::String(local_id) => local_id.value().to_owned(),
                _ => unreachable!("All hero badges have String local IDs"),
            };

            UserId(local_id_string)
        }

        pub fn open_gift_box(&mut self, hero_badge: Proof, gift_box: Bucket) {
            assert!(self.enabled, "GiftBoxOpener disabled");

            // Check and get user id from hero badge proof
            let user_id = self.get_user_id_from_badge_proof(hero_badge);

            // Check gift box address
            self.gift_box_managers
                .get(&gift_box.resource_manager())
                .unwrap();

            Runtime::emit_event(GiftBoxOpenedEvent {
                user_id,
                resource_address: gift_box.resource_address(),
                quantity: gift_box.amount(),
            });

            // Burn the gift box
            self.admin_badge
                .as_fungible()
                .authorize_with_amount(1, || gift_box.resource_manager().burn(gift_box));
        }

        pub fn claim_gift_box_rewards(&mut self, hero_badge: Proof) -> Vec<Bucket> {
            let user_id = self.get_user_id_from_badge_proof(hero_badge);

            // Retrieve rewards records
            let rewards_records = self
                .rewards_record
                .get_mut(&user_id)
                .unwrap()
                .pop()
                .unwrap();

            Runtime::emit_event(GiftBoxRewardsClaimedEvent { user_id });

            // Use the  rewards records to retrieve rewards from vaults
            rewards_records
                .iter()
                .map(|(resource_address, reward_amount)| match reward_amount {
                    RewardAmount::FungibleAmount(amount) => {
                        self.rewards
                            .get_mut(&resource_address)
                            .unwrap()
                            .as_fungible()
                            .take(*amount)
                            .0
                    }
                    RewardAmount::NonFungibleAmount(ids) => {
                        self.rewards
                            .get_mut(&resource_address)
                            .unwrap()
                            .as_non_fungible()
                            .take_non_fungibles(&ids.iter().cloned().collect())
                            .0
                    }
                })
                .collect()
        }

        pub fn deposit_gift_box_rewards(&mut self, user_id: UserId, rewards: Vec<Bucket>) {
            // Create a new rewards record
            let mut new_rewards_record = HashMap::new();
            for reward in &rewards {
                let reward_amount = match reward.resource_manager().resource_type() {
                    ResourceType::Fungible { divisibility: _ } => {
                        RewardAmount::FungibleAmount(reward.as_fungible().amount())
                    }
                    ResourceType::NonFungible { id_type: _ } => RewardAmount::NonFungibleAmount(
                        reward
                            .as_non_fungible()
                            .non_fungible_local_ids()
                            .into_iter()
                            .collect(),
                    ),
                };
                new_rewards_record.insert(reward.resource_address(), reward_amount);
            }

            // Add the rewards record to the users other rewards records
            let user_rewards_records = self.rewards_record.get_mut(&user_id);
            match user_rewards_records {
                Some(mut record) => {
                    record.push(new_rewards_record);
                }
                None => {
                    drop(user_rewards_records);
                    self.rewards_record
                        .insert(user_id.clone(), vec![new_rewards_record]);
                }
            }

            // Deposit the rewards into the rewards vault
            for reward in rewards {
                let reward_address = reward.resource_address();
                let reward_vault = self.rewards.get_mut(&reward_address);
                match reward_vault {
                    Some(mut vault) => {
                        vault.put(reward);
                    }
                    None => {
                        drop(reward_vault);
                        self.rewards
                            .insert(reward_address, Vault::with_bucket(reward));
                    }
                }
            }

            Runtime::emit_event(GiftBoxDepositedEvent { user_id });
        }

        pub fn add_gift_box_resources(&mut self, resource_addresses: Vec<ResourceAddress>) {
            assert!(self.enabled, "GiftBoxOpener disabled");

            for resource_address in resource_addresses {
                self.gift_box_managers
                    .insert(ResourceManager::from_address(resource_address), ());
            }
        }

        pub fn remove_gift_box_resources(&mut self, resource_addresses: Vec<ResourceAddress>) {
            assert!(self.enabled, "GiftBoxOpener disabled");

            for resource_address in resource_addresses {
                self.gift_box_managers
                    .remove(&ResourceManager::from_address(resource_address));
            }
        }
    }
}

#[derive(Debug, ScryptoSbor, ScryptoEvent)]
struct GiftBoxOpenedEvent {
    user_id: UserId,
    resource_address: ResourceAddress,
    quantity: Decimal,
}

#[derive(Debug, ScryptoSbor, ScryptoEvent)]
struct GiftBoxRewardsClaimedEvent {
    user_id: UserId,
}

#[derive(Debug, ScryptoSbor, ScryptoEvent)]
struct GiftBoxDepositedEvent {
    user_id: UserId,
}
