use scrypto::prelude::*;

use crate::kyc_oracle::kyc_oracle::KycOracle;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct QuestId(pub String);

// TODO: Update with actual KycData struct when available
#[derive(ScryptoSbor, NonFungibleData, PartialEq, Eq, Debug, Clone)]
pub struct DidData {
    pub radquest_kyc: bool,
}

#[derive(ScryptoSbor, PartialEq, Eq, Debug, Clone)]
enum RewardState {
    Unclaimed {
        resources_record: HashMap<ResourceAddress, RewardAmount>,
    },
    Claimed,
}

#[derive(ScryptoSbor, PartialEq, Eq, Debug, Clone)]
enum RewardAmount {
    FungibleAmount(Decimal),
    NonFungibleAmount(IndexSet<NonFungibleLocalId>),
}

#[derive(ScryptoSbor, PartialEq, Eq, Debug, Clone)]
struct RewardInfo {
    resource_address: ResourceAddress,
    reward_amount: RewardAmount,
}

#[blueprint]
#[events(RewardClaimedEvent, RewardDepositedEvent)]
mod quest_rewards {
    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
            super_admin => updatable_by: [OWNER];
        },
        methods {
            disable => restrict_to: [super_admin];
            claim_reward => PUBLIC;
            deposit_reward => restrict_to: [admin];
        }
    }
    struct QuestRewards {
        enabled: bool,
        admin_badge: FungibleVault,
        rewards: KeyValueStore<ResourceAddress, Vault>,
        rewards_record: KeyValueStore<(UserId, QuestId), RewardState>,
        hero_badge_address: ResourceAddress,
        kyc_badge_address: ResourceAddress,
        admin_badge_address: ResourceAddress,
        kyc_oracle: Global<KycOracle>,
    }

    impl QuestRewards {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            admin_badge: Bucket,
            hero_badge_address: ResourceAddress,
            kyc_badge_address: ResourceAddress,
        ) -> Global<QuestRewards> {
            let admin_badge_address = admin_badge.resource_address();
            let kyc_oracle = KycOracle::new(owner_role.clone(), admin_badge_address.clone());

            Self {
                enabled: true,
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                rewards: KeyValueStore::new(),
                rewards_record: KeyValueStore::new(),
                hero_badge_address,
                kyc_badge_address,
                admin_badge_address,
                kyc_oracle,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
                super_admin => rule!(require(super_admin_badge_address));
            ))
            .globalize()
        }

        pub fn disable(&mut self) {
            assert!(self.enabled, "QuestRewards component already disabled");
            self.enabled = false;
        }

        fn authorize_claim(
            &self,
            quest_id: &QuestId,
            hero_badge: Proof,
            did_badge: Option<Proof>,
        ) -> UserId {
            let hero_badge = hero_badge.check(self.hero_badge_address);
            let user_id = UserId(
                hero_badge
                    .as_non_fungible()
                    .non_fungible_local_id()
                    .to_string(),
            );
            let reward_state = self
                .rewards_record
                .get(&(user_id.clone(), quest_id.clone()))
                .unwrap();

            match *reward_state {
                RewardState::Claimed => {
                    panic!("Reward already claimed")
                }
                RewardState::Unclaimed {
                    ref resources_record,
                } => {
                    let kyc_required = self.admin_badge.authorize_with_amount(1, || {
                        self.kyc_oracle.get_user_kyc_requirement(user_id.clone())
                    });

                    if resources_record.contains_key(&XRD) && kyc_required {
                        // Check did_badge for KYC validity
                        let non_fungible_data: DidData = did_badge
                            .unwrap()
                            .check(self.kyc_badge_address)
                            .as_non_fungible()
                            .non_fungible()
                            .data();
                        if !non_fungible_data.radquest_kyc {
                            panic!("KYC is not valid");
                        }
                    };
                }
            }
            user_id
        }

        pub fn claim_reward(
            &mut self,
            quest_id: QuestId,
            hero_badge: Proof,
            did_badge: Option<Proof>,
        ) -> Vec<Bucket> {
            let user_id = self.authorize_claim(&quest_id, hero_badge, did_badge);

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
                            .map(|resource_record| RewardInfo {
                                resource_address: resource_record.0.clone(),
                                reward_amount: resource_record.1.clone(),
                            })
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
            assert!(self.enabled, "Component disabled");
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

            // Capture the deposited rewards info for event emission
            let mut rewards_info: Vec<RewardInfo> = vec![];

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
                        let result = resources_record
                            .insert(reward.resource_address(), reward_amount.clone());
                        assert!(result.is_none(), "Duplicate reward resource");
                    }
                    RewardState::Claimed => {
                        let mut resources_record = HashMap::new();
                        resources_record.insert(reward.resource_address(), reward_amount.clone());
                        *reward_state = RewardState::Unclaimed { resources_record }
                    }
                };

                rewards_info.push(RewardInfo {
                    resource_address: reward.resource_address(),
                    reward_amount,
                });

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

            // Emit deposit event
            Runtime::emit_event(RewardDepositedEvent {
                user_id: user_id.clone(),
                quest_id: quest_id.clone(),
                rewards: rewards_info,
            });
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
pub struct RewardDepositedEvent {
    user_id: UserId,
    quest_id: QuestId,
    rewards: Vec<RewardInfo>,
}
