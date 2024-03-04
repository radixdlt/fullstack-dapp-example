use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct QuestId(pub String);

// TODO: Update with actual KycData struct when available
#[derive(ScryptoSbor, NonFungibleData)]
pub struct KycData {
    pub expires: Instant,
}

#[derive(ScryptoSbor)]
enum RewardState {
    Unclaimed {
        resources_record: HashMap<ResourceAddress, RewardAmount>,
    },
    Claimed,
}

#[derive(ScryptoSbor)]
enum RewardAmount {
    FungibleAmount(Decimal),
    NonFungibleAmount(Vec<NonFungibleLocalId>),
}

#[blueprint]
#[events(RewardClaimedEvent, RewardDepositedEvent)]
mod quest_rewards {
    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
        },
        methods {
            claim_reward => PUBLIC;
            deposit_reward => restrict_to: [admin];
            update_user_kyc_requirement => restrict_to: [admin];
        }
    }
    struct QuestRewards {
        rewards: KeyValueStore<ResourceAddress, Vault>,
        rewards_record: KeyValueStore<(UserId, QuestId), RewardState>,
        user_kyc: KeyValueStore<UserId, ()>,
        user_badge_address: ResourceAddress,
        kyc_badge_address: ResourceAddress,
        admin_badge_address: ResourceAddress,
    }

    impl QuestRewards {
        pub fn new(
            owner_role: OwnerRole,
            admin_badge_address: ResourceAddress,
            user_badge_address: ResourceAddress,
            kyc_badge_address: ResourceAddress,
        ) -> Global<QuestRewards> {
            Self {
                rewards: KeyValueStore::new(),
                rewards_record: KeyValueStore::new(),
                user_kyc: KeyValueStore::new(),
                user_badge_address,
                kyc_badge_address,
                admin_badge_address,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
            ))
            .globalize()
        }

        fn authorize_claim(
            &self,
            quest_id: &QuestId,
            user_badge: Proof,
            kyc_badge: Option<Proof>,
        ) -> UserId {
            let user_badge = user_badge.check(self.user_badge_address);
            let user_id = UserId(
                user_badge
                    .as_non_fungible()
                    .non_fungible_local_id()
                    .to_string(),
            );
            let reward_state = self
                .rewards_record
                .get(&(user_id.clone(), quest_id.clone()))
                .unwrap();

            let kyc_required = self.user_kyc.get(&user_id);

            match *reward_state {
                RewardState::Claimed => {
                    panic!("Reward already claimed")
                }
                RewardState::Unclaimed {
                    ref resources_record,
                } => {
                    if resources_record.contains_key(&XRD) && kyc_required.is_some() {
                        // Check kyc_badge for expiration
                        let non_fungible_data: KycData = kyc_badge
                            .unwrap()
                            .check(self.kyc_badge_address)
                            .as_non_fungible()
                            .non_fungible()
                            .data();
                        if Clock::current_time_is_at_or_before(
                            non_fungible_data.expires,
                            TimePrecision::Second,
                        ) {
                            panic!("KYC expired!")
                        }
                    };
                }
            }
            user_id
        }

        pub fn claim_reward(
            &mut self,
            quest_id: QuestId,
            user_badge: Proof,
            kyc_badge: Option<Proof>,
        ) -> Vec<Bucket> {
            let user_id = self.authorize_claim(&quest_id, user_badge, kyc_badge);

            let mut reward_state = self
                .rewards_record
                .get_mut(&(user_id.clone(), quest_id.clone()))
                .unwrap();

            match *reward_state {
                RewardState::Claimed => {
                    panic!("Reward already claimed")
                }
                RewardState::Unclaimed {
                    ref mut resources_record,
                } => {
                    Runtime::emit_event(RewardClaimedEvent {
                        user_id,
                        quest_id,
                        rewards: resources_record
                            .iter()
                            .map(|resource_record| resource_record.0.clone())
                            .collect(),
                    });

                    resources_record
                        .iter_mut()
                        .map(|resource_record| match resource_record.1 {
                            RewardAmount::FungibleAmount(amount) => {
                                let bucket: Bucket = self
                                    .rewards
                                    .get_mut(resource_record.0)
                                    .unwrap()
                                    .as_fungible()
                                    .take(amount.clone())
                                    .into();
                                *amount = Decimal::zero();
                                bucket
                            }
                            RewardAmount::NonFungibleAmount(ids) => {
                                let bucket: Bucket = self
                                    .rewards
                                    .get_mut(resource_record.0)
                                    .unwrap()
                                    .as_non_fungible()
                                    .take_non_fungibles(&ids.iter().cloned().collect())
                                    .into();
                                ids.clear();
                                bucket
                            }
                        })
                        .collect()
                }
            }
        }

        pub fn deposit_reward(&mut self, user_id: UserId, quest_id: QuestId, rewards: Vec<Bucket>) {
            // Emit deposit event
            Runtime::emit_event(RewardDepositedEvent {
                user_id: user_id.clone(),
                quest_id: quest_id.clone(),
                rewards: rewards
                    .iter()
                    .map(|reward| reward.resource_address().clone())
                    .collect(),
            });

            // If missing, add the reward to the rewards record
            if self
                .rewards_record
                .get(&(user_id.clone(), quest_id.clone()))
                .is_none()
            {
                self.rewards_record.insert(
                    (user_id.clone(), quest_id.clone()),
                    RewardState::Unclaimed {
                        resources_record: HashMap::new(),
                    },
                )
            };

            let mut reward_state = self
                .rewards_record
                .get_mut(&(user_id.clone(), quest_id.clone()))
                .unwrap();

            for reward in rewards {
                // Update the reward record
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
                match *reward_state {
                    RewardState::Unclaimed {
                        ref mut resources_record,
                    } => {
                        resources_record.insert(reward.resource_address(), reward_amount);
                    }
                    RewardState::Claimed => {
                        let mut resources_record = HashMap::new();
                        resources_record.insert(reward.resource_address(), reward_amount);
                        *reward_state = RewardState::Unclaimed { resources_record }
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
                let mut reward_vault = self.rewards.get_mut(&reward.resource_address()).unwrap();
                reward_vault.put(reward);
            }
        }

        pub fn update_user_kyc_requirement(&mut self, user_id: UserId, require_kyc: bool) {
            if require_kyc {
                self.user_kyc.insert(user_id, ());
            } else {
                self.user_kyc.remove(&user_id);
            }
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RewardClaimedEvent {
    user_id: UserId,
    quest_id: QuestId,
    rewards: Vec<ResourceAddress>,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RewardDepositedEvent {
    user_id: UserId,
    quest_id: QuestId,
    rewards: Vec<ResourceAddress>,
}
