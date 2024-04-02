use crate::{
    image_oracle::image_oracle::ImageOracle,
    morph_card_forge::MorphCardData,
    radgem_forge::{radgem_forge::RadgemForge, RadgemData},
    radmorph_forge::{radmorph_forge::RadmorphForge, RadmorphData},
};
use scrypto::prelude::*;

pub const RARITY: [&str; 7] = [
    "Common",
    "Uncommon",
    "Rare",
    "Fine",
    "Precious",
    "Superb",
    "Magnificent",
];

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
enum RadgemDeposit {
    Unclaimed(Vec<NonFungibleLocalId>),
    Claimed,
}

#[blueprint]
#[events(
    ElementsCombineDepositedEvent,
    ElementsCombineProcessed1Event,
    ElementsCombineClaimedEvent,
    RadmorphCreatedEvent
)]
mod refinery {
    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
        },
        methods {
            combine_elements_deposit => PUBLIC;
            combine_elements_process_1 => restrict_to: [admin];
            combine_elements_process_2 => restrict_to: [admin];
            combine_elements_claim => PUBLIC;
            create_radmorph => PUBLIC;
            set_key_image_url_hashes => NOBODY;
        }
    }

    struct Refinery {
        admin_badge: FungibleVault,
        radgem_records: KeyValueStore<NonFungibleGlobalId, RadgemDeposit>,
        radgem_vault: NonFungibleVault,
        element_address: ResourceAddress,
        radgem_address: ResourceAddress,
        morph_card_address: ResourceAddress,
        radgem_forge: Global<RadgemForge>,
        radmorph_forge: Global<RadmorphForge>,
        image_oracle: Global<ImageOracle>,
    }

    impl Refinery {
        // Instantiate the Refinery
        pub fn new(
            owner_role: OwnerRole,
            mut admin_badge: Bucket,
            element_address: ResourceAddress,
            morph_card_address: ResourceAddress,
            radgem_address: ResourceAddress,
            radmorph_address: ResourceAddress,
        ) -> Global<Refinery> {
            let radgem_forge =
                RadgemForge::new(owner_role.clone(), admin_badge.take(1), radgem_address);
            let radmorph_forge =
                RadmorphForge::new(owner_role.clone(), admin_badge.take(1), radmorph_address);

            let admin_badge_address = admin_badge.resource_address();

            let image_oracle = ImageOracle::new(owner_role.clone(), admin_badge_address);
            Self {
                admin_badge: FungibleVault::with_bucket(admin_badge.as_fungible()),
                radgem_records: KeyValueStore::new(),
                radgem_vault: NonFungibleVault::new(radgem_address),
                element_address,
                radgem_address,
                morph_card_address,
                radgem_forge,
                radmorph_forge,
                image_oracle,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
            ))
            .globalize()
        }

        // User deposits Elements to be turned into a RadGem
        pub fn combine_elements_deposit(&self, badge_proof: Proof, elements: Bucket) -> () {
            assert_eq!(elements.resource_address(), self.element_address);
            assert_eq!(elements.amount(), dec!(10));
            let badge_address = badge_proof.resource_address();
            let badge_local_id = badge_proof
                .skip_checking()
                .as_non_fungible()
                .non_fungible_local_id();

            let badge_id = NonFungibleGlobalId::new(badge_address, badge_local_id);

            LocalAuthZone::push(self.admin_badge.create_proof_of_amount(1));
            elements.burn();

            Runtime::emit_event(ElementsCombineDepositedEvent { badge_id });
        }

        // Mint a random RadGem
        pub fn combine_elements_process_1(
            &mut self,
            badge_id: NonFungibleGlobalId,
            rand_num_1: Decimal,
            rand_num_2: Decimal,
        ) -> () {
            LocalAuthZone::push(self.admin_badge.create_proof_of_amount(1));
            let radgem_bucket = self.radgem_forge.mint_radgem(rand_num_1, rand_num_2);

            // Update the user's RadGem record
            if self.radgem_records.get(&badge_id).is_none() {
                self.radgem_records.insert(
                    badge_id.clone(),
                    RadgemDeposit::Unclaimed(vec![radgem_bucket
                        .as_non_fungible()
                        .non_fungible_local_id()]),
                );
            } else {
                let radgem_id = radgem_bucket.as_non_fungible().non_fungible_local_id();
                let mut radgem_record = self.radgem_records.get_mut(&badge_id).unwrap();

                match *radgem_record {
                    RadgemDeposit::Unclaimed(ref mut radgem_ids) => radgem_ids.push(radgem_id),
                    RadgemDeposit::Claimed => {
                        *radgem_record = RadgemDeposit::Unclaimed(vec![radgem_id])
                    }
                }
            }

            let radgem_local_id = radgem_bucket.as_non_fungible().non_fungible_local_id();
            let radgem_data = radgem_bucket
                .as_non_fungible()
                .non_fungible::<RadgemData>()
                .data();

            // Deposit the RadGem into the vault for the user to claim later
            self.radgem_vault.put(radgem_bucket.as_non_fungible());

            Runtime::emit_event(ElementsCombineProcessed1Event {
                badge_id,
                radgem_local_id,
                radgem_data,
            });
        }

        pub fn combine_elements_process_2(
            &mut self,
            badge_id: NonFungibleGlobalId,
            radgem_local_id: NonFungibleLocalId,
            key_image_url: Url,
        ) {
            LocalAuthZone::push(self.admin_badge.create_proof_of_amount(1));
            self.radgem_forge
                .update_key_image(radgem_local_id, key_image_url);

            Runtime::emit_event(ElementsCombineProcessed2Event { badge_id });
        }

        // User claims RadGem by presenting user badge
        pub fn combine_elements_claim(&mut self, badge_proof: Proof) -> Bucket {
            let badge_address = badge_proof.resource_address();
            let badge_local_id = badge_proof
                .skip_checking()
                .as_non_fungible()
                .non_fungible_local_id();

            let badge_id = NonFungibleGlobalId::new(badge_address, badge_local_id);

            // Get the user's RadGem IDs from the record
            let mut radgem_record = self.radgem_records.get_mut(&badge_id).unwrap();

            let radgems = match *radgem_record {
                RadgemDeposit::Claimed => panic!("RadGems already claimed"),
                RadgemDeposit::Unclaimed(ref mut radgem_ids) => {
                    // Take the RadGems from the vault using the IDs
                    let radgems = self
                        .radgem_vault
                        .take_non_fungibles(&radgem_ids.iter().cloned().collect());
                    *radgem_record = RadgemDeposit::Claimed;
                    radgems
                }
            };

            Runtime::emit_event(ElementsCombineClaimedEvent { badge_id });

            radgems.into()
        }

        // transforms RadGems and RadCard into a RadMorph
        pub fn create_radmorph(
            &mut self,
            radgem_1: Bucket,
            radgem_2: Bucket,
            morph_card: Bucket,
            key_image_url: Url,
        ) -> Bucket {
            // Confirm the resources
            assert_eq!(radgem_1.resource_address(), self.radgem_address);
            assert_eq!(radgem_2.resource_address(), self.radgem_address);
            assert_eq!(morph_card.resource_address(), self.morph_card_address);

            for bucket in [&radgem_1, &radgem_2, &morph_card] {
                assert_eq!(bucket.amount(), dec!(1));
            }

            // Get the RadGem and MorphCard data
            let radgem_1_data: RadgemData = radgem_1
                .as_non_fungible()
                .non_fungible::<RadgemData>()
                .data();
            let radgem_2_data: RadgemData = radgem_2
                .as_non_fungible()
                .non_fungible::<RadgemData>()
                .data();
            let morph_card_data = morph_card
                .as_non_fungible()
                .non_fungible::<MorphCardData>()
                .data();

            let radgem_1_rarity_weight = RARITY
                .iter()
                .position(|&r| r == &radgem_1_data.rarity)
                .unwrap();
            let radgem_2_rarity_weight = RARITY
                .iter()
                .position(|&r| r == &radgem_2_data.rarity)
                .unwrap();

            let (radgem_a_data, radgem_b_data) = if radgem_1_rarity_weight >= radgem_2_rarity_weight
            {
                (radgem_1_data, radgem_2_data)
            } else {
                (radgem_2_data, radgem_1_data)
            };

            LocalAuthZone::push(self.admin_badge.create_proof_of_amount(1));

            // Burn resources
            radgem_1.burn();
            radgem_2.burn();
            morph_card.burn();

            let pre_hash_string = format!(
                "{}{}{}{}{}",
                morph_card_data.energy,
                radgem_a_data.material,
                radgem_a_data.color,
                radgem_b_data.color,
                key_image_url.as_str(),
            );

            let result = self
                .image_oracle
                .get_key_image_url_hash(keccak256_hash(pre_hash_string.as_bytes()))
                .unwrap();

            assert_eq!(result, keccak256_hash(key_image_url.as_str().as_bytes()));

            // Mint a RadMorph
            let radmorph = self.radmorph_forge.mint_radmorph(
                morph_card_data,
                radgem_a_data,
                radgem_b_data,
                key_image_url,
            );

            // Emit the event
            Runtime::emit_event(RadmorphCreatedEvent {
                radmorph_local_id: radmorph.as_non_fungible().non_fungible_local_id(),
                radmorph_data: radmorph
                    .as_non_fungible()
                    .non_fungible::<RadmorphData>()
                    .data()
                    .clone(),
            });

            radmorph
        }

        // Method used for testing only
        pub fn set_key_image_url_hashes(&mut self, key_image_url_hashes: Vec<(Hash, Hash)>) {
            self.image_oracle
                .set_key_image_url_hashes(key_image_url_hashes);
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineDepositedEvent {
    badge_id: NonFungibleGlobalId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineProcessed1Event {
    badge_id: NonFungibleGlobalId,
    radgem_local_id: NonFungibleLocalId,
    radgem_data: RadgemData,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineProcessed2Event {
    badge_id: NonFungibleGlobalId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ElementsCombineClaimedEvent {
    badge_id: NonFungibleGlobalId,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct RadmorphCreatedEvent {
    radmorph_local_id: NonFungibleLocalId,
    radmorph_data: RadmorphData,
}
