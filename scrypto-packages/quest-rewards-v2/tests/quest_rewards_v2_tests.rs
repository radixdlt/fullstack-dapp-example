use scrypto_test::prelude::*;

use quest_rewards_v2::quest_rewards_v2::{quest_rewards_v2_test::*, QuestId, RewardState, UserId};

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    quest_rewards_v2: QuestRewardsV2,
    hero_badge: Bucket,
    kyc_badge: Bucket,
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

    let clam = ResourceBuilder::new_fungible(OwnerRole::None)
        .divisibility(DIVISIBILITY_NONE)
        .mint_roles(mint_roles!(
            minter => rule!(require(
                admin_badge.resource_address(&mut env)?
            ));
            minter_updater => OWNER;
        ))
        .mint_initial_supply(0, &mut env)?;

    let quest_rewards_v2 = QuestRewardsV2::new(
        super_admin_badge.resource_address(&mut env)?,
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        FAUCET, // used as dapp_definition for testing
        admin_badge.take(dec!(1), &mut env)?,
        hero_badge.resource_address(&mut env)?,
        kyc_badge.resource_address(&mut env)?,
        clam.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    let admin_badge_proof = admin_badge.create_proof_of_all(&mut env)?;
    let super_admin_badge_proof = super_admin_badge.create_proof_of_all(&mut env)?;

    Ok(Test {
        env,
        quest_rewards_v2,
        hero_badge,
        kyc_badge,
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
        mut quest_rewards_v2,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards_v2.deposit_users_rewards(
        vec![(user_id, QuestId("1".into()), vec![reward_1, reward_2])],
        &mut env,
    )?;

    Ok(())
}

#[test]
fn can_get_rewards_state() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards_v2,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    let quest_id = QuestId("1".into());

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards_v2.deposit_users_rewards(
        vec![(user_id.clone(), quest_id.clone(), vec![reward_1, reward_2])],
        &mut env,
    )?;

    // Act
    let rewards = quest_rewards_v2.get_rewards_state(user_id, quest_id, &mut env)?;

    // Assert
    println!("{:?}", rewards);
    match rewards {
        RewardState::Unclaimed(resources_record) => assert_eq!(resources_record.0.len(), 2),
        _ => panic!("Expected RewardState::Deposited"),
    }

    Ok(())
}

#[test]
fn can_deposit_multiple_rewards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards_v2,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let reward_3 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let reward_4 =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(dec!(10), &mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards_v2.deposit_users_rewards(
        vec![
            (
                user_id.clone(),
                QuestId("1".into()),
                vec![reward_1, reward_2],
            ),
            (user_id.clone(), QuestId("2".into()), vec![reward_3]),
            (
                UserId("user_id_2".into()),
                QuestId("3".into()),
                vec![reward_4],
            ),
        ],
        &mut env,
    )?;

    let reward_state_1 =
        quest_rewards_v2.get_rewards_state(user_id.clone(), QuestId("1".into()), &mut env)?;
    let reward_state_2 =
        quest_rewards_v2.get_rewards_state(user_id.clone(), QuestId("2".into()), &mut env)?;
    let reward_state_3 = quest_rewards_v2.get_rewards_state(
        UserId("user_id_2".into()),
        QuestId("3".into()),
        &mut env,
    )?;

    assert!(matches!(reward_state_1, RewardState::Unclaimed(..)));
    assert!(matches!(reward_state_2, RewardState::Unclaimed(..)));
    assert!(matches!(reward_state_3, RewardState::Unclaimed(..)));

    assert_ne!(reward_state_1, reward_state_2);
    assert_ne!(reward_state_1, reward_state_3);
    assert_ne!(reward_state_2, reward_state_3);
    Ok(())
}

#[test]
fn can_aggregate_rewards_fungible_with_another_deposit() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards_v2,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards_v2.deposit_users_rewards(
        vec![(
            user_id.clone(),
            QuestId("1".into()),
            vec![reward_1, reward_2],
        )],
        &mut env,
    )?;

    let reward_3 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;

    // Act
    let result = quest_rewards_v2.deposit_users_rewards(
        vec![(user_id, QuestId("1".into()), vec![reward_3])],
        &mut env,
    );

    // Assert
    assert!(result.is_ok());

    Ok(())
}

#[test]
fn can_aggregate_rewards_non_fungible_with_another_deposit() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards_v2,
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
    quest_rewards_v2.deposit_users_rewards(
        vec![(
            user_id.clone(),
            QuestId("1".into()),
            vec![reward_1, reward_2],
        )],
        &mut env,
    )?;

    let reward_3 = BucketFactory::create_non_fungible_bucket(
        nf.resource_address(&mut env)?,
        [(NonFungibleLocalId::ruid([3; 32]), ())],
        Mock,
        &mut env,
    )?;

    // Act
    let result = quest_rewards_v2.deposit_users_rewards(
        vec![(user_id, QuestId("1".into()), vec![reward_3])],
        &mut env,
    );

    // Assert
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn can_claim_rewards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards_v2,
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
    quest_rewards_v2.deposit_users_rewards(
        vec![(user_id, quest_id.clone(), vec![reward_1, reward_2])],
        &mut env,
    )?;

    let response = quest_rewards_v2.claim_reward(
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
fn can_get_claimed_rewards_state() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards_v2,
        user_id,
        admin_badge_proof,
        hero_badge,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    let quest_id = QuestId("1".into());

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards_v2.deposit_users_rewards(
        vec![(user_id.clone(), quest_id.clone(), vec![reward_1, reward_2])],
        &mut env,
    )?;

    quest_rewards_v2.claim_reward(
        quest_id.clone(),
        hero_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    )?;

    // Act
    let rewards = quest_rewards_v2.get_rewards_state(user_id, quest_id, &mut env)?;

    // Assert
    assert_eq!(rewards, RewardState::Claimed);

    Ok(())
}

#[test]
fn cannot_claim_rewards_before_deposit() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards_v2,
        hero_badge,
        ..
    } = arrange_test_environment()?;

    let quest_id = QuestId("1".into());

    // Act
    let result = quest_rewards_v2.claim_reward(
        quest_id,
        hero_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    );

    // Assert
    assert!(result.is_err());
    println!("{:?}", result);
    assert!(result
        .unwrap_err()
        .to_string()
        .contains("No reward record for user_id:"));

    Ok(())
}

#[test]
fn cannot_claim_rewards_already_claimed() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards_v2,
        hero_badge,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    let quest_id = QuestId("1".into());

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards_v2.deposit_users_rewards(
        vec![(user_id, quest_id.clone(), vec![reward_1, reward_2])],
        &mut env,
    )?;

    quest_rewards_v2.claim_reward(
        quest_id.clone(),
        hero_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    )?;

    // Act
    let result = quest_rewards_v2.claim_reward(
        quest_id,
        hero_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    );

    // Assert
    assert!(result.is_err());
    println!("{:?}", result);
    assert!(result
        .unwrap_err()
        .to_string()
        .contains("Reward already claimed"));

    Ok(())
}

#[test]
fn can_claim_rewards_after_multiple_deposit_of_fungible_in_separate_calls(
) -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards_v2,
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
    quest_rewards_v2.deposit_users_rewards(
        vec![(user_id.clone(), quest_id.clone(), vec![reward_1, reward_2])],
        &mut env,
    )?;

    quest_rewards_v2
        .deposit_users_rewards(vec![(user_id, quest_id.clone(), vec![reward_3])], &mut env)?;

    // Act
    let response = quest_rewards_v2.claim_reward(
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
fn can_claim_rewards_after_multiple_deposit_of_non_fungible_in_separate_calls(
) -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards_v2,
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
    quest_rewards_v2.deposit_users_rewards(
        vec![(user_id.clone(), quest_id.clone(), vec![reward_1, reward_2])],
        &mut env,
    )?;

    quest_rewards_v2
        .deposit_users_rewards(vec![(user_id, quest_id.clone(), vec![reward_3])], &mut env)?;

    // Act
    let response = quest_rewards_v2.claim_reward(
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
        mut quest_rewards_v2,
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

    quest_rewards_v2.update_users_kyc_requirement(vec![(user_id.clone(), true)], &mut env)?;
    env.enable_auth_module();

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards_v2.deposit_users_rewards(
        vec![(user_id, quest_id.clone(), vec![reward_1, reward_2])],
        &mut env,
    )?;

    // Act
    let result = quest_rewards_v2.claim_reward(
        quest_id,
        hero_badge.create_proof_of_all(&mut env)?,
        None,
        &mut env,
    );

    // Assert
    assert!(result.is_err());
    assert!(result
        .unwrap_err()
        .to_string()
        .contains("No KYC badge proof provided"));

    Ok(())
}

#[test]
fn can_claim_with_kyc_badge_when_required() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut quest_rewards_v2,
        hero_badge,
        user_id,
        admin_badge_proof,
        kyc_badge,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    let quest_id = QuestId("1".into());

    env.disable_auth_module();

    quest_rewards_v2.update_users_kyc_requirement(vec![(user_id.clone(), true)], &mut env)?;
    env.enable_auth_module();

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    quest_rewards_v2.deposit_users_rewards(
        vec![(user_id, quest_id.clone(), vec![reward_1, reward_2])],
        &mut env,
    )?;

    // Act
    let result = quest_rewards_v2.claim_reward(
        quest_id,
        hero_badge.create_proof_of_all(&mut env)?,
        Some(kyc_badge.create_proof_of_all(&mut env)?),
        &mut env,
    );

    // Assert
    assert!(result.is_ok());

    Ok(())
}

#[test]
pub fn can_disable_quest_rewards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards_v2,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    quest_rewards_v2.disable(&mut env)?;

    Ok(())
}

#[test]
pub fn cannot_deposit_rewards_when_disabled() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards_v2,
        user_id,
        admin_badge_proof,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    quest_rewards_v2.disable(&mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = quest_rewards_v2.deposit_users_rewards(
        vec![(user_id, QuestId("1".into()), vec![reward_1, reward_2])],
        &mut env,
    );

    assert!(result.is_err());

    Ok(())
}

#[test]
pub fn can_enable_then_deposit_rewards_when_disabled() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut quest_rewards_v2,
        user_id,
        admin_badge_proof,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let reward_1 = BucketFactory::create_fungible_bucket(XRD, 100.into(), Mock, &mut env)?;
    let reward_2 = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    quest_rewards_v2.disable(&mut env)?;

    quest_rewards_v2.enable(&mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = quest_rewards_v2.deposit_users_rewards(
        vec![(user_id, QuestId("1".into()), vec![reward_1, reward_2])],
        &mut env,
    );

    assert!(result.is_ok());

    Ok(())
}

#[test]
fn can_get_clams() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        quest_rewards_v2,
        hero_badge,
        ..
    } = arrange_test_environment()?;

    // Act
    let clams = quest_rewards_v2.get_clams(hero_badge.create_proof_of_all(&mut env)?, &mut env)?;

    // Assert
    assert!(clams.amount(&mut env)? > dec!(0));
    Ok(())
}

#[test]
fn cannot_get_clams_without_hero_badge() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        quest_rewards_v2,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    let result = quest_rewards_v2.get_clams(admin_badge_proof, &mut env);

    // Assert
    assert!(result.is_err());
    Ok(())
}
