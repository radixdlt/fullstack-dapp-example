use scrypto_test::prelude::*;

use radquest::kyc_oracle::kyc_oracle_test::*;
use radquest::quest_rewards::{quest_rewards_test::*, QuestId, UserId};

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    quest_rewards: QuestRewards,
    kyc_oracle: KycOracle,
    hero_badge: Bucket,
    user_id: UserId,
    admin_badge_proof: Proof,
    super_admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address =
        PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

    let user_id_string = "test_user_id".to_string();

    let super_admin_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(2, &mut env)?;
    let hero_badge = ResourceBuilder::new_string_non_fungible(OwnerRole::None)
        .mint_initial_supply(
            [(
                StringNonFungibleLocalId::new(user_id_string.clone()).unwrap(),
                EmptyNonFungibleData {},
            )],
            &mut env,
        )?;
    let kyc_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    let quest_rewards = QuestRewards::new(
        super_admin_badge.resource_address(&mut env)?,
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        FAUCET, // used as dapp_definition for testing
        admin_badge.take(dec!(1), &mut env)?,
        hero_badge.resource_address(&mut env)?,
        kyc_badge.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    let kyc_oracle = env.with_component_state(
        quest_rewards,
        |quest_rewards_state: &mut QuestRewardsState, _| {
            KycOracle(quest_rewards_state.kyc_oracle.as_node_id().to_owned())
        },
    )?;

    let admin_badge_proof = admin_badge.create_proof_of_all(&mut env)?;
    let super_admin_badge_proof = super_admin_badge.create_proof_of_all(&mut env)?;

    Ok(Test {
        env,
        quest_rewards,
        kyc_oracle,
        hero_badge,
        user_id: UserId(user_id_string),
        admin_badge_proof,
        super_admin_badge_proof,
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
fn can_aggregate_rewards_fungible_with_another_deposit() -> Result<(), RuntimeError> {
    // Arrange
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
        user_id.clone(),
        QuestId("1".into()),
        vec![reward_1, reward_2],
        &mut env,
    )?;

    let reward_3 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;

    // Act
    let result =
        quest_rewards.deposit_reward(user_id, QuestId("1".into()), vec![reward_3], &mut env);

    // Assert
    assert!(result.is_ok());

    Ok(())
}

#[test]
fn can_aggregate_rewards_nonfungible_with_another_deposit() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let nf = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = BucketFactory::create_non_fungible_bucket(
        nf.resource_address(&mut env)?,
        [(NonFungibleLocalId::ruid([1; 32]), ())],
        Mock,
        &mut env,
    )?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards.deposit_reward(
        user_id.clone(),
        QuestId("1".into()),
        vec![reward_1, reward_2],
        &mut env,
    )?;

    let reward_3 = BucketFactory::create_non_fungible_bucket(
        nf.resource_address(&mut env)?,
        [(NonFungibleLocalId::ruid([3; 32]), ())],
        Mock,
        &mut env,
    )?;

    // Act
    let result =
        quest_rewards.deposit_reward(user_id, QuestId("1".into()), vec![reward_3], &mut env);

    // Assert
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn can_claim_rewards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards,
        hero_badge,
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
        hero_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    )?;

    assert_eq!(response.len(), 2);
    let response_1 = response[0].resource_address(&mut env)?;
    let response_2 = response[1].resource_address(&mut env)?;

    assert!(response_1 == reward_1_address || response_1 == reward_2_address);
    assert!(response_2 == reward_1_address || response_2 == reward_2_address);

    Ok(())
}

#[test]
fn can_claim_rewards_after_multiple_deposit_of_fungible_in_separate_calls(
) -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards,
        hero_badge,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let reward_3 = BucketFactory::create_fungible_bucket(XRD, 50.into(), Mock, &mut env)?;
    let reward_1_address = reward_1.resource_address(&mut env)?;
    let reward_2_address = reward_2.resource_address(&mut env)?;

    let quest_id = QuestId("1".into());

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards.deposit_reward(
        user_id.clone(),
        quest_id.clone(),
        vec![reward_1, reward_2],
        &mut env,
    )?;

    quest_rewards.deposit_reward(user_id, quest_id.clone(), vec![reward_3], &mut env)?;

    // Act
    let response = quest_rewards.claim_reward(
        quest_id,
        hero_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    )?;

    // Assert
    assert_eq!(response.len(), 2);

    // XRD
    let amount = response
        .iter()
        .find(|r| r.resource_address(&mut env).unwrap() == reward_1_address)
        .unwrap()
        .amount(&mut env)?;
    assert_eq!(amount, 150.into());

    // NonFungible
    let local_ids = response
        .iter()
        .find(|r| r.resource_address(&mut env).unwrap() == reward_2_address)
        .unwrap()
        .non_fungible_local_ids(&mut env)?;
    assert_eq!(local_ids.len(), 1);

    Ok(())
}

#[test]
fn can_claim_rewards_after_multiple_deposit_of_nonfungible_in_separate_calls(
) -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards,
        hero_badge,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([(), ()], &mut env)?;
    let reward_3 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let reward_1_address = reward_1.resource_address(&mut env)?;
    let reward_2_address = reward_2.resource_address(&mut env)?;
    let reward_3_address = reward_3.resource_address(&mut env)?;

    let quest_id = QuestId("1".into());

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards.deposit_reward(
        user_id.clone(),
        quest_id.clone(),
        vec![reward_1, reward_2],
        &mut env,
    )?;

    quest_rewards.deposit_reward(user_id, quest_id.clone(), vec![reward_3], &mut env)?;

    // Act
    let response = quest_rewards.claim_reward(
        quest_id,
        hero_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    )?;

    // Assert
    assert_eq!(response.len(), 3);

    // XRD
    let amount = response
        .iter()
        .find(|r| r.resource_address(&mut env).unwrap() == reward_1_address)
        .unwrap()
        .amount(&mut env)?;
    assert_eq!(amount, 100.into());

    // NonFungible #1
    let local_ids = response
        .iter()
        .find(|r| r.resource_address(&mut env).unwrap() == reward_2_address)
        .unwrap()
        .non_fungible_local_ids(&mut env)?;
    assert_eq!(local_ids.len(), 2);

    // NonFungible #2
    let local_ids = response
        .iter()
        .find(|r| r.resource_address(&mut env).unwrap() == reward_3_address)
        .unwrap()
        .non_fungible_local_ids(&mut env)?;
    assert_eq!(local_ids.len(), 1);

    Ok(())
}

#[test]
fn cannot_claim_rewards_when_kyc_required() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards,
        mut kyc_oracle,
        hero_badge,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    let quest_id = QuestId("1".into());

    env.disable_auth_module();

    kyc_oracle.update_user_kyc_requirement(user_id.clone(), true, &mut env)?;
    env.enable_auth_module();

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards.deposit_reward(
        user_id,
        quest_id.clone(),
        vec![reward_1, reward_2],
        &mut env,
    )?;

    // Act
    let result = quest_rewards.claim_reward(
        quest_id,
        hero_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    );

    // Assert
    assert!(result.is_err());

    Ok(())
}

#[test]
pub fn can_disable_quest_rewards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    quest_rewards.disable(&mut env)?;

    Ok(())
}

#[test]
pub fn cannot_deposit_rewards_when_disabled() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards,
        user_id,
        admin_badge_proof,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    quest_rewards.disable(&mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = quest_rewards.deposit_reward(
        user_id,
        QuestId("1".into()),
        vec![reward_1, reward_2],
        &mut env,
    );

    assert!(result.is_err());

    Ok(())
}
