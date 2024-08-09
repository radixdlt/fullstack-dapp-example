use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct MorphEnergyCardData {
    pub key_image_url: Url,
    pub name: String,
    pub description: String,
    pub energy_type: String,
    pub energy_description: String,
    pub rarity: String,
    pub quality: Decimal,
    pub limited_edition: bool,
}

#[derive(ScryptoSbor, PartialEq, Eq, Debug, Clone)]
struct MintedCard {
    user_id: UserId,
    local_id: NonFungibleLocalId,
    morph_card_data: MorphEnergyCardData,
}

#[blueprint]
#[events(MorphEnergyCardsMintedEvent)]
mod card_forge_v2 {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
        super_admin => updatable_by: [OWNER];
      },
      methods {
        disable => restrict_to: [super_admin];
        enable => restrict_to: [super_admin];
        mint_cards => restrict_to: [admin];
      }
    }

    struct CardForgeV2 {
        enabled: bool,
        super_admin_badge_address: ResourceAddress,
        admin_badge: FungibleVault,
        morph_card_resource_manager: ResourceManager,
    }

    impl CardForgeV2 {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            dapp_definition: ComponentAddress,
            admin_badge: Bucket,
            morph_card_address: ResourceAddress,
        ) -> Global<CardForgeV2> {
            let admin_badge_address = admin_badge.resource_address();

            Self {
                enabled: true,
                super_admin_badge_address,
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                morph_card_resource_manager: ResourceManager::from(morph_card_address),
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
            assert!(self.enabled, "MorphCardForge component already disabled");
            self.enabled = false;
        }
        pub fn enable(&mut self) {
            assert!(!self.enabled, "MorphCardForge already enabled");
            self.enabled = true;
        }

        fn mint_card(&mut self, morph_card_data: MorphEnergyCardData) -> Bucket {
            self.admin_badge.authorize_with_amount(1, || {
                self.morph_card_resource_manager
                    .mint_ruid_non_fungible(morph_card_data)
            })
        }

        pub fn mint_cards(
            &mut self,
            user_morph_card_data: Vec<(UserId, MorphEnergyCardData)>,
        ) -> Vec<Bucket> {
            assert!(self.enabled, "MorphCard component disabled");

            let cards: Vec<Bucket> = user_morph_card_data
                .clone()
                .into_iter()
                .map(|(_, morph_card_data)| self.mint_card(morph_card_data))
                .collect();

            Runtime::emit_event(MorphEnergyCardsMintedEvent(
                user_morph_card_data
                    .into_iter()
                    .enumerate()
                    .map(|(i, (user_id, morph_card_data))| MintedCard {
                        user_id,
                        local_id: cards[i].as_non_fungible().non_fungible_local_id(),
                        morph_card_data,
                    })
                    .collect(),
            ));

            cards
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct MorphEnergyCardsMintedEvent(Vec<MintedCard>);
