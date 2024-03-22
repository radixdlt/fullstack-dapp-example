use radix_engine_interface::prelude::*;
use radquest::quest_rewards::{test_bindings::*, KycData, QuestId, UserId};
use scrypto::*;
use scrypto_test::prelude::*;
use scrypto_unit::*;

struct Test {
    env: TestEnvironment,
    quest_rewards: QuestRewards,
    user_badge: Bucket,
    user_id: UserId,
    admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address = Package::compile_and_publish(this_package!(), &mut env)?;

    let user_int = 5u64;

    let owner_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let user_badge = ResourceBuilder::new_integer_non_fungible(OwnerRole::None)
        .mint_initial_supply(
            [(
                IntegerNonFungibleLocalId::new(user_int),
                EmptyNonFungibleData {},
            )],
            &mut env,
        )?;
    let kyc_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None).mint_initial_supply(
        [KycData {
            expires: Instant::new(10 ^ 16),
        }],
        &mut env,
    )?;

    let quest_rewards = QuestRewards::new(
        OwnerRole::Fixed(rule!(require(owner_badge.resource_address(&mut env)?))),
        admin_badge.resource_address(&mut env)?,
        user_badge.resource_address(&mut env)?,
        kyc_badge.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    let admin_badge_proof = admin_badge.create_proof_of_all(&mut env)?;

    Ok(Test {
        env,
        quest_rewards,
        user_badge,
        user_id: UserId(format!("#{user_int}#")),
        admin_badge_proof,
    })
}

#[test]
fn can_instantiate_quest_rewards() -> Result<(), RuntimeError> {
    _ = arrange_test_environment()?;
    Ok(())
}

#[test]
fn can_deposit_rewards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards.deposit_reward(
        user_id,
        QuestId("1".into()),
        vec![reward_1, reward_2],
        &mut env,
    )?;

    Ok(())
}

#[test]
fn can_update_user_kyc_requirement() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards.update_user_kyc_requirement(user_id, true, &mut env)?;

    Ok(())
}

#[test]
fn can_claim_rewards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards,
        user_badge,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let reward_1_address = reward_1.resource_address(&mut env)?;
    let reward_2_address = reward_2.resource_address(&mut env)?;

    let quest_id = QuestId("1".into());

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards.deposit_reward(
        user_id,
        quest_id.clone(),
        vec![reward_1, reward_2],
        &mut env,
    )?;

    let response = quest_rewards.claim_reward(
        quest_id,
        user_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    )?;

    let response_1 = response[0].resource_address(&mut env)?;
    let response_2 = response[1].resource_address(&mut env)?;

    assert!(response_1 == reward_1_address || response_1 == reward_2_address);
    assert!(response_2 == reward_1_address || response_2 == reward_2_address);

    Ok(())
}

#[test]
fn cannot_claim_rewards_when_kyc_required() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards,
        user_badge,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = BucketFactory::create_fungible_bucket(XRD, 200.into(), Mock, &mut env)?;

    let quest_id = QuestId("1".into());

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards.update_user_kyc_requirement(user_id.clone(), true, &mut env)?;

    quest_rewards.deposit_reward(
        user_id,
        quest_id.clone(),
        vec![reward_1, reward_2],
        &mut env,
    )?;

    let result = quest_rewards.claim_reward(
        quest_id,
        user_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    );

    assert!(result.is_err());

    Ok(())
}
