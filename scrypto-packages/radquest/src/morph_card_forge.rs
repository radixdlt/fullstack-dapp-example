use scrypto::prelude::*;

use crate::quest_rewards::UserId;

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct MorphEnergyCardData {
    pub key_image_url: Url,
    pub name: String,
    pub description: String,
    pub energy_type: String,
    pub rarity: String,
    pub quality: Decimal,
    pub limited_edition: bool,
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
        mint_card => restrict_to: [admin];
      }
    }

    struct MorphCardForge {
        enabled: bool,
        super_admin_badge_address: ResourceAddress,
        admin_badge: FungibleVault,
        morph_card_resource_manager: ResourceManager,
    }

    impl MorphCardForge {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            admin_badge: Bucket,
            morph_card_address: ResourceAddress,
        ) -> Global<MorphCardForge> {
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
            .globalize()
        }

        pub fn disable(&mut self) {
            assert!(self.enabled, "MorphCardForge component already disabled");
            self.enabled = false;
        }

        pub fn mint_card(
            &mut self,
            user_id: UserId,
            key_image_url: Url,
            name: String,
            description: String,
            energy_type: String,
            rarity: String,
            quality: Decimal,
            limited_edition: bool,
        ) -> Bucket {
            assert!(self.enabled, "MorphCard component disabled");

            let morph_card_data = MorphEnergyCardData {
                key_image_url,
                name,
                description,
                energy_type,
                rarity,
                quality,
                limited_edition,
            };

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
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct MorphCardMintedEvent {
    user_id: UserId,
    local_id: NonFungibleLocalId,
    morph_card_data: MorphEnergyCardData,
}
