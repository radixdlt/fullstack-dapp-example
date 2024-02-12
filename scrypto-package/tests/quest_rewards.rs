use radquest::quest_rewards::test_bindings::*;
use scrypto::*;
use scrypto_test::prelude::*;
use scrypto_unit::*;

#[test]
fn test_query_rewards() {
    let mut test_runner = TestRunnerBuilder::new().build();

    let (public_key, _private_key, account) = test_runner.new_allocated_account();

    let package_address = test_runner.compile_and_publish(this_package!());

    let user_badge = test_runner.create_non_fungible_resource(account);
    let kyc_badge = test_runner.create_non_fungible_resource(account);
    let admin_badge = test_runner.create_non_fungible_resource(account);

    // Test the `new` function.
    let manifest = ManifestBuilder::new()
        .call_function(
            package_address,
            "QuestRewards",
            "new",
            manifest_args!(user_badge, kyc_badge, admin_badge),
        )
        .call_method(
            account,
            "deposit_batch",
            manifest_args!(ManifestExpression::EntireWorktop),
        )
        .build();
    let receipt = test_runner.execute_manifest_ignoring_fee(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    let component = receipt.expect_commit(true).new_component_addresses()[0];

    // Test `deposit_reward`

    // Test `withdraw_reward`
}

#[test]
fn deposit_reward_test() -> Result<(), RuntimeError> {
    // Arrange
    let mut env = TestEnvironment::new();
    let package_address = Package::compile_and_publish(this_package!(), &mut env)?;

    let user_badge_bucket = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let kyc_badge_bucket = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge_bucket = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    let user_badge = user_badge_bucket.resource_address(&mut env)?;
    let kyc_badge = kyc_badge_bucket.resource_address(&mut env)?;
    let admin_badge = admin_badge_bucket.resource_address(&mut env)?;

    let mut radiswap = QuestRewards::new(user_badge, kyc_badge, admin_badge, &mut env)?;

    // Act
    let (pool_units, _change) = radiswap.add_liquidity(bucket1, bucket2, &mut env)?;

    // Assert
    assert_eq!(pool_units.amount(&mut env)?, dec!("100"));
    Ok(())
}
