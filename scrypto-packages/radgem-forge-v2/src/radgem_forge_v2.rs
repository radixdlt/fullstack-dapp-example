use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[derive(NonFungibleData, ScryptoSbor, PartialEq, Eq, Debug, Clone)]
pub struct RadgemData {
    #[mutable]
    pub key_image_url: Url,
    pub name: String,
    pub description: String,
    pub material: String,
    pub color: String,
    pub rarity: String,
    pub quality: Decimal,
}

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
enum RadgemClaim {
    Unclaimed(Vec<NonFungibleLocalId>),
    Claimed,
}

#[blueprint]
#[types(UserId, RadgemClaim)]
#[events(DepositedElementsEvent, MintedRadgemsEvent, ClaimedRadgemsEvent)]
mod radgem_forge_v2 {
    enable_method_auth! {
        roles {
            admin => updatable_by: [OWNER];
            super_admin => updatable_by: [OWNER];
        },
        methods {
            disable => restrict_to: [super_admin];
            enable => restrict_to: [super_admin];
            deposit_elements => PUBLIC;
            mint_radgems => restrict_to: [admin];
            claim_radgems => PUBLIC;
            get_user_radgem_claims_count => PUBLIC;
        }
    }

    struct RadgemForgeV2 {
        enabled: bool,
        admin_badge: FungibleVault,
        radgem_records: KeyValueStore<UserId, RadgemClaim>,
        radgem_vault: NonFungibleVault,
        hero_badge_address: ResourceAddress,
        element_address: ResourceAddress,
        radgem_resource_manager: ResourceManager,
    }

    impl RadgemForgeV2 {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            dapp_definition: ComponentAddress,
            admin_badge: FungibleBucket,
            hero_badge_address: ResourceAddress,
            element_address: ResourceAddress,
            radgem_resource_manager: ResourceManager,
        ) -> Global<RadgemForgeV2> {
            let admin_badge_address = admin_badge.resource_address();

            Self {
                enabled: true,
                admin_badge: FungibleVault::with_bucket(admin_badge),
                radgem_records: KeyValueStore::<UserId, RadgemClaim>::new_with_registered_type(),
                radgem_vault: NonFungibleVault::new(radgem_resource_manager.address()),
                hero_badge_address,
                element_address,
                radgem_resource_manager,
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
            assert!(self.enabled, "RadgemForgeV2 already disabled");
            self.enabled = false;
        }
        pub fn enable(&mut self) {
            assert!(!self.enabled, "RadgemForgeV2 already enabled");
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

        // User deposits Elements to be turned into a RadGem
        pub fn deposit_elements(&self, hero_badge_proof: Proof, elements: Bucket) -> () {
            assert!(self.enabled, "RadgemForgeV2 disabled");
            assert_eq!(elements.resource_address(), self.element_address);

            let elements_amount = elements.amount();
            assert!(
                elements_amount <= dec!(100),
                "Can provide a maximum of 100 elements at a time"
            );
            let elements_per_radgem = dec!(5);

            let radgem_quantity = elements_amount.checked_div(elements_per_radgem).unwrap();
            let elements_to_use = radgem_quantity * elements_per_radgem;

            assert_eq!(
                elements_amount, elements_to_use,
                "Must provide a multiple of 5 elements"
            );
            let user_id = self.get_user_id_from_badge_proof(hero_badge_proof);

            self.admin_badge
                .authorize_with_amount(1, || elements.burn());

            Runtime::emit_event(DepositedElementsEvent {
                user_id,
                elements_count: elements_amount,
            });
        }

        // Mint a random RadGem
        pub fn mint_radgems(&mut self, user_id: UserId, radgem_data: Vec<RadgemData>) -> () {
            assert!(self.enabled, "RadgemForgeV2 disabled");

            let radgem_bucket: NonFungibleBucket =
                self.admin_badge.authorize_with_amount(1, || {
                    self.radgem_resource_manager.call(
                        "mint_ruid",
                        &NonFungibleResourceManagerMintRuidGenericInput {
                            entries: radgem_data.iter().map(|d| (d,)).collect(),
                        },
                    )
                });

            let new_ids = radgem_bucket.non_fungible_local_ids();
            let ids_to_deposit = new_ids.iter().cloned();

            // Update the user's RadGem record
            if self.radgem_records.get(&user_id).is_none() {
                self.radgem_records.insert(
                    user_id.clone(),
                    RadgemClaim::Unclaimed(ids_to_deposit.collect()),
                );
            } else {
                let mut radgem_record = self.radgem_records.get_mut(&user_id).unwrap();

                match *radgem_record {
                    RadgemClaim::Unclaimed(ref mut radgem_ids) => radgem_ids.extend(ids_to_deposit),
                    RadgemClaim::Claimed => {
                        *radgem_record = RadgemClaim::Unclaimed(ids_to_deposit.collect())
                    }
                }
            }

            // Deposit the RadGem into the vault for the user to claim later
            self.radgem_vault.put(radgem_bucket);

            Runtime::emit_event(MintedRadgemsEvent {
                user_id,
                radgems: new_ids.into_iter().zip(radgem_data.into_iter()).collect(),
            });
        }

        // User claims RadGem by presenting hero badge
        pub fn claim_radgems(&mut self, hero_badge_proof: Proof) -> NonFungibleBucket {
            let user_id = self.get_user_id_from_badge_proof(hero_badge_proof);

            // Get the user's RadGem IDs from the record
            let mut radgem_record = self.radgem_records.get_mut(&user_id).unwrap();

            let (radgem_ids_taken, radgems) = match *radgem_record {
                RadgemClaim::Claimed => panic!("RadGems already claimed"),
                RadgemClaim::Unclaimed(ref mut radgem_ids) => {
                    // To prevent running out of events/cost units on claim, we implement
                    // a partial claim of up to 20 at a time
                    let amount_to_take = 20usize.min(radgem_ids.len());
                    let radgem_ids_to_take = radgem_ids.drain(0..amount_to_take).collect();
                    let radgems = self.radgem_vault.take_non_fungibles(&radgem_ids_to_take);
                    if radgem_ids.len() == 0 {
                        *radgem_record = RadgemClaim::Claimed;
                    }
                    (radgem_ids_to_take, radgems)
                }
            };

            Runtime::emit_event(ClaimedRadgemsEvent {
                user_id,
                radgems: radgem_ids_taken,
            });

            radgems
        }

        pub fn get_user_radgem_claims_count(&self, user_id: UserId) -> usize {
            match self.radgem_records.get(&user_id).as_deref() {
                Some(RadgemClaim::Claimed) => 0,
                Some(RadgemClaim::Unclaimed(vec)) => vec.len(),
                None => 0,
            }
        }
    }
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct DepositedElementsEvent {
    user_id: UserId,
    elements_count: Decimal,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct MintedRadgemsEvent {
    user_id: UserId,
    radgems: IndexMap<NonFungibleLocalId, RadgemData>,
}

#[derive(ScryptoSbor, ScryptoEvent)]
pub struct ClaimedRadgemsEvent {
    user_id: UserId,
    radgems: IndexSet<NonFungibleLocalId>,
}
