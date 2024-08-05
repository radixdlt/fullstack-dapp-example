use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct QuestId(pub String);

#[derive(ScryptoSbor, PartialEq, Eq, Debug, Clone)]
#[sbor(transparent)]
pub struct ResourcesRecord(pub HashMap<ResourceAddress, RewardAmount>);

#[derive(ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub enum RewardState {
    Unclaimed(ResourcesRecord),
    Claimed,
}

#[derive(ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct RewardId(UserId, QuestId);

#[derive(ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub enum RewardAmount {
    FungibleAmount(Decimal),
    NonFungibleAmount(IndexSet<NonFungibleLocalId>),
}

impl RewardAmount {
    fn add_rewards(&mut self, other: &RewardAmount) {
        match (self, other) {
            (RewardAmount::FungibleAmount(value), RewardAmount::FungibleAmount(other_value)) => {
                if let Some(new_value) = value.checked_add(*other_value) {
                    *value = new_value;
                } else {
                    panic!("Fungible reward add overflow")
                }
            }
            (
                RewardAmount::NonFungibleAmount(values),
                RewardAmount::NonFungibleAmount(other_values),
            ) => {
                values.extend(other_values.clone());
            }
            _ => panic!("Wrong resource type for resource address"),
        }
    }
}

#[derive(ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct RewardInfo {
    resource_address: ResourceAddress,
    reward_amount: RewardAmount,
}

#[derive(ScryptoSbor)]
struct UserQuestReward {
    user_id: UserId,
    quest_id: QuestId,
    rewards: Vec<RewardInfo>,
}

type Unit = ();

#[blueprint]
#[types(ResourceAddress, Vault, RewardId, RewardState, UserId, Unit)]
#[events(RewardClaimedEvent, RewardDepositedEvent)]
mod quest_rewards_v2 {
    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
            super_admin => updatable_by: [OWNER];
        },
        methods {
            disable => restrict_to: [super_admin];
            enable => restrict_to: [super_admin];
            get_rewards_state => PUBLIC;
            claim_reward => PUBLIC;
            deposit_users_rewards => restrict_to: [admin];
            get_clams => PUBLIC;
            update_users_kyc_requirement => restrict_to: [admin];
        }
    }
    struct QuestRewardsV2 {
        enabled: bool,
        admin_badge: FungibleVault,
        rewards: KeyValueStore<ResourceAddress, Vault>,
        rewards_record: KeyValueStore<RewardId, RewardState>,
        clam_manager: ResourceManager,
        hero_badge_address: ResourceAddress,
        kyc_badge_address: ResourceAddress,
        admin_badge_address: ResourceAddress,
        user_kyc_required: KeyValueStore<UserId, ()>,
    }

    impl QuestRewardsV2 {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            dapp_definition: ComponentAddress,
            admin_badge: Bucket,
            hero_badge_address: ResourceAddress,
            kyc_badge_address: ResourceAddress,
            clam_address: ResourceAddress,
        ) -> Global<QuestRewardsV2> {
            let admin_badge_address = admin_badge.resource_address();

            Self {
                enabled: true,
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                rewards: KeyValueStore::<ResourceAddress, Vault>::new_with_registered_type(),
                rewards_record: KeyValueStore::<RewardId, RewardState>::new_with_registered_type(),
                clam_manager: ResourceManager::from_address(clam_address),
                hero_badge_address,
                kyc_badge_address,
                admin_badge_address,
                user_kyc_required: KeyValueStore::<UserId, ()>::new_with_registered_type(),
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
                super_admin => rule!(require(super_admin_badge_address));
            ))
            .metadata(metadata!(
                init {
                    "dapp_definition" => dapp_definition, updatable;
                }
            ))
            .globalize()
        }

        pub fn disable(&mut self) {
            assert!(self.enabled, "QuestRewardsV2 component already disabled");
            self.enabled = false;
        }
        pub fn enable(&mut self) {
            assert!(!self.enabled, "QuestRewardsV2 already enabled");
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

        pub fn get_rewards_state(&self, user_id: UserId, quest_id: QuestId) -> RewardState {
            self.rewards_record
                .get(&RewardId(user_id.clone(), quest_id.clone()))
                .unwrap_or_else(|| {
                    panic!(
                        "No reward record for user_id: {}, quest_id: {}",
                        user_id.0, quest_id.0
                    )
                })
                .clone()
        }

        pub fn claim_reward(
            &mut self,
            quest_id: QuestId,
            hero_badge: Proof,
            kyc_badge: Option<Proof>,
        ) -> Vec<Bucket> {
            let user_id = self.get_user_id_from_badge_proof(hero_badge);

            let kyc_required_for_xrd = self.get_user_kyc_requirement(user_id.clone());

            let mut reward_state = self
                .rewards_record
                .get_mut(&RewardId(user_id.clone(), quest_id.clone()))
                .unwrap_or_else(|| {
                    panic!(
                        "No reward record for user_id: {}, quest_id: {}",
                        user_id.0, quest_id.0
                    )
                });

            match *reward_state {
                RewardState::Claimed => {
                    panic!("Reward already claimed")
                }
                RewardState::Unclaimed(ref mut resources_record) => {
                    // Assert kyc authorization passes if required
                    let resources_to_claim = &resources_record.0;
                    if resources_to_claim.contains_key(&XRD) {
                        if kyc_required_for_xrd {
                            kyc_badge
                                .expect("No KYC badge proof provided")
                                .check(self.kyc_badge_address);
                        }
                    }

                    Runtime::emit_event(RewardClaimedEvent {
                        user_id,
                        quest_id,
                        rewards: resources_record
                            .clone()
                            .0
                            .into_iter()
                            .map(|(address, amount)| RewardInfo {
                                resource_address: address,
                                reward_amount: amount,
                            })
                            .collect(),
                    });

                    let rewards = resources_record
                        .0
                        .iter_mut()
                        .map(|resource_record| match resource_record.1 {
                            RewardAmount::FungibleAmount(amount) => {
                                self.rewards
                                    .get_mut(resource_record.0)
                                    .unwrap()
                                    .as_fungible()
                                    .take(amount.clone())
                                    .0
                            }
                            RewardAmount::NonFungibleAmount(ids) => {
                                self.rewards
                                    .get_mut(resource_record.0)
                                    .unwrap()
                                    .as_non_fungible()
                                    .take_non_fungibles(&ids.iter().cloned().collect())
                                    .0
                            }
                        })
                        .collect();

                    *reward_state = RewardState::Claimed;

                    rewards
                }
            }
        }

        pub fn deposit_users_rewards(
            &mut self,
            users_rewards: Vec<(UserId, QuestId, Vec<Bucket>)>,
        ) {
            let mut user_quest_rewards: Vec<UserQuestReward> = vec![];

            for (user_id, quest_id, rewards) in users_rewards {
                assert!(self.enabled, "Component disabled");
                // If missing, add the reward to the rewards record
                if self
                    .rewards_record
                    .get(&RewardId(user_id.clone(), quest_id.clone()))
                    .is_none()
                {
                    self.rewards_record.insert(
                        RewardId(user_id.clone(), quest_id.clone()),
                        RewardState::Unclaimed(ResourcesRecord(HashMap::new())),
                    )
                };

                let mut reward_state = self
                    .rewards_record
                    .get_mut(&RewardId(user_id.clone(), quest_id.clone()))
                    .unwrap();

                let mut rewards_deposited = ResourcesRecord(HashMap::new());

                for reward in rewards {
                    // Update the reward record
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

                    match *reward_state {
                        RewardState::Unclaimed(ref mut resources_record) => {
                            resources_record
                                .0
                                .entry(reward.resource_address())
                                .and_modify(|existing_reward_amount| {
                                    existing_reward_amount.add_rewards(&reward_amount)
                                })
                                .or_insert(reward_amount.clone());

                            rewards_deposited
                                .0
                                .insert(reward.resource_address(), reward_amount.clone());
                        }
                        RewardState::Claimed => {
                            let mut resources_record = ResourcesRecord(HashMap::new());
                            resources_record
                                .0
                                .insert(reward.resource_address(), reward_amount.clone());
                            *reward_state = RewardState::Unclaimed(resources_record);
                        }
                    };

                    // If missing, add the reward resource vault to rewards
                    if self.rewards.get(&reward.resource_address()).is_none() {
                        self.rewards.insert(
                            reward.resource_address(),
                            Vault::new(reward.resource_address()),
                        );
                    }
                    // Put the reward in the vault
                    let mut reward_vault =
                        self.rewards.get_mut(&reward.resource_address()).unwrap();
                    reward_vault.put(reward);
                }

                user_quest_rewards.push(UserQuestReward {
                    user_id,
                    quest_id,
                    rewards: rewards_deposited
                        .0
                        .into_iter()
                        .map(|(address, amount)| RewardInfo {
                            resource_address: address,
                            reward_amount: amount,
                        })
                        .collect(),
                });
            }

            // Emit deposit event
            Runtime::emit_event(RewardDepositedEvent(user_quest_rewards));
        }

        pub fn get_clams(&self, hero_badge: Proof) -> Bucket {
            hero_badge.check(self.hero_badge_address);

            self.admin_badge
                .authorize_with_amount(dec!(1), || self.clam_manager.mint(dec!(10)))
        }

        fn get_user_kyc_requirement(&self, user_id: UserId) -> bool {
            self.user_kyc_required.get(&user_id).is_some()
        }

        pub fn update_users_kyc_requirement(&mut self, user_kyc_requirements: Vec<(UserId, bool)>) {
            for (user_id, require_kyc) in user_kyc_requirements {
                if require_kyc {
                    self.user_kyc_required.insert(user_id, ());
                } else {
                    self.user_kyc_required.remove(&user_id);
                }
            }
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RewardClaimedEvent {
    user_id: UserId,
    quest_id: QuestId,
    rewards: Vec<RewardInfo>,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RewardDepositedEvent(Vec<UserQuestReward>);
