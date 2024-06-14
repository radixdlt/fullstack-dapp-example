use radix_transactions::manifest::decompiler::ManifestObjectNames;
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
        &NetworkDefinition::stokenet(),
    )
    .err();
}

struct LedgerTestEnvironment {
    ledger: DefaultLedgerSimulator,
    public_key: Secp256k1PublicKey,
    disable_user_badge_claim_manifest: TransactionManifestV1,
    add_user_account_manifest: TransactionManifestV1,
    claim_user_badge_manifest: TransactionManifestV1,
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
        let user_badge = {
            let resource_roles = NonFungibleResourceRoles {
                mint_roles: mint_roles!(
                    minter => rule!(require(admin_badge));
                    minter_updater => OWNER;
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
                    None::<Vec<(NonFungibleLocalId, EmptyNonFungibleData)>>,
                )
                .try_deposit_entire_worktop_or_abort(account, None)
                .build();

            let receipt = ledger.execute_manifest(manifest, vec![]);
            receipt.expect_commit(true).new_resource_addresses()[0]
        };

        // Create component
        let user_badge_claim = {
            let manifest = ManifestBuilder::new()
                .lock_fee_from_faucet()
                .withdraw_from_account(account, admin_badge, 1)
                .take_all_from_worktop(admin_badge, "admin_badge")
                .call_function_with_name_lookup(
                    package_address,
                    "UserBadgeClaim",
                    "new",
                    |lookup| {
                        (
                            super_admin_badge,
                            OwnerRole::Fixed(rule!(require(super_admin_badge))),
                            lookup.bucket("admin_badge"),
                            user_badge,
                        )
                    },
                );

            let names = manifest.object_names();
            let manifest = manifest.build();

            dump_manifest_to_file("new_user_badge_claim", &manifest, names);

            let receipt = ledger.execute_manifest(
                manifest,
                vec![NonFungibleGlobalId::from_public_key(&public_key)],
            );

            receipt.expect_commit(true).new_component_addresses()[0]
        };

        let disable_user_badge_claim_manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_non_fungible(
                account,
                NonFungibleGlobalId::new(super_admin_badge, NonFungibleLocalId::integer(1)),
            )
            .call_method(user_badge_claim, "disable", ());

        let names = disable_user_badge_claim_manifest.object_names();
        let disable_user_badge_claim_manifest = disable_user_badge_claim_manifest.build();

        dump_manifest_to_file(
            "disable_user_badge_claim",
            &disable_user_badge_claim_manifest,
            names,
        );

        let add_user_account_manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .create_proof_from_account_of_amount(account, admin_badge, 1)
            .call_method(
                user_badge_claim,
                "add_user_account",
                manifest_args!(account),
            );

        let names = add_user_account_manifest.object_names();
        let add_user_account_manifest = add_user_account_manifest.build();

        dump_manifest_to_file("add_user_account", &add_user_account_manifest, names);

        let user_id = "test_id_12345".to_string();
        let claim_user_badge_manifest = ManifestBuilder::new()
            .lock_fee_from_faucet()
            .call_method(
                user_badge_claim,
                "claim_badge",
                manifest_args!(account, user_id.clone()),
            )
            .call_method(
                account,
                "deposit_batch",
                (ManifestExpression::EntireWorktop,),
            );

        let names = claim_user_badge_manifest.object_names();
        let claim_user_badge_manifest = claim_user_badge_manifest.build();

        dump_manifest_to_file("claim_user_badge", &claim_user_badge_manifest, names);

        Ok(Self {
            ledger,
            public_key,
            disable_user_badge_claim_manifest,
            add_user_account_manifest,
            claim_user_badge_manifest,
        })
    }
}

#[test]
fn can_instantiate_user_badge_claim() -> Result<(), RuntimeError> {
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
        lte.claim_user_badge_manifest,
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
        lte.claim_user_badge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}

#[test]
fn can_disable_user_badge_claim() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.disable_user_badge_claim_manifest,
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
        lte.disable_user_badge_claim_manifest,
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
fn cannot_claim_badge_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let mut lte = LedgerTestEnvironment::new()?;
    lte.ledger.execute_manifest(
        lte.disable_user_badge_claim_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );
    lte.ledger.execute_manifest(
        lte.add_user_account_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Act
    let receipt = lte.ledger.execute_manifest(
        lte.claim_user_badge_manifest,
        vec![NonFungibleGlobalId::from_public_key(&lte.public_key)],
    );

    // Assert
    receipt.expect_commit_failure();
    Ok(())
}
