use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct QuestId(pub String);

#[derive(ScryptoSbor, PartialEq, Eq, Hash, Debug, Clone)]
pub struct UserAccount {
    user_id: UserId,
    account: Global<Account>,
}

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor, PartialEq, Eq, Debug, Clone)]
pub struct HeroBadgeData {
    name: String,
    description: String,
    #[mutable]
    key_image_url: Url,
    #[mutable]
    pub quests_completed: Vec<String>,
    #[mutable]
    pub quest_counter: u32,
}

#[blueprint]
#[events(BadgesMintedEvent)]
#[types(Global<Account>, UserId)]
mod hero_badge_forge_v2 {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
        super_admin => updatable_by: [OWNER];
      },
      methods {
        disable => restrict_to: [super_admin];
        enable => restrict_to: [super_admin];
        mint_hero_badges => restrict_to: [admin];
        heroes_completed_quests => restrict_to: [admin];
        update_key_image_urls => restrict_to: [admin];
      }
    }

    struct HeroBadgeForgeV2 {
        enabled: bool,
        admin_badge: Vault,
        hero_badge_manager: ResourceManager,
        user_accounts: KeyValueStore<Global<Account>, UserId>,
    }

    impl HeroBadgeForgeV2 {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            dapp_definition: ComponentAddress,
            admin_badge: Bucket,
            hero_badge_address: ResourceAddress,
        ) -> Global<HeroBadgeForgeV2> {
            let admin_badge_address = admin_badge.resource_address();
            let hero_badge_manager = ResourceManager::from_address(hero_badge_address);

            Self {
                enabled: true,
                admin_badge: Vault::with_bucket(admin_badge),
                hero_badge_manager,
                user_accounts: KeyValueStore::<Global<Account>, UserId>::new_with_registered_type(),
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
            assert!(self.enabled, "HeroBadgeForge already disabled");
            self.enabled = false;
        }
        pub fn enable(&mut self) {
            assert!(!self.enabled, "HeroBadgeForge already enabled");
            self.enabled = true;
        }

        pub fn mint_hero_badges(
            &mut self,
            user_ids: Vec<UserId>,
            quest_ids: Option<Vec<QuestId>>,
        ) -> Vec<Bucket> {
            assert!(self.enabled, "HeroBadgeForge disabled");

            Runtime::emit_event(BadgesMintedEvent {
                user_ids: user_ids.clone(),
            });

            user_ids.iter().map(|user_id | {
                self.admin_badge.as_fungible().authorize_with_amount(1, || {
                    let quests_completed: Vec<String> =  match &quest_ids {
                        Some(quest_ids) => (quest_ids)
                            .clone()
                            .into_iter()
                            .enumerate()
                            // Filter out any duplicate quest_ids
                            .filter_map(|(i,quest_id)| {
                                match quest_ids.iter().position(|qi| qi == &quest_id) {
                                    Some(pos) if pos == i => Some(quest_id.0),
                                    _ => None,
                                }
                            })
                            .collect(),
                        None => vec![],
                    };

                    self.hero_badge_manager
                        .mint_non_fungible(&NonFungibleLocalId::string(user_id.0.to_owned()).unwrap(), HeroBadgeData {
                            name: "Your Hero Badge".to_string(),
                            description: "Your progress through your RadQuest journey is tracked right on your Hero Badge. Take a look at the “quests_completed” to see what you’ve accomplished!".to_string(),
                            key_image_url: Url::of("https://assets.radixdlt.com/icons/full-stack-example/heero_bidge.webp"),
                            quest_counter: quests_completed.len() as u32,
                            quests_completed,
                        })
                    })
                })
                .collect()
        }

        pub fn heroes_completed_quests(
            &mut self,
            users_completed_quests: Vec<(UserId, Vec<QuestId>)>,
        ) {
            assert!(self.enabled, "HeroBadgeForge disabled");

            for (user_id, mut quest_ids) in users_completed_quests {
                self.admin_badge.as_fungible().authorize_with_amount(1, || {
                    let badge_id = NonFungibleLocalId::string(user_id.0).unwrap();
                    let mut non_fungible_data = self
                        .hero_badge_manager
                        .get_non_fungible_data::<HeroBadgeData>(&badge_id);

                    // Check if the quests have already been completed
                    quest_ids = quest_ids
                        .into_iter()
                        .filter(|quest_id| {
                            !non_fungible_data.quests_completed.contains(&quest_id.0)
                        })
                        .collect();

                    non_fungible_data
                        .quests_completed
                        .extend(quest_ids.iter().map(|id| id.0.to_owned()));

                    self.hero_badge_manager.update_non_fungible_data(
                        &badge_id,
                        "quest_counter",
                        non_fungible_data.quests_completed.len() as u32,
                    );

                    self.hero_badge_manager.update_non_fungible_data(
                        &badge_id,
                        "quests_completed",
                        non_fungible_data.quests_completed,
                    );
                })
            }
        }

        pub fn update_key_image_urls(&mut self, users_new_image_urls: Vec<(UserId, Url)>) {
            assert!(self.enabled, "HeroBadgeForge disabled");

            for (user_id, new_image_url) in users_new_image_urls {
                self.admin_badge.as_fungible().authorize_with_amount(1, || {
                    self.hero_badge_manager.update_non_fungible_data(
                        &NonFungibleLocalId::string(user_id.0).unwrap(),
                        "key_image_url",
                        new_image_url,
                    );
                })
            }
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent, Debug, Clone, PartialEq, Eq)]
struct BadgesMintedEvent {
    user_ids: Vec<UserId>,
}
