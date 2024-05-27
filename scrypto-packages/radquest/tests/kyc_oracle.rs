use radix_engine_interface::prelude::*;
use radquest::{kyc_oracle::test_bindings::*, quest_rewards::UserId};
use scrypto::this_package;
use scrypto_test::prelude::*;

struct Test {
    env: TestEnvironment,
    kyc_oracle: KycOracle,
    admin_badge_proof: Proof,
    user_id: UserId,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address = Package::compile_and_publish(this_package!(), &mut env)?;

    let super_admin_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(1, &mut env)?;

    let kyc_oracle = KycOracle::new(
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        admin_badge.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    let admin_badge_proof = admin_badge.create_proof_of_all(&mut env)?;

    Ok(Test {
        env,
        kyc_oracle,
        admin_badge_proof,
        user_id: UserId("test_id".to_string()),
    })
}

#[test]
fn can_instantiate_kyc_oracle() -> Result<(), RuntimeError> {
    let _ = arrange_test_environment()?;

    Ok(())
}

#[test]
fn can_update_user_kyc_requirement() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut kyc_oracle,
        admin_badge_proof,
        user_id,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    kyc_oracle.update_user_kyc_requirement(user_id, true, &mut env)?;

    Ok(())
}

#[test]
fn can_get_positive_user_kyc_requirement() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut kyc_oracle,
        admin_badge_proof,
        user_id,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    kyc_oracle.update_user_kyc_requirement(user_id.clone(), true, &mut env)?;

    let result = kyc_oracle.get_user_kyc_requirement(user_id, &mut env)?;

    assert!(result);
    Ok(())
}

#[test]
fn can_get_negative_user_kyc_requirement() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut kyc_oracle,
        admin_badge_proof,
        user_id,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    kyc_oracle.update_user_kyc_requirement(user_id.clone(), false, &mut env)?;

    let result = kyc_oracle.get_user_kyc_requirement(user_id, &mut env)?;

    assert!(!result);
    Ok(())
}
