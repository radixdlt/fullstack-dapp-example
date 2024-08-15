use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(ScryptoSbor, Debug, Clone, PartialEq, Eq, Hash)]
pub enum RewardAmount {
    FungibleAmount(Decimal),
    NonFungibleAmount(Vec<NonFungibleLocalId>),
}

#[derive(ScryptoSbor, Debug, Clone, PartialEq, Eq)]
pub struct RewardRecord {
    gift_box_count: Decimal,
    rewards: HashMap<ResourceAddress, RewardAmount>,
}

#[derive(ScryptoSbor, Debug, Clone, PartialEq, Eq)]
struct UserRewardRecord {
    user_id: UserId,
    rewards: RewardRecord,
}

#[derive(ScryptoSbor, Debug, Clone, PartialEq, Eq)]
// Each of these counts is a number of gift boxes, e.g. claimed_rewards is
// the number of gift boxes rewards have been claimed for
pub struct GiftBoxCounts {
    pub opened: Decimal,
    pub deposited_rewards: Decimal,
    pub claimed_rewards: Decimal,
    pub recalled_rewards: Decimal,
}

#[derive(ScryptoSbor, Debug, PartialEq, Eq)]
pub struct RewardDeposit {
    pub user_id: UserId,
    pub gift_box_count: Decimal,
    pub rewards: Vec<Bucket>,
}

type Unit = ();

#[blueprint]
#[types(Unit, ResourceManager, UserId, GiftBoxCounts, ResourceAddress, Vault, Vec<RewardRecord>)]
#[events(
    GiftBoxesOpenedEvent,
    GiftBoxRewardsClaimedEvent,
    GiftBoxesDepositedEvent
)]
mod gift_box_opener_v2 {
    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
            super_admin => updatable_by: [OWNER];
        },
        methods {
            disable => restrict_to: [super_admin];
            enable => restrict_to: [super_admin];
            open_gift_boxes => PUBLIC;
            claim_gift_box_rewards => PUBLIC;
            get_user_reward_records => PUBLIC;
            get_user_gift_box_counts => PUBLIC;
            deposit_gift_box_rewards => restrict_to: [admin];
            retract_gift_box_rewards => restrict_to: [admin];
            add_gift_box_resources => restrict_to: [admin];
            remove_gift_box_resources => restrict_to: [admin];
        }
    }

    struct GiftBoxOpenerV2 {
        enabled: bool,
        admin_badge: Vault,
        hero_badge_address: ResourceAddress,
        gift_box_managers: KeyValueStore<ResourceManager, ()>,
        user_gift_box_counts: KeyValueStore<UserId, GiftBoxCounts>,
        rewards: KeyValueStore<ResourceAddress, Vault>,
        user_reward_records: KeyValueStore<UserId, Vec<RewardRecord>>,
    }

    impl GiftBoxOpenerV2 {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            dapp_definition: ComponentAddress,
            hero_badge_address: ResourceAddress,
            admin_badge: Bucket,
        ) -> Global<GiftBoxOpenerV2> {
            let admin_badge_address = admin_badge.resource_address();
            Self {
                enabled: true,
                admin_badge: Vault::with_bucket(admin_badge),
                hero_badge_address,
                gift_box_managers: KeyValueStore::<ResourceManager, ()>::new_with_registered_type(),
                user_gift_box_counts:
                    KeyValueStore::<UserId, GiftBoxCounts>::new_with_registered_type(),
                rewards: KeyValueStore::<ResourceAddress, Vault>::new_with_registered_type(),
                user_reward_records:
                    KeyValueStore::<UserId, Vec<RewardRecord>>::new_with_registered_type(),
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles! {
                admin => rule!(require(admin_badge_address));
                super_admin => rule!(require(super_admin_badge_address));
            })
            .metadata(metadata!(
                init {
                    "dapp_definition" => dapp_definition, updatable;
                }
            ))
            .globalize()
        }

        pub fn disable(&mut self) {
            assert!(self.enabled, "GiftBoxOpenerV2 already disabled");
            self.enabled = false;
        }
        pub fn enable(&mut self) {
            assert!(!self.enabled, "GiftBoxOpenerV2 already enabled");
            self.enabled = true;
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

        fn assert_users_claimable_rewards_bellow_max(&self, user_id: &UserId) {
            if let Some(reward_record) = self.user_reward_records.get(user_id) {
                assert!(
                    (*reward_record).len() < 30,
                    "User has reached the maximum number of rewards records"
                );
            }
        }

        fn assert_user_gift_box_count_difference_below_max(&self, user_id: &UserId) {
            if let Some(counts) = self.user_gift_box_counts.get(user_id) {
                assert!(
                    counts
                        .opened
                        .checked_sub(counts.claimed_rewards)
                        .unwrap()
                        .checked_sub(counts.recalled_rewards)
                        .unwrap()
                        <= dec!(30),
                    "User has reached the max count of opened but unclaimed gift boxes"
                );
            }
        }

        pub fn open_gift_boxes(&mut self, hero_badge: Proof, gift_boxes: Bucket) {
            assert!(self.enabled, "GiftBoxOpenerV2 disabled");

            // Check and get user id from hero badge proof
            let user_id = self.get_user_id_from_badge_proof(hero_badge);

            self.assert_users_claimable_rewards_bellow_max(&user_id);

            // Check gift box address
            self.gift_box_managers
                .get(&gift_boxes.resource_manager())
                .unwrap();

            {
                let counts = self.user_gift_box_counts.get_mut(&user_id);
                match counts {
                    Some(mut counts) => {
                        counts.opened += gift_boxes.amount();
                    }
                    None => {
                        drop(counts);
                        self.user_gift_box_counts.insert(
                            user_id.clone(),
                            GiftBoxCounts {
                                opened: gift_boxes.amount(),
                                deposited_rewards: dec!(0),
                                claimed_rewards: dec!(0),
                                recalled_rewards: dec!(0),
                            },
                        );
                    }
                };
            }

            // Check if user has now opened too many gift boxes
            self.assert_user_gift_box_count_difference_below_max(&user_id);

            Runtime::emit_event(GiftBoxesOpenedEvent {
                user_id,
                resource_address: gift_boxes.resource_address(),
                quantity: gift_boxes.amount(),
            });

            // Burn the gift box
            self.admin_badge
                .as_fungible()
                .authorize_with_amount(1, || gift_boxes.resource_manager().burn(gift_boxes));
        }

        fn take_users_n_latest_reward_records(
            &mut self,
            user_id: &UserId,
            max_record_count: usize,
        ) -> Vec<RewardRecord> {
            // Retrieve rewards records
            let mut reward_records = self.user_reward_records.get_mut(user_id).unwrap();
            // To prevent running out of events/cost units on claim, we implement a partial
            // claim of up to a maximum number of rewards
            let reward_record_length = reward_records.len();
            let amount_to_take = reward_record_length.min(max_record_count);
            reward_records
                .split_off(reward_record_length - amount_to_take)
                .to_owned()
        }

        fn retrieve_reward_from_vaults(&mut self, reward_record: RewardRecord) -> Vec<Bucket> {
            reward_record
                .rewards
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

        pub fn claim_gift_box_rewards(
            &mut self,
            hero_badge: Proof,
            max_reward_count: usize,
        ) -> Vec<Bucket> {
            assert!(self.enabled, "GiftBoxOpenerV2 disabled");

            let user_id = self.get_user_id_from_badge_proof(hero_badge);

            let mut claimed_reward_record = Vec::<RewardRecord>::new();
            let mut reward = Vec::<Bucket>::new();

            let latest_reward_records =
                self.take_users_n_latest_reward_records(&user_id, max_reward_count);

            for reward_record in latest_reward_records {
                self.user_gift_box_counts
                    .get_mut(&user_id)
                    .unwrap()
                    .claimed_rewards += reward_record.gift_box_count;
                claimed_reward_record.push(reward_record.clone());

                reward.extend(self.retrieve_reward_from_vaults(reward_record));
            }

            Runtime::emit_event(GiftBoxRewardsClaimedEvent {
                user_id,
                rewards: claimed_reward_record,
            });

            assert!(!reward.is_empty(), "No rewards to claim");
            reward
        }

        pub fn get_user_reward_records(&self, user_id: UserId) -> Vec<RewardRecord> {
            self.user_reward_records.get(&user_id).unwrap().clone()
        }

        pub fn get_user_gift_box_counts(&self, user_id: UserId) -> GiftBoxCounts {
            self.user_gift_box_counts.get(&user_id).unwrap().clone()
        }

        pub fn deposit_gift_box_rewards(&mut self, reward_deposits: Vec<RewardDeposit>) {
            assert!(self.enabled, "GiftBoxOpenerV2 disabled");

            let mut deposited_user_rewards = Vec::<UserRewardRecord>::new();

            for RewardDeposit {
                user_id,
                gift_box_count,
                rewards,
            } in reward_deposits
            {
                // Check if user has too many rewards records
                self.assert_users_claimable_rewards_bellow_max(&user_id);

                self.user_gift_box_counts
                    .get_mut(&user_id)
                    .unwrap()
                    .deposited_rewards += gift_box_count;

                // Create a new rewards record
                let mut new_reward_record = RewardRecord {
                    gift_box_count,
                    rewards: HashMap::new(),
                };
                for reward in &rewards {
                    let reward_amount = match reward.resource_manager().resource_type() {
                        ResourceType::Fungible { divisibility: _ } => {
                            RewardAmount::FungibleAmount(reward.as_fungible().amount())
                        }
                        ResourceType::NonFungible { id_type: _ } => {
                            RewardAmount::NonFungibleAmount(
                                reward
                                    .as_non_fungible()
                                    .non_fungible_local_ids()
                                    .into_iter()
                                    .collect(),
                            )
                        }
                    };

                    match new_reward_record.rewards.get(&reward.resource_address()) {
                        None => new_reward_record
                            .rewards
                            .insert(reward.resource_address(), reward_amount),
                        Some(_) => panic!("Duplicate reward resource address"),
                    };
                }

                // Add the rewards record to the users other rewards records
                let reward_records = self.user_reward_records.get_mut(&user_id);
                match reward_records {
                    Some(mut record) => {
                        record.push(new_reward_record.clone());
                    }
                    None => {
                        drop(reward_records);
                        self.user_reward_records
                            .insert(user_id.clone(), vec![new_reward_record.clone()]);
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

                deposited_user_rewards.push(UserRewardRecord {
                    user_id,
                    rewards: new_reward_record,
                });
            }

            Runtime::emit_event(GiftBoxesDepositedEvent(deposited_user_rewards));
        }

        pub fn retract_gift_box_rewards(
            &mut self,
            user_ids: Vec<UserId>,
            max_reward_count_per_user: usize,
        ) -> Vec<Bucket> {
            let mut retracted_rewards = Vec::<Bucket>::new();
            for user_id in user_ids {
                let reward_records_to_revoke =
                    self.take_users_n_latest_reward_records(&user_id, max_reward_count_per_user);

                for reward_record in reward_records_to_revoke {
                    self.user_gift_box_counts
                        .get_mut(&user_id)
                        .unwrap()
                        .recalled_rewards += reward_record.gift_box_count;

                    retracted_rewards.extend(self.retrieve_reward_from_vaults(reward_record));
                }
            }
            retracted_rewards
        }

        pub fn add_gift_box_resources(&mut self, resource_addresses: Vec<ResourceAddress>) {
            assert!(self.enabled, "GiftBoxOpenerV2 disabled");

            for resource_address in resource_addresses {
                self.gift_box_managers
                    .insert(ResourceManager::from_address(resource_address), ());
            }
        }

        pub fn remove_gift_box_resources(&mut self, resource_addresses: Vec<ResourceAddress>) {
            assert!(self.enabled, "GiftBoxOpenerV2 disabled");

            for resource_address in resource_addresses {
                self.gift_box_managers
                    .remove(&ResourceManager::from_address(resource_address));
            }
        }
    }
}

#[derive(Debug, ScryptoSbor, ScryptoEvent)]
struct GiftBoxesOpenedEvent {
    user_id: UserId,
    resource_address: ResourceAddress,
    quantity: Decimal,
}

#[derive(Debug, ScryptoSbor, ScryptoEvent)]
struct GiftBoxRewardsClaimedEvent {
    user_id: UserId,
    rewards: Vec<RewardRecord>,
}

#[derive(Debug, ScryptoSbor, ScryptoEvent)]
struct GiftBoxesDepositedEvent(Vec<UserRewardRecord>);
