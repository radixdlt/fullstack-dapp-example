use scrypto_test::{prelude::*, utils::dump_manifest_to_file_system};

use hero_badge_forge_v2::hero_badge_forge_v2::HeroBadgeData;
use radix_transactions::manifest::decompiler::ManifestObjectNames;

fn dump_manifest_to_file(
    file_name: &str,
    manifest: &TransactionManifestV1,
    names: ManifestObjectNames,
) {
    dump_manifest_to_file_system(
        names,
        manifest,
        "manifests/test-generated/",
        Some(file_name),
        &NetworkDefinition::simulator(),
    )
    .err();
}

struct LedgerTestEnvironment {
    ledger: DefaultLedgerSimulator,
    public_key: Secp256k1PublicKey,
    disable_component_manifest: TransactionManifestV1,
    enable_component_manifest: TransactionManifestV1,
    mint_hero_badges_manifest: TransactionManifestV1,
    heroes_completed_quests_manifest: TransactionManifestV1,
    update_key_image_urls_manifest: TransactionManifestV1,
    hero_badge: ResourceAddress,
    user_id_1: String,
    user_id_2: String,
    quest_id_1: String,
    quest_id_2: String,
}

impl LedgerTestEnvironment {
    fn new() -> Result<LedgerTestEnvironment, RuntimeError> {
        // Setup the environment
        let mut ledger = LedgerSimulatorBuilder::new().build();

        // Create accounts
        let (public_key, _private_key, account_1) = ledger.new_allocated_account();
        let (_, _, account_2) = ledger.new_allocated_account();

        // Publish package
        let package_address = ledger.compile_and_publish(this_package!());

        // Create resources
        let super_admin_badge = ledger.create_non_fungible_resource_advanced(
            NonFungibleResourceRoles::default(),
            account_1,
            1,
        );
        let admin_badge = ledger.create_fungible_resource(dec!(3), 0, account_1);
        let hero_badge = {
            let resource_roles = NonFungibleResourceRoles {
                mint_roles: mint_roles!(
                    minter => rule!(require(admin_badge));
                    minter_updater => OWNER;
                ),
                non_fungible_data_update_roles: non_fungible_data_update_roles!(
                    non_fungible_data_updater => rule!(require(admin_badge));
                    non_fungible_data_updater_updater => OWNER;
                ),
                ..Default::default()
            };

            let manifest = ManifestBuilder::new()
                .lock_fee_from_faucet()
                .create_non_fungible_resource(
                    OwnerRole::None,
                    NonFungibleIdType::String,
                    true,
                    resource_roles,
                    metadata!(),
                    None::<Vec<(NonFungibleLocalId, HeroBadgeData)>>,
                )
                .try_deposit_entire_worktop_or_abort(account_1, None)
                .build();

            let receipt = ledger.execute_manifest(manifest, vec![]);
            receipt.expect_commit(true).new_resource_addresses()[0]
        };

        // Create component
        let hero_badge_forge_v2 = {
            let manifest = ManifestBuilder::new()
                .lock_fee_from_faucet()
                .withdraw_from_account(account_1, admin_badge, 1)
                .take_all_from_worktop(admin_badge, "admin_badge")
                .call_function_with_name_lookup(
                    package_address,
                    "HeroBadgeForgeV2",
                    "new",
                    |lookup| {
                        (
                            super_admin_badge,
                            OwnerRole::Fixed(rule!(require(super_admin_badge))),
                            FAUCET, // used as dapp_definition for testing
                            lookup.bucket("admin_badge"),
                            hero_badge,
                        )
                    },
                );

            let names = manifest.object_names();
            let manifest = manifest.build();

            dump_manifest_to_file("new_hero_badge_forge_v2", &manifest, names);

            let receipt = ledger.execute_manifest(
                manifest,
                vec![NonFungibleGlobalId::from_public_key(&public_key)],
            );

            receipt.expect_commit(true).new_component_addresses()[0]
        };

        // Disable component
        let disable_hero_badge_forge_manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_non_fungible(
                account_1,
                NonFungibleGlobalId::new(super_admin_badge, NonFungibleLocalId::integer(1)),
            )
            .call_method(hero_badge_forge_v2, "disable", ());

        let names = disable_hero_badge_forge_manifest.object_names();
        let disable_component_manifest = disable_hero_badge_forge_manifest.build();

        dump_manifest_to_file("disable", &disable_component_manifest, names);

        // Enable component
        let enable_hero_badge_forge_manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_non_fungible(
                account_1,
                NonFungibleGlobalId::new(super_admin_badge, NonFungibleLocalId::integer(1)),
            )
            .call_method(hero_badge_forge_v2, "enable", ());

        let names = enable_hero_badge_forge_manifest.object_names();
        let enable_component_manifest = enable_hero_badge_forge_manifest.build();

        dump_manifest_to_file("enable", &enable_component_manifest, names);

        // Mint badge
        let user_id_1 = "test_id_12345".to_string();
        let user_id_2 = "test_id_54321".to_string();
        let manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_amount(account_1, admin_badge, dec!(1))
            .call_method(
                hero_badge_forge_v2,
                "mint_hero_badges",
                manifest_args!([user_id_1.clone(), user_id_2.clone()]),
            )
            .take_non_fungibles_from_worktop(
                hero_badge,
                [NonFungibleLocalId::string(user_id_1.clone()).unwrap()],
                "hero_badge_1",
            )
            .call_method_with_name_lookup(account_1, "try_deposit_or_abort", |lookup| {
                (
                    lookup.bucket("hero_badge_1"),
                    Option::<ResourceOrNonFungible>::None,
                )
            })
            .take_non_fungibles_from_worktop(
                hero_badge,
                [NonFungibleLocalId::string(user_id_2.clone()).unwrap()],
                "hero_badge_2",
            )
            .call_method_with_name_lookup(account_2, "try_deposit_or_abort", |lookup| {
                (
                    lookup.bucket("hero_badge_2"),
                    Option::<ResourceOrNonFungible>::None,
                )
            });

        let names = manifest.object_names();
        let mint_hero_badges_manifest = manifest.build();
        dump_manifest_to_file("mint_hero_badges", &mint_hero_badges_manifest, names);

        let quest_id_1 = "Quest_Name_1".to_string();
        let quest_id_2 = "Quest_Name_2".to_string();
        // Update user badge with quest completion data
        let manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_amount(account_1, admin_badge, 1)
            .call_method(
                hero_badge_forge_v2,
                "heroes_completed_quests",
                manifest_args!([
                    (user_id_1.clone(), vec![quest_id_1.clone()]),
                    (
                        user_id_2.clone(),
                        vec![quest_id_1.clone(), quest_id_2.clone()]
                    ),
                ]),
            );

        let names = manifest.object_names();
        let heroes_completed_quests_manifest = manifest.build();
        dump_manifest_to_file(
            "heroes_completed_quests",
            &heroes_completed_quests_manifest,
            names,
        );

        // Update hero badge image url
        let manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_amount(account_1, admin_badge, 1)
            .call_method(
                hero_badge_forge_v2,
                "update_key_image_urls",
                manifest_args!([(user_id_2.clone(), "https://example.com/image1.png"),]),
            );

        let names = manifest.object_names();
        let update_key_image_urls_manifest = manifest.build();
        dump_manifest_to_file(
            "update_hero_badge_key_image_urls",
            &update_key_image_urls_manifest,
            names,
        );

        Ok(Self {
            ledger,
            public_key,
            disable_component_manifest,
            enable_component_manifest,
            mint_hero_badges_manifest,
            heroes_completed_quests_manifest,
            update_key_image_urls_manifest,
            hero_badge,
            user_id_1,
            user_id_2,
            quest_id_1,
            quest_id_2,
        })
    }
}

#[test]
fn can_instantiate_hero_badge_forge() -> Result<(), RuntimeError> {
    let _ = LedgerTestEnvironment::new()?;

    Ok(())
}

#[test]
fn can_mint_badges() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.mint_hero_badges_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    Ok(())
}

#[test]
fn can_heroes_complete_quests() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.mint_hero_badges_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.heroes_completed_quests_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    let hero_badge_1_data = lte.ledger.get_non_fungible_data::<HeroBadgeData>(
        lte.hero_badge,
        NonFungibleLocalId::string(lte.user_id_1).unwrap(),
    );
    assert!(hero_badge_1_data.quest_counter == 1);
    Ok(())
}

#[test]
fn cannot_complete_quests_twice_for_same_quests() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.mint_hero_badges_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    lte.ledger.execute_manifest(
        lte.heroes_completed_quests_manifest.clone(),
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.heroes_completed_quests_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    let hero_badge_1_data = lte.ledger.get_non_fungible_data::<HeroBadgeData>(
        lte.hero_badge,
        NonFungibleLocalId::string(lte.user_id_1).unwrap(),
    );
    let hero_badge_2_data = lte.ledger.get_non_fungible_data::<HeroBadgeData>(
        lte.hero_badge,
        NonFungibleLocalId::string(lte.user_id_2).unwrap(),
    );
    assert!(hero_badge_1_data.quest_counter == 1);
    assert!(hero_badge_2_data.quest_counter == 2);
    assert!(hero_badge_1_data.quests_completed.contains(&lte.quest_id_1));
    assert!(
        hero_badge_2_data.quests_completed.contains(&lte.quest_id_1)
            && hero_badge_2_data.quests_completed.contains(&lte.quest_id_2)
    );
    Ok(())
}

#[test]
fn can_update_key_image_urls() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.mint_hero_badges_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.update_key_image_urls_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    Ok(())
}

#[test]
fn can_disable_hero_badge_forge_v2() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.disable_component_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    Ok(())
}

#[test]
fn can_enable_then_mint_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.disable_component_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    lte.ledger.execute_manifest(
        lte.enable_component_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    let receipt = lte.ledger.execute_manifest(
        lte.mint_hero_badges_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    Ok(())
}

#[test]
fn cannot_mint_badge_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.disable_component_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.mint_hero_badges_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}

#[test]
fn cannot_complete_quests_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.mint_hero_badges_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.disable_component_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.heroes_completed_quests_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}

#[test]
fn cannot_update_key_image_urls_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.mint_hero_badges_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.disable_component_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.update_key_image_urls_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}
