use radix_transactions::manifest::decompiler::ManifestObjectNames;
use radquest::hero_badge_forge::HeroBadgeData;
use scrypto_test::{prelude::*, utils::dump_manifest_to_file_system};

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
    disable_hero_badge_forge_manifest: TransactionManifestV1,
    enable_hero_badge_forge_manifest: TransactionManifestV1,
    add_user_account_manifest: TransactionManifestV1,
    claim_hero_badge_manifest: TransactionManifestV1,
    hero_completed_quest_manifest: TransactionManifestV1,
    update_key_image_url_manifest: TransactionManifestV1,
}

impl LedgerTestEnvironment {
    fn new() -> Result<LedgerTestEnvironment, RuntimeError> {
        // Setup the environment
        let mut ledger = LedgerSimulatorBuilder::new().build();

        // Create an account
        let (public_key, _private_key, account) = ledger.new_allocated_account();

        // Publish package
        let package_address = ledger.compile_and_publish(this_package!());

        // Create resources
        let super_admin_badge = ledger.create_non_fungible_resource_advanced(
            NonFungibleResourceRoles::default(),
            account,
            1,
        );
        let admin_badge = ledger.create_fungible_resource(dec!(3), 0, account);
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
                .try_deposit_entire_worktop_or_abort(account, None)
                .build();

            let receipt = ledger.execute_manifest(manifest, vec![]);
            receipt.expect_commit(true).new_resource_addresses()[0]
        };

        // Create component
        let hero_badge_forge = {
            let manifest = ManifestBuilder::new()
                .lock_fee_from_faucet()
                .withdraw_from_account(account, admin_badge, 1)
                .take_all_from_worktop(admin_badge, "admin_badge")
                .call_function_with_name_lookup(
                    package_address,
                    "HeroBadgeForge",
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

            dump_manifest_to_file("new_hero_badge_forge", &manifest, names);

            let receipt = ledger.execute_manifest(
                manifest,
                vec![NonFungibleGlobalId::from_public_key(&public_key)],
            );

            receipt.expect_commit(true).new_component_addresses()[0]
        };

        let disable_hero_badge_forge_manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_non_fungible(
                account,
                NonFungibleGlobalId::new(super_admin_badge, NonFungibleLocalId::integer(1)),
            )
            .call_method(hero_badge_forge, "disable", ());

        let names = disable_hero_badge_forge_manifest.object_names();
        let disable_hero_badge_forge_manifest = disable_hero_badge_forge_manifest.build();

        dump_manifest_to_file(
            "disable_hero_badge_forge",
            &disable_hero_badge_forge_manifest,
            names,
        );

        let enable_hero_badge_forge_manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_non_fungible(
                account,
                NonFungibleGlobalId::new(super_admin_badge, NonFungibleLocalId::integer(1)),
            )
            .call_method(hero_badge_forge, "enable", ());

        let names = enable_hero_badge_forge_manifest.object_names();
        let enable_hero_badge_forge_manifest = enable_hero_badge_forge_manifest.build();

        dump_manifest_to_file(
            "enable_hero_badge_forge",
            &enable_hero_badge_forge_manifest,
            names,
        );

        let user_id = "test_id_12345".to_string();
        let manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_amount(account, admin_badge, 1)
            .call_method(
                hero_badge_forge,
                "add_user_account",
                manifest_args!(account, user_id.clone()),
            );

        let names = manifest.object_names();
        let add_user_account_manifest = manifest.build();
        dump_manifest_to_file("add_user_account", &add_user_account_manifest, names);

        let manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .call_method(hero_badge_forge, "claim_badge", manifest_args!(account))
            .call_method(
                account,
                "deposit_batch",
                (ManifestExpression::EntireWorktop,),
            );

        let names = manifest.object_names();
        let claim_hero_badge_manifest = manifest.build();
        dump_manifest_to_file("claim_hero_badge", &claim_hero_badge_manifest, names);

        let manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_amount(account, admin_badge, 1)
            .call_method(
                hero_badge_forge,
                "hero_completed_quest",
                manifest_args!(user_id.clone(), "Quest_Name".to_string()),
            );

        let names = manifest.object_names();
        let hero_completed_quest_manifest = manifest.build();
        dump_manifest_to_file(
            "hero_completed_quest",
            &hero_completed_quest_manifest,
            names,
        );

        let manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_amount(account, admin_badge, 1)
            .call_method(
                hero_badge_forge,
                "update_key_image_url",
                manifest_args!(user_id.clone(), "https://example.com/image.png"),
            );

        let names = manifest.object_names();
        let update_key_image_url_manifest = manifest.build();
        dump_manifest_to_file(
            "update_hero_badge_key_image_url",
            &update_key_image_url_manifest,
            names,
        );

        Ok(Self {
            ledger,
            public_key,
            disable_hero_badge_forge_manifest,
            enable_hero_badge_forge_manifest,
            add_user_account_manifest,
            claim_hero_badge_manifest,
            hero_completed_quest_manifest,
            update_key_image_url_manifest,
        })
    }
}

#[test]
fn can_instantiate_hero_badge_forge() -> Result<(), RuntimeError> {
    let _ = LedgerTestEnvironment::new()?;

    Ok(())
}

#[test]
fn can_add_user_account() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    Ok(())
}

#[test]
fn user_can_claim_own_badge() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;

    lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.claim_hero_badge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    Ok(())
}

#[test]
fn non_user_cannot_claim_badge() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.claim_hero_badge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}

#[test]
fn can_hero_complete_quest() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.claim_hero_badge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.hero_completed_quest_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    Ok(())
}

#[test]
fn cannot_hero_complete_quest_twice_for_same_quest() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.claim_hero_badge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    lte.ledger.execute_manifest(
        lte.hero_completed_quest_manifest.clone(),
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.hero_completed_quest_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}

#[test]
fn can_update_key_image_url() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.claim_hero_badge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.update_key_image_url_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    Ok(())
}

#[test]
fn can_disable_hero_badge_forge() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.disable_hero_badge_forge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    Ok(())
}

#[test]
fn cannot_add_user_account_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.disable_hero_badge_forge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}

#[test]
fn can_enable_then_add_user_account_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.disable_hero_badge_forge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    lte.ledger.execute_manifest(
        lte.enable_hero_badge_forge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    let receipt = lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_success();
    Ok(())
}

#[test]
fn cannot_claim_badge_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.disable_hero_badge_forge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.claim_hero_badge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}

#[test]
fn cannot_complete_quest_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.claim_hero_badge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.disable_hero_badge_forge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.hero_completed_quest_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}

#[test]
fn cannot_update_key_image_url_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.claim_hero_badge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.disable_hero_badge_forge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.update_key_image_url_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}
