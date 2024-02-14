use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(String);

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct QuestId(String);

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
            owner_badge_address: ResourceAddress,
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
            .prepare_to_globalize(OwnerRole::Fixed(rule!(require(owner_badge_address))))
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
            ))
            .globalize()
        }

        pub fn claim_reward(
            &mut self,
            quest_id: QuestId,
            user_badge: Proof,
            kyc_badge: Option<Proof>,
        ) {
            let user_badge = user_badge.check(self.user_badge_address);
            let user_id = UserId(
                user_badge
                    .as_non_fungible()
                    .non_fungible_local_id()
                    .to_string(),
            );

            Runtime::emit_event(RewardClaimedEvent {
                user_id,
                quest_id,
                rewards: vec![XRD],
            });
        }

        pub fn deposit_reward(
            &mut self,
            user_id: UserId,
            quest_id: QuestId,
            reward: Bucket,
        ) -> Bucket {
            Runtime::emit_event(RewardDepositedEvent {
                user_id,
                quest_id,
                reward: reward.resource_address(),
            });

            reward
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
    reward: ResourceAddress,
}
