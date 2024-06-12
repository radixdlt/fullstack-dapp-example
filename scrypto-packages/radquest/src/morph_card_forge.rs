use crate::refinery::RARITY;
use scrypto::prelude::*;

pub const ENERGY: [&str; 20] = [
    "Molten Lava",
    "Pyroclastic Flow",
    "Volcanic Lightning",
    "Tropical Cyclone",
    "Polar Blizzard",
    "Earthquake",
    "Fire Tornado",
    "Tidal Wave",
    "Hydrothermal Vent",
    "Rainbow Power",
    "Storm Cell",
    "Solar Flare",
    "Nuclear Fusion",
    "Aurora Borealis",
    "Gravity Force",
    "Magnetic Field",
    "Gamma Rays",
    "Black Hole",
    "Supernova",
    "Whirlpool",
];

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct MorphCardDataInput {
    pub key_image_url: Url,
    pub name: String,
    pub rarity: String,
    pub energy: String,
}

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct MorphCardData {
    #[mutable]
    pub key_image_url: Url,
    pub name: String,
    pub rarity: String,
    pub energy: String,
    pub availability: String,
}

#[blueprint]
#[events(MorphCardMintedEvent)]
mod morph_card_forge {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
        super_admin => updatable_by: [OWNER];
      },
      methods {
        disable => restrict_to: [super_admin];
        mint_fixed_card => restrict_to: [admin];
        set_fixed_cards => restrict_to: [super_admin];
        remove_fixed_cards => restrict_to: [super_admin];
        mint_random_card => restrict_to: [admin];
        set_random_cards => restrict_to: [super_admin];
        remove_random_cards => restrict_to: [super_admin];
        update_key_image_url => restrict_to: [admin];
      }
    }

    struct MorphCardForge {
        enabled: bool,
        super_admin_badge_address: ResourceAddress,
        admin_badge: FungibleVault,
        morph_card_resource_manager: ResourceManager,
        fixed_cards: KeyValueStore<String, MorphCardData>,
        random_cards: KeyValueStore<String, MorphCardData>,
        random_card_names: HashMap<String, Vec<String>>,
    }

    impl MorphCardForge {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            admin_badge: Bucket,
            morph_card_address: ResourceAddress,
        ) -> Global<MorphCardForge> {
            let admin_badge_address = admin_badge.resource_address();

            let random_card_names = HashMap::from([
                (RARITY[0].to_string(), Vec::new()),
                (RARITY[1].to_string(), Vec::new()),
                (RARITY[2].to_string(), Vec::new()),
            ]);

            Self {
                enabled: true,
                super_admin_badge_address,
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                morph_card_resource_manager: ResourceManager::from(morph_card_address),
                fixed_cards: KeyValueStore::new(),
                random_cards: KeyValueStore::new(),
                random_card_names,
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
            assert!(self.enabled, "MorphCardForge component already disabled");
            self.enabled = false;
        }

        pub fn mint_fixed_card(&mut self, card_name: String, user_id: UserId) -> Bucket {
            assert!(self.enabled, "MorphCard component disabled");
            let morph_card_data = self.fixed_cards.get(&card_name).unwrap().clone();

            let morph_card = self.admin_badge.authorize_with_amount(1, || {
                self.morph_card_resource_manager
                    .mint_ruid_non_fungible(morph_card_data.clone())
            });

            let local_id = morph_card.as_non_fungible().non_fungible_local_id();

            Runtime::emit_event(MorphCardMintedEvent {
                user_id,
                local_id,
                morph_card_data,
            });

            morph_card
        }

        pub fn set_fixed_cards(&mut self, cards: Vec<MorphCardDataInput>) {
            assert!(self.enabled, "MorphCard component disabled");
            for card in cards {
                assert!(RARITY.contains(&(&card.rarity as &str)));
                assert!(ENERGY.contains(&(&card.energy as &str)));

                let full_card = MorphCardData {
                    key_image_url: card.key_image_url,
                    name: card.name,
                    rarity: card.rarity,
                    energy: card.energy,
                    availability: "Fixed".to_string(),
                };
                self.fixed_cards.insert(full_card.name.clone(), full_card);
            }
        }

        pub fn remove_fixed_cards(&mut self, card_names: Vec<String>) {
            assert!(self.enabled, "MorphCard component disabled");
            for card_name in card_names {
                self.fixed_cards.remove(&card_name);
            }
        }

        pub fn mint_random_card(&mut self, rand_num: Decimal, user_id: UserId) -> Bucket {
            assert!(self.enabled, "MorphCard component  disabled");
            assert!(
                rand_num >= dec!(0) && rand_num <= dec!(1),
                "rand_num must be between 0 and 1 inclusive"
            );

            let rarity_1_prob = dec!(5) / 9; // Common
            let rarity_2_prob = dec!(3) / 9; // Uncommon
            let _rarity_3_prob = dec!(1) / 9; // Rare

            let rarity = match rand_num {
                n if n < rarity_1_prob => RARITY[0].to_string(),
                n if n < rarity_1_prob + rarity_2_prob => RARITY[1].to_string(),
                _ => RARITY[2].to_string(),
            };

            let i: usize = (rand_num * self.random_card_names[&rarity].len())
                .checked_floor()
                .unwrap()
                .try_into()
                .unwrap();

            let card_name = self.random_card_names[&rarity][i].clone();
            let morph_card_data = self.random_cards.get(&card_name).unwrap().clone();

            let morph_card = self.admin_badge.authorize_with_amount(1, || {
                self.morph_card_resource_manager
                    .mint_ruid_non_fungible(morph_card_data.clone())
            });

            let local_id = morph_card.as_non_fungible().non_fungible_local_id();

            Runtime::emit_event(MorphCardMintedEvent {
                user_id,
                local_id,
                morph_card_data,
            });

            morph_card
        }

        pub fn set_random_cards(&mut self, cards: Vec<MorphCardDataInput>) {
            assert!(self.enabled, "MorphCard component disabled");
            for card in cards {
                assert!(RARITY.contains(&(&card.rarity as &str)));
                assert!(ENERGY.contains(&(&card.energy as &str)));

                let full_card = MorphCardData {
                    key_image_url: card.key_image_url,
                    name: card.name,
                    rarity: card.rarity,
                    energy: card.energy,
                    availability: "Random".to_string(),
                };
                self.random_card_names
                    .get_mut(&full_card.rarity)
                    .unwrap()
                    .push(full_card.name.clone());
                self.random_cards.insert(full_card.name.clone(), full_card);
            }
        }

        pub fn remove_random_cards(&mut self, card_names: Vec<String>) {
            assert!(self.enabled, "MorphCard component disabled");
            for card_name in card_names {
                let rarity = self.random_cards.remove(&card_name).unwrap().rarity;
                let i = self
                    .random_card_names
                    .get_mut(&rarity)
                    .unwrap()
                    .iter()
                    .position(|x| x == &card_name)
                    .unwrap();
                self.random_card_names
                    .get_mut(&rarity)
                    .unwrap()
                    .swap_remove(i);
            }
        }

        pub fn update_key_image_url(
            &mut self,
            morph_card_id: NonFungibleLocalId,
            key_image_url: Url,
        ) {
            assert!(self.enabled, "MorphCard component disabled");
            self.admin_badge.authorize_with_amount(1, || {
                self.morph_card_resource_manager.update_non_fungible_data(
                    &morph_card_id,
                    "key_image_url",
                    key_image_url,
                )
            });
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct MorphCardMintedEvent {
    user_id: UserId,
    local_id: NonFungibleLocalId,
    morph_card_data: MorphCardData,
}
