use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Energy {
    MoltenLava,
    PyroclasticFlow,
    VolcanicLightning,
    TropicalCyclone,
    PolarBlizzard,
    Earthquake,
    FireTornado,
    TidalWave,
    HydrothermalVent,
    RainbowPower,
    StormCell,
    SolarFlare,
    NuclearFusion,
    AuroraBorealis,
    GravityForce,
    MagneticField,
    GammaRays,
    BlackHole,
    Supernova,
    Whirlpool,
}

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Rarity {
    Common = 0,
    Rare = 1,
    UltraRare = 2,
}

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
pub enum Availability {
    Fixed,
    Random,
}

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct MorphCardDataInput {
    pub key_image_url: Url,
    pub name: String,
    pub rarity: Rarity,
    pub energy: Energy,
}

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct MorphCardData {
    pub key_image_url: Url,
    pub name: String,
    pub rarity: Rarity,
    pub energy: Energy,
    pub availability: Availability,
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
        mint_fixed_card => restrict_to: [admin];
        set_fixed_cards => restrict_to: [super_admin];
        remove_fixed_cards => restrict_to: [super_admin];
        mint_random_card => restrict_to: [admin];
        set_random_cards => restrict_to: [super_admin];
        remove_random_cards => restrict_to: [super_admin];
      }
    }

    struct MorphCardForge {
        super_admin_badge_address: ResourceAddress,
        admin_badge: FungibleVault,
        morph_card_resource_manager: ResourceManager,
        fixed_cards: KeyValueStore<String, MorphCardData>,
        random_cards: KeyValueStore<String, MorphCardData>,
        random_card_names: Vec<String>,
    }

    impl MorphCardForge {
        pub fn new(
            owner_role: OwnerRole,
            super_admin_badge_address: ResourceAddress,
            admin_badge: Bucket,
            morph_card_address: ResourceAddress,
        ) -> Global<MorphCardForge> {
            let admin_badge_address = admin_badge.resource_address();

            Self {
                super_admin_badge_address,
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                morph_card_resource_manager: ResourceManager::from(morph_card_address),
                fixed_cards: KeyValueStore::new(),
                random_cards: KeyValueStore::new(),
                random_card_names: Vec::new(),
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                super_admin => rule!(require(super_admin_badge_address));
                admin => rule!(require(admin_badge_address));
            ))
            .globalize()
        }

        pub fn mint_fixed_card(&mut self, card_name: String, user_id: UserId) -> Bucket {
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
            for card in cards {
                let full_card = MorphCardData {
                    key_image_url: card.key_image_url,
                    name: card.name,
                    rarity: card.rarity,
                    energy: card.energy,
                    availability: Availability::Fixed,
                };
                self.fixed_cards.insert(full_card.name.clone(), full_card);
            }
        }

        pub fn remove_fixed_cards(&mut self, card_names: Vec<String>) {
            for card_name in card_names {
                self.fixed_cards.remove(&card_name);
            }
        }

        pub fn mint_random_card(&mut self, rand_num: Decimal, user_id: UserId) -> Bucket {
            let i: usize = (rand_num * self.random_card_names.len())
                .checked_floor()
                .unwrap()
                .try_into()
                .unwrap();

            let card_name = self.random_card_names[i].clone();
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
            for card in cards {
                let full_card = MorphCardData {
                    key_image_url: card.key_image_url,
                    name: card.name,
                    rarity: card.rarity,
                    energy: card.energy,
                    availability: Availability::Random,
                };
                self.random_card_names.push(full_card.name.clone());
                self.random_cards.insert(full_card.name.clone(), full_card);
            }
        }

        pub fn remove_random_cards(&mut self, card_names: Vec<String>) {
            for card_name in card_names {
                self.random_cards.remove(&card_name);
                let i = self
                    .random_card_names
                    .iter()
                    .position(|x| x == &card_name)
                    .unwrap();
                self.random_card_names.swap_remove(i);
            }
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct MorphCardMintedEvent {
    user_id: UserId,
    local_id: NonFungibleLocalId,
    morph_card_data: MorphCardData,
}
